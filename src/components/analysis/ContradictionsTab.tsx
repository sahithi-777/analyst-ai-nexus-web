
import React from 'react';
import { AlertTriangle, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnalysisResult } from '@/utils/fileProcessor';

interface ContradictionsTabProps {
  contradictions: AnalysisResult['contradictions'];
}

const ContradictionsTab = ({ contradictions }: ContradictionsTabProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500';
      case 'low': return 'bg-orange-500/20 text-orange-300 border-orange-500';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500';
    }
  };

  const contradictionStats = [
    { 
      label: 'Total Contradictions', 
      value: contradictions.length.toString(), 
      color: 'text-red-400' 
    },
    { 
      label: 'High Severity', 
      value: contradictions.filter(c => c.severity === 'high').length.toString(), 
      color: 'text-red-400' 
    },
    { 
      label: 'Medium Severity', 
      value: contradictions.filter(c => c.severity === 'medium').length.toString(), 
      color: 'text-yellow-400' 
    },
    { 
      label: 'Low Severity', 
      value: contradictions.filter(c => c.severity === 'low').length.toString(), 
      color: 'text-orange-400' 
    }
  ];

  if (contradictions.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-16 w-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">No Contradictions Found</h3>
        <p className="text-gray-400">The analysis found no significant contradictions in your documents.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Contradiction Overview */}
      <Card className="bg-gray-700 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
            Contradiction Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {contradictionStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contradiction Details */}
      <div className="space-y-4">
        {contradictions.map((contradiction) => (
          <Card key={contradiction.id} className="bg-gray-700 border-gray-600">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{contradiction.title}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getSeverityColor(contradiction.severity)}`}>
                        {contradiction.severity.charAt(0).toUpperCase() + contradiction.severity.slice(1)} Priority
                      </span>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                        {contradiction.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Description */}
                <div>
                  <h4 className="text-white font-medium mb-2">Issue Description</h4>
                  <p className="text-gray-300 text-sm">{contradiction.description}</p>
                </div>

                {/* Conflicting Documents */}
                <div>
                  <h4 className="text-white font-medium mb-2">Conflicting Sources</h4>
                  <div className="space-y-1">
                    {contradiction.documents.map((doc, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300 text-sm">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impact and Recommendation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Potential Impact</h4>
                    <p className="text-gray-400 text-sm">{contradiction.impact}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Recommendation</h4>
                    <p className="text-gray-400 text-sm">{contradiction.recommendation}</p>
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

export default ContradictionsTab;
