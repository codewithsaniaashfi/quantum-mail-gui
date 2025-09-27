import { useState } from "react";
import { Activity, Mail, Key, Shield, User, Clock, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface ActivityLog {
  id: string;
  type: "email" | "key" | "security" | "login" | "settings";
  action: string;
  description: string;
  timestamp: string;
  user: string;
  details?: string;
  ipAddress?: string;
  status: "success" | "failed" | "warning";
}

const mockLogs: ActivityLog[] = [
  {
    id: "1",
    type: "email",
    action: "Email Sent",
    description: "Sent quantum-encrypted email to alice.johnson@company.com",
    timestamp: "2024-01-15 10:32:45",
    user: "john.doe@company.com",
    details: "Subject: Quarterly Security Report | Encryption: Quantum AES",
    status: "success"
  },
  {
    id: "2",
    type: "key",
    action: "Key Generated",
    description: "Generated new quantum key QK-7891",
    timestamp: "2024-01-15 10:30:12",
    user: "system",
    details: "Algorithm: AES-256 | Strength: 98%",
    status: "success"
  },
  {
    id: "3",
    type: "security",
    action: "Threat Blocked",
    description: "Blocked unauthorized access attempt",
    timestamp: "2024-01-15 09:45:23",
    user: "security-system",
    details: "Source IP: 192.168.1.100 | Attack Type: Brute Force",
    ipAddress: "192.168.1.100",
    status: "success"
  },
  {
    id: "4",
    type: "login",
    action: "Login Successful",
    description: "User authenticated with quantum security level 2",
    timestamp: "2024-01-15 09:15:34",
    user: "john.doe@company.com",
    details: "Security Level: Quantum AES | 2FA: Enabled",
    ipAddress: "192.168.1.50",
    status: "success"
  },
  {
    id: "5",
    type: "email",
    action: "Email Decrypted",
    description: "Decrypted incoming email from alice.johnson@company.com",
    timestamp: "2024-01-15 09:10:15",
    user: "john.doe@company.com",
    details: "Key Used: QK-5672 | Decryption Time: 0.023s",
    status: "success"
  },
  {
    id: "6",
    type: "key",
    action: "Key Expired",
    description: "Quantum key QK-2134 expired and marked for renewal",
    timestamp: "2024-01-15 08:30:00",
    user: "system",
    details: "Key Age: 72 hours | Usage Count: 2,156",
    status: "warning"
  },
  {
    id: "7",
    type: "settings",
    action: "Settings Updated",
    description: "Modified auto-refresh interval for quantum keys",
    timestamp: "2024-01-15 08:15:22",
    user: "john.doe@company.com",
    details: "Changed from 15 minutes to 5 minutes",
    status: "success"
  },
  {
    id: "8",
    type: "login",
    action: "Login Failed",
    description: "Failed login attempt with invalid credentials",
    timestamp: "2024-01-15 07:45:11",
    user: "unknown",
    details: "Reason: Invalid password | Attempts: 3",
    ipAddress: "192.168.1.101",
    status: "failed"
  }
];

const activityTypes = [
  { value: "all", label: "All Activities" },
  { value: "email", label: "Email Activities" },
  { value: "key", label: "Key Management" },
  { value: "security", label: "Security Events" },
  { value: "login", label: "Authentication" },
  { value: "settings", label: "Settings Changes" }
];

export function ActivityLogPage() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedUser, setSelectedUser] = useState("all");

  const filteredLogs = mockLogs.filter(log => {
    if (selectedType !== "all" && log.type !== selectedType) return false;
    if (selectedUser !== "all" && log.user !== selectedUser) return false;
    return true;
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "email": return Mail;
      case "key": return Key;
      case "security": return Shield;
      case "login": return User;
      case "settings": return Activity;
      default: return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "email": return "text-blue-400";
      case "key": return "text-green-400";
      case "security": return "text-red-400";
      case "login": return "text-purple-400";
      case "settings": return "text-yellow-400";
      default: return "text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "failed": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "warning": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const uniqueUsers = [...new Set(mockLogs.map(log => log.user))];

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold mb-2">Activity Log</h1>
          <p className="text-muted-foreground">Comprehensive audit trail of all system activities</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="quantum-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Emails Today</p>
                  <p className="text-2xl font-bold text-blue-400">47</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="quantum-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Key className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Keys Generated</p>
                  <p className="text-2xl font-bold text-green-400">156</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="quantum-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Threats Blocked</p>
                  <p className="text-2xl font-bold text-red-400">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="quantum-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Logins Today</p>
                  <p className="text-2xl font-bold text-purple-400">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="quantum-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <div className="flex gap-4 flex-1">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Activity Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-48 bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {activityTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">User</label>
                  <Select value={selectedUser} onValueChange={setSelectedUser}>
                    <SelectTrigger className="w-48 bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      {uniqueUsers.map((user) => (
                        <SelectItem key={user} value={user}>
                          {user}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button variant="outline">
                Export Log
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Activity Log */}
        <Card className="quantum-card">
          <CardHeader>
            <CardTitle>Activity Timeline</CardTitle>
            <CardDescription>
              Showing {filteredLogs.length} of {mockLogs.length} activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredLogs.map((log) => {
                const ActivityIcon = getActivityIcon(log.type);
                return (
                  <div
                    key={log.id}
                    className="flex items-start gap-4 p-4 border border-border/50 rounded-lg hover:bg-muted/20 transition-colors"
                  >
                    {/* Icon */}
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                      log.type === "email" && "bg-blue-500/10",
                      log.type === "key" && "bg-green-500/10",
                      log.type === "security" && "bg-red-500/10",
                      log.type === "login" && "bg-purple-500/10",
                      log.type === "settings" && "bg-yellow-500/10"
                    )}>
                      <ActivityIcon className={cn("w-5 h-5", getActivityColor(log.type))} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{log.action}</h4>
                        <Badge 
                          variant="outline" 
                          className={cn("text-xs capitalize", getStatusColor(log.status))}
                        >
                          {log.status}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {log.timestamp}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{log.description}</p>
                      
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p><span className="font-medium">User:</span> {log.user}</p>
                        {log.details && <p><span className="font-medium">Details:</span> {log.details}</p>}
                        {log.ipAddress && <p><span className="font-medium">IP Address:</span> {log.ipAddress}</p>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}