import { Send, FileText, Trash2, Archive, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SentEmail {
  id: string;
  recipient: string;
  subject: string;
  preview: string;
  timestamp: string;
  securityLevel: "secure" | "medium" | "insecure" | "pqc";
  deliveryStatus: "delivered" | "pending" | "failed";
  readStatus: "read" | "unread";
}

const mockSentEmails: SentEmail[] = [
  {
    id: "1",
    recipient: "alice.johnson@company.com",
    subject: "Quarterly Security Report",
    preview: "Please find attached the latest quantum security metrics...",
    timestamp: "Today 10:30 AM",
    securityLevel: "secure",
    deliveryStatus: "delivered",
    readStatus: "read"
  },
  {
    id: "2",
    recipient: "team@company.com",
    subject: "Quantum Key Update Notification",
    preview: "The quantum key rotation has been completed successfully...",
    timestamp: "Today 9:15 AM",
    securityLevel: "secure",
    deliveryStatus: "delivered",
    readStatus: "unread"
  },
  {
    id: "3",
    recipient: "external@partner.com",
    subject: "Partnership Discussion",
    preview: "Thank you for your interest in our quantum security solutions...",
    timestamp: "Yesterday 4:45 PM",
    securityLevel: "pqc",
    deliveryStatus: "pending",
    readStatus: "unread"
  }
];

export function SentPage() {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Sent Messages</h1>
          <p className="text-muted-foreground">View and manage your sent secure emails</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="quantum-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Send className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Delivered</p>
                  <p className="text-2xl font-bold text-green-400">247</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="quantum-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-400">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="quantum-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Archive className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold text-blue-400">89</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Email List */}
        <Card className="quantum-card">
          <CardHeader>
            <CardTitle>Sent Emails</CardTitle>
            <CardDescription>Recent sent messages with delivery status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSentEmails.map((email) => (
                <div key={email.id} className="flex items-center gap-4 p-4 border border-border/50 rounded-lg hover:bg-muted/20 transition-colors">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium">To: {email.recipient}</h4>
                      <Badge variant={email.deliveryStatus === "delivered" ? "default" : "secondary"}>
                        {email.deliveryStatus}
                      </Badge>
                      <Badge variant={email.readStatus === "read" ? "default" : "secondary"}>
                        {email.readStatus}
                      </Badge>
                    </div>
                    <p className="font-medium text-sm">{email.subject}</p>
                    <p className="text-sm text-muted-foreground">{email.preview}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{email.timestamp}</span>
                      <Badge className={cn(
                        "text-xs",
                        email.securityLevel === "secure" && "badge-secure",
                        email.securityLevel === "pqc" && "badge-pqc"
                      )}>
                        {email.securityLevel === "secure" ? "Quantum Secure" : "PQC Protected"}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function DraftsPage() {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Drafts</h1>
          <p className="text-muted-foreground">Continue working on your unsent messages</p>
        </div>

        <Card className="quantum-card">
          <CardContent className="p-8 text-center">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Drafts</h3>
            <p className="text-muted-foreground">
              You don't have any draft messages. Start composing to create drafts.
            </p>
            <Button className="btn-quantum mt-4">
              Compose New Email
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function TrashPage() {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Trash</h1>
          <p className="text-muted-foreground">Deleted messages and quantum key remnants</p>
        </div>

        <Card className="quantum-card">
          <CardContent className="p-8 text-center">
            <Trash2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Trash is Empty</h3>
            <p className="text-muted-foreground">
              No deleted items. Quantum secure deletion ensures complete data removal.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}