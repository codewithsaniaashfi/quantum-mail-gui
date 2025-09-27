import { useState } from "react";
import { Search, Shield, Lock, AlertTriangle, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  isRead: boolean;
  securityLevel: "secure" | "medium" | "insecure" | "pqc";
  hasAttachment?: boolean;
}

interface EmailListProps {
  selectedEmail: string | null;
  onEmailSelect: (emailId: string) => void;
}

const mockEmails: Email[] = [
  {
    id: "1",
    sender: "Alice Johnson",
    subject: "Quarterly Security Report",
    preview: "The latest quantum key distribution metrics show excellent performance...",
    time: "10:30 AM",
    isRead: false,
    securityLevel: "secure",
    hasAttachment: true,
  },
  {
    id: "2",
    sender: "Bob Chen",
    subject: "Project Update - Encryption Migration",
    preview: "We've successfully migrated 85% of our communication channels to quantum-safe...",
    time: "9:15 AM",
    isRead: true,
    securityLevel: "pqc",
  },
  {
    id: "3",
    sender: "security@company.com",
    subject: "Security Alert: Suspicious Activity Detected",
    preview: "Our monitoring systems have detected unusual activity in sector 7...",
    time: "8:45 AM",
    isRead: false,
    securityLevel: "medium",
  },
  {
    id: "4",
    sender: "Carol Smith",
    subject: "Team Meeting Notes",
    preview: "Here are the notes from today's quantum security briefing...",
    time: "Yesterday",
    isRead: true,
    securityLevel: "secure",
  },
  {
    id: "5",
    sender: "external@partner.com",
    subject: "Partnership Proposal",
    preview: "We would like to discuss a potential collaboration on quantum technologies...",
    time: "2 days ago",
    isRead: false,
    securityLevel: "insecure",
  },
];

const securityConfig = {
  secure: {
    icon: Shield,
    label: "Quantum Secure",
    className: "badge-secure",
    bgClass: "bg-green-500/10",
  },
  medium: {
    icon: Lock,
    label: "Quantum OTP",
    className: "badge-medium",
    bgClass: "bg-yellow-500/10",
  },
  insecure: {
    icon: AlertTriangle,
    label: "No Encryption",
    className: "badge-insecure",
    bgClass: "bg-red-500/10",
  },
  pqc: {
    icon: Zap,
    label: "PQC Protected",
    className: "badge-pqc",
    bgClass: "bg-purple-500/10",
  },
};

export function EmailList({ selectedEmail, onEmailSelect }: EmailListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmails = mockEmails.filter(
    (email) =>
      email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-96 bg-card/30 backdrop-blur-sm border-r border-border/50 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Inbox</h2>
          <Badge variant="secondary" className="text-xs">
            {filteredEmails.filter(e => !e.isRead).length} unread
          </Badge>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
          />
        </div>
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto">
        {filteredEmails.map((email) => {
          const securityInfo = securityConfig[email.securityLevel];
          const SecurityIcon = securityInfo.icon;
          
          return (
            <div
              key={email.id}
              onClick={() => onEmailSelect(email.id)}
              className={cn(
                "p-4 border-b border-border/30 cursor-pointer transition-all hover:bg-muted/30",
                selectedEmail === email.id && "bg-muted/50 border-l-4 border-l-primary",
                !email.isRead && "bg-primary/5"
              )}
            >
              <div className="flex items-start gap-3">
                {/* Security Icon */}
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                  securityInfo.bgClass
                )}>
                  <SecurityIcon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={cn(
                      "font-medium text-sm truncate",
                      !email.isRead && "font-semibold"
                    )}>
                      {email.sender}
                    </h3>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {email.time}
                    </span>
                  </div>

                  {/* Subject */}
                  <p className={cn(
                    "text-sm truncate mb-1",
                    !email.isRead ? "font-medium" : "text-muted-foreground"
                  )}>
                    {email.subject}
                  </p>

                  {/* Preview */}
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {email.preview}
                  </p>

                  {/* Security Badge & Attachment */}
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={cn("text-xs px-2 py-0.5", securityInfo.className)}
                    >
                      <SecurityIcon className="w-3 h-3 mr-1" />
                      {securityInfo.label}
                    </Badge>
                    
                    {email.hasAttachment && (
                      <Badge variant="outline" className="text-xs px-2 py-0.5">
                        📎
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}