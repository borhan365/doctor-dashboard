"use client"

import { Calendar, Clock, DollarSign, Facebook, Globe, Instagram, Languages, Link2, MapPin, Phone, Play, Twitter, User, Youtube } from 'lucide-react'

function GeneralInfoSection() {
  return (
    <div id="overview" className="bg-white rounded-lg shadow-sm border border-slate-100">
      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-2xl font-semibold text-slate-900">
          General Information
        </h2>
      </div>

      <div className="p-6 space-y-4">
        {/* Consultation Fees */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "New Patient", amount: "৳1000" },
            { label: "Old Patient", amount: "৳800" },
            { label: "Follow Up", amount: "৳500" },
          ].map((fee, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-xl p-4 transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">{fee.label}</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {fee.amount}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Basic Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: User, label: "Gender", value: "Male" },
            { icon: Calendar, label: "Experience", value: "15+ Years" },
            { icon: MapPin, label: "Location", value: "Dhaka, Bangladesh" },
          ].map((item, index) => (
            <div key={index} className="space-y-2 bg-slate-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-600">
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <p className="text-slate-900">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Contact Numbers */}
        <div className="bg-slate-50 rounded-xl p-4 space-y-4">
          <h3 className="text-base font-medium text-slate-900">Contact Numbers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "+880 1712-345678",
              "+880 1812-345678",
              "+880 1912-345678",
            ].map((number, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white rounded-lg p-3"
              >
                <Phone className="h-4 w-4 text-blue-600" />
                <span className="text-slate-900">{number}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Specializations */}
        <div className="space-y-3">
          <h3 className="text-base font-medium text-slate-900">Specializations</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Medicine Specialist",
              "Diabetes",
              "Internal Medicine",
            ].map((specialty, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Online Presence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Link2 className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-slate-600">Website</p>
                <a
                  href="https://www.drtapaschowdhury.com"
                  className="text-blue-600 hover:underline"
                >
                  www.drtapaschowdhury.com
                </a>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Play className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-slate-600">Video Profile</p>
                <a
                  href="https://youtube.com/watch?v=xyz"
                  className="text-blue-600 hover:underline"
                >
                  Watch Introduction Video
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Languages */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Languages className="h-4 w-4 text-slate-600" />
            <h3 className="text-base font-medium text-slate-900">
              Languages Spoken
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Bengali", "English", "Hindi"].map((language, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm"
              >
                {language}
              </span>
            ))}
          </div>
        </div>

        {/* Social Media & Last Updated */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center pt-6 border-t border-slate-100">
          <div className="flex gap-4 mb-4 sm:mb-0">
            {[
              { Icon: Facebook, href: "#", color: "hover:text-blue-600" },
              { Icon: Twitter, href: "#", color: "hover:text-sky-500" },
              { Icon: Instagram, href: "#", color: "hover:text-pink-600" },
              { Icon: Youtube, href: "#", color: "hover:text-red-600" },
              { Icon: Globe, href: "#", color: "hover:text-blue-600" },
            ].map(({ Icon, href, color }, index) => (
              <a
                key={index}
                href={href}
                className={`text-slate-400 transition-colors ${color}`}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock className="h-4 w-4" />
            <span>Last updated: 2 months ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneralInfoSection

