
import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnalysisResult } from '@/utils/fileProcessor';

interface TimelineTabProps {
  timeline: AnalysisResult['timeline'];
}

const TimelineTab = ({ timeline }: TimelineTabProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'milestone': return Calendar;
      case 'event': return Calendar;
      case 'decision': return Calendar;
      case 'analysis': return Clock;
      default: return Calendar;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'milestone': return 'bg-blue-500';
      case 'event': return 'bg-green-500';
      case 'decision': return 'bg-purple-500';
      case 'analysis': return 'bg-cyan-500';
      default: return 'bg-gray-500';
    }
  };

  if (timeline.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="h-16 w-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">No Timeline Data</h3>
        <p className="text-gray-400">No chronological events were extracted from the documents.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Timeline Overview */}
      <Card className="bg-gray-700 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Clock className="h-5 w-5 mr-2 text-cyan-400" />
            Timeline Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{timeline.length}</div>
              <div className="text-gray-400 text-sm">Total Events</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {timeline.filter(t => t.type === 'milestone').length}
              </div>
              <div className="text-gray-400 text-sm">Milestones</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {timeline.filter(t => t.type === 'analysis').length}
              </div>
              <div className="text-gray-400 text-sm">Analysis Events</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Events */}
      <Card className="bg-gray-700 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Chronological Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-600"></div>
            
            <div className="space-y-6">
              {timeline.map((event, index) => {
                const IconComponent = getIcon(event.type);
                const typeColor = getTypeColor(event.type);
                
                return (
                  <div key={event.id} className="relative flex items-start">
                    {/* Timeline Dot */}
                    <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${typeColor} mr-4 flex-shrink-0`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    
                    {/* Event Content */}
                    <div className="flex-1 bg-gray-800 rounded-lg p-4">
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
                        <span className={`px-2 py-1 rounded-full text-xs text-white ${typeColor}`}>
                          {event.type}
                        </span>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-3">{event.description}</p>
                      
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
    </div>
  );
};

export default TimelineTab;
