
import React, { useState } from 'react';
import { X, Moon, Sun, Bell, BellOff, User, CreditCard, HelpCircle, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel = ({ isOpen, onClose }: SettingsPanelProps) => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [analysisDepth, setAnalysisDepth] = useState('standard');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-gray-900 border-gray-800">
        <DialogHeader className="border-b border-gray-800 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white text-xl">Settings</DialogTitle>
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

        <Tabs defaultValue="preferences" className="mt-4">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="preferences" className="data-[state=active]:bg-gray-700">
              Preferences
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-gray-700">
              Analysis
            </TabsTrigger>
            <TabsTrigger value="account" className="data-[state=active]:bg-gray-700">
              Account
            </TabsTrigger>
            <TabsTrigger value="help" className="data-[state=active]:bg-gray-700">
              Help
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preferences" className="space-y-6 mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Sun className="h-5 w-5 mr-2" />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode" className="text-gray-300">
                    Dark Mode
                  </Label>
                  <Switch
                    id="dark-mode"
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications" className="text-gray-300">
                    Push Notifications
                  </Label>
                  <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications" className="text-gray-300">
                    Email Notifications
                  </Label>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6 mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Analysis Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Analysis Depth</Label>
                  <Select value={analysisDepth} onValueChange={setAnalysisDepth}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="quick">Quick Analysis</SelectItem>
                      <SelectItem value="standard">Standard Analysis</SelectItem>
                      <SelectItem value="deep">Deep Analysis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Focus Areas</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Themes', 'Contradictions', 'Connections', 'Insights', 'Trends', 'Gaps'].map((area) => (
                      <div key={area} className="flex items-center space-x-2">
                        <Switch id={area.toLowerCase()} defaultChecked />
                        <Label htmlFor={area.toLowerCase()} className="text-gray-300 text-sm">
                          {area}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6 mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Full Name</Label>
                  <Input 
                    defaultValue="Demo User" 
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Email</Label>
                  <Input 
                    defaultValue="demo@example.com" 
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Bio</Label>
                  <Textarea 
                    placeholder="Tell us about yourself..."
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Subscription
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Pro Plan</p>
                    <p className="text-gray-400 text-sm">Unlimited documents and analyses</p>
                  </div>
                  <Button variant="outline" className="border-gray-600 text-gray-300">
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="help" className="space-y-6 mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Help & Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="border-gray-600 text-gray-300 justify-start h-auto p-4">
                    <BookOpen className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">User Guide</p>
                      <p className="text-sm text-gray-400">Learn how to use the platform</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 justify-start h-auto p-4">
                    <HelpCircle className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">FAQ</p>
                      <p className="text-sm text-gray-400">Common questions and answers</p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Keyboard Shortcuts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">New Project</span>
                      <code className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">Ctrl + N</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Upload Files</span>
                      <code className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">Ctrl + U</code>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Search</span>
                      <code className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">Ctrl + K</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Settings</span>
                      <code className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">Ctrl + ,</code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsPanel;
