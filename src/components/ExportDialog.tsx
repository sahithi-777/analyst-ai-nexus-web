
import React, { useState } from 'react';
import { X, Download, Share, FileText, Database, Code, Mail, Link, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExportDialog = ({ isOpen, onClose }: ExportDialogProps) => {
  const [shareUrl, setShareUrl] = useState('https://app.example.com/shared/abc123');
  const [copied, setCopied] = useState(false);
  const [includeRawData, setIncludeRawData] = useState(true);
  const [includeCharts, setIncludeCharts] = useState(true);
  const { toast } = useToast();

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "Share URL copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy the URL manually",
        variant: "destructive"
      });
    }
  };

  const handleExport = (format: string) => {
    toast({
      title: "Export Started",
      description: `Your ${format} export is being generated and will download shortly.`,
    });
    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `Your ${format} file has been downloaded.`,
      });
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] bg-gray-900 border-gray-800">
        <DialogHeader className="border-b border-gray-800 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white text-xl">Export & Share</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="export" className="mt-4">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="export" className="data-[state=active]:bg-gray-700">
              <Download className="h-4 w-4 mr-2" />
              Export
            </TabsTrigger>
            <TabsTrigger value="share" className="data-[state=active]:bg-gray-700">
              <Share className="h-4 w-4 mr-2" />
              Share
            </TabsTrigger>
            <TabsTrigger value="email" className="data-[state=active]:bg-gray-700">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </TabsTrigger>
          </TabsList>

          <TabsContent value="export" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors cursor-pointer">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-red-400" />
                    PDF Report
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-xs mb-3">Complete analysis with charts and insights</p>
                  <Button 
                    onClick={() => handleExport('PDF')}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors cursor-pointer">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm flex items-center">
                    <Database className="h-5 w-5 mr-2 text-green-400" />
                    CSV Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-xs mb-3">Raw data for further analysis</p>
                  <Button 
                    onClick={() => handleExport('CSV')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download CSV
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors cursor-pointer">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm flex items-center">
                    <Code className="h-5 w-5 mr-2 text-blue-400" />
                    JSON API
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-xs mb-3">Structured data for developers</p>
                  <Button 
                    onClick={() => handleExport('JSON')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download JSON
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-sm">Export Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-raw" className="text-gray-300">
                    Include Raw Data
                  </Label>
                  <Switch
                    id="include-raw"
                    checked={includeRawData}
                    onCheckedChange={setIncludeRawData}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-charts" className="text-gray-300">
                    Include Charts & Visualizations
                  </Label>
                  <Switch
                    id="include-charts"
                    checked={includeCharts}
                    onCheckedChange={setIncludeCharts}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="share" className="space-y-6 mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Link className="h-5 w-5 mr-2" />
                  Public Share Link
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={shareUrl}
                    readOnly
                    className="bg-gray-700 border-gray-600 text-white flex-1"
                  />
                  <Button
                    onClick={handleCopyUrl}
                    variant="outline"
                    className="border-gray-600 text-gray-300"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-gray-400 text-sm">
                  Anyone with this link can view your analysis results (read-only)
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="space-y-6 mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Email Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Recipients</Label>
                  <Input
                    placeholder="Enter email addresses separated by commas"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Subject</Label>
                  <Input
                    defaultValue="Research Analysis Results"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Message</Label>
                  <Textarea
                    placeholder="Add a personal message..."
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;
