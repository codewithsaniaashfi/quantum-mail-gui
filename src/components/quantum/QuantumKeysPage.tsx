import { useState } from "react";
import { Key, RefreshCw, Shield, Zap, Activity, Download, Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface QuantumKey {
  id: string;
  keyId: string;
  algorithm: "AES-256" | "OTP" | "Kyber" | "Dilithium";
  strength: number;
  created: string;
  lastUsed: string;
  status: "active" | "expired" | "compromised";
  usageCount: number;
}

const mockKeys: QuantumKey[] = [
  {
    id: "1",
    keyId: "QK-7891",
    algorithm: "AES-256",
    strength: 98,
    created: "2024-01-15 10:30",
    lastUsed: "2 mins ago",
    status: "active",
    usageCount: 1247
  },
  {
    id: "2",
    keyId: "QK-5672",
    algorithm: "OTP",
    strength: 95,
    created: "2024-01-15 09:15",
    lastUsed: "15 mins ago",
    status: "active",
    usageCount: 892
  },
  {
    id: "3",
    keyId: "PQ-3456",
    algorithm: "Kyber",
    strength: 92,
    created: "2024-01-14 16:45",
    lastUsed: "1 hour ago",
    status: "active",
    usageCount: 456
  },
  {
    id: "4",
    keyId: "QK-2134",
    algorithm: "AES-256",
    strength: 78,
    created: "2024-01-13 14:20",
    lastUsed: "6 hours ago",
    status: "expired",
    usageCount: 2156
  },
  {
    id: "5",
    keyId: "PQ-8765",
    algorithm: "Dilithium",
    strength: 88,
    created: "2024-01-12 11:30",
    lastUsed: "12 hours ago",
    status: "active",
    usageCount: 334
  }
];

const algorithmConfig = {
  "AES-256": { color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
  "OTP": { color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
  "Kyber": { color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  "Dilithium": { color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
};

export function QuantumKeysPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredKeys = mockKeys.filter(key =>
    key.keyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    key.algorithm.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGenerateKeys = async () => {
    setIsGenerating(true);
    // Simulate key generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-400";
      case "expired": return "text-yellow-400";
      case "compromised": return "text-red-400";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold mb-2">Quantum Key Management</h1>
          <p className="text-muted-foreground">Monitor and manage your quantum encryption keys</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="quantum-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Key className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Keys</p>
                  <p className="text-2xl font-bold text-green-400">2,847</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="quantum-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Generated Today</p>
                  <p className="text-2xl font-bold text-blue-400">156</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="quantum-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Strength</p>
                  <p className="text-2xl font-bold text-purple-400">94%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="quantum-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Usage Rate</p>
                  <p className="text-2xl font-bold text-yellow-400">87%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search keys by ID or algorithm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-background/50 border-border/50"
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleGenerateKeys}
              disabled={isGenerating}
              className="btn-quantum"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Key className="w-4 h-4 mr-2" />
                  Generate New Keys
                </>
              )}
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Keys
            </Button>
          </div>
        </div>

        {/* Generation Progress */}
        {isGenerating && (
          <Card className="quantum-card border-primary/30">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-primary">Generating Quantum Keys...</h4>
                  <span className="text-sm text-primary">67%</span>
                </div>
                <Progress value={67} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Quantum entropy collection in progress... ETA: 2 minutes
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Keys Table */}
        <Card className="quantum-card">
          <CardHeader>
            <CardTitle>Quantum Keys</CardTitle>
            <CardDescription>
              Detailed view of all quantum encryption keys
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredKeys.map((key) => {
                const config = algorithmConfig[key.algorithm];
                return (
                  <div
                    key={key.id}
                    className="flex items-center gap-4 p-4 border border-border/50 rounded-lg hover:bg-muted/20 transition-colors"
                  >
                    {/* Key Icon */}
                    <div className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center",
                      config.bg, config.border, "border"
                    )}>
                      <Key className={cn("w-6 h-6", config.color)} />
                    </div>

                    {/* Key Info */}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-mono font-medium">{key.keyId}</h4>
                        <Badge className={cn("text-xs", config.color, config.bg, config.border, "border")}>
                          {key.algorithm}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={cn("text-xs", getStatusColor(key.status))}
                        >
                          {key.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <span>Created: {key.created}</span>
                        <span>Last used: {key.lastUsed}</span>
                        <span>Usage: {key.usageCount.toLocaleString()}</span>
                        <span>Strength: {key.strength}%</span>
                      </div>
                    </div>

                    {/* Strength Bar */}
                    <div className="w-24 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Strength</span>
                        <span className={cn(
                          key.strength >= 90 ? "text-green-400" :
                          key.strength >= 80 ? "text-yellow-400" : "text-red-400"
                        )}>
                          {key.strength}%
                        </span>
                      </div>
                      <Progress 
                        value={key.strength} 
                        className={cn(
                          "h-2",
                          key.strength >= 90 ? "[&>div]:bg-green-500" :
                          key.strength >= 80 ? "[&>div]:bg-yellow-500" : "[&>div]:bg-red-500"
                        )}
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      {key.status === "expired" && (
                        <Button variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
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