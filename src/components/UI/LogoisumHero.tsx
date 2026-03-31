"use client";

import { Barlow, Instrument_Serif } from "next/font/google";
import { Pipette, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeInUp } from "./FadeInUp";
import { FadeInDown } from "./FadeInDown";

const barlow = Barlow({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  weight: ["400"],
  style: ["italic"],
  subsets: ["latin"],
});

export function LogoisumHero() {
  return (
    <section className="relative flex min-h-[100vh] w-full flex-col items-center justify-center overflow-hidden bg-black">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-90"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260228_065522_522e2295-ba22-457e-8fdb-fbcd68109c73.mp4"
          type="video/mp4"
        />
      </video>

      {/* Floating Navbar */}
      <FadeInDown 
        delay={0} 
        className="absolute top-6 left-0 w-full z-50 flex justify-center px-4 md:top-8"
      >
        <nav className="flex w-[95%] max-w-6xl items-center justify-between rounded-[16px] bg-white px-6 py-3 shadow-sm">
          {/* Logo */}
          <div className={cn("text-xl font-bold tracking-tight text-gray-900", barlow.className)}>
            ChromaGrab
          </div>

          {/* Center Links */}
          <div className={cn("hidden items-center gap-8 text-[14px] font-medium text-gray-800 md:flex", barlow.className)}>
            <a href="#features" className="hover:text-gray-500 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-gray-500 transition-colors">How it Works</a>
            <a href="#shortcuts" className="hover:text-gray-500 transition-colors">Shortcuts</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition-colors">GitHub</a>
          </div>

          {/* Right CTA */}
          <a 
            href="#picker-section"
            className={cn("flex items-center gap-2 rounded-full bg-[#222] py-2 pl-5 pr-3 text-sm font-medium text-white transition-transform hover:scale-105 cursor-pointer", barlow.className)}
          >
            Start Picking
            <ChevronRight className="h-4 w-4" />
          </a>
        </nav>
      </FadeInDown>

      {/* Main Hero Content */}
      <div className="relative z-10 mt-16 flex flex-col items-center px-4 text-center text-white">
        <FadeInUp delay={200}>
          <h1 className="flex flex-col items-center justify-center">
            <span
              className={cn(
                "text-[32px] md:text-[56px] font-semibold leading-none tracking-[-2px] md:tracking-[-4px]",
                barlow.className
              )}
            >
              Pick any colour, anywhere.
            </span>
            <span
              className={cn(
                "mt-2 text-[48px] md:text-[84px] leading-tight",
                instrument.className
              )}
              style={{ color: '#005f75' }}
            >
              In every format, instantly.
            </span>
          </h1>
        </FadeInUp>

        <FadeInUp delay={400}>
          <p
            className={cn(
              "mt-6 max-w-2xl text-[16px] md:text-[18px] font-medium text-white/90",
              barlow.className
            )}
          >
            Extract precise colour values from any visual source — browser canvas, uploaded images, or image URLs. Zero friction, no login required.
          </p>
        </FadeInUp>

        <FadeInUp delay={600}>
          <a
            href="#picker-section"
            className={cn(
              "mt-10 flex items-center gap-2 rounded-full bg-white px-8 py-4 text-[16px] font-semibold text-gray-900 shadow-lg transition-transform hover:scale-105 hover:bg-gray-50 cursor-pointer",
              barlow.className
            )}
          >
            <Pipette className="h-5 w-5 fill-gray-900" />
            Pick from Screen
          </a>
        </FadeInUp>
      </div>
    </section>
  );
}
