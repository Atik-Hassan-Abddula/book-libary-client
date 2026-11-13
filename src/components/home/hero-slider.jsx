
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

import { Swiper, SwiperSlide } from "swiper/react";

import {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import {
  BookOpen,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const slides = [
  {
    id: 1,
    subtitle: "WELCOME TO BOOKNOOK",
    title: "Discover Your Next Favorite Book",
    description:
      "Explore thousands of amazing stories, expand your knowledge, and find your next great read.",
    gradient: "from-emerald-950 via-emerald-800 to-teal-700",
    accent: "bg-emerald-400",
    number: "01",
  },
  {
    id: 2,
    subtitle: "READ • LEARN • GROW",
    title: "Every Book Opens a New World",
    description:
      "From inspiring fiction to fascinating science, there is always something new waiting for you.",
    gradient: "from-slate-950 via-indigo-950 to-violet-800",
    accent: "bg-violet-400",
    number: "02",
  },
  {
    id: 3,
    subtitle: "YOUR PERSONAL LIBRARY",
    title: "Borrow Books, Build Knowledge",
    description:
      "Discover interesting books, borrow your favorites, and make reading a part of your everyday life.",
    gradient: "from-orange-950 via-rose-900 to-pink-800",
    accent: "bg-orange-400",
    number: "03",
  },
];

export default function HeroSlider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gray-950">
      {!isMounted ? (
        <div className="flex min-h-[540px] items-center bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 px-6 py-20 md:min-h-[620px] md:px-12 lg:px-20">
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[2px] text-white">
                <Sparkles size={15} />
                WELCOME TO BOOKNOOK
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Discover Your Next Favorite Book
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-white/75 md:text-lg">
                Explore thousands of amazing stories, expand your knowledge, and find your next great read.
              </p>

              <Link
                href="/books"
                className="mt-9 inline-flex items-center gap-3 rounded-xl bg-white px-7 py-4 text-sm font-bold text-gray-900 shadow-xl transition hover:bg-emerald-50"
              >
                <BookOpen size={19} />
                Browse Books
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Swiper
          modules={[
            Autoplay,
            Pagination,
            Navigation,
            EffectFade,
          ]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation
          loop
          speed={900}
          className="booknook-hero-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className={`relative flex min-h-[540px] items-center overflow-hidden bg-gradient-to-br ${slide.gradient} px-6 py-20 md:min-h-[620px] md:px-12 lg:px-20`}
              >
                {/* Background Decoration */}

                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.2 }}
                  className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border border-white/10"
                />

                <div className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 rounded-full border border-white/10" />

                <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

                {/* Content */}

                <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
                  <div className="max-w-2xl">
                    <motion.div
                      key={`${slide.id}-subtitle`}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7 }}
                      className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[2px] text-white backdrop-blur-sm"
                    >
                      <Sparkles size={15} />
                      {slide.subtitle}
                    </motion.div>

                    <motion.h1
                      key={`${slide.id}-title`}
                      initial={{ opacity: 0, y: 45 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.15,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
                    >
                      {slide.title}
                    </motion.h1>

                    <motion.p
                      key={`${slide.id}-description`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="mt-6 max-w-xl text-base leading-8 text-white/75 md:text-lg"
                    >
                      {slide.description}
                    </motion.p>

                    <motion.div
                      key={`${slide.id}-button`}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.45 }}
                      className="mt-9 flex flex-wrap items-center gap-4"
                    >
                      <Link
                        href="/books"
                        className="group inline-flex items-center gap-3 rounded-xl bg-white px-7 py-4 text-sm font-bold text-gray-900 shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-emerald-50"
                      >
                        <BookOpen size={19} />
                        Browse Books

                        <ArrowRight
                          size={18}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </Link>

                      <span className="text-sm font-medium text-white/60">
                        Your reading journey starts here.
                      </span>
                    </motion.div>
                  </div>

                  {/* Decorative Book Illustration */}

                  <motion.div
                    initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                      duration: 1,
                      delay: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative hidden items-center justify-center lg:flex"
                  >
                    <div className="relative flex h-80 w-80 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm xl:h-96 xl:w-96">
                      <div className="absolute inset-7 rounded-full border border-white/10" />

                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="relative flex h-48 w-40 -rotate-6 items-center justify-center rounded-r-2xl rounded-l-md border-l-8 border-emerald-300 bg-gradient-to-br from-white to-emerald-100 shadow-2xl transition-transform duration-500 hover:rotate-0 xl:h-56 xl:w-48"
                      >
                        <div className="absolute left-2 top-0 h-full border-l border-emerald-200" />

                        <div className="flex flex-col items-center gap-4 text-center text-emerald-900">
                          <BookOpen size={55} strokeWidth={1.4} />

                          <span className="text-xl font-black tracking-widest">
                            BOOKNOOK
                          </span>

                          <span className="text-[9px] tracking-[3px]">
                            READ YOUR WORLD
                          </span>
                        </div>
                      </motion.div>

                      <div
                        className={`absolute -right-4 top-16 h-12 w-12 rounded-2xl ${slide.accent} opacity-80 blur-sm`}
                      />

                      <div className="absolute -bottom-2 left-14 h-5 w-5 rounded-full bg-white/60" />

                      <div className="absolute right-16 -top-3 h-4 w-4 rounded-full bg-white/60" />
                    </div>
                  </motion.div>
                </div>

                {/* Slide Number */}

                <div className="absolute bottom-8 right-8 hidden text-5xl font-black text-white/20 md:block">
                  {slide.number}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
