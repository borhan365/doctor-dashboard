import { Drawer, Form, Select, Space } from "antd";
import axios from "axios";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsArrowClockwise } from "react-icons/bs";
import { IoSwapVertical } from "react-icons/io5";
const { Option } = Select;

interface PromptSidebarProps {
  open: boolean;
  onClose: () => void;
  updateFormData: (data: any) => void;
}

// Define the type for the scraped data
type ScrapedData = {
  header: {
    photo: string;
    name: string;
    qualifications: string;
    specialty: string;
    workplace: string;
    rating: {
      score: number;
      count: string;
    };
  };
  content: {
    chambers: Array<{
      name: string;
      address: string;
      visitingHour: string;
      appointment: string;
      phone: string;
    }>;
    about: string;
  };
};

const BulkContentGenerateSidebar: React.FC<PromptSidebarProps> = ({
  open,
  onClose,
  updateFormData,
}) => {
  const [aiType, setAiType] = useState("gemini");
  const [gptVersion, setGptVersion] = useState("");
  const [language, setLanguage] = useState("English");
  const [articleType, setArticleType] = useState("Long Post Form");
  const [postStatus, setPostStatus] = useState("Default (Publish)");
  const [imageSource, setImageSource] = useState("Use Google image");
  const [schedulePost, setSchedulePost] = useState(false);
  const [includeFAQSchema, setIncludeFAQSchema] = useState(false);
  const [giveImageCredits, setGiveImageCredits] = useState(false);
  const [includeYoutubeVideo, setIncludeYoutubeVideo] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [aiTitle, setAiTitle] = useState(false);
  const [promptInstructions, setPromptInstructions] = useState("");
  const [relevantInformations, setRelevantInformations] = useState("");
  const [lsiKeywords, setLsiKeywords] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [prompts, setPrompts] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  const [url, setUrl] = useState("");
  const [isScrapingLoading, setIsScrapingLoading] = useState(false);
  const [scrapedData, setScrapedData] = useState<ScrapedData | null>(null);

  const [instructions, setInstructions] = useState(""); // Corrected variable name
  const [numberOfLine, setNumberOfLine] = useState(0); // Corrected variable name

  const handleScrape = async () => {
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    setIsScrapingLoading(true);
    try {
      const response = await axios.get("/api/scrape", { params: { url } });
      if (response.data.success) {
        toast.success("Data scraped successfully");
        setScrapedData(response.data.doctorInfo);
      } else {
        toast.error(response.data.message || "Failed to scrape data");
      }
    } catch (error) {
      console.error("Error scraping data:", error);
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "An error occurred while scraping",
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsScrapingLoading(false);
    }
  };

  const handleInstructionsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    setInstructions(value); // Corrected variable name
    const lines =
      value && value.split("\n").filter((line) => line.trim() !== "");
    setNumberOfLine(lines?.length); // Corrected variable name
  };

  console.log("scrapedData", scrapedData);

  const handleWriteArticle = async () => {
    setIsLoading(true);
    try {
      let apiEndpoint = "";
      let requestBody = {
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
          requestBody = { ...requestBody, gptVersion };
          break;
        case "gemini":
          apiEndpoint = "/api/gemini";
          requestBody = { ...requestBody, model: "gemini-pro" };
          break;
        case "perplexity":
          apiEndpoint = "/api/perplexity";
          break;
        default:
          throw new Error("Invalid AI type selected");
      }

      const response = await axios.post(apiEndpoint, requestBody);

      console.log("promptSidebar api response:", response);

      // Update form data with AI-generated content
      updateFormData({
        title: response.data.title,
        bnTitle: response.data.bnTitle,
        subTitle: response.data.subTitle,
        bnSubTitle: response.data.bnSubTitle,
        excerpt: response.data.excerpt,
        bnExcerpt: response.data.bnExcerpt,
        description: response.data.content,
        bnDescription: response.data.bnContent,
        metaTitle: response.data.metaTitle,
        metaDescription: response.data.metaDescription,
      });

      console.log("AI response", response.data);

      // Close the sidebar
      onClose();
    } catch (error) {
      console.error("Error generating article:", error);
      toast.error("Failed to generate article. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // fetch prompts from database
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await axios.get("/api/prompts");
        setPrompts(response.data);
        console.log("prompts", response.data);
      } catch (error) {
        console.error("Error fetching prompts:", error);
        toast.error("Failed to fetch prompts. Please try again later.");
      }
    };
    fetchPrompts();
  }, []);

  const handlePromptChange = (promptId: number) => {
    const selectedPrompt = prompts.find((prompt) => prompt.id === promptId);
    setSelectedPrompt(selectedPrompt);
    if (selectedPrompt) {
      setPromptInstructions(selectedPrompt.description);
    }
  };

  const formatScrapedData = (data: ScrapedData): string => {
    let formattedText = "";

    // Format header information
    formattedText += `Name: ${data.header.name}\n`;
    formattedText += `Qualifications: ${data.header.qualifications}\n`;
    formattedText += `Specialty: ${data.header.specialty}\n`;
    formattedText += `Workplace: ${data.header.workplace}\n`;
    formattedText += `Rating: ${data.header.rating.score}/5 (${data.header.rating.count} reviews)\n\n`;

    // Format chambers information
    formattedText += "Chambers:\n";
    data.content.chambers.forEach((chamber, index) => {
      formattedText += `Chamber ${index + 1}:\n`;
      formattedText += `  Name: ${chamber.name}\n`;
      formattedText += `  Address: ${chamber.address}\n`;
      formattedText += `  Visiting Hours: ${chamber.visitingHour}\n`;
      formattedText += `  Appointment: ${chamber.appointment}\n`;
      formattedText += `  Phone: ${chamber.phone}\n\n`;
    });

    // Format about information
    formattedText += `About:\n${data.content.about}\n`;

    return formattedText;
  };

  useEffect(() => {
    if (scrapedData) {
      setRelevantInformations(formatScrapedData(scrapedData));
    }
  }, [scrapedData]);

  return (
    <Drawer
      title="Create a new page with AI"
      className="font-satoshi"
      width={720}
      onClose={onClose}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      footer={
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 mr-2 rounded p-2 px-5"
          >
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
      }
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
      <Form layout="vertical" hideRequiredMark className="font-satoshi">
        <div className="space-y-6">
          {aiType === "openai" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800">
                GPT Version
              </h2>
              <div className="flex space-x-4">
                {["GPT-4o (Recommended)", "GPT-4", "GPT-4o mini"].map(
                  (version) => (
                    <button
                      key={version}
                      className={`rounded-md px-4 py-2 ${
                        gptVersion ===
                        version.toLowerCase().replace(/\s+/g, "-")
                          ? "bg-blue-600 text-white"
                          : "border border-blue-600 bg-white text-blue-600"
                      }`}
                      onClick={() =>
                        setGptVersion(
                          version.toLowerCase().replace(/\s+/g, "-"),
                        )
                      }
                    >
                      {version}
                    </button>
                  ),
                )}
              </div>
            </div>
          )}

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
              {numberOfLine} lines
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-medium text-slate-800">
              Prompt Instructions
            </h2>
            <p className="text-sm text-slate-800">
              Write your prompt instructions here and describe them in as much
              detail as possible so that the AI can understand better.
            </p>
            <select
              name="promptType"
              id="promptType"
              className="!my-3 block w-full rounded-md border border-slate-200 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              onChange={(e) => handlePromptChange(Number(e.target.value))}
            >
              <option value="">Select a prompt</option>
              {prompts?.map((prompt: any) => (
                <option className="text-base" key={prompt.id} value={prompt.id}>
                  {prompt.title}
                </option>
              ))}
            </select>

            <textarea
              className="h-40 w-full rounded-md border border-slate-200 p-3 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="Example: Write a detailed profile overview of Dr. Raunak Jahan..."
              value={DOMPurify.sanitize(promptInstructions)}
              onChange={(e) => setPromptInstructions(e.target.value)}
            />
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
                defaultValue="en-bn"
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
      </Form>
    </Drawer>
  );
};

export default BulkContentGenerateSidebar;
