import {
  ArrowUpRight,
  BadgeCheck,
  Crown,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";

const benefits = [
  {
    icon: Crown,
    title: "Premium Search Position",
    description:
      "Secure top placement in search results for your specialty and location",
    features: [
      "Above organic results",
      "Category-specific visibility",
      "24/7 exposure",
    ],
  },
  {
    icon: BadgeCheck,
    title: "Enhanced Credibility",
    description:
      "Stand out with premium verification badge and sponsored profile highlights",
    features: ["Verified badge", "Premium profile tag", "Trust indicators"],
  },
  {
    icon: Users,
    title: "Wider Patient Reach",
    description:
      "Connect with more patients actively searching for healthcare services",
    features: ["Expanded visibility", "Targeted audience", "Higher engagement"],
  },
  {
    icon: TrendingUp,
    title: "Growth Analytics",
    description:
      "Track your performance with detailed insights and engagement metrics",
    features: ["View statistics", "Patient insights", "ROI tracking"],
  },
];

export default function BenefitsSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 dark:bg-slate-900/50">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 -translate-y-12 translate-x-12 blur-3xl">
          <svg
            className="h-48 w-48 opacity-50 dark:opacity-20"
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 32C0 14.3269 14.3269 0 32 0H40C57.6731 0 72 14.3269 72 32V40C72 57.6731 57.6731 72 40 72H32C14.3269 72 0 57.6731 0 40V32Z"
              fill="#3B82F6"
            />
          </svg>
        </div>
        <div className="absolute -left-12 bottom-0 translate-y-12 blur-3xl">
          <svg
            className="h-48 w-48 opacity-50 dark:opacity-20"
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 32C0 14.3269 14.3269 0 32 0H40C57.6731 0 72 14.3269 72 32V40C72 57.6731 57.6731 72 40 72H32C14.3269 72 0 57.6731 0 40V32Z"
              fill="#60A5FA"
            />
          </svg>
        </div>
      </div>

      <div className="container relative mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Premium Features
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-4xl">
            Unlock These Exclusive Benefits
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Stand out from the competition and attract more patients with our
            premium advertising features
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-0 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group relative rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:bg-slate-800"
              >
                <div className="mb-6 flex items-start justify-between">
                  <span className="inline-flex rounded-lg bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                    <Icon className="h-6 w-6" />
                  </span>
                  <ArrowUpRight className="h-6 w-6 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 dark:text-slate-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="mb-6 text-slate-600 dark:text-slate-400">
                  {benefit.description}
                </p>
                <ul className="space-y-3">
                  {benefit.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-2 text-base font-normal text-slate-600 dark:text-slate-400"
                    >
                      <Star className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Feature Preview */}
        <div className="mt-16 rounded-2xl bg-gradient-to-b from-blue-600 to-blue-800 p-8 dark:from-blue-500 dark:to-blue-700">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="text-white">
              {/* image */}
              <Image
                src="https://cdn3d.iconscout.com/3d/premium/thumb/ads-3d-icon-download-in-png-blend-fbx-gltf-file-formats--advertising-advertisement-promotion-business-pack-icons-8796184.png?f=webp"
                alt="Premium profile preview"
                width={200}
                height={200}
                className="object-contain"
              />
              <h3 className="mb-4 text-2xl font-bold">
                See Your Profile at the Top
              </h3>
              <p className="mb-6 text-blue-100">
                Get premium visibility with sponsored listings that appear above
                organic search results. Stand out to patients looking for your
                expertise.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="rounded-lg bg-white/10 px-4 py-2">
                  <div className="text-2xl font-bold">5x</div>
                  <div className="text-sm text-blue-100">More Views</div>
                </div>
                <div className="rounded-lg bg-white/10 px-4 py-2">
                  <div className="text-2xl font-bold">3x</div>
                  <div className="text-sm text-blue-100">More Contacts</div>
                </div>
                <div className="rounded-lg bg-white/10 px-4 py-2">
                  <div className="text-2xl font-bold">2x</div>
                  <div className="text-sm text-blue-100">More Bookings</div>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src="https://www.practo.com/providers/static/images/pages/clinics/profilesBlue.png"
                alt="Premium profile preview"
                fill
                className="object-cover"
              />

              <div className="absolute bottom-4 left-4 rounded-lg bg-blue-600 px-3 py-1 text-sm font-medium text-white">
                Premium Profile
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
