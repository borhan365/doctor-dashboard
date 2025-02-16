import { MoreVertical, Upload } from 'lucide-react';
import { useState } from 'react';

export default function SiteSettingTab() {
  const [brandColor, setBrandColor] = useState('#2C68F6');
  const [theme, setTheme] = useState('system');
  const [transparentSidebar, setTransparentSidebar] = useState(false);
  const [tableView, setTableView] = useState('default');

  return (
    <div className="bg-white p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Appearance</h1>
        <button className="text-gray-500">
          <MoreVertical className="h-6 w-6" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Company Logo */}
        <div className="grid grid-cols-[3fr_6fr] gap-5 border-b border-stroke pb-5">
          <div>
            <h2 className="text-lg font-medium">Company logo</h2>
            <p className="text-sm text-gray-500">Update your company logo.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
              <Upload className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                Replace logo
              </button>
              <button className="ml-4 text-sm text-red-500 hover:underline">
                Remove
              </button>
            </div>
          </div>
        </div>

        {/* Brand Color */}
        <div className="grid grid-cols-[3fr_6fr] gap-5 border-b border-stroke pb-5">
          {/* title */}
          <div>
            <h2 className="text-lg font-medium mb-2">Brand color</h2>
            <p className="text-sm text-gray-500 mb-4">
              Select or customize your brand color.
            </p>
          </div>
          {/* content */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              {[
                '#000000',
                '#7C3AED',
                '#2563EB',
                '#0EA5E9',
                '#06B6D4',
                '#059669',
                '#10B981',
              ].map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full ${
                    brandColor === color
                      ? 'ring-2 ring-offset-2 ring-blue-500'
                      : ''
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setBrandColor(color)}
                />
              ))}
            </div>

            <label htmlFor="customColor" className="text-sm font-medium">
              Custom color:
            </label>
            <input
              id="customColor"
              type="text"
              value={brandColor}
              onChange={(e) => setBrandColor(e.target.value)}
              className="w-28 px-2 py-1 border border-gray-300 rounded-md"
            />
            <div
              className="w-8 h-8 rounded-full border"
              style={{ backgroundColor: brandColor }}
            />
          </div>

          <div className=""></div>
        </div>

        {/* Interface Theme */}
        <div className='grid grid-cols-[3fr_6fr] gap-5 border-b border-stroke pb-5'>
          <div>
            <h2 className="text-lg font-medium mb-2">Interface theme</h2>
            <p className="text-sm text-gray-500 mb-4">
              Select or customize your UI theme.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {['system', 'light', 'dark'].map((option) => (
              <button
                key={option}
                className={`p-4 border rounded-lg ${
                  theme === option ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setTheme(option)}
              >
                <div className="w-full h-24 bg-gray-100 rounded mb-2" />
                <p className="text-sm font-medium capitalize">{option}</p>
                {option === 'system' && (
                  <p className="text-xs text-gray-500">System preference</p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar Feature */}
        <div className='grid grid-cols-[3fr_6fr] gap-5 border-b border-stroke pb-5'>
          <div>
            <h2 className="text-lg font-medium mb-2">Sidebar feature</h2>
            <p className="text-sm text-gray-500 mb-4">
              What shows in the desktop sidebar.
            </p>
          </div>
          <div className="relative inline-block w-64">
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option value="recent">Recent changes</option>
              <option value="favorites">Favorites</option>
              <option value="most-used">Most used</option>
            </select>
          </div>
        </div>

        {/* Tables View */}
        <div className='grid grid-cols-[3fr_6fr] gap-5 border-b border-stroke pb-5'>
          <div>
            <h2 className="text-lg font-medium mb-2">Tables view</h2>
            <p className="text-sm text-gray-500 mb-4">
              How tables are displayed in the app.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {['default', 'compact'].map((option) => (
              <button
                key={option}
                className={`p-4 border rounded-lg ${
                  tableView === option ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setTableView(option)}
              >
                <div className="w-full h-24 bg-gray-100 rounded mb-2" />
                <p className="text-sm font-medium capitalize">{option}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end space-x-4">
        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50">
          Cancel
        </button>
        <button className="px-4 py-2 bg-primary text-white rounded-md text-sm hover:to-primary">
          Save changes
        </button>
      </div>
    </div>
  );
}
