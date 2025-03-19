"use client";

import { useState } from "react";

export default function SMSSettings() {
  const [activeTab, setActiveTab] = useState("sms");
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-2xl font-bold dark:text-white">
        Messaging Settings
      </h1>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex border-b dark:border-slate-700">
          <button
            className={`px-4 py-2 ${
              activeTab === "sms"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-slate-500 dark:text-slate-400"
            }`}
            onClick={() => setActiveTab("sms")}
          >
            SMS Settings
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "whatsapp"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-slate-500 dark:text-slate-400"
            }`}
            onClick={() => setActiveTab("whatsapp")}
          >
            WhatsApp Settings
          </button>
        </div>
      </div>

      {/* SMS Settings Content */}
      {activeTab === "sms" && (
        <div className="rounded-lg bg-white p-6 shadow dark:bg-slate-800">
          <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold dark:text-white">
              SMS Configuration
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Configure your SMS gateway settings for sending text messages.
            </p>
          </div>

          <div className="space-y-6">
            {/* Enable SMS Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium dark:text-white">
                  Enable SMS Notifications
                </label>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Toggle SMS notifications for appointments and reminders
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={smsEnabled}
                  onChange={(e) => setSmsEnabled(e.target.checked)}
                />
                <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:bg-slate-700 dark:peer-focus:ring-blue-800"></div>
              </label>
            </div>

            {/* SMS Provider */}
            <div>
              <label className="mb-2 block font-medium dark:text-white">
                SMS Provider
              </label>
              <select className="w-full rounded-lg border bg-white p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white">
                <option value="">Select provider</option>
                <option value="twilio">Twilio</option>
                <option value="messagebird">MessageBird</option>
                <option value="vonage">Vonage</option>
              </select>
            </div>

            {/* API Key */}
            <div>
              <label className="mb-2 block font-medium dark:text-white">
                API Key
              </label>
              <input
                type="password"
                placeholder="Enter your API key"
                className="w-full rounded-lg border p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
              />
            </div>

            {/* Sender ID */}
            <div>
              <label className="mb-2 block font-medium dark:text-white">
                Sender ID
              </label>
              <input
                type="text"
                placeholder="Enter sender ID"
                className="w-full rounded-lg border p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
              />
            </div>

            {/* Test SMS */}
            <div>
              <label className="mb-2 block font-medium dark:text-white">
                Test Phone Number
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter phone number"
                  className="flex-1 rounded-lg border p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
                />
                <button className="rounded-lg bg-slate-100 px-4 py-2 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600">
                  Send Test SMS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Settings Content */}
      {activeTab === "whatsapp" && (
        <div className="rounded-lg bg-white p-6 shadow dark:bg-slate-800">
          <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold dark:text-white">
              WhatsApp Configuration
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Configure WhatsApp Business API settings for messaging.
            </p>
          </div>

          <div className="space-y-6">
            {/* Enable WhatsApp Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium dark:text-white">
                  Enable WhatsApp Messaging
                </label>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Toggle WhatsApp messaging for appointments and reminders
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={whatsappEnabled}
                  onChange={(e) => setWhatsappEnabled(e.target.checked)}
                />
                <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:bg-slate-700 dark:peer-focus:ring-blue-800"></div>
              </label>
            </div>

            {/* Business Number */}
            <div>
              <label className="mb-2 block font-medium dark:text-white">
                WhatsApp Business Number
              </label>
              <input
                type="text"
                placeholder="Enter WhatsApp business number"
                className="w-full rounded-lg border p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
              />
            </div>

            {/* Business Name */}
            <div>
              <label className="mb-2 block font-medium dark:text-white">
                Business Display Name
              </label>
              <input
                type="text"
                placeholder="Enter business name"
                className="w-full rounded-lg border p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
              />
            </div>

            {/* Webhook URL */}
            <div>
              <label className="mb-2 block font-medium dark:text-white">
                Webhook URL
              </label>
              <input
                type="text"
                placeholder="Enter webhook URL"
                className="w-full rounded-lg border p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
              />
            </div>

            {/* Message Templates */}
            <div>
              <label className="mb-2 block font-medium dark:text-white">
                Message Templates
              </label>
              <div className="space-y-4 rounded-lg border p-4 dark:border-slate-600">
                <div className="flex items-center justify-between">
                  <span className="dark:text-white">Appointment Reminder</span>
                  <button className="rounded border px-3 py-1 text-sm hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">
                    Edit Template
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="dark:text-white">Booking Confirmation</span>
                  <button className="rounded border px-3 py-1 text-sm hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">
                    Edit Template
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end space-x-2">
        <button className="rounded-lg border px-4 py-2 hover:bg-slate-50 dark:border-slate-600 dark:text-white dark:hover:bg-slate-700">
          Cancel
        </button>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
          Save Changes
        </button>
      </div>
    </div>
  );
}
