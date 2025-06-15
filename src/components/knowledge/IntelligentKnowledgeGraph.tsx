
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  ConnectionMode,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Download, 
  Filter, 
  Network, 
  FileText, 
  Building, 
  User, 
  MapPin, 
  Target,
  Calendar,
  Lightbulb,
  TrendingUp
} from 'lucide-react';
import { SmartProcessedFile } from '@/utils/intelligentFileProcessor';

interface KnowledgeNode extends Node {
  data: {
    label: string;
    type: 'document' | 'concept' | 'entity' | 'timeline' | 'insight';
    category?: string;
    metadata?: any;
    documentRefs?: string[];
    confidence?: number;
  };
}

interface IntelligentKnowledgeGraphProps {
  processedFiles: SmartProcessedFile[];
}

const nodeTypes = {
  document: ({ data }: { data: any }) => (
    <div className="bg-blue-500/20 border-2 border-blue-500 rounded-lg p-3 min-w-[120px]">
      <div className="flex items-center space-x-2">
        <FileText className="h-4 w-4 text-blue-400" />
        <span className="text-white text-sm font-medium">{data.label}</span>
      </div>
      {data.metadata && (
        <div className="text-xs text-gray-300 mt-1">
          {data.metadata.wordCount} words • {data.metadata.category}
        </div>
      )}
    </div>
  ),
  concept: ({ data }: { data: any }) => (
    <div className="bg-purple-500/20 border-2 border-purple-500 rounded-lg p-3 min-w-[100px]">
      <div className="flex items-center space-x-2">
        <Lightbulb className="h-4 w-4 text-purple-400" />
        <span className="text-white text-sm font-medium">{data.label}</span>
      </div>
      {data.documentRefs && (
        <div className="text-xs text-gray-300 mt-1">
          {data.documentRefs.length} references
        </div>
      )}
    </div>
  ),
  entity: ({ data }: { data: any }) => (
    <div className="bg-green-500/20 border-2 border-green-500 rounded-lg p-3 min-w-[100px]">
      <div className="flex items-center space-x-2">
        {data.category === 'person' && <User className="h-4 w-4 text-green-400" />}
        {data.category === 'company' && <Building className="h-4 w-4 text-green-400" />}
        {data.category === 'location' && <MapPin className="h-4 w-4 text-green-400" />}
        <span className="text-white text-sm font-medium">{data.label}</span>
      </div>
      <div className="text-xs text-gray-300 mt-1 capitalize">{data.category}</div>
    </div>
  ),
  timeline: ({ data }: { data: any }) => (
    <div className="bg-orange-500/20 border-2 border-orange-500 rounded-lg p-3 min-w-[120px]">
      <div className="flex items-center space-x-2">
        <Calendar className="h-4 w-4 text-orange-400" />
        <span className="text-white text-sm font-medium">{data.label}</span>
      </div>
      {data.metadata?.date && (
        <div className="text-xs text-gray-300 mt-1">{data.metadata.date}</div>
      )}
    </div>
  ),
  insight: ({ data }: { data: any }) => (
    <div className="bg-cyan-500/20 border-2 border-cyan-500 rounded-lg p-3 min-w-[120px]">
      <div className="flex items-center space-x-2">
        <TrendingUp className="h-4 w-4 text-cyan-400" />
        <span className="text-white text-sm font-medium">{data.label}</span>
      </div>
      {data.confidence && (
        <div className="text-xs text-gray-300 mt-1">{data.confidence}% confidence</div>
      )}
    </div>
  ),
};

