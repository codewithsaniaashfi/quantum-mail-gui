import { useState } from "react";
import { Shield, AlertTriangle, CheckCircle, XCircle, Activity, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface SecurityEvent {
  id: string;
  type: "threat" | "success" | "warning" | "info";
  title: string;
  description: string;
  timestamp: string;
  severity: "low" | "medium" | "high" | "critical";
}

const mockEvents: SecurityEvent[] = [
  {
    id: "1",
    type: "success",
    title: "Quantum Key Refresh Completed",
    description: "Successfully generated and distributed 156 new quantum keys across all endpoints",
    timestamp: "2 mins ago",
    severity: "low"
  },
  {
    id: "2",
    type: "warning",
    title: "Key Strength Below Threshold",
    description: "Key QK-2134 strength dropped to 78%. Consider regeneration.",
    timestamp: "15 mins ago",
    severity: "medium"
  },
  {
    id: "3",
    type: "threat",
    title: "Unauthorized Access Attempt Blocked",
    description: "Detected and blocked suspicious login attempt from IP 192.168.1.100",
    timestamp: "1 hour ago",
    severity: "high"
  },
  {
    id: "4",
    type: "info",
    title: "System Health Check",
    description: "All quantum systems operating within normal parameters",
    timestamp: "2 hours ago",
    severity: "low"
  },
  {
    id: "5",
    type: "threat",
    title: "Potential Quantum Attack Detected",
    description: "Advanced threat detection identified possible quantum cryptanalysis attempt",
    timestamp: "4 hours ago",
    severity: "critical"
  }
];

const systemMetrics = [
  { name: "Quantum Entropy Pool", value: 94, status: "excellent" },
  { name: "Key Distribution Network", value: 87, status: "good" },
  { name: "Encryption Algorithms", value: 98, status: "excellent" },
  { name: "Threat Detection", value: 91, status: "good" },
  { name: "Network Security", value: 85, status: "warning" },
  { name: "Authentication Systems", value: 96, status: "excellent" }
];

export function SecurityMonitorPage() {
  const [isScanning, setIsScanning] = useState(false);

  const handleSecurityScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "threat": return XCircle;
      case "success": return CheckCircle;
      case "warning": return AlertTriangle;
      case "info": return Activity;
      default: return Activity;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "threat": return "text-red-400";
      case "success": return "text-green-400";
      case "warning": return "text-yellow-400";
      case "info": return "text-blue-400";
      default: return "text-muted-foreground";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "high": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const getMetricColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-green-400";
      case "good": return "text-blue-400";
      case "warning": return "text-yellow-400";
      case "critical": return "text-red-400";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Security Monitor</h1>
            <p className="text-muted-foreground">Real-time quantum security monitoring and threat detection</p>
          </div>
          <Button
            onClick={handleSecurityScan}
            disabled={isScanning}
            className="btn-quantum"
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 mr-2" />
                Run Security Scan
              </>
            )}
          </Button>
        </div>

        {/* Overall Security Status */}
        <Card className="quantum-card border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-400">SECURE</h3>
                  <p className="text-muted-foreground">All quantum systems operational</p>
                  <p className="text-sm text-muted-foreground">Last scan: 2 minutes ago</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-400">92%</div>
                <p className="text-sm text-muted-foreground">Security Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Metrics */}
        <Card className="quantum-card">
          <CardHeader>
            <CardTitle>System Health Metrics</CardTitle>
            <CardDescription>
              Real-time performance indicators for all security systems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {systemMetrics.map((metric, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{metric.name}</h4>
                    <span className={cn("text-sm font-medium", getMetricColor(metric.status))}>
                      {metric.value}%
                    </span>
                  </div>
                  <Progress 
                    value={metric.value} 
                    className={cn(
                      "h-2",
                      metric.status === "excellent" ? "[&>div]:bg-green-500" :
                      metric.status === "good" ? "[&>div]:bg-blue-500" :
                      metric.status === "warning" ? "[&>div]:bg-yellow-500" : "[&>div]:bg-red-500"
                    )}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Scanning */}
        {isScanning && (
          <Card className="quantum-card border-primary/30">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-primary animate-spin" />
                  <h4 className="font-medium text-primary">Deep Security Scan in Progress</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Scanning quantum key integrity...</span>
                    <span className="text-primary">73%</span>
                  </div>
                  <Progress value={73} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Analyzing 2,847 active keys and 156 recent transactions...
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Events */}
        <Card className="quantum-card">
          <CardHeader>
            <CardTitle>Recent Security Events</CardTitle>
            <CardDescription>
              Latest security alerts, threats, and system notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockEvents.map((event) => {
                const EventIcon = getEventIcon(event.type);
                return (
                  <div
                    key={event.id}
                    className="flex items-start gap-4 p-4 border border-border/50 rounded-lg hover:bg-muted/20 transition-colors"
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                      event.type === "threat" && "bg-red-500/10",
                      event.type === "success" && "bg-green-500/10",
                      event.type === "warning" && "bg-yellow-500/10",
                      event.type === "info" && "bg-blue-500/10"
                    )}>
                      <EventIcon className={cn("w-5 h-5", getEventColor(event.type))} />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{event.title}</h4>
                        <Badge 
                          variant="outline" 
                          className={cn("text-xs", getSeverityColor(event.severity))}
                        >
                          {event.severity.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>

                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
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