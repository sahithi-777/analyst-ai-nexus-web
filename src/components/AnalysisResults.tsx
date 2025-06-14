
import React, { useState } from 'react';
import { FileText, Network, Clock, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SummaryTab from './analysis/SummaryTab';
import ConnectionsTab from './analysis/ConnectionsTab';
import TimelineTab from './analysis/TimelineTab';
import ContradictionsTab from './analysis/ContradictionsTab';

const AnalysisResults = () => {
  const [activeTab, setActiveTab] = useState('summary');

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Analysis Results</h3>
        <p className="text-gray-400">
          Comprehensive analysis of your uploaded documents
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-900 border-gray-700 grid w-full grid-cols-4">
          <TabsTrigger 
            value="summary"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all"
          >
            <FileText className="h-4 w-4 mr-2" />
            Summary
          </TabsTrigger>
          <TabsTrigger 
            value="connections"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all"
          >
            <Network className="h-4 w-4 mr-2" />
            Connections
          </TabsTrigger>
          <TabsTrigger 
            value="timeline"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all"
          >
            <Clock className="h-4 w-4 mr-2" />
            Timeline
          </TabsTrigger>
          <TabsTrigger 
            value="contradictions"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white transition-all"
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Contradictions
          </TabsTrigger>
        </TabsList>

        <div className="animate-fade-in">
          <TabsContent value="summary" className="space-y-6">
            <SummaryTab />
          </TabsContent>

          <TabsContent value="connections" className="space-y-6">
            <ConnectionsTab />
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <TimelineTab />
          </TabsContent>

          <TabsContent value="contradictions" className="space-y-6">
            <ContradictionsTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AnalysisResults;
