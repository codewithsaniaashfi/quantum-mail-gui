import { useState } from "react";
import { X, Send, Paperclip, Shield, Lock, AlertTriangle, Zap, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const securityLevels = [
  { 
    value: "secure", 
    label: "Quantum AES", 
    icon: Shield, 
    description: "Quantum-enhanced AES encryption",
    keyId: "QK-7891",
    color: "text-green-400"
  },
  { 
    value: "medium", 
    label: "Quantum OTP", 
    icon: Lock, 
    description: "Quantum one-time pad encryption",
    keyId: "QK-5672",
    color: "text-yellow-400"
  },
  { 
    value: "pqc", 
    label: "PQC Protection", 
    icon: Zap, 
    description: "Post-Quantum Cryptography",
    keyId: "PQ-3456",
    color: "text-purple-400"
  },
  { 
    value: "insecure", 
    label: "No Quantum Security", 
    icon: AlertTriangle, 
    description: "Standard email security only",
    keyId: null,
    color: "text-red-400"
  },
];

export function ComposeModal({ isOpen, onClose }: ComposeModalProps) {
  const [securityLevel, setSecurityLevel] = useState("secure");
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [showCcBcc, setShowCcBcc] = useState(false);

  const selectedSecurity = securityLevels.find(level => level.value === securityLevel);

  const handleSend = () => {
    // Handle send logic here
    console.log("Sending email with security level:", securityLevel);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] bg-card border-border/50 p-0">
        <DialogHeader className="p-6 border-b border-border/50">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Compose Secure Email</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Security Level Selector */}
          <div className="mt-4 space-y-3">
            <label className="text-sm font-medium">Security Level</label>
            <Select value={securityLevel} onValueChange={setSecurityLevel}>
              <SelectTrigger className="bg-background/50 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border/50">
                {securityLevels.map((level) => {
                  const IconComponent = level.icon;
                  return (
                    <SelectItem key={level.value} value={level.value}>
                      <div className="flex items-center gap-3">
                        <IconComponent className={cn("w-4 h-4", level.color)} />
                        <div>
                          <p className="font-medium">{level.label}</p>
                          <p className="text-xs text-muted-foreground">{level.description}</p>
                        </div>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            
            {/* Security Status */}
            {selectedSecurity && (
              <div className={cn(
                "flex items-center gap-3 p-3 rounded-lg border",
                selectedSecurity.value === "secure" && "border-green-500/30 bg-green-500/10",
                selectedSecurity.value === "medium" && "border-yellow-500/30 bg-yellow-500/10",
                selectedSecurity.value === "pqc" && "border-purple-500/30 bg-purple-500/10",
                selectedSecurity.value === "insecure" && "border-red-500/30 bg-red-500/10"
              )}>
                <selectedSecurity.icon className={cn("w-5 h-5", selectedSecurity.color)} />
                <div className="flex-1">
                  <p className={cn("font-medium text-sm", selectedSecurity.color)}>
                    {selectedSecurity.label} Enabled
                  </p>
                  <p className="text-xs text-muted-foreground">{selectedSecurity.description}</p>
                </div>
                {selectedSecurity.keyId && (
                  <Badge variant="outline" className="text-xs">
                    <Key className="w-3 h-3 mr-1" />
                    {selectedSecurity.keyId}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Email Form */}
          <div className="p-6 space-y-4">
            {/* To Field */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium w-12">To:</label>
                <Input
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="recipient@example.com"
                  className="flex-1 bg-background/50 border-border/50 focus:border-primary/50"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCcBcc(!showCcBcc)}
                  className="text-xs"
                >
                  Cc/Bcc
                </Button>
              </div>
            </div>

            {/* CC/BCC Fields */}
            {showCcBcc && (
              <div className="space-y-2 ml-14">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium w-12">Cc:</label>
                  <Input
                    value={cc}
                    onChange={(e) => setCc(e.target.value)}
                    placeholder="cc@example.com"
                    className="flex-1 bg-background/50 border-border/50"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium w-12">Bcc:</label>
                  <Input
                    value={bcc}
                    onChange={(e) => setBcc(e.target.value)}
                    placeholder="bcc@example.com"
                    className="flex-1 bg-background/50 border-border/50"
                  />
                </div>
              </div>
            )}

            {/* Subject Field */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium w-12">Subject:</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject..."
                className="flex-1 bg-background/50 border-border/50 focus:border-primary/50"
              />
            </div>
          </div>

          {/* Message Body */}
          <div className="flex-1 px-6 pb-6">
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Compose your secure message..."
              className="h-full min-h-[200px] bg-background/50 border-border/50 focus:border-primary/50 resize-none"
            />
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Paperclip className="w-4 h-4 mr-2" />
                  Attach Files
                </Button>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSend}
                  className={cn(
                    "font-medium",
                    securityLevel === "secure" && "btn-secure",
                    securityLevel === "medium" && "btn-warning",
                    securityLevel === "pqc" && "bg-gradient-to-r from-purple-500 to-violet-500 text-white hover:shadow-[0_0_15px_hsl(280_60%_65%/0.4)]",
                    securityLevel === "insecure" && "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                  )}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Secure Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}