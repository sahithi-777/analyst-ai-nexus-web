
import React from 'react';
import { Calendar, Clock, TrendingUp, FileText, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TimelineTab = () => {
  const timelineEvents = [
    {
      date: '2024-01-15',
      title: 'Market Research Initiative Launched',
      description: 'Comprehensive market analysis project initiated with stakeholder alignment',
      type: 'milestone',
      documents: ['Market Research Plan', 'Stakeholder Analysis'],
      color: 'bg-blue-500'
    },
    {
      date: '2024-02-28',
      title: 'Technology Assessment Completed',
      description: 'Technical evaluation of AI frameworks and implementation feasibility',
      type: 'deliverable',
      documents: ['Technology Assessment Report', 'Technical Specifications'],
      color: 'bg-green-500'
    },
    {
      date: '2024-03-15',
      title: 'Competitive Analysis Released',
      description: 'Detailed analysis of market competitors and positioning strategies',
      type: 'analysis',
      documents: ['Competitive Landscape Report', 'SWOT Analysis'],
      color: 'bg-purple-500'
    },
    {
      date: '2024-04-10',
      title: 'Financial Projections Updated',
      description: 'Revenue forecasts and budget allocations revised based on market data',
      type: 'financial',
      documents: ['Financial Model v2.0', 'Budget Allocation Plan'],
      color: 'bg-yellow-500'
    },
    {
      date: '2024-05-20',
      title: 'Strategic Roadmap Defined',
      description: 'Long-term strategic plan established with key milestones and objectives',
      type: 'strategy',
      documents: ['Strategic Roadmap', 'Implementation Timeline'],
      color: 'bg-cyan-500'
    },
    {
      date: '2024-06-14',
      title: 'Current Analysis Period',
      description: 'Ongoing analysis and synthesis of all research components',
      type: 'current',
      documents: ['Analysis Summary', 'Interim Findings'],
      color: 'bg-red-500'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'milestone': return Calendar;
      case 'deliverable': return FileText;
      case 'analysis': return TrendingUp;
      case 'financial': return TrendingUp;
      case 'strategy': return Users;
      case 'current': return Clock;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      {/* Timeline Overview */}
      <Card className="bg-gray-700 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Clock className="h-5 w-5 mr-2 text-cyan-400" />
            Project Timeline Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">5 months</div>
              <div className="text-gray-400 text-sm">Project Duration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-gray-400 text-sm">Documents Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">6</div>
              <div className="text-gray-400 text-sm">Major Milestones</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Events */}
      <Card className="bg-gray-700 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Chronological Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-600"></div>
            
            <div className="space-y-6">
              {timelineEvents.map((event, index) => {
                const IconComponent = getIcon(event.type);
                return (
                  <div key={index} className="relative flex items-start">
                    {/* Timeline Dot */}
                    <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${event.color} mr-4 flex-shrink-0`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    
                    {/* Event Content */}
                    <div className="flex-1 bg-gray-800 rounded-lg p-4 min-h-[120px]">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-white font-semibold">{event.title}</h3>
                          <p className="text-gray-400 text-sm flex items-center mt-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(event.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs text-white ${event.color}`}>
                          {event.type}
                        </span>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-3">
                        {event.description}
                      </p>
                      
                      <div className="space-y-2">
                        <p className="text-gray-400 text-xs font-medium">Related Documents:</p>
                        <div className="flex flex-wrap gap-2">
                          {event.documents.map((doc, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                              {doc}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Statistics */}
      <Card className="bg-gray-700 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Timeline Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Activity Distribution</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Research & Analysis</span>
                  <span className="text-white text-sm">40%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div className="space-y-2 mt-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Strategy Development</span>
                  <span className="text-white text-sm">35%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div className="space-y-2 mt-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Documentation</span>
                  <span className="text-white text-sm">25%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">Key Observations</h4>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <p className="text-gray-300 text-sm">
                    Consistent monthly deliverable schedule maintained
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <p className="text-gray-300 text-sm">
                    Strategic pivot occurred in March based on market analysis
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <p className="text-gray-300 text-sm">
                    Financial projections updated to reflect market realities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimelineTab;
