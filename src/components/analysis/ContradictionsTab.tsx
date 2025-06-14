
import React from 'react';
import { AlertTriangle, FileText, TrendingDown, Users, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ContradictionsTab = () => {
  const contradictions = [
    {
      id: 1,
      severity: 'High',
      category: 'Financial',
      title: 'Revenue Projection Discrepancy',
      description: 'Market research document projects $50M revenue while financial analysis shows $35M target',
      documents: ['Market Research Report (Page 23)', 'Financial Analysis Q2 (Page 8)'],
      impact: 'Budget allocation and resource planning affected',
      recommendation: 'Reconcile projections through stakeholder alignment meeting',
      icon: DollarSign,
      color: 'border-red-500 bg-red-500/10'
    },
    {
      id: 2,
      severity: 'Medium',
      category: 'Timeline',
      title: 'Implementation Schedule Conflict',
      description: 'Product roadmap suggests 6-month timeline while technical assessment indicates 9 months needed',
      documents: ['Product Roadmap v2.1', 'Technical Assessment Report'],
      impact: 'Potential delivery delays and stakeholder expectations misalignment',
      recommendation: 'Review scope and adjust timeline or resources accordingly',
      icon: TrendingDown,
      color: 'border-yellow-500 bg-yellow-500/10'
    },
    {
      id: 3,
      severity: 'Medium',
      category: 'Strategy',
      title: 'Target Market Definition Variance',
      description: 'Executive summary targets enterprise clients while market analysis focuses on SMB segment',
      documents: ['Executive Summary', 'Market Segmentation Analysis'],
      impact: 'Marketing strategy and product positioning unclear',
      recommendation: 'Define primary target segment and adjust messaging strategy',
      icon: Users,
      color: 'border-yellow-500 bg-yellow-500/10'
    },
    {
      id: 4,
      severity: 'Low',
      category: 'Technical',
      title: 'Technology Stack Inconsistency',
      description: 'Architecture document mentions React framework while implementation guide references Angular',
      documents: ['System Architecture (Section 4)', 'Implementation Guide (Chapter 2)'],
      impact: 'Development team confusion and potential rework',
      recommendation: 'Standardize on single framework and update documentation',
      icon: FileText,
      color: 'border-orange-500 bg-orange-500/10'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-500/20 text-red-300 border-red-500';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500';
      case 'Low': return 'bg-orange-500/20 text-orange-300 border-orange-500';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500';
    }
  };

  const contradictionStats = [
    { label: 'Total Contradictions', value: '4', color: 'text-red-400' },
    { label: 'High Severity', value: '1', color: 'text-red-400' },
    { label: 'Medium Severity', value: '2', color: 'text-yellow-400' },
    { label: 'Low Severity', value: '1', color: 'text-orange-400' }
  ];

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
          <Card key={contradiction.id} className={`bg-gray-700 border-2 ${contradiction.color}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <contradiction.icon className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{contradiction.title}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getSeverityColor(contradiction.severity)}`}>
                        {contradiction.severity} Priority
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

      {/* Resolution Actions */}
      <Card className="bg-gray-700 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Recommended Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium text-sm">Immediate Action Required</p>
                <p className="text-gray-300 text-sm">Resolve revenue projection discrepancy before budget finalization</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium text-sm">Schedule Review Meeting</p>
                <p className="text-gray-300 text-sm">Align timeline and target market definitions across teams</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium text-sm">Update Documentation</p>
                <p className="text-gray-300 text-sm">Standardize technical specifications and implementation guides</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContradictionsTab;
