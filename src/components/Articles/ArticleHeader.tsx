import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PanelRight, Save, Sparkles } from "lucide-react";

interface ArticleHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onAIClick: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  slug: string;
  contentSidebarOpen: boolean;
  toggleContentSidebar: () => void;
}

export default function ArticleHeader({
  activeTab,
  setActiveTab,
  onAIClick,
  onSaveDraft,
  onPublish,
  slug,
  contentSidebarOpen,
  toggleContentSidebar,
}: ArticleHeaderProps) {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-4 py-3">
      <div className="flex items-center gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="english">English</TabsTrigger>
            <TabsTrigger value="bangla">বাংলা</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onAIClick}
          className="gap-2"
        >
          <Sparkles className="h-4 w-4" />
          AI Write
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onSaveDraft}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          Save Draft
        </Button>

        <Button
          variant="default"
          size="sm"
          onClick={onPublish}
          className="gap-2"
        >
          Publish
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleContentSidebar}
          className="gap-2"
        >
          <PanelRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 