import {
  Award,
  BadgePercent,
  Bed,
  Building,
  ChartBar,
  Clipboard,
  Clock,
  FileText,
  Globe,
  HeartPulse,
  Landmark,
  LayoutDashboard,
  MapPin,
  Microscope,
  Shield,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";

const benefits = [
  {
    name: "Enhanced Online Visibility",
    description:
      "Increase your hospital's online presence and reach more patients searching for healthcare services in Bangladesh",
    icon: Globe,
    category: "Visibility",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    name: "Comprehensive Hospital Profile",
    description:
      "Showcase your facilities, specialties, doctors, and services in a detailed profile that highlights your strengths",
    icon: Building,
    category: "Profile",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    name: "Easy Location Access",
    description:
      "Help patients find your hospital effortlessly with integrated maps and direction features",
    icon: MapPin,
    category: "Location",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    name: "Patient Reviews & Ratings",
    description:
      "Build credibility with verified patient reviews and ratings to showcase your quality of care",
    icon: Star,
    category: "Reviews",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    name: "Hospital Analytics",
    description:
      "Get insights into your hospital's performance with detailed analytics and reports on patient engagement",
    icon: ChartBar,
    category: "Analytics",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    name: "Service Management",
    description:
      "Easily manage and showcase your hospital's services, specialties, and health packages to attract more patients",
    icon: Clipboard,
    category: "Services",
    color: "text-rose-500",
    bgColor: "bg-rose-50",
  },
  {
    name: "Diagnostic Test Directory",
    description:
      "List and manage all your diagnostic tests with pricing to help patients make informed decisions",
    icon: Microscope,
    category: "Diagnostics",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    name: "Room & Facility Management",
    description:
      "Showcase your hospital's rooms, floors, and facilities to give patients a complete view of your infrastructure",
    icon: Bed,
    category: "Facilities",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    name: "Health Package Promotion",
    description:
      "Promote your health packages and special offers to attract more patients seeking comprehensive care",
    icon: BadgePercent,
    category: "Packages",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    name: "Patient Growth",
    description:
      "Increase patient footfall and appointments through enhanced visibility and streamlined booking",
    icon: TrendingUp,
    category: "Growth",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    name: "Specialty Showcase",
    description:
      "Highlight your hospital's specialties and centers of excellence to attract patients seeking specialized care",
    icon: HeartPulse,
    category: "Specialties",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    name: "Comprehensive Dashboard",
    description:
      "Manage all aspects of your hospital profile through an intuitive, easy-to-use dashboard",
    icon: LayoutDashboard,
    category: "Management",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    name: "24/7 Online Presence",
    description:
      "Maintain a constant online presence, allowing patients to discover your services anytime, day or night",
    icon: Clock,
    category: "Availability",
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
  },
  {
    name: "Digital Price Charts",
    description:
      "Display transparent pricing for rooms, services, and procedures to build trust with potential patients",
    icon: FileText,
    category: "Pricing",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    name: "Secure Platform",
    description:
      "State-of-the-art security measures to protect your hospital's and patients' sensitive information",
    icon: Shield,
    category: "Security",
    color: "text-rose-500",
    bgColor: "bg-rose-50",
  },
  {
    name: "Brand Building",
    description:
      "Establish and strengthen your hospital's brand in Bangladesh's competitive healthcare market",
    icon: Landmark,
    category: "Branding",
    color: "text-sky-500",
    bgColor: "bg-sky-50",
  },
  {
    name: "Instant Updates",
    description:
      "Update your hospital information, services, and offerings in real-time to keep patients informed",
    icon: Zap,
    category: "Updates",
    color: "text-amber-500",
    bgColor: "bg-amber-50",
  },
  {
    name: "Recognition & Credibility",
    description:
      "Gain recognition as a trusted healthcare provider on Bangladesh's premier health platform",
    icon: Award,
    category: "Credibility",
    color: "text-teal-500",
    bgColor: "bg-teal-50",
  },
];

export default function Benefits() {
  return (
    <section className="relative overflow-hidden py-24" id="benefits">
      {/* Main Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-50/90 via-white to-slate-50/90 dark:from-slate-900/90 dark:via-slate-900 dark:to-slate-900/90" />

      {/* Decorative Gradients */}
      <div className="absolute -left-4 top-0 h-3/4 w-3/4 rotate-12 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent blur-3xl dark:from-blue-900/20" />
      <div className="absolute -right-4 bottom-0 h-3/4 w-3/4 -rotate-12 bg-gradient-to-tl from-emerald-50/50 via-transparent to-transparent blur-3xl dark:from-emerald-900/20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-3 text-base font-semibold capitalize tracking-wide text-blue-600 dark:text-blue-400">
            Hospital Benefits
          </h2>
          <h3 className="mb-6 text-4xl font-bold !leading-tight text-slate-900 dark:text-white md:text-5xl xl:text-6xl">
            Benefits of Joining <br />{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-200">
              Healtha for Hospitals
            </span>
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Discover how we empower hospitals to enhance visibility, attract
            more patients, and streamline management
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.name}
              className="group relative overflow-hidden rounded-xl border border-slate-100/50 bg-white/50 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg dark:border-slate-700/50 dark:bg-slate-800/30"
            >
              <div className="mb-4 flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg ${benefit.bgColor} transition-transform duration-300 group-hover:scale-110 dark:bg-opacity-10`}
                >
                  <benefit.icon
                    className={`h-6 w-6 ${benefit.color}`}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <span
                    className={`${benefit.bgColor} ${benefit.color} inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium dark:bg-opacity-10`}
                  >
                    {benefit.category}
                  </span>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {benefit.name}
                  </h4>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                {benefit.description}
              </p>
              {/* <div className="absolute right-4 top-4">
                <span
                  className={`${benefit.bgColor} ${benefit.color} inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium dark:bg-opacity-10`}
                >
                  {benefit.category}
                </span>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
