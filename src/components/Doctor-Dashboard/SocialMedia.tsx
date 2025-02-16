import { DoctorFormData } from "@/types/doctor";
import {
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Twitter,
  Video,
  Youtube,
} from "lucide-react";

interface SocialMediaProps {
  formData: DoctorFormData;
  onChange: (key: keyof DoctorFormData, value: string) => void;
}

export function SocialMedia({ formData, onChange }: SocialMediaProps) {
  const handleInputChange =
    (field: keyof DoctorFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(field, e.target.value);
    };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <p className="mb-4 border-b border-slate-200 pb-3 text-lg font-semibold text-slate-800">
        Doctor Online Presence & Social Media
      </p>

      {/* Online Presence */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="website"
            className="text-sm font-medium text-slate-700"
          >
            Website
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Globe className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="url"
              name="website"
              id="website"
              value={formData.website || ""}
              onChange={handleInputChange("website")}
              className="block w-full rounded-lg border border-slate-200 py-3 pl-10 pr-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="https://www.example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="video" className="text-sm font-medium text-slate-700">
            Video URL
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Video className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="url"
              name="videoUrl"
              id="videoUrl"
              value={formData.videoUrl || ""}
              onChange={handleInputChange("videoUrl")}
              className="block w-full rounded-lg border border-slate-200 py-3 pl-10 pr-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="https://www.youtube.com/watch?v=example"
            />
          </div>
        </div>
      </div>

      <p className="mb-4 mt-6 border-b border-slate-200 pb-3 text-base font-medium text-slate-800">
        Social Media Links
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="facebook"
            className="text-sm font-medium text-slate-700"
          >
            Facebook Profile
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Facebook className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="url"
              name="facebookLink"
              id="facebookLink"
              value={formData.facebookLink || ""}
              onChange={handleInputChange("facebookLink")}
              className="block w-full rounded-lg border border-slate-200 py-3 pl-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="https://www.facebook.com/username"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="twitter"
            className="text-sm font-medium text-slate-700"
          >
            Twitter Profile
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Twitter className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="url"
              name="twitterLink"
              id="twitterLink"
              value={formData.twitterLink || ""}
              onChange={handleInputChange("twitterLink")}
              className="block w-full rounded-lg border border-slate-200 py-3 pl-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="https://www.twitter.com/username"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="instagram"
            className="text-sm font-medium text-slate-700"
          >
            Instagram Profile
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Instagram className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="url"
              name="instagramLink"
              id="instagramLink"
              value={formData.instagramLink || ""}
              onChange={handleInputChange("instagramLink")}
              className="block w-full rounded-lg border border-slate-200 py-3 pl-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="https://www.instagram.com/username"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="youtube"
            className="text-sm font-medium text-slate-700"
          >
            YouTube Channel
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Youtube className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="url"
              name="youtubeLink"
              id="youtubeLink"
              value={formData.youtubeLink || ""}
              onChange={handleInputChange("youtubeLink")}
              className="block w-full rounded-lg border border-slate-200 py-3 pl-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="https://www.youtube.com/channel/..."
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="linkedin"
            className="text-sm font-medium text-slate-700"
          >
            LinkedIn Profile
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Linkedin className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="url"
              name="linkedinLink"
              id="linkedinLink"
              value={formData.linkedinLink || ""}
              onChange={handleInputChange("linkedinLink")}
              className="block w-full rounded-lg border border-slate-200 py-3 pl-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="https://www.linkedin.com/in/username"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
