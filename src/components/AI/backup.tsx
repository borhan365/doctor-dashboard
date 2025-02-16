"use client";
import { Drawer } from "antd";
import axios from "axios";
import { Space } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsArrowClockwise } from "react-icons/bs";
import { IoSwapVertical } from "react-icons/io5";

interface AIBulkContentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (instructions: string) => void;
  selectedText: string;
}

interface RequestBody {
  keywords: string;
  promptInstructions: string;
  aiTitle: boolean;
  language: string;
  articleType: string;
  includeFAQSchema: boolean;
  includeYoutubeVideo: boolean;
  relevantInformations: string;
  lsiKeywords: string;
  gptVersion?: string;
  model?: string;
}

const BulkContentGenerateSidebar: React.FC<AIBulkContentsDrawerProps> = ({
  isOpen,
  onClose,
  onSubmit,
  selectedText,
}) => {
  const [instructions, setInstructions] = useState("");
  const [numbersOfLine, setNumberOfLine] = useState(0);
  const [aiType, setAiType] = useState("gemini");
  const [isLoading, setIsLoading] = useState(false);
  const [gptVersion, setGptVersion] = useState("");
  const [language, setLanguage] = useState("English");
  const [articleType, setArticleType] = useState("Long Post Form");
  const [imageSource, setImageSource] = useState("Use Google image");
  const [includeFAQSchema, setIncludeFAQSchema] = useState(false);
  const [includeYoutubeVideo, setIncludeYoutubeVideo] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [aiTitle, setAiTitle] = useState(false);
  const [promptInstructions, setPromptInstructions] = useState("");
  const [relevantInformations, setRelevantInformations] = useState("");
  const [lsiKeywords, setLsiKeywords] = useState("");

  const handleInstructionsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setInstructions(value);
    const lines = value && value.split("\n").filter((line) => line.trim() !== "");
    setNumberOfLine(lines?.length);
  };

  const handleWriteArticle = async () => {
    setIsLoading(true);
    try {
      let apiEndpoint = "";
      let requestBody: RequestBody = {
        keywords,
        promptInstructions,
        aiTitle,
        language,
        articleType,
        includeFAQSchema,
        includeYoutubeVideo,
        relevantInformations,
        lsiKeywords,
      };

      switch (aiType) {
        case "openai":
          apiEndpoint = "/api/write-with-ai";
          requestBody.gptVersion = gptVersion;
          break;
        case "gemini":
          apiEndpoint = "/api/gemini";
          requestBody.model = "gemini-pro";
          break;
        case "perplexity":
          apiEndpoint = "/api/perplexity";
          break;
        default:
          throw new Error("Invalid AI type selected");
      }

      const response = await axios.post(apiEndpoint, requestBody);

      console.log("promptSidebar api response:", response);

      // Handle the response here
      // You might want to update some state or call a function to process the response

      onClose();
    } catch (error) {
      console.error("Error generating article:", error);
      toast.error("Failed to generate article. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer
      title={
        <div className="flex items-center gap-2">
          <span>Write Bulk Contents</span>
        </div>
      }
      className="font-satoshi"
      placement="right"
      closable={true}
      onClose={onClose}
      open={isOpen}
      width={800}
      bodyStyle={{ padding: "30px" }}
      extra={
        <Space>
          <select
            value={aiType}
            onChange={(e) => setAiType(e.target.value)}
            style={{ width: 120 }}
            className="rounded-md border border-slate-200 p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          >
            <option value="gemini">Gemini</option>
            <option value="openai">OpenAI</option>
            <option value="perplexity">Perplexity</option>
          </select>
          <button
            onClick={handleWriteArticle}
            disabled={isLoading}
            className="rounded bg-blue-600 px-4 py-2 font-satoshi font-medium text-white hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isLoading ? "Generating..." : "Write Article"}
          </button>
        </Space>
      }
    >
      <div className="space-y-3">
        <div className="relative">
          <h2 className="mb-1 text-lg font-bold">Keyword or URL List</h2>
          <p className="text-md mb-2">
            Please enter each URL on a separate line. Avoid using commas (,).
            After pasting a URL, press Enter to add the next one.
          </p>

          <textarea
            value={instructions}
            onChange={handleInstructionsChange}
            className="h-80 w-full rounded border border-stroke p-2 text-base focus:border-blue-500"
            placeholder="https://healtha.io/doctors/dr-mushleuddin-shahed/"
          />
          <p className="absolute bottom-4 right-4 text-slate-400">
            {numbersOfLine} lines
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-slate-800">
            AI Generated Title
          </span>
          <button
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              aiTitle ? "bg-blue-600" : "bg-slate-300"
            }`}
            onClick={() => setAiTitle(!aiTitle)}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                aiTitle ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="language"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Language
            </label>
            <select
              id="language"
              className="mt-1 block w-full rounded-md border border-slate-200 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English Version Only</option>
              <option value="bn">Bangla Version Only</option>
              <option value="en-bn">English & Bangla Version Both</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="articleType"
              className="mb-1 block text-sm font-medium text-slate-800"
            >
              Choose Type of Info Article
            </label>
            <select
              id="articleType"
              className="mt-1 block w-full rounded-md border border-slate-200 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              value={articleType}
              onChange={(e) => setArticleType(e.target.value)}
            >
              <option>Long Post Form</option>
              <option>Short Post Form</option>
              <option>List Article</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-medium text-slate-800">
            Select Image Source
          </h2>
          <div className="flex flex-wrap gap-4">
            {["Use Google image", "Use Pixabay image", "Don't use image"].map(
              (source) => (
                <button
                  key={source}
                  className={`rounded-full px-4 py-2 transition-colors ${
                    imageSource === source
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  }`}
                  onClick={() => setImageSource(source)}
                >
                  {source}
                </button>
              )
            )}
          </div>
        </div>

        <div className="space-y-4">
          {[
            {
              label: "Include FAQ",
              state: includeFAQSchema,
              setState: setIncludeFAQSchema,
            },
            {
              label: "Include Youtube Video",
              state: includeYoutubeVideo,
              setState: setIncludeYoutubeVideo,
            },
          ].map(({ label, state, setState }) => (
            <div key={label} className="flex items-center">
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  state ? "bg-blue-600" : "bg-slate-300"
                }`}
                onClick={() => setState(!state)}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    state ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="ml-3 text-sm font-medium text-slate-700">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end gap-2">
        <button onClick={onClose} className="bg-gray-300 mr-2 rounded p-2 px-5">
          Cancel
        </button>
        <button
          onClick={() => {
            onSubmit(instructions);
            onClose();
          }}
          className="flex items-center justify-start gap-2 rounded bg-blue-700 p-2 px-4 text-white"
        >
          <BsArrowClockwise size={20} />
          <span>Try Again</span>
        </button>
        <button
          onClick={() => {
            onSubmit(instructions);
            onClose();
          }}
          className="flex items-center justify-start gap-2 rounded bg-green-700 p-2 px-4 text-white"
        >
          <IoSwapVertical size={20} />
          <span>Replace</span>
        </button>
      </div>
    </Drawer>
  );
};

export default BulkContentGenerateSidebar;