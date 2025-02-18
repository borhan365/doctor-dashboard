"use client";
import { useQuery } from "@tanstack/react-query";
import { Checkbox } from "antd";
import axios from "axios";
import { Search, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface Language {
  id: string;
  title: string;
  bnTitle?: string;
  status: string;
  userId?: string | null;
}

interface LanguageResponse {
  status: string;
  languages: Language[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

interface LanguageSectionProps {
  selectedLanguages: string[];
  onChange: (languages: string[]) => void;
}

function LanguageSection({
  selectedLanguages = [],
  onChange,
}: LanguageSectionProps) {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useQuery<LanguageResponse>({
    queryKey: ["languages", searchTerm],
    queryFn: async () => {
      const response = await axios.get("/api/doctors/languages", {
        params: {
          status: "published",
          search: searchTerm,
          limit: 100,
        },
      });
      return response.data;
    },
  });

  const defaultLanguages =
    data?.languages?.filter((lang) => !lang.userId) || [];
  const customLanguages =
    data?.languages?.filter((lang) => lang.userId === session?.user?.id) || [];

  const handleToggleSelect = (id: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedLanguages, id]);
    } else {
      onChange(selectedLanguages.filter((langId) => langId !== id));
    }
  };

  const renderLanguageList = (languages: Language[]) => (
    <div className="grid max-h-[200px] grid-cols-1 gap-3 overflow-y-auto sm:grid-cols-5">
      {languages.map((language) => (
        <div
          key={language.id}
          className="flex items-center rounded-lg bg-slate-50 p-2"
        >
          <Checkbox
            checked={selectedLanguages.includes(language.id)}
            onChange={(e) => handleToggleSelect(language.id, e.target.checked)}
            className="flex h-4 w-4 !items-start justify-start gap-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          >
            <span className="text-sm font-medium text-slate-700">
              {language.title}
              {language.bnTitle && ` / ${language.bnTitle}`}
            </span>
          </Checkbox>
        </div>
      ))}
    </div>
  );

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <p className="mb-4 border-b border-slate-200 pb-3 text-lg font-semibold text-slate-800">
        Select Your Languages
      </p>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-700">
            Search Your Languages <span className="text-red-500">*</span>
          </p>
          <p className="text-sm text-slate-600">
            <span className="font-medium text-blue-600">
              {selectedLanguages.length}
            </span>{" "}
            languages selected
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Search languages..."
          />
        </div>

        {/* Selected Languages */}
        {selectedLanguages.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700">
              Selected Languages
            </p>
            <div className="flex flex-wrap gap-2">
              {data?.languages
                ?.filter((lang) => selectedLanguages.includes(lang.id))
                .map((lang) => (
                  <div
                    key={lang.id}
                    className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2"
                  >
                    <span className="text-sm font-medium text-blue-700">
                      {lang.title}
                    </span>
                    <button
                      onClick={() => handleToggleSelect(lang.id, false)}
                      className="text-blue-400 hover:text-blue-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Default Languages */}
        {!isLoading && defaultLanguages.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700">
              Default Languages
            </p>
            {renderLanguageList(defaultLanguages)}
          </div>
        )}

        {/* Custom Languages */}
        {!isLoading && customLanguages.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700">
              My Custom Languages
            </p>
            {renderLanguageList(customLanguages)}
          </div>
        )}

        {isLoading && (
          <div className="text-center text-sm text-slate-500">
            Loading languages...
          </div>
        )}
      </div>
    </div>
  );
}

export default LanguageSection;
