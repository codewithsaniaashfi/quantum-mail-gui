import { useState } from "react";
import { Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/layout/Sidebar";
import { EmailList } from "@/components/email/EmailList";
import { EmailViewer } from "@/components/email/EmailViewer";
import { ComposeModal } from "@/components/compose/ComposeModal";

export function Dashboard() {
  const [activeSection, setActiveSection] = useState("inbox");
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 bg-card/30 backdrop-blur-sm border-b border-border/50 flex items-center justify-between px-6">
          <div>
            <h1 className="text-xl font-semibold capitalize">{activeSection}</h1>
            <p className="text-sm text-muted-foreground">
              {activeSection === "inbox" && "Manage your secure communications"}
              {activeSection === "sent" && "View sent messages"}
              {activeSection === "drafts" && "Continue working on drafts"}
              {activeSection === "trash" && "Deleted messages"}
              {activeSection === "keys" && "Manage quantum encryption keys"}
              {activeSection === "security" && "Monitor security status"}
              {activeSection === "activity" && "View activity logs"}
              {activeSection === "settings" && "Configure your account"}
            </p>
          </div>
          
          <Button onClick={() => setIsComposeOpen(true)} className="btn-quantum">
            <Edit3 className="w-4 h-4 mr-2" />
            Compose Secure Email
          </Button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex">
          {activeSection === "inbox" ? (
            <>
              <EmailList 
                selectedEmail={selectedEmail} 
                onEmailSelect={setSelectedEmail} 
              />
              <EmailViewer emailId={selectedEmail} />
            </>
          ) : (
            /* Placeholder for other sections */
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
          )}
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