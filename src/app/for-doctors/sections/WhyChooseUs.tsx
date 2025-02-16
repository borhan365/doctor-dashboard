import { cn } from "@/lib/utils";
import { Clock, Shield, Star } from "lucide-react";
import Image from "next/image";

export default function WhyChooseUs() {
  const features = [
    {
      title: "4.9/5 Rating",
      description:
        "Thousands of patients left our clinical teams excellent reviews after receiving the virtual care they needed.",
      icon: Star,
      image:
        "https://doctorondemand.com/wp-content/media-versions/2023/12/500w_x9999h__q_100_c_dod_laptop-visit-mom-child.png",
      alt: "Patient having a video consultation with doctor",
    },
    {
      title: "24/7 Availability",
      description:
        "Our virtual urgent care providers are here 24/7/365 for support. Or, book a visit with a therapist or psychiatrist night or day, during the week or on the weekend.",
      icon: Clock,
      image:
        "https://doctorondemand.com/wp-content/media-versions/2023/08/500w_x9999h__q_100_c_seasian_woman_lounging_couch_telemed_iStock-889461056.png",
      alt: "Person using healthcare app on phone",
    },
    {
      title: "100% Confidential",
      description:
        "Our app lets you see board-certified doctors, psychiatrists, and providers in a secure, confidential, and HIPAA-compliant online experience.",
      icon: Shield,
      image:
        "https://doctorondemand.com/wp-content/media-versions/2023/12/500w_x9999h__q_100_c_military-dad-daughter.jpg",
      alt: "Representation of healthcare security and trust",
    },
  ];

  return (
    <section
      className="bg-white py-12 dark:bg-slate-900 sm:py-16 lg:py-20"
      aria-labelledby="why-choose-us-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:mb-12 lg:mb-16">
          <h2
            id="why-choose-us-heading"
            className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl lg:text-5xl"
          >
            Why Choose{" "}
            <span className="text-blue-600 dark:text-blue-400">Healtha</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Experience healthcare reimagined with our comprehensive virtual care
            platform
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex flex-col"
              role="article"
            >
              <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={cn(
                    "object-cover transition-transform duration-300",
                    "group-hover:scale-105",
                  )}
                  priority={false}
                />
              </div>

              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <feature.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                  {feature.title}
                </h3>
              </div>

              <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
