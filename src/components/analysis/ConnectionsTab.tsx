
import React from 'react';
import { ArrowRight, Link, Users, Building, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ConnectionsTab = () => {
  const connections = [
    {
      source: 'Market Research Report',
      target: 'Technology Assessment',
      strength: 'Strong',
      type: 'Data Correlation',
      description: 'Both documents reference similar market size projections and growth rates',
      color: 'border-green-400'
    },
    {
      source: 'Executive Summary',
      target: 'Financial Analysis',
      strength: 'Medium',
      type: 'Strategic Alignment',
      description: 'Financial projections align with strategic objectives outlined in executive summary',
      color: 'border-yellow-400'
    },
    {
      source: 'Competitive Analysis',
      target: 'Product Roadmap',
      strength: 'Strong',
      type: 'Strategic Response',
      description: 'Product features directly address competitive gaps identified in analysis',
      color: 'border-green-400'
    }
  ];

  const entityConnections = [
    {
      entity: 'TechCorp Inc.',
      type: 'Company',
      mentions: 8,
      connections: ['Product Development', 'Market Analysis', 'Partnership Strategy'],
      icon: Building
    },
    {
      entity: 'Dr. Sarah Chen',
      type: 'Person',
      mentions: 5,
      connections: ['Research Papers', 'Technical Review', 'Expert Interview'],
      icon: Users
    },
    {
      entity: 'AI Framework 2024',
      type: 'Technology',
      mentions: 12,
      connections: ['Technical Specs', 'Implementation Guide', 'Performance Analysis'],
      icon: FileText
    }
  ];

  return (
    <div className="space-y-6">
      {/* Document Connections */}
      <Card className="bg-gray-700 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Link className="h-5 w-5 mr-2 text-cyan-400" />
            Document Relationships
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {connections.map((connection, index) => (
              <div key={index} className={`border-l-4 ${connection.color} pl-4 py-3 bg-gray-800 rounded-r-lg`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-white font-medium text-sm">{connection.source}</span>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <span className="text-white font-medium text-sm">{connection.target}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      connection.strength === 'Strong' ? 'bg-green-500/20 text-green-300' :
                      connection.strength === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {connection.strength}
                    </span>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                      {connection.type}
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{connection.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Entity Network */}
      <Card className="bg-gray-700 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Users className="h-5 w-5 mr-2 text-purple-400" />
            Entity Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {entityConnections.map((entity, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <entity.icon className="h-5 w-5 text-cyan-400" />
                    <span className="text-white font-medium">{entity.entity}</span>
                  </div>
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs">
                    {entity.mentions} mentions
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{entity.type}</p>
                <div className="space-y-1">
                  <p className="text-gray-300 text-xs font-medium mb-2">Connected to:</p>
                  {entity.connections.map((connection, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-400 text-xs">{connection}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Connection Strength Legend */}
      <Card className="bg-gray-700 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white text-sm">Connection Strength Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-gray-300 text-sm">Strong (80%+ similarity)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-gray-300 text-sm">Medium (50-79% similarity)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-gray-300 text-sm">Weak (20-49% similarity)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConnectionsTab;
