import { useState } from "react";
import { 
  User, 
  Shield, 
  Key, 
  Bell, 
  Database, 
  Clock, 
  Mail, 
  Save,
  RefreshCw,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SettingsPage() {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState("5");
  const [defaultSecurity, setDefaultSecurity] = useState("secure");
  const [notifications, setNotifications] = useState(true);
  const [fallbackToPQC, setFallbackToPQC] = useState(true);

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your QuMail preferences and security settings</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="quantum-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  User Profile
                </CardTitle>
                <CardDescription>
                  Manage your personal information and account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input defaultValue="John Doe" className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input defaultValue="john.doe@company.com" className="bg-background/50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Organization</label>
                  <Input defaultValue="Quantum Security Corp" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Title</label>
                  <Input defaultValue="Security Engineer" className="bg-background/50" />
                </div>
                <Button className="btn-quantum">
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card className="quantum-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security Preferences
                  </CardTitle>
                  <CardDescription>
                    Configure your default encryption and security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Default Encryption Level</label>
                    <Select value={defaultSecurity} onValueChange={setDefaultSecurity}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="secure">🔒 Quantum AES (Recommended)</SelectItem>
                        <SelectItem value="medium">🔑 Quantum OTP</SelectItem>
                        <SelectItem value="pqc">🧩 PQC Protection</SelectItem>
                        <SelectItem value="insecure">✉ No Quantum Security</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Auto-refresh Quantum Keys</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically refresh encryption keys at regular intervals
                      </p>
                    </div>
                    <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
                  </div>

                  {autoRefresh && (
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Refresh Interval</label>
                      <Select value={refreshInterval} onValueChange={setRefreshInterval}>
                        <SelectTrigger className="bg-background/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Every 1 minute</SelectItem>
                          <SelectItem value="5">Every 5 minutes</SelectItem>
                          <SelectItem value="15">Every 15 minutes</SelectItem>
                          <SelectItem value="60">Every hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Fallback to PQC</h4>
                      <p className="text-sm text-muted-foreground">
                        Use Post-Quantum Cryptography when quantum keys are unavailable
                      </p>
                    </div>
                    <Switch checked={fallbackToPQC} onCheckedChange={setFallbackToPQC} />
                  </div>
                </CardContent>
              </Card>

              <Card className="quantum-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    Key Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <h4 className="font-medium text-green-400">Active Keys</h4>
                      <p className="text-2xl font-bold text-green-400">2,847</p>
                    </div>
                    <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <h4 className="font-medium text-blue-400">Generated Today</h4>
                      <p className="text-2xl font-bold text-blue-400">156</p>
                    </div>
                    <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <h4 className="font-medium text-purple-400">Key Strength</h4>
                      <p className="text-2xl font-bold text-purple-400">94%</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate All Keys
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <Card className="quantum-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Email Provider Integrations
                </CardTitle>
                <CardDescription>
                  Connect your existing email accounts for quantum-secured communication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {[
                    { name: "Gmail", connected: true, status: "Quantum Secure" },
                    { name: "Yahoo Mail", connected: false, status: "Not Connected" },
                    { name: "Outlook", connected: true, status: "PQC Protected" },
                    { name: "ProtonMail", connected: false, status: "Not Connected" }
                  ].map((provider) => (
                    <div key={provider.name} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-muted/30 rounded-lg flex items-center justify-center">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{provider.name}</h4>
                          <p className="text-sm text-muted-foreground">{provider.status}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {provider.connected && (
                          <Badge className="badge-secure">Connected</Badge>
                        )}
                        <Button variant={provider.connected ? "outline" : "default"} size="sm">
                          {provider.connected ? "Configure" : "Connect"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="quantum-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Configure how and when you receive security and email notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Security Alerts</h4>
                    <p className="text-sm text-muted-foreground">
                      Get notified about security threats and key issues
                    </p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for new secure emails
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Key Refresh Alerts</h4>
                    <p className="text-sm text-muted-foreground">
                      Notify when quantum keys are refreshed
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">System Updates</h4>
                    <p className="text-sm text-muted-foreground">
                      Get updates about QuMail features and security improvements
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced">
            <div className="space-y-6">
              <Card className="quantum-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Advanced Settings
                  </CardTitle>
                  <CardDescription>
                    Advanced configuration options for power users
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Debug Mode</h4>
                      <p className="text-sm text-muted-foreground">
                        Enable detailed logging for troubleshooting
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Experimental Features</h4>
                      <p className="text-sm text-muted-foreground">
                        Enable beta features and experimental quantum algorithms
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">API Endpoint</label>
                    <Input 
                      defaultValue="https://api.qumail.quantum" 
                      className="bg-background/50 font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Quantum Server</label>
                    <Input 
                      defaultValue="wss://quantum.qumail.secure" 
                      className="bg-background/50 font-mono text-sm"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-500/20 bg-red-500/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-400">
                    <AlertTriangle className="w-5 h-5" />
                    Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="destructive" size="sm">
                    Reset All Quantum Keys
                  </Button>
                  <Button variant="destructive" size="sm">
                    Clear All Local Data
                  </Button>
                  <Button variant="destructive" size="sm">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}