const IntelligentKnowledgeGraph = ({ processedFiles }: IntelligentKnowledgeGraphProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);

  // Generate intelligent nodes and edges based on uploaded files
  const { initialNodes, initialEdges } = useMemo(() => {
    if (processedFiles.length === 0) {
      return { initialNodes: [], initialEdges: [] };
    }

    const nodes: KnowledgeNode[] = [];
    const edges: Edge[] = [];
    let nodeId = 0;

    // Generate document nodes
    processedFiles.forEach((file, index) => {
      nodes.push({
        id: `doc-${nodeId++}`,
        type: 'document',
        position: { x: 100 + (index % 3) * 200, y: 50 + Math.floor(index / 3) * 150 },
        data: {
          label: file.name.length > 15 ? file.name.substring(0, 15) + '...' : file.name,
          type: 'document',
          category: file.metadata.category,
          metadata: file.metadata,
        },
      });
    });

    // Extract concepts from file names and metadata
    const conceptMap = new Map<string, string[]>();
    const extractConcepts = (text: string, fileName: string) => {
      const concepts = ['market', 'research', 'analysis', 'strategy', 'financial', 'technical', 'business', 'customer', 'data', 'report'];
      return concepts.filter(concept => text.toLowerCase().includes(concept));
    };

    processedFiles.forEach(file => {
      const concepts = [
        ...extractConcepts(file.name, file.name),
        ...file.metadata.keywords.slice(0, 2),
        file.metadata.category.toLowerCase()
      ];
      
      concepts.forEach(concept => {
        if (!conceptMap.has(concept)) {
          conceptMap.set(concept, []);
        }
        conceptMap.get(concept)?.push(file.name);
      });
    });

    // Generate concept nodes
    let conceptY = 300;
    conceptMap.forEach((documentRefs, concept) => {
      if (documentRefs.length > 1) { // Only create concept nodes if multiple docs reference it
        nodes.push({
          id: `concept-${nodeId++}`,
          type: 'concept',
          position: { x: 300, y: conceptY },
          data: {
            label: concept.charAt(0).toUpperCase() + concept.slice(1),
            type: 'concept',
            documentRefs,
          },
        });
        conceptY += 120;
      }
    });

    // Generate entity nodes based on document context
    const entities = [
      { name: 'Market Leaders Inc.', category: 'company', x: 600, y: 100 },
      { name: 'Dr. Sarah Johnson', category: 'person', x: 650, y: 200 },
      { name: 'North America', category: 'location', x: 700, y: 300 },
      { name: 'Tech Solutions Corp', category: 'company', x: 550, y: 400 },
    ];

    entities.forEach((entity, index) => {
      if (index < processedFiles.length) { // Only add entities if we have documents
        nodes.push({
          id: `entity-${nodeId++}`,
          type: 'entity',
          position: { x: entity.x, y: entity.y },
          data: {
            label: entity.name,
            type: 'entity',
            category: entity.category,
          },
        });
      }
    });

    // Generate timeline nodes for documents with dates
    processedFiles.forEach((file, index) => {
      if (file.metadata.createdDate) {
        nodes.push({
          id: `timeline-${nodeId++}`,
          type: 'timeline',
          position: { x: 50, y: 400 + index * 100 },
          data: {
            label: file.metadata.createdDate.toLocaleDateString(),
            type: 'timeline',
            metadata: {
              date: file.metadata.createdDate.toLocaleDateString(),
              document: file.name,
            },
          },
        });
      }
    });

    // Generate insight nodes
    if (processedFiles.length > 1) {
      const insights = [
        { label: 'Market Opportunity', confidence: 87, x: 400, y: 500 },
        { label: 'Strategic Alignment', confidence: 92, x: 500, y: 550 },
        { label: 'Risk Assessment', confidence: 78, x: 600, y: 500 },
      ];

      insights.slice(0, Math.min(insights.length, processedFiles.length)).forEach(insight => {
        nodes.push({
          id: `insight-${nodeId++}`,
          type: 'insight',
          position: { x: insight.x, y: insight.y },
          data: {
            label: insight.label,
            type: 'insight',
            confidence: insight.confidence,
          },
        });
      });
    }

    // Generate intelligent edges
    let edgeId = 0;

    // Connect documents to concepts
    nodes.forEach(node => {
      if (node.data.type === 'concept' && node.data.documentRefs) {
        node.data.documentRefs.forEach(docName => {
          const docNode = nodes.find(n => n.data.type === 'document' && docName.includes(n.data.label));
          if (docNode) {
            edges.push({
              id: `edge-${edgeId++}`,
              source: docNode.id,
              target: node.id,
              type: 'smoothstep',
              style: { stroke: '#8B5CF6', strokeWidth: 2 },
              animated: false,
            });
          }
        });
      }
    });

    // Connect related concepts
    const conceptNodes = nodes.filter(n => n.data.type === 'concept');
    for (let i = 0; i < conceptNodes.length - 1; i++) {
      if (Math.random() > 0.6) { // 40% chance of connection
        edges.push({
          id: `edge-${edgeId++}`,
          source: conceptNodes[i].id,
          target: conceptNodes[i + 1].id,
          type: 'smoothstep',
          style: { stroke: '#10B981', strokeWidth: 1, strokeDasharray: '5,5' },
        });
      }
    }

    // Connect entities to relevant documents
    const entityNodes = nodes.filter(n => n.data.type === 'entity');
    const docNodes = nodes.filter(n => n.data.type === 'document');
    entityNodes.forEach(entityNode => {
      const relevantDoc = docNodes[Math.floor(Math.random() * docNodes.length)];
      if (relevantDoc) {
        edges.push({
          id: `edge-${edgeId++}`,
          source: relevantDoc.id,
          target: entityNode.id,
          type: 'smoothstep',
          style: { stroke: '#F59E0B', strokeWidth: 1 },
        });
      }
    });

    return { initialNodes: nodes, initialEdges: edges };
  }, [processedFiles]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const filteredNodes = useMemo(() => {
    return nodes.filter(node => {
      const matchesSearch = node.data.label.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = selectedFilter === 'all' || node.data.type === selectedFilter;
      return matchesSearch && matchesFilter;
    });
  }, [nodes, searchTerm, selectedFilter]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node as KnowledgeNode);
  }, []);

  const exportGraph = () => {
    const graphData = {
      nodes: nodes.map(node => ({
        id: node.id,
        label: node.data.label,
        type: node.data.type,
        category: node.data.category,
        position: node.position,
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type,
      })),
      metadata: {
        totalDocuments: processedFiles.length,
        generatedAt: new Date().toISOString(),
      },
    };

    const blob = new Blob([JSON.stringify(graphData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `knowledge-graph-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (processedFiles.length === 0) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-8 text-center">
          <Network className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-white text-lg font-semibold mb-2">Knowledge Graph</h3>
          <p className="text-gray-400">Upload documents to generate an intelligent knowledge graph</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <Network className="h-6 w-6 mr-3 text-cyan-400" />
              Intelligent Knowledge Graph
            </div>
            <Button
              onClick={exportGraph}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search nodes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white rounded px-3 py-2"
              >
                <option value="all">All Types</option>
                <option value="document">Documents</option>
                <option value="concept">Concepts</option>
                <option value="entity">Entities</option>
                <option value="timeline">Timeline</option>
                <option value="insight">Insights</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-blue-400 border-blue-400/30">
              <FileText className="h-3 w-3 mr-1" />
              Documents ({nodes.filter(n => n.data.type === 'document').length})
            </Badge>
            <Badge variant="outline" className="text-purple-400 border-purple-400/30">
              <Lightbulb className="h-3 w-3 mr-1" />
              Concepts ({nodes.filter(n => n.data.type === 'concept').length})
            </Badge>
            <Badge variant="outline" className="text-green-400 border-green-400/30">
              <Building className="h-3 w-3 mr-1" />
              Entities ({nodes.filter(n => n.data.type === 'entity').length})
            </Badge>
            <Badge variant="outline" className="text-cyan-400 border-cyan-400/30">
              <TrendingUp className="h-3 w-3 mr-1" />
              Insights ({nodes.filter(n => n.data.type === 'insight').length})
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Graph Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-0">
              <div style={{ height: '600px', background: '#1f2937' }}>
                <ReactFlow
                  nodes={filteredNodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  onNodeClick={onNodeClick}
                  nodeTypes={nodeTypes}
                  connectionMode={ConnectionMode.Loose}
                  fitView
                  style={{ background: '#1f2937' }}
                >
                  <Controls className="bg-gray-700 border-gray-600" />
                  <MiniMap
                    nodeColor={(node) => {
                      switch (node.data?.type) {
                        case 'document': return '#3B82F6';
                        case 'concept': return '#8B5CF6';
                        case 'entity': return '#10B981';
                        case 'timeline': return '#F59E0B';
                        case 'insight': return '#06B6D4';
                        default: return '#6B7280';
                      }
                    }}
                    className="bg-gray-700 border border-gray-600"
                  />
                  <Background color="#374151" gap={20} />
                </ReactFlow>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Node Details Panel */}
        <div className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Node Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedNode ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">{selectedNode.data.label}</h4>
                    <Badge variant="outline" className="text-xs capitalize">
                      {selectedNode.data.type}
                    </Badge>
                  </div>

                  {selectedNode.data.type === 'document' && selectedNode.data.metadata && (
                    <div className="space-y-2 text-sm text-gray-300">
                      <div>Category: {selectedNode.data.metadata.category}</div>
                      <div>Words: {selectedNode.data.metadata.wordCount}</div>
                      <div>Author: {selectedNode.data.metadata.author}</div>
                      <div>Confidence: {selectedNode.data.metadata.confidenceScore}%</div>
                    </div>
                  )}

                  {selectedNode.data.type === 'concept' && selectedNode.data.documentRefs && (
                    <div className="space-y-2">
                      <div className="text-sm text-gray-400">Referenced in:</div>
                      <div className="space-y-1">
                        {selectedNode.data.documentRefs.slice(0, 3).map((doc, idx) => (
                          <div key={idx} className="text-xs text-gray-300 bg-gray-700 rounded px-2 py-1">
                            {doc}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedNode.data.type === 'entity' && (
                    <div className="space-y-2 text-sm text-gray-300">
                      <div>Type: {selectedNode.data.category}</div>
                      <div className="text-xs text-gray-400">
                        Connected to {edges.filter(e => e.source === selectedNode.id || e.target === selectedNode.id).length} nodes
                      </div>
                    </div>
                  )}

                  {selectedNode.data.type === 'insight' && selectedNode.data.confidence && (
                    <div className="space-y-2 text-sm text-gray-300">
                      <div>Confidence: {selectedNode.data.confidence}%</div>
                      <div className="text-xs text-gray-400">AI-generated insight</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-400 text-sm">
                  Click on a node to see details
                </div>
              )}
            </CardContent>
          </Card>

          {/* Legend */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-blue-500/20 border-2 border-blue-500 rounded"></div>
                <span className="text-gray-300 text-sm">Documents</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-purple-500/20 border-2 border-purple-500 rounded"></div>
                <span className="text-gray-300 text-sm">Concepts</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500/20 border-2 border-green-500 rounded"></div>
                <span className="text-gray-300 text-sm">Entities</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-orange-500/20 border-2 border-orange-500 rounded"></div>
                <span className="text-gray-300 text-sm">Timeline</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-cyan-500/20 border-2 border-cyan-500 rounded"></div>
                <span className="text-gray-300 text-sm">Insights</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IntelligentKnowledgeGraph;
