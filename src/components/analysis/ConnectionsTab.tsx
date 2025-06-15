
import React, { useState, useRef, useEffect } from 'react';
import { Search, ZoomIn, ZoomOut, RotateCcw, Maximize, Download, Share2, FileText, Users, Building, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Node {
  id: string;
  type: 'document' | 'concept' | 'person' | 'location';
  label: string;
  x: number;
  y: number;
  connections: string[];
  details: string;
  color: string;
  icon: any;
}

interface Edge {
  id: string;
  source: string;
  target: string;
  type: 'solid' | 'dashed' | 'dotted';
  label?: string;
}

const ConnectionsTab = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [nodeFilters, setNodeFilters] = useState({
    document: true,
    concept: true,
    person: true,
    location: true
  });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Sample nodes for demonstration
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: 'doc1',
      type: 'document',
      label: 'Market Research',
      x: 150,
      y: 100,
      connections: ['concept1', 'person1'],
      details: 'Comprehensive market analysis report covering Q3 2024 trends',
      color: '#3B82F6',
      icon: FileText
    },
    {
      id: 'doc2',
      type: 'document',
      label: 'Technical Specs',
      x: 350,
      y: 200,
      connections: ['concept2', 'person2'],
      details: 'Technical specifications for the new AI framework implementation',
      color: '#3B82F6',
      icon: FileText
    },
    {
      id: 'concept1',
      type: 'concept',
      label: 'AI Framework',
      x: 250,
      y: 150,
      connections: ['doc1', 'doc2', 'person1'],
      details: 'Advanced artificial intelligence framework for data processing',
      color: '#10B981',
      icon: null
    },
    {
      id: 'concept2',
      type: 'concept',
      label: 'Market Growth',
      x: 450,
      y: 100,
      connections: ['doc2', 'location1'],
      details: 'Projected market growth patterns and opportunities',
      color: '#10B981',
      icon: null
    },
    {
      id: 'person1',
      type: 'person',
      label: 'Dr. Sarah Chen',
      x: 100,
      y: 250,
      connections: ['doc1', 'concept1'],
      details: 'Lead researcher and AI specialist with 10+ years experience',
      color: '#F59E0B',
      icon: Users
    },
    {
      id: 'person2',
      type: 'person',
      label: 'John Smith',
      x: 400,
      y: 300,
      connections: ['doc2'],
      details: 'Technical architect and system integration expert',
      color: '#F59E0B',
      icon: Users
    },
    {
      id: 'location1',
      type: 'location',
      label: 'Silicon Valley',
      x: 500,
      y: 200,
      connections: ['concept2'],
      details: 'Primary research and development hub for technology initiatives',
      color: '#8B5CF6',
      icon: MapPin
    }
  ]);

  // Generate edges based on node connections
  const edges: Edge[] = [];
  nodes.forEach(node => {
    node.connections.forEach(connectionId => {
      const edgeId = `${node.id}-${connectionId}`;
      const reverseEdgeId = `${connectionId}-${node.id}`;
      
      // Avoid duplicate edges
      if (!edges.find(edge => edge.id === edgeId || edge.id === reverseEdgeId)) {
        edges.push({
          id: edgeId,
          source: node.id,
          target: connectionId,
          type: Math.random() > 0.6 ? 'dashed' : Math.random() > 0.3 ? 'dotted' : 'solid'
        });
      }
    });
  });

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(selectedNode === nodeId ? null : nodeId);
  };

  const handleNodeDragStart = (nodeId: string, event: React.MouseEvent) => {
    setDraggedNode(nodeId);
    const node = nodes.find(n => n.id === nodeId);
    if (node && svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      setDragOffset({
        x: event.clientX - rect.left - node.x,
        y: event.clientY - rect.top - node.y
      });
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (draggedNode && svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const newX = event.clientX - rect.left - dragOffset.x;
      const newY = event.clientY - rect.top - dragOffset.y;
      
      setNodes(prev => prev.map(node =>
        node.id === draggedNode
          ? { ...node, x: Math.max(20, Math.min(780, newX)), y: Math.max(20, Math.min(580, newY)) }
          : node
      ));
    }
  };

  const handleMouseUp = () => {
    setDraggedNode(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedNode(null);
  };

  const fitToScreen = () => {
    setZoom(0.8);
    setPan({ x: 0, y: 0 });
  };

  const filteredNodes = nodes.filter(node => {
    const passesFilter = nodeFilters[node.type];
    const passesSearch = searchTerm === '' || 
      node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.details.toLowerCase().includes(searchTerm.toLowerCase());
    return passesFilter && passesSearch;
  });

  const highlightedNodes = searchTerm ? 
    filteredNodes.filter(node => 
      node.label.toLowerCase().includes(searchTerm.toLowerCase())
    ).map(node => node.id) : [];

  const getConnectedNodes = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    return node ? node.connections : [];
  };

  const exportAsPNG = () => {
    // In a real implementation, this would export the SVG as PNG
    console.log('Exporting as PNG...');
  };

  const shareGraph = () => {
    // In a real implementation, this would generate a shareable link
    console.log('Sharing graph...');
  };

  const getStrokeDashArray = (type: string) => {
    switch (type) {
      case 'dashed': return '10,5';
      case 'dotted': return '2,3';
      default: return 'none';
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Header */}
      <Card className="bg-gray-700 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span className="flex items-center">
              <Building className="h-5 w-5 mr-2 text-cyan-400" />
              Interactive Knowledge Graph
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={exportAsPNG}
                className="border-gray-600 text-gray-300 hover:bg-gray-600"
              >
                <Download className="h-4 w-4 mr-1" />
                Export PNG
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={shareGraph}
                className="border-gray-600 text-gray-300 hover:bg-gray-600"
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Controls */}
          <div className="flex items-center justify-between mb-4 gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search nodes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoom(prev => Math.min(2, prev + 0.2))}
                className="border-gray-600 text-gray-300 hover:bg-gray-600"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoom(prev => Math.max(0.5, prev - 0.2))}
                className="border-gray-600 text-gray-300 hover:bg-gray-600"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetView}
                className="border-gray-600 text-gray-300 hover:bg-gray-600"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={fitToScreen}
                className="border-gray-600 text-gray-300 hover:bg-gray-600"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-gray-300 text-sm font-medium">Filters:</span>
            {Object.entries(nodeFilters).map(([type, checked]) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={checked}
                  onCheckedChange={(checked) => 
                    setNodeFilters(prev => ({ ...prev, [type]: !!checked }))
                  }
                />
                <label htmlFor={type} className="text-gray-300 text-sm capitalize">
                  {type}s
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Graph Area */}
      <div className="flex gap-6">
        <div className="flex-1">
          <Card className="bg-gray-700 border-gray-600">
            <CardContent className="p-0">
              <svg
                ref={svgRef}
                width="100%"
                height="600"
                viewBox={`${-pan.x} ${-pan.y} ${800 / zoom} ${600 / zoom}`}
                className="bg-gray-900 cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {/* Grid Background */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Edges */}
                {edges.map(edge => {
                  const sourceNode = nodes.find(n => n.id === edge.source);
                  const targetNode = nodes.find(n => n.id === edge.target);
                  
                  if (!sourceNode || !targetNode || 
                      !filteredNodes.find(n => n.id === edge.source) || 
                      !filteredNodes.find(n => n.id === edge.target)) {
                    return null;
                  }

                  const isHighlighted = selectedNode && 
                    (getConnectedNodes(selectedNode).includes(edge.source) || 
                     getConnectedNodes(selectedNode).includes(edge.target) ||
                     edge.source === selectedNode || edge.target === selectedNode);

                  return (
                    <line
                      key={edge.id}
                      x1={sourceNode.x}
                      y1={sourceNode.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={isHighlighted ? '#60A5FA' : '#6B7280'}
                      strokeWidth={isHighlighted ? 3 : 2}
                      strokeDasharray={getStrokeDashArray(edge.type)}
                      opacity={selectedNode && !isHighlighted ? 0.3 : 1}
                    />
                  );
                })}

                {/* Nodes */}
                {filteredNodes.map(node => {
                  const isSelected = selectedNode === node.id;
                  const isConnected = selectedNode && getConnectedNodes(selectedNode).includes(node.id);
                  const isHighlighted = highlightedNodes.includes(node.id);
                  const opacity = selectedNode && !isSelected && !isConnected ? 0.3 : 1;

                  return (
                    <g key={node.id}>
                      {/* Node Shape */}
                      {node.type === 'concept' ? (
                        <polygon
                          points={`${node.x-20},${node.y-10} ${node.x-10},${node.y-20} ${node.x+10},${node.y-20} ${node.x+20},${node.y-10} ${node.x+20},${node.y+10} ${node.x+10},${node.y+20} ${node.x-10},${node.y+20} ${node.x-20},${node.y+10}`}
                          fill={node.color}
                          stroke={isSelected || isHighlighted ? '#FBBF24' : '#374151'}
                          strokeWidth={isSelected || isHighlighted ? 3 : 2}
                          opacity={opacity}
                          className="cursor-pointer hover:opacity-80"
                          onMouseDown={(e) => handleNodeDragStart(node.id, e)}
                          onClick={() => handleNodeClick(node.id)}
                          onMouseEnter={() => setHoveredNode(node.id)}
                          onMouseLeave={() => setHoveredNode(null)}
                        />
                      ) : node.type === 'location' ? (
                        <rect
                          x={node.x - 20}
                          y={node.y - 15}
                          width="40"
                          height="30"
                          fill={node.color}
                          stroke={isSelected || isHighlighted ? '#FBBF24' : '#374151'}
                          strokeWidth={isSelected || isHighlighted ? 3 : 2}
                          opacity={opacity}
                          className="cursor-pointer hover:opacity-80"
                          onMouseDown={(e) => handleNodeDragStart(node.id, e)}
                          onClick={() => handleNodeClick(node.id)}
                          onMouseEnter={() => setHoveredNode(node.id)}
                          onMouseLeave={() => setHoveredNode(null)}
                        />
                      ) : (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="20"
                          fill={node.color}
                          stroke={isSelected || isHighlighted ? '#FBBF24' : '#374151'}
                          strokeWidth={isSelected || isHighlighted ? 3 : 2}
                          opacity={opacity}
                          className="cursor-pointer hover:opacity-80"
                          onMouseDown={(e) => handleNodeDragStart(node.id, e)}
                          onClick={() => handleNodeClick(node.id)}
                          onMouseEnter={() => setHoveredNode(node.id)}
                          onMouseLeave={() => setHoveredNode(null)}
                        />
                      )}

                      {/* Node Icon */}
                      {node.icon && (
                        <foreignObject
                          x={node.x - 8}
                          y={node.y - 8}
                          width="16"
                          height="16"
                          className="pointer-events-none"
                        >
                          <node.icon className="h-4 w-4 text-white" />
                        </foreignObject>
                      )}

                      {/* Node Label */}
                      <text
                        x={node.x}
                        y={node.y + 35}
                        textAnchor="middle"
                        fill="white"
                        fontSize="12"
                        className="pointer-events-none select-none"
                        opacity={opacity}
                      >
                        {node.label}
                      </text>

                      {/* Tooltip */}
                      {hoveredNode === node.id && (
                        <foreignObject
                          x={node.x + 25}
                          y={node.y - 30}
                          width="200"
                          height="60"
                          className="pointer-events-none"
                        >
                          <div className="bg-gray-800 text-white p-2 rounded shadow-lg border border-gray-600 text-xs">
                            <div className="font-medium">{node.label}</div>
                            <div className="text-gray-400 mt-1">{node.details}</div>
                          </div>
                        </foreignObject>
                      )}
                    </g>
                  );
                })}
              </svg>
            </CardContent>
          </Card>
        </div>

        {/* Legend */}
        <div className="w-64">
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white text-sm">Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Node Types */}
              <div>
                <h4 className="text-white text-xs font-medium mb-2">Node Types</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <FileText className="h-2 w-2 text-white" />
                    </div>
                    <span className="text-gray-300 text-xs">Documents</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500" style={{clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'}}></div>
                    <span className="text-gray-300 text-xs">Concepts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Users className="h-2 w-2 text-white" />
                    </div>
                    <span className="text-gray-300 text-xs">People</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-3 bg-purple-500 flex items-center justify-center">
                      <MapPin className="h-2 w-2 text-white" />
                    </div>
                    <span className="text-gray-300 text-xs">Locations</span>
                  </div>
                </div>
              </div>

              {/* Relationship Types */}
              <div>
                <h4 className="text-white text-xs font-medium mb-2">Relationships</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-px bg-gray-400"></div>
                    <span className="text-gray-300 text-xs">Direct</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-px bg-gray-400" style={{backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, #9CA3AF 2px, #9CA3AF 4px)'}}></div>
                    <span className="text-gray-300 text-xs">Related</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-px bg-gray-400" style={{backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 1px, #9CA3AF 1px, #9CA3AF 2px)'}}></div>
                    <span className="text-gray-300 text-xs">Weak</span>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div>
                <h4 className="text-white text-xs font-medium mb-2">Instructions</h4>
                <div className="text-gray-400 text-xs space-y-1">
                  <p>• Click nodes to highlight connections</p>
                  <p>• Drag nodes to reposition</p>
                  <p>• Hover for details</p>
                  <p>• Use search to find nodes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConnectionsTab;
