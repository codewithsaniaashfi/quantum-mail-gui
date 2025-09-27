import { useState } from "react";
import { 
  Reply, 
  ReplyAll, 
  Forward, 
  MoreHorizontal, 
  Shield, 
  Lock, 
  AlertTriangle, 
  Zap,
  Download,
  Key
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EmailViewerProps {
  emailId: string | null;
}

const mockEmailContent = {
  "1": {
    sender: "Alice Johnson",
    email: "alice.johnson@company.com",
    subject: "Quarterly Security Report",
    time: "Today at 10:30 AM",
    securityLevel: "secure" as const,
    keyId: "QK-7891",
    content: `
      <div class="space-y-4">
        <p>Hi Team,</p>
        <p>I'm pleased to share our quarterly security report. The quantum key distribution metrics show excellent performance across all sectors.</p>
        <div class="bg-green-500/10 border border-green-500/20 rounded-lg p-4 my-4">
          <h4 class="font-semibold text-green-400 mb-2">Security Highlights:</h4>
          <ul class="space-y-1 text-sm">
            <li>• 99.97% uptime for quantum key generation</li>
            <li>• Zero security breaches detected</li>
            <li>• 2.8M keys distributed successfully</li>
          </ul>
        </div>
        <p>The attached detailed report contains all metrics and recommendations for the next quarter.</p>
        <p>Best regards,<br/>Alice Johnson<br/>Chief Security Officer</p>
      </div>
    `,
    attachments: [
      { name: "Q4_Security_Report.pdf", size: "2.4 MB", type: "pdf" },
      { name: "Key_Metrics.xlsx", size: "847 KB", type: "excel" }
    ]
  }
};

const securityConfig = {
  secure: {
    icon: Shield,
    label: "Encrypted with Quantum AES",
    description: "This message is protected with quantum-enhanced AES encryption",
    className: "border-green-500/30 bg-green-500/10 text-green-400",
  },
  medium: {
    icon: Lock,
    label: "Quantum OTP Protection",
    description: "Secured with quantum one-time pad encryption",
    className: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
  },
  insecure: {
    icon: AlertTriangle,
    label: "No Quantum Security",
    description: "This message is not quantum encrypted",
    className: "border-red-500/30 bg-red-500/10 text-red-400",
  },
  pqc: {
    icon: Zap,
    label: "PQC Protected",
    description: "Secured with Post-Quantum Cryptography",
    className: "border-purple-500/30 bg-purple-500/10 text-purple-400",
  },
};

export function EmailViewer({ emailId }: EmailViewerProps) {
  const [isDecrypted, setIsDecrypted] = useState(false);
  
  if (!emailId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background/30">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Select an Email</h3>
            <p className="text-muted-foreground">Choose an email from the list to view its content</p>
          </div>
        </div>
      </div>
    );
  }

  const email = mockEmailContent[emailId as keyof typeof mockEmailContent];
  if (!email) return null;

  const securityInfo = securityConfig[email.securityLevel];
  const SecurityIcon = securityInfo.icon;

  return (
    <div className="flex-1 flex flex-col bg-background/30">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        {/* Security Banner */}
        <div className={cn(
          "flex items-center gap-3 p-3 rounded-lg border mb-4",
          securityInfo.className
        )}>
          <SecurityIcon className="w-5 h-5" />
          <div className="flex-1">
            <h4 className="font-medium text-sm">{securityInfo.label}</h4>
            <p className="text-xs opacity-80">{securityInfo.description}</p>
          </div>
          {email.keyId && (
            <Badge variant="outline" className="text-xs">
              <Key className="w-3 h-3 mr-1" />
              Key: {email.keyId}
            </Badge>
          )}
        </div>

        {/* Email Header */}
        <div className="space-y-4">
          <div>
            <h1 className="text-xl font-semibold mb-2">{email.subject}</h1>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{email.sender}</p>
                <p className="text-sm text-muted-foreground">{email.email}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">{email.time}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Reply className="w-4 h-4 mr-2" />
              Reply
            </Button>
            <Button variant="outline" size="sm">
              <ReplyAll className="w-4 h-4 mr-2" />
              Reply All
            </Button>
            <Button variant="outline" size="sm">
              <Forward className="w-4 h-4 mr-2" />
              Forward
            </Button>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {email.securityLevel === "secure" && !isDecrypted ? (
          <div className="text-center space-y-4 py-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Encrypted Content</h3>
              <p className="text-muted-foreground mb-4">
                This message is encrypted with quantum security. Click to decrypt.
              </p>
              <Button 
                onClick={() => setIsDecrypted(true)}
                className="btn-quantum"
              >
                <Key className="w-4 h-4 mr-2" />
                Decrypt with Key {email.keyId}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Email Content */}
            <div 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: email.content }}
            />

            {/* Attachments */}
            {email.attachments && email.attachments.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Attachments</h4>
                <div className="space-y-2">
                  {email.attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border/50"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                        <Download className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{attachment.name}</p>
                        <p className="text-xs text-muted-foreground">{attachment.size}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}