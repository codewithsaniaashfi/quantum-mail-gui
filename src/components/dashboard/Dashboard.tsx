import { useState } from "react";
import { Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/layout/Sidebar";
import { EmailList } from "@/components/email/EmailList";
import { EmailViewer } from "@/components/email/EmailViewer";
import { ComposeModal } from "@/components/compose/ComposeModal";
import { SettingsPage } from "@/components/settings/SettingsPage";
import { QuantumKeysPage } from "@/components/quantum/QuantumKeysPage";
import { SecurityMonitorPage } from "@/components/security/SecurityMonitorPage";
import { ActivityLogPage } from "@/components/activity/ActivityLogPage";
import { SentPage, DraftsPage, TrashPage } from "@/components/pages/EmailPages";

export function Dashboard() {
  const [activeSection, setActiveSection] = useState("inbox");
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case "inbox":
        return (
          <>
            <EmailList 
              selectedEmail={selectedEmail} 
              onEmailSelect={setSelectedEmail} 
            />
            <EmailViewer emailId={selectedEmail} />
          </>
        );
      case "sent":
        return <SentPage />;
      case "drafts":
        return <DraftsPage />;
      case "trash":
        return <TrashPage />;
      case "keys":
        return <QuantumKeysPage />;
      case "security":
        return <SecurityMonitorPage />;
      case "activity":
        return <ActivityLogPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto">
                <Edit3 className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 capitalize">{activeSection}</h3>
                <p className="text-muted-foreground">
                  This section is coming soon in the next iteration
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case "inbox": return "Inbox";
      case "sent": return "Sent Messages";
      case "drafts": return "Drafts";
      case "trash": return "Trash";
      case "keys": return "Quantum Keys";
      case "security": return "Security Monitor";
      case "activity": return "Activity Log";
      case "settings": return "Settings";
      default: return activeSection.charAt(0).toUpperCase() + activeSection.slice(1);
    }
  };

  const getSectionDescription = () => {
    switch (activeSection) {
      case "inbox": return "Manage your secure communications";
      case "sent": return "View sent messages and delivery status";
      case "drafts": return "Continue working on unsent messages";
      case "trash": return "Deleted messages and quantum remnants";
      case "keys": return "Monitor and manage quantum encryption keys";
      case "security": return "Real-time security monitoring and threats";
      case "activity": return "Comprehensive audit trail of activities";
      case "settings": return "Configure your account and preferences";
      default: return "Quantum secure email management";
    }
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 bg-card/30 backdrop-blur-sm border-b border-border/50 flex items-center justify-between px-6">
          <div>
            <h1 className="text-xl font-semibold">{getSectionTitle()}</h1>
            <p className="text-sm text-muted-foreground">{getSectionDescription()}</p>
          </div>
          
          <Button onClick={() => setIsComposeOpen(true)} className="btn-quantum">
            <Edit3 className="w-4 h-4 mr-2" />
            Compose Secure Email
          </Button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex">
          {renderContent()}
        </div>
      </div>

      {/* Compose Modal */}
      <ComposeModal 
        isOpen={isComposeOpen} 
        onClose={() => setIsComposeOpen(false)} 
      />
    </div>
  );
}