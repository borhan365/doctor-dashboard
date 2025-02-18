import { cn } from "@/lib/utils";
import {
  Clock,
  Lightbulb,
  MessageSquare,
  Plus,
  RefreshCw,
  UserCog,
} from "lucide-react";
import Image from "next/image";

export default function FeatureSteps() {
  return (
    <div className="w-full bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
      {/* Profile Editing Section */}
      <section
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-10 lg:px-8 lg:py-10"
        aria-labelledby="profile-editing-heading"
      >
        <div className="grid items-center gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="relative w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 lg:col-span-1">
            <Image
              src="https://doctorondemand.com/wp-content/media-versions/2022/06/1600w_x4000h__q_100_c_DOD-app-mobile-phone.jpeg"
              alt="Mobile app profile editing interface showing doctor profile management features"
              width={400}
              height={400}
              className="object-cover object-center shadow-lg transition-transform duration-300 hover:scale-105 w-full h-full"
              priority
            />

          </div>
          <div className="space-y-6 lg:space-y-8 lg:col-span-2">
            <h2
              id="profile-editing-heading"
              className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl lg:text-4xl"
            >
              Edit your profile from anywhere, effortlessly
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {[
                {
                  icon: Plus,
                  text: "Easily add or modify your details",
                },
                {
                  icon: UserCog,
                  text: "Add information that matters to your patients - timings, fees, new services, and much more",
                },
                {
                  icon: RefreshCw,
                  text: "Keep all your information up to date, with ease",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-base text-slate-600 dark:text-slate-400 sm:text-lg">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-10"
        aria-labelledby="feedback-heading"
      >
        <div className="grid items-center gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="order-2 space-y-6 lg:order-1 lg:space-y-8 lg:col-span-2">
            <h2
              id="feedback-heading"

              className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl lg:text-4xl"
            >
              Keep track of patient feedback
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {[
                {
                  icon: MessageSquare,
                  text: "Know what your patients have to say about you",
                },
                {
                  icon: Clock,
                  text: "Interact with them through your Healtha dashboard",
                },
                {
                  icon: MessageSquare,
                  text: "Build your credibility by replying to their feedback",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-base text-slate-600 dark:text-slate-400 sm:text-lg">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative order-1 w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 lg:order-2 lg:col-span-1">
            <Image
              src="https://www.teladochealth.com/content/dam/tdh-www/us/en/images/hhs/HHS_SoftwareBG.png"
              alt="Interactive dashboard showing patient feedback and ratings"
              width={400}
              height={400}
              className="object-cover object-center shadow-lg transition-transform duration-300 hover:scale-105 w-full h-full"
              priority
            />

          </div>
        </div>
      </section>

      {/* Profile Tips Section */}
      <section
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8 lg:py-10"
        aria-labelledby="profile-tips-heading"
      >
        <div className="grid items-center gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="relative w-full h-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 lg:col-span-1">
            <Image

              src="https://orioly.com/wp-content/uploads/2016/12/qualities-of-a-good-tour-guide-cover-illustration.png"
              alt="Interactive interface showing profile improvement suggestions and tips"
              width={400}
              height={400}
              className="object-cover object-center shadow-lg transition-transform duration-300 hover:scale-105 w-full h-full"
              priority

            />
          </div>
          <div className="space-y-6 lg:space-y-8 lg:col-span-2">
            <h2
              id="profile-tips-heading"
              className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl lg:text-4xl"
            >
              Improve your profile with tips from us
            </h2>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-base text-slate-600 dark:text-slate-400 sm:text-lg">
                {`Does your profile have all the information? We'll remind you
                about all the minute details that can make a huge difference
                impact on your online presence.`}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
