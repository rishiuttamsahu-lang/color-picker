'use client';

import { Play } from 'lucide-react';

export default function VideoHero() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260228_065522_522e2295-ba22-457e-8fdb-fbcd68109c73.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Floating Navbar */}
      <div className="absolute top-0 left-0 right-0 z-10 px-4 sm:px-6">
        <nav className="bg-background/70 backdrop-blur-xl border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.05)] rounded-[16px] flex items-center justify-between px-6 py-3 max-w-6xl mx-auto mt-6 relative">
          {/* Logo */}
          <div className="font-bold text-lg text-foreground">
            Logoisum
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#about" className="font-medium text-[14px] text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#works" className="font-medium text-[14px] text-foreground hover:text-primary transition-colors">
              Works
            </a>
            <a href="#services" className="font-medium text-[14px] text-foreground hover:text-primary transition-colors">
              Services
            </a>
            <a href="#testimonial" className="font-medium text-[14px] text-foreground hover:text-primary transition-colors">
              Testimonial
            </a>
          </div>

          {/* CTA Button */}
          <button className="bg-primary text-primary-foreground rounded-full px-5 py-2.5 text-sm flex items-center gap-3 hover:bg-primary/90 transition-colors">
            Book A Free Meeting
            <div className="bg-accent text-accent-foreground rounded-full p-1">
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </button>
        </nav>
      </div>

      {/* Hero Content */}
      <div className="flex flex-col items-center justify-center text-center relative z-10 h-full mt-24 px-4">
        {/* Line 1 - Sans-serif */}
        <h1 className="font-sans font-medium tracking-[-4px] text-[40px] md:text-[56px] text-white leading-tight">
          Agency that makes your
        </h1>

        {/* Line 2 - Serif Italic */}
        <h2 className="font-serif italic text-[60px] md:text-[84px] text-white leading-tight mt-2">
          videos & reels viral
        </h2>

        {/* Subtext */}
        <p className="font-medium text-[18px] text-white/90 mt-6 max-w-2xl">
          Short-form video editing for Influencers, Creators and Brands
        </p>

        {/* Secondary CTA */}
        <button className="bg-white text-gray-900 rounded-full px-8 py-4 font-semibold mt-10 hover:bg-white/90 flex items-center gap-2 transition-colors">
          <Play className="w-5 h-5 fill-gray-900" />
          See Our Workreel
        </button>
      </div>
    </section>
  );
}
