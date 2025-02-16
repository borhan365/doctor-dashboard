import { Drawer, Space } from "antd";
import { Copy, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsArrowClockwise } from "react-icons/bs";
import { IoSwapVertical } from "react-icons/io5";

interface ImproveContentSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
  selectedText: string;
  existingContent: string;
}

function ImproveContentSidebar({
  isOpen,
  onClose,
  onSubmit,
  selectedText,
  existingContent,
}: ImproveContentSidebarProps) {
  const [instructions, setInstructions] = useState("");
  const [gptVersion, setGptVersion] = useState("gpt-3.5-turbo");
  const [keywords, setKeywords] = useState("");
  const [articleType, setArticleType] = useState("long");
  const [isExistingContent, setIsExistingContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [improvedContent, setImprovedContent] = useState("");

  // Reset fields when the sidebar is closed
  useEffect(() => {
    if (!isOpen) {
      setInstructions("");
      setGptVersion("gpt-3.5-turbo");
      setKeywords("");
      setArticleType("long");
      setIsExistingContent(false);
      setImprovedContent("");
    }
  }, [isOpen]);

  const handleImproveContent = async () => {
    setIsLoading(true);
    setImprovedContent("");
    try {
      const apiEndpoint = "/api/openai/improve";
      const requestBody = {
        gptVersion,
        keywords,
        promptInstructions: instructions,
        articleType,
        selectedContent: selectedText,
        existingContent: isExistingContent ? existingContent : "",
        isExistingContent,
      };

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setImprovedContent(result.content);

      toast.success("Content improved successfully!");
    } catch (error) {
      console.error("Error improving content:", error);
      toast.error("Failed to improve content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Fields will be reset by the useEffect hook when isOpen becomes false
  };

  const handleCopyContent = () => {
    navigator.clipboard
      .writeText(improvedContent)
      .then(() => {
        toast.success("Content copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy content: ", err);
        toast.error("Failed to copy content. Please try again.");
      });
  };

  return (
    <Drawer
      title={
        <div className="flex items-center justify-between">
          <span>Improve Content with AI</span>
        </div>
      }
      className="font-satoshi"
      width={720}
      onClose={handleClose}
      open={isOpen}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      footer={
        <div className="flex items-center justify-end gap-2">
        <button
          onClick={handleClose}
          className="bg-gray-300 mr-2 rounded p-2 px-5"
        >
          Cancel
        </button>
        <button
          onClick={handleImproveContent}
          disabled={isLoading}
          className="flex items-center justify-start gap-2 rounded bg-blue-700 p-2 px-4 text-white"
        >
          <BsArrowClockwise size={20} />
          <span>{isLoading ? "Improving..." : "Try Again"}</span>
        </button>
        <button
          onClick={() => onSubmit(improvedContent)}
          disabled={isLoading || !improvedContent}
          className="flex items-center justify-start gap-2 rounded bg-green-700 p-2 px-4 text-white"
        >
          <IoSwapVertical size={20} />
          <span>Replace</span>
        </button>
      </div>
      }
      extra={
        <Space>
          <select
            value={gptVersion}
            onChange={(e) => setGptVersion(e.target.value)}
            style={{ width: 120 }}
            className="rounded-md border border-slate-200 p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          >
            <option value="gpt-3.5-turbo">GPT-3.5</option>
            <option value="gpt-4">GPT-4</option>
          </select>
          <button
            onClick={handleImproveContent}
            disabled={isLoading}
            className="rounded bg-blue-600 px-4 py-2 font-satoshi font-medium text-white hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isLoading ? "Improving..." : "Improve"}
          </button>
        </Space>
      }
    >
      <div className="space-y-3">
        {/* Keywords */}
        <div>
          <h2 className="mb-2 text-lg font-bold">Keywords</h2>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full rounded border border-stroke p-2 text-base focus:border-blue-500"
            placeholder="Enter keywords for content improvement..."
          />
        </div>
        {/* Article Type */}
        <div>
          <h2 className="mb-2 text-lg font-bold">Article Type</h2>
          <select
            value={articleType}
            onChange={(e) => setArticleType(e.target.value)}
            className="w-full rounded border border-stroke p-2 text-base focus:border-blue-500"
          >
            <option value="long">Long form content</option>
            <option value="short">Short form content</option>
          </select>
        </div>
        {/* Instructions */}
        <div>
          <h2 className="mb-2 text-lg font-bold">AI Instructions</h2>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="h-24 w-full rounded border border-stroke p-2 text-base focus:border-blue-500"
            placeholder="Enter your instructions to improve the content quality..."
          />
        </div>
        {/* Is Existing Content */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isExistingContent}
              onChange={(e) => setIsExistingContent(e.target.checked)}
              className="mr-2"
            />
            <span>Improve within existing content context</span>
          </label>
          {isExistingContent && (
            <textarea
              value={existingContent}
              readOnly
              className="mt-2 w-full rounded border border-stroke p-2 text-base focus:border-blue-500"
              placeholder="Existing content context..."
            />
          )}
        </div>
        {/* Selected text */}
        <div>
          <h2 className="mb-2 text-lg font-bold">Your Selected Text</h2>
          <textarea
            value={selectedText}
            readOnly
            className="h-24 w-full rounded border border-stroke p-2 text-base focus:border-blue-500"
            placeholder="Your selected text will appear here..."
          />
        </div>
        {/* AI improved content */}
        <div className="relative">
          <h2 className="mb-2 flex items-center gap-2 text-lg font-bold text-green-700">
            <Sparkles size={18} /> AI Improved Content
          </h2>
          <textarea
            value={improvedContent}
            onChange={(e) => setImprovedContent(e.target.value)}
            className="h-96 w-full rounded border border-stroke p-2 text-base focus:border-blue-500 focus:outline-1"
            placeholder="Improved content will appear here..."
            readOnly
          />
          <div className="absolute bottom-5 right-5 flex items-center gap-2">
            <button
              onClick={handleCopyContent}
              className="bg-gray-300 hover:bg-gray-400 rounded p-1 transition-colors duration-200 flex items-center gap-2 justify-end bg-white"
            >
              <Copy className="text-slate-500 hover:text-blue-600" size={18} />
              <span>{improvedContent?.split(/\s+/).length} Words</span>
            </button>
          </div>
        </div>
      </div>
      {/* actions */}
      
    </Drawer>
  );
}

export default ImproveContentSidebar;
