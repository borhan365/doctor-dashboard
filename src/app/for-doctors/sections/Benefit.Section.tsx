import {
  Award,
  BookOpen,
  Brain,
  ChartBar,
  Clock,
  FileText,
  Globe,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  Shield,
  Star,
  Stethoscope,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const benefits = [
  {
    name: "Build Patient Trust",
    description:
      "Attract new patients and build your practice with reviews & referrals from happy patients",
    icon: Users,
    category: "Growth",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    name: "Easy Location Access",
    description:
      "Help your patients find your clinic effortlessly with our integrated map and direction features",
    icon: MapPin,
    category: "Location",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    name: "24/7 Availability",
    description:
      "Allow patients to send booking requests anytime, even when your clinic is closed",
    icon: Clock,
    category: "Booking",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    name: "Patient Reviews",
    description:
      "Build credibility with verified patient reviews and ratings to showcase your expertise",
    icon: Star,
    category: "Reviews",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    name: "Practice Analytics",
    description:
      "Get insights into your practice performance with detailed analytics and reports",
    icon: ChartBar,
    category: "Analytics",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    name: "Patient Communication",
    description:
      "Stay connected with your patients through our secure messaging system",
    icon: MessageSquare,
    category: "Communication",
    color: "text-rose-500",
    bgColor: "bg-rose-50",
  },
  {
    name: "Grow your professional network",
    description:
      "Share and discuss everyday moments of your practice with thousands of other doctors across the globe",
    icon: Users,
    category: "Network",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    name: "Achieve more together",
    description:
      "Tap into the collective intelligence of the community and make faster, smarter treatment decisions",
    icon: Brain,
    category: "Collaboration",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    name: "Build your online reputation",
    description:
      "Share your expertise with millions of care seekers on the platform. Make a real difference and help people feel good",
    icon: Award,
    category: "Reputation",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    name: "Grow your practice",
    description:
      "Get more patients to your real-world practice, your institution, or your online practice",
    icon: TrendingUp,
    category: "Growth",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    name: "Smart patient care",
    description:
      "Paperless medical records and practice management that allows you to focus on healing your patients",
    icon: Stethoscope,
    category: "Care",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    name: "Practice Management",
    description:
      "Efficiently manage patient records, prescriptions, appointments, and financials all in one place",
    icon: LayoutDashboard,
    category: "Management",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    name: "24/7 Booking System",
    description:
      "Automated booking system that works round the clock, even when your clinic is closed",
    icon: Clock,
    category: "Booking",
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
  },
  {
    name: "Digital Prescriptions",
    description:
      "Write and manage digital prescriptions securely, reducing paperwork and improving accuracy",
    icon: FileText,
    category: "Digital",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    name: "Secure Platform",
    description:
      "State-of-the-art security measures to protect your and your patients' sensitive information",
    icon: Shield,
    category: "Security",
    color: "text-rose-500",
    bgColor: "bg-rose-50",
  },
  {
    name: "Global Reach",
    description:
      "Connect with patients and healthcare professionals from around the world",
    icon: Globe,
    category: "Global",
    color: "text-sky-500",
    bgColor: "bg-sky-50",
  },
  {
    name: "Instant Updates",
    description:
      "Stay updated with real-time notifications about appointments, messages, and patient updates",
    icon: Zap,
    category: "Updates",
    color: "text-amber-500",
    bgColor: "bg-amber-50",
  },
  {
    name: "Knowledge Sharing",
    description:
      "Access and share medical knowledge, case studies, and best practices with peers",
    icon: BookOpen,
    category: "Education",
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
          <h2 className="text-blue-600 dark:text-blue-400 mb-3 text-base font-semibold capitalize tracking-wide">
            Discover Benefits
          </h2>
          <h3 className="mb-6 text-4xl font-bold text-slate-900 dark:text-white md:text-5xl xl:text-6xl !leading-tight">
          Benefits of Joining <br /> <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-200">Healtha for Doctors</span>
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Discover how we empower doctors to grow their practice and deliver exceptional patient care
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
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {benefit.name}
                </h4>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                {benefit.description}
              </p>
              <div className="absolute right-4 top-4">
                <span
                  className={`${benefit.bgColor} ${benefit.color} inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium dark:bg-opacity-10`}
                >
                  {benefit.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
