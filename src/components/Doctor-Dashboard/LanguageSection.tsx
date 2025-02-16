"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface Language {
  id: string;
  title: string;
  bnTitle?: string;
  status: string;
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
  selectedLanguages: string[]; // Array of language IDs
  onChange: (languages: string[]) => void;
}

function LanguageSection({
  selectedLanguages,
  onChange,
}: LanguageSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useQuery<LanguageResponse>({
    queryKey: ["languages"],
    queryFn: async () => {
      const response = await axios.get("/api/doctors/languages", {
        params: {
          status: "published",
          limit: 100,
        },
      });
      return response.data;
    },
  });

  const handleToggleSelect = (id: string) => {
    const newSelection = selectedLanguages.includes(id)
      ? selectedLanguages.filter((langId) => langId !== id)
      : [...selectedLanguages, id];
    onChange(newSelection);
  };

  const filteredLanguages = data?.languages?.filter(
    (language) =>
      language.status === "published" &&
      language?.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-700">
            What languages can you speak?
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder="Search languages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-48 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-sm text-slate-500">Loading languages...</div>
        ) : (
          <div className="grid max-h-[200px] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-3 lg:grid-cols-5">
            {filteredLanguages?.map((language) => (
              <div
                key={language.id}
                className="flex items-center rounded-lg bg-slate-50 p-2"
              >
                <input
                  type="checkbox"
                  checked={selectedLanguages?.includes(language.id)}
                  onChange={() => handleToggleSelect(language.id)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm font-medium text-slate-700">
                  {language.title}
                  {language.bnTitle && ` / ${language.bnTitle}`}
                </span>
              </div>
            ))}
          </div>
        )}

        {filteredLanguages?.length === 0 && (
          <p className="text-sm text-slate-500">No languages found</p>
        )}
      </div>
    </div>
  );
}

export default LanguageSection;
