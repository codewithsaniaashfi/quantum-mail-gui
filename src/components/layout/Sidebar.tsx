import { 
  Inbox, 
  Send, 
  FileText, 
  Trash2, 
  Settings,
  Shield,
  Key,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
}

const mainNavItems: NavItem[] = [
  { id: "inbox", label: "Inbox", icon: Inbox, count: 12 },
  { id: "sent", label: "Sent", icon: Send },
  { id: "drafts", label: "Drafts", icon: FileText, count: 3 },
  { id: "trash", label: "Trash", icon: Trash2 },
];

const quantumNavItems: NavItem[] = [
  { id: "keys", label: "Quantum Keys", icon: Key },
  { id: "security", label: "Security Monitor", icon: Shield },
  { id: "activity", label: "Activity Log", icon: Activity },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="w-64 bg-card/30 backdrop-blur-sm border-r border-border/50 h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gradient-quantum">QuMail</h1>
            <p className="text-xs text-muted-foreground">Quantum Secure</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-6">
        {/* Main Navigation */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Mailbox
          </h3>
          <nav className="space-y-1">
            {mainNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  "hover:bg-muted/50",
                  activeSection === item.id 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-foreground"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.count && (
                  <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Quantum Features */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Quantum Security
          </h3>
          <nav className="space-y-1">
            {quantumNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  "hover:bg-muted/50",
                  activeSection === item.id 
                    ? "bg-accent/10 text-accent border border-accent/20" 
                    : "text-foreground"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="flex-1 text-left">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Quantum Key Status */}
        <div className="quantum-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Key className="w-4 h-4 text-primary" />
            <h4 className="text-sm font-semibold">Key Status</h4>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Strength</span>
                <span className="text-primary">94%</span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full w-[94%] animate-pulse-quantum"></div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              <p>Keys: 2,847 active</p>
              <p>Last refresh: 2m ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="p-4 border-t border-border/50">
        <button
          onClick={() => onSectionChange("settings")}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
            "hover:bg-muted/50",
            activeSection === "settings" 
              ? "bg-muted text-foreground" 
              : "text-muted-foreground"
          )}
        >
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>
    </div>
  );
}