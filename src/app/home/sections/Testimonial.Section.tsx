"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Testimonial {
  id: number;
  name: string;
  designation: string;
  hospital: string;
  image: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Sarah Ahmed",
    designation: "General Physician",
    hospital: "Mount Sinai Hospital",
    image:
      "https://healtha.io/wp-content/uploads/2024/10/Dr.-Chowdhury-Maimuna-Raisa.webp",
    content:
      "Doctor Digital Solutions made managing my clinic so much easier. The prescription system is a game-changer—I can now focus more on my patients rather than paperwork!",
    rating: 5,
  },
  {
    id: 2,
    name: "Dr. Anil Kumar",
    designation: "Dentist",
    hospital: "Mayo Clinic",
    image:
      "https://healtha.io/wp-content/uploads/2024/10/Dr.-Ripon-Nath-medicine-chattogram.webp",
    content:
      "I was skeptical at first, but their team guided me through everything. My website looks professional, and the SEO service has increased my patient bookings by 40%!",
    rating: 5,
  },
  {
    id: 3,
    name: "Dr. Emily Carter",
    designation: "Pediatrician",
    hospital: "Cleveland Clinic",
    image:
      "https://healtha.io/wp-content/uploads/2024/10/Dr.-Pulak-Kanti-Palit-cardiology-specialist-chattogram.webp",
    content:
      "Their Pro Plan is worth every penny! I can now manage appointments, prescriptions, and telemedicine seamlessly. Highly recommended for busy practitioners.",
    rating: 5,
  },
  {
    id: 4,
    name: "Dr. Michael Chen",
    designation: "Cardiologist",
    hospital: "Johns Hopkins Hospital",
    image:
      "https://healtha.io/wp-content/uploads/2024/10/Dr.-Nurer-Nobi-Rahat.png",
    content:
      "The integration capabilities are impressive. It works seamlessly with our existing systems, and the patient management features have streamlined our operations significantly.",
    rating: 5,
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left">
      <div className="mb-8 md:mb-0 md:mr-12">
        <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-white shadow-lg dark:border-slate-700">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="max-w-2xl">
        <div className="mb-4 text-left">
          <span className="mb-2 block text-lg font-medium text-blue-600 dark:text-blue-400">
            Testimonials
          </span>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
            What Our Doctors Say
          </h2>
        </div>

        <blockquote className="mb-2 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          {testimonial.content}
        </blockquote>

        <div>
          <h3 className="mb-1 text-xl font-semibold text-slate-900 dark:text-white">
            {testimonial.name}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <span className="font-medium text-blue-500 dark:text-blue-400">
              {testimonial.designation}
            </span>{" "}
            at {testimonial.hospital}
          </p>

          <div className="mb-2 mt-2 flex justify-start gap-0.5">
            {Array.from({ length: testimonial.rating }).map((_, index) => (
              <Star
                key={index}
                className="h-4 w-4 fill-yellow-500 text-yellow-500 dark:fill-yellow-400 dark:text-yellow-400"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 dark:bg-slate-900 md:py-24">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-white dark:from-slate-900/50 dark:via-slate-900 dark:to-slate-900" />

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100/50 via-transparent to-transparent dark:from-slate-800/50" />

      <div className="container relative mx-auto max-w-6xl px-4">
        <div className="relative mx-auto max-w-5xl">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            navigation={true}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            }}
            autoplay={{ delay: 9000, disableOnInteraction: false }}
            loop={true}
            className="testimonial-swiper !pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
