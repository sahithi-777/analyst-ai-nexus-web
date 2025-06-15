
import React from 'react';
import { Network, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnalysisResult } from '@/utils/fileProcessor';

interface ConnectionsTabProps {
  connections: AnalysisResult['connections'];
}

const ConnectionsTab = ({ connections }: ConnectionsTabProps) => {
  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'strong': return 'bg-green-500/20 text-green-300 border-green-500';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500';
      case 'weak': return 'bg-orange-500/20 text-orange-300 border-orange-500';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'theme': return 'bg-blue-500/20 text-blue-300 border-blue-500';
      case 'contradiction': return 'bg-red-500/20 text-red-300 border-red-500';
      case 'timeline': return 'bg-purple-500/20 text-purple-300 border-purple-500';
      case 'reference': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500';
    }
  };

  if (connections.length === 0) {
    return (
      <div className="text-center py-12">
        <Network className="h-16 w-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">No Connections Found</h3>
        <p className="text-gray-400">No significant connections were identified between your documents.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Connections Overview */}
      <Card className="bg-gray-700 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Network className="h-5 w-5 mr-2 text-cyan-400" />
            Connection Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{connections.length}</div>
              <div className="text-gray-400 text-sm">Total Connections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {connections.filter(c => c.strength === 'strong').length}
              </div>
              <div className="text-gray-400 text-sm">Strong</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {connections.filter(c => c.strength === 'medium').length}
              </div>
              <div className="text-gray-400 text-sm">Medium</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">
                {connections.filter(c => c.strength === 'weak').length}
              </div>
              <div className="text-gray-400 text-sm">Weak</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connection Details */}
      <div className="space-y-4">
        {connections.map((connection) => (
          <Card key={connection.id} className="bg-gray-700 border-gray-600">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <Network className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{connection.title}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStrengthColor(connection.strength)}`}>
                        {connection.strength.charAt(0).toUpperCase() + connection.strength.slice(1)} Connection
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs border ${getTypeColor(connection.type)}`}>
                        {connection.type.charAt(0).toUpperCase() + connection.type.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-300 text-sm">{connection.description}</p>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Connected Documents</h4>
                  <div className="space-y-1">
                    {connection.documents.map((doc, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300 text-sm">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConnectionsTab;
