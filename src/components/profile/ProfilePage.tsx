
import React, { useState } from 'react';
import { User, Settings, Key, Shield, Bell, Download, Trash2, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    organization: 'Research Institute',
    title: 'Senior Researcher'
  });
  const [settings, setSettings] = useState({
    emailNotifications: true,
    documentAnalysis: true,
    autoSave: true,
    darkMode: true
  });
  const { toast } = useToast();

  const handleProfileSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Setting Updated",
      description: `${key} has been ${value ? 'enabled' : 'disabled'}.`,
    });
  };

  const exportData = () => {
    toast({
      title: "Data Export",
      description: "Your data export has been initiated. You'll receive an email when ready.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Profile & Settings</h1>
            <p className="text-gray-400 mt-1">Manage your account and preferences</p>
          </div>
          <Badge variant="outline" className="border-cyan-400 text-cyan-400">
            Pro Plan
          </Badge>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 border border-gray-700">
            <TabsTrigger value="profile" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">
              Profile
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">
              Settings
            </TabsTrigger>
            <TabsTrigger value="security" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">
              Security
            </TabsTrigger>
            <TabsTrigger value="data" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">
              Data & Privacy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-cyan-400" />
                    <span>Profile Information</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
                    <Input
                      id="fullName"
                      value={profile.fullName}
                      onChange={(e) => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
                      disabled={!isEditing}
                      className="bg-gray-700 border-gray-600 text-white disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <Input
                      id="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                      className="bg-gray-700 border-gray-600 text-white disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization" className="text-gray-300">Organization</Label>
                    <Input
                      id="organization"
                      value={profile.organization}
                      onChange={(e) => setProfile(prev => ({ ...prev, organization: e.target.value }))}
                      disabled={!isEditing}
                      className="bg-gray-700 border-gray-600 text-white disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-300">Job Title</Label>
                    <Input
                      id="title"
                      value={profile.title}
                      onChange={(e) => setProfile(prev => ({ ...prev, title: e.target.value }))}
                      disabled={!isEditing}
                      className="bg-gray-700 border-gray-600 text-white disabled:opacity-50"
                    />
                  </div>
                </div>
                {isEditing && (
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleProfileSave}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-cyan-400" />
                  <span>Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Email Notifications</Label>
                    <p className="text-gray-400 text-sm">Receive updates about your analysis and research</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Auto Document Analysis</Label>
                    <p className="text-gray-400 text-sm">Automatically analyze documents after upload</p>
                  </div>
                  <Switch
                    checked={settings.documentAnalysis}
                    onCheckedChange={(checked) => handleSettingChange('documentAnalysis', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Auto-Save</Label>
                    <p className="text-gray-400 text-sm">Automatically save your work and progress</p>
                  </div>
                  <Switch
                    checked={settings.autoSave}
                    onCheckedChange={(checked) => handleSettingChange('autoSave', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Dark Mode</Label>
                    <p className="text-gray-400 text-sm">Use dark theme for better visibility</p>
                  </div>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <div className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-cyan-400" />
                    <span>Security Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white font-medium">Password</Label>
                      <p className="text-gray-400 text-sm">Last changed 30 days ago</p>
                    </div>
                    <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                      Change Password
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white font-medium">Two-Factor Authentication</Label>
                      <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                      Enable 2FA
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Key className="h-5 w-5 text-cyan-400" />
                    <span>API Keys</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div>
                        <Label className="text-white font-medium">Anthropic API Key</Label>
                        <p className="text-gray-400 text-sm">Connected and active</p>
                      </div>
                      <Badge variant="outline" className="border-green-400 text-green-400">
                        Active
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="data" className="mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Download className="h-5 w-5 text-cyan-400" />
                  <span>Data Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Export Your Data</Label>
                    <p className="text-gray-400 text-sm">Download all your documents, analysis, and chat history</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={exportData}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>
                
                <div className="border-t border-gray-600 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-red-400 font-medium">Delete Account</Label>
                      <p className="text-gray-400 text-sm">Permanently delete your account and all associated data</p>
                    </div>
                    <Button
                      variant="destructive"
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
