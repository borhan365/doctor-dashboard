import { CameraIcon } from "lucide-react";

function ProfileSettingsTab() {
  return (
    <>
      <div className="space-y-6 rounded-lg bg-white p-6 shadow-lg">
        {/* Profile Photo */}
        <div className="flex items-center space-x-4">
          <div className="bg-gray-300 h-24 w-24 overflow-hidden rounded-full">
            <img
              src="/images/user/user-01.png"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <button className="bg-gray-100 border-gray-300 relative flex items-center space-x-2 rounded-md border p-2">
              <input
                type="file"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
              <CameraIcon className="h-4 w-4" />
              <span>Update Photo</span>
            </button>
            <button className="text-red-600 ml-4">Remove</button>
          </div>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-medium">
              First Name
            </label>
            <input
              id="firstName"
              className="border-gray-300 block w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-500"
              placeholder="Martin"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm font-medium">
              Last Name
            </label>
            <input
              id="lastName"
              className="border-gray-300 block w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-500"
              placeholder="Janiter"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="border-gray-300 block w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-500"
            placeholder="j.martin@gmail.com"
          />
        </div>

        {/* Bio Field */}
        <div className="space-y-2">
          <label htmlFor="bio" className="block text-sm font-medium">
            Write Your Bio
          </label>
          <textarea
            id="bio"
            className="border-gray-300 block min-h-[100px] w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-500"
            placeholder="Write about you"
          />
        </div>

        {/* Username Field */}
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <div className="flex">
            <span className="bg-gray-100 border-gray-300 text-gray-500 inline-flex items-center border border-r-0 px-3">
              rareblocks.co/user/
            </span>
            <input
              id="username"
              className="border-gray-300 block w-full rounded-md rounded-l-none border px-3 py-2 focus:ring focus:ring-blue-500"
              placeholder="martin.janiter"
            />
          </div>
          <p className="text-gray-500 text-sm">You can change it later</p>
        </div>

        {/* Website Field */}
        <div className="space-y-2">
          <label htmlFor="website" className="block text-sm font-medium">
            Website
          </label>
          <div className="flex">
            <span className="bg-gray-100 border-gray-300 text-gray-500 inline-flex items-center border border-r-0 px-3">
              https://
            </span>
            <input
              id="website"
              className="border-gray-300 block w-full rounded-md rounded-l-none border px-3 py-2 focus:ring focus:ring-blue-500"
              placeholder="postcrafts.co"
            />
          </div>
        </div>

        {/* Job Title */}
        <div className="space-y-2">
          <label htmlFor="jobTitle" className="block text-sm font-medium">
            Job Title
          </label>
          <input
            id="jobTitle"
            className="border-gray-300 block w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-500"
            placeholder="Software Developer"
          />
        </div>

        {/* Show on Profile Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="showProfile"
            className="border-gray-300 h-4 w-4 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="showProfile"
            className="text-gray-700 text-sm font-medium"
          >
            Show this on my profile
          </label>
        </div>

        {/* Country Select */}
        <div className="space-y-2">
          <label htmlFor="country" className="block text-sm font-medium">
            Country
          </label>
          <select
            id="country"
            className="border-gray-300 block w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-500"
          >
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="uk">United Kingdom</option>
          </select>
        </div>

        {/* Update Button */}
        <button className="w-full rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">
          Update Profile
        </button>
      </div>
    </>
  );
}

export default ProfileSettingsTab;
