'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, color } from 'framer-motion';
import { Pipette, Upload, ImagePlus, ClipboardCheck, Star, ChevronDown } from 'lucide-react';
import { Barlow, Instrument_Serif } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ImageCanvas } from '@/components/Canvas/ImageCanvas';
import { useColourStore } from '@/store/useColourStore';
import { ImageSelectModal } from '@/components/UI/ImageSelectModal';
import { useEyeDropper } from '@/hooks/useEyeDropper';
import { LogoisumHero } from '@/components/UI/LogoisumHero';
import { FadeInUp } from '@/components/UI/FadeInUp';
import { MinimalFooter } from '@/components/UI/minimal-footer';
import { getRandomRgb, convertAll } from '@/lib/colour/convert';

const barlow = Barlow({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

const instrument = Instrument_Serif({
  weight: ['400'],
  style: ['italic'],
  subsets: ['latin'],
});

// ── Inline CopyButton ──────────────────────────────────────────────────────
function PickerCopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { }
  };

  return (
    <motion.button
      onClick={handleCopy}
      whileTap={{ scale: 0.92 }}
      className={cn(
        'flex-shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide transition-all cursor-pointer',
        copied
          ? 'bg-[#2e7d52] text-white'
          : 'bg-[#1a1a1a] text-white hover:bg-[#333]',
        barlow.className,
      )}
    >
      {copied ? 'Copied!' : 'Copy'}
    </motion.button>
  );
}

// ── Format row ─────────────────────────────────────────────────────────────
function FormatLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5 border-b border-black/[0.05] last:border-0">
      <span
        className={cn(
          'text-[10px] font-semibold tracking-[0.12em] uppercase text-gray-400 w-10 flex-shrink-0',
          barlow.className,
        )}
      >
        {label}
      </span>
      <span className="flex-1 text-[13px] text-gray-700 truncate font-mono" title={value}>
        {value}
      </span>
      <PickerCopyButton value={value} />
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function Home() {
  const [loadedImage, setLoadedImage] = useState<File | string>('/demo-image.jpg');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0); // 0 means first one is open by default
  const { pickedColour, history, setColour } = useColourStore();
  const { openScanner, isSupported, colorInputRef, handleColorInputChange } = useEyeDropper();

  const faqs = [
    {
      question: "Is ChromaGrab really free?",
      answer: "Yes, 100% free. There are no paywalls, no hidden subscriptions, and you don't even need to create an account to use the tool."
    },
    {
      question: "Are my uploaded images stored on your servers?",
      answer: "No. All image processing and colour extraction happens entirely locally inside your own browser using the HTML5 Canvas API. Your images are never uploaded to any external server, ensuring complete privacy."
    },
    {
      question: "Why isn't the 'Pick from Screen' button working for me?",
      answer: "The native screen colour picker relies on the EyeDropper API, which is currently only supported on Chromium-based desktop browsers like Google Chrome, Microsoft Edge, and Opera. If you are using Firefox or Safari, you can still upload images or paste URLs to extract colours!"
    }
  ];

  // Set random color on initial mount - ONLY RUNS ONCE (prevents infinite loop)
  useEffect(() => {
    if (!pickedColour) {
      const randomRgb = getRandomRgb();
      const colorData = convertAll(randomRgb.r, randomRgb.g, randomRgb.b, 1);
      setColour(randomRgb.r, randomRgb.g, randomRgb.b, 1);
    }
  }, []); // Empty dependency array = runs only once on mount

  const handleImageLoad = (image: File | string) => setLoadedImage(image);

  const handleHistoryClick = (color: string) => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    setColour(r, g, b, 1);
  };

  const handleScreenPick = async () => {
    try {
      const color = await openScanner();
      if (color) {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        setColour(r, g, b, 1);
      }
    } catch { }
  };

  const handleFallbackColorPick = (color: string) => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    setColour(r, g, b, 1);
  };

  const isDark = pickedColour
    ? (pickedColour.r * 299 + pickedColour.g * 587 + pickedColour.b * 114) / 1000 < 128
    : false;

  return (
    <div className="min-h-screen">
      <LogoisumHero />

      {/* ── Picker Section ── */}
      <section
        id="picker-section"
        className="min-h-screen py-20 px-4 flex flex-col items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(124, 195, 255 , 0.7) 0%, rgba(245, 243, 255, 0.7) 45%, rgba(196, 255, 236, 0.7) 100%)',
        }}
      >
        {/* Heading */}
        <FadeInUp delay={0}>
          <div className="mb-10 text-center">
            <h2
              className={cn(
                'text-[28px] md:text-[40px] font-semibold tracking-tight text-gray-900 leading-none',
                barlow.className,
              )}
            >
              Pick any colour,{' '}
              <span className={cn('text-gray-500', instrument.className)} style={{ color: 'lab(45 -45.54 0.59)' }}>
                instantly.
              </span>
            </h2>
            <p className={cn('mt-3 text-[14px] text-gray-500 font-medium', barlow.className)}>
              Click anywhere on the image to extract precise colour values.
            </p>
          </div>
        </FadeInUp>

        {/* Card */}
        <FadeInUp delay={400} className="w-full max-w-5xl">
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.88)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 8px 48px rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04)',
              border: '1px solid rgba(255,255,255,0.9)',
            }}
          >
            <div className="flex flex-col lg:flex-row">

              {/* LEFT */}
              <div className="flex-1 min-w-0 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-black/[0.05]">
                <p className={cn('mb-3 text-[10px] font-semibold tracking-[0.14em] uppercase text-gray-400', barlow.className)}>
                  Image
                </p>

                <div className="rounded-2xl overflow-hidden border border-black/[0.06]">
                  <ImageCanvas imageSource={loadedImage} />
                </div>

                {/* Palette */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex-1 min-w-0 flex gap-2 overflow-x-auto pb-0.5 no-scrollbar">
                    <AnimatePresence>
                      {history.slice(0, 12).map((color, i) => (
                        <motion.button
                          key={color + i}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          onClick={() => handleHistoryClick(color)}
                          className="w-8 h-8 rounded-xl flex-shrink-0 border-2 transition-transform hover:scale-110 cursor-pointer"
                          style={{
                            backgroundColor: color,
                            borderColor: pickedColour?.hex === color ? '#1a1a1a' : 'rgba(0,0,0,0.10)',
                          }}
                          title={color}
                        />
                      ))}
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={() => pickedColour && handleHistoryClick(pickedColour.hex)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-700 border border-dashed border-black/[0.14] hover:border-black/30 transition-all cursor-pointer flex-shrink-0"
                    title="Save colour"
                  >
                    <span className="text-base leading-none select-none">+</span>
                  </button>
                </div>
              </div>

              {/* RIGHT */}
              <div className="w-full lg:w-[340px] flex-shrink-0 p-6 lg:p-8 flex flex-col gap-5">
                <p className={cn('text-[10px] font-semibold tracking-[0.14em] uppercase text-gray-400', barlow.className)}>
                  Colour
                </p>

                {/* Preview */}
                <motion.div
                  className="w-full rounded-2xl overflow-hidden border border-black/[0.06] flex items-center justify-center"
                  animate={{ backgroundColor: pickedColour?.hex ?? '#f1f0ee' }}
                  transition={{ duration: 0.15 }}
                  style={{ height: 88 }}
                >
                  <AnimatePresence mode="wait">
                    {pickedColour ? (
                      <motion.span
                        key={pickedColour.hex}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className={cn('text-[13px] font-semibold tracking-widest font-mono', barlow.className)}
                        style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.4)' }}
                      >
                        {pickedColour.hex}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={cn('text-[14px] text-gray-400 italic', instrument.className)}
                      >
                        No colour selected
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Formats */}
                <div className="flex-1">
                  <AnimatePresence mode="wait">
                    {pickedColour ? (
                      <motion.div
                        key="formats"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="rounded-2xl border border-black/[0.05] px-4 py-1"
                        style={{ background: 'rgba(0,0,0,0.015)' }}
                      >
                        <FormatLine label="HEX" value={pickedColour.hex} />
                        <FormatLine label="RGBA" value={pickedColour.rgba} />
                        <FormatLine label="HSL" value={pickedColour.hsl} />
                        <FormatLine label="HSB" value={pickedColour.hsb} />
                        <FormatLine label="CMYK" value={pickedColour.cmyk} />
                        <FormatLine label="CSS" value={pickedColour.cssVar} />
                        {pickedColour.tailwind && (
                          <FormatLine label="TW" value={pickedColour.tailwind} />
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty-formats"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="rounded-2xl border border-dashed border-black/[0.08] flex items-center justify-center"
                        style={{ height: 168 }}
                      >
                        <p className={cn('text-[13px] text-gray-400 italic', instrument.className)}>
                          Pick a colour to see formats
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2.5">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className={cn(
                      'w-full flex items-center justify-center gap-2 rounded-full border border-black/[0.12] py-3 text-[14px] font-medium text-gray-700 transition-all hover:border-black/25 hover:bg-black/[0.02] cursor-pointer',
                      barlow.className,
                    )}
                  >
                    <Upload className="w-4 h-4" />
                    Use your image
                  </button>

                  <button
                    onClick={handleScreenPick}
                    disabled={!isSupported}
                    className={cn(
                      'w-full flex items-center justify-center gap-2 rounded-full bg-[#1a1a1a] py-3 text-[14px] font-semibold text-white transition-all hover:bg-[#333] active:scale-[0.98] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed',
                      barlow.className,
                    )}
                    title={!isSupported ? 'Use system color picker to pick any colour' : 'Pick a colour from your screen'}
                  >
                    <Pipette className="w-4 h-4" />
                    {isSupported ? 'Pick from Screen' : 'Pick a Colour'}
                  </button>

                  {/* Hidden color input for fallback */}
                  <input
                    ref={colorInputRef}
                    type="color"
                    className="hidden"
                    onChange={handleColorInputChange(handleFallbackColorPick)}
                    aria-hidden="true"
                  />

                  <p className={cn('text-center text-[11px] text-gray-400 leading-relaxed', barlow.className)}>
                    All processing happens in your browser — no data is sent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeInUp>
      </section>

      {/* ── How It Works Section ── */}
      <section
        className="py-24 px-4 flex flex-col items-center justify-center"
        style={{
          background: 'linear-gradient(25deg, rgba(255, 167, 246, 0.7) 0%, rgba(245, 243, 255, 0.7) 45%, rgba(196, 255, 236, 0.7) 100%)',
        }}
      >
        <div className="w-full max-w-5xl">
          <FadeInUp id="how-it-works">
            <div className="mb-16 text-center">
              <h2 className={cn("text-[32px] md:text-[44px] font-semibold tracking-tight text-gray-900 leading-none", barlow.className)}>
                How it <span className={cn("text-gray-400", instrument.className)}
                  style={{ color: '#9f00e7' }}>works</span>
              </h2>
              <p className={cn("mt-4 text-[15px] text-gray-500 font-medium max-w-lg mx-auto", barlow.className)}>
                Extracting the perfect colour is now as simple as a click. No complex tools, no sign-ups.
              </p>
            </div>
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Step 1 */}
            <FadeInUp delay={0}>
              <div className="relative overflow-hidden rounded-[24px] p-8 border border-black/[0.04] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 group">
                <div className={cn("absolute -right-4 -top-8 text-[120px] text-black/[0.02] z-0 select-none", instrument.className)}>
                  01
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-black/[0.04] flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    <ImagePlus className="w-5 h-5" />
                  </div>
                  <h3 className={cn("text-[18px] font-semibold text-gray-900 mb-3", barlow.className)}>Choose a Source</h3>
                  <p className={cn("text-[14px] text-gray-500 leading-relaxed", barlow.className)}>
                    Upload an image from your device, paste an image URL, or use the Screen Picker to grab colours from anywhere on your display.
                  </p>
                </div>
              </div>
            </FadeInUp>

            {/* Step 2 */}
            <FadeInUp delay={200}>
              <div className="relative overflow-hidden rounded-[24px] p-8 border border-black/[0.04] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 group">
                <div className={cn("absolute -right-4 -top-8 text-[120px] text-black/[0.02] z-0 select-none", instrument.className)}>
                  02
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-black/[0.04] flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    <Pipette className="w-5 h-5" />
                  </div>
                  <h3 className={cn("text-[18px] font-semibold text-gray-900 mb-3", barlow.className)}>Extract the Colour</h3>
                  <p className={cn("text-[14px] text-gray-500 leading-relaxed", barlow.className)}>
                    Simply click or tap on the exact pixel you want. Our magnifying loupe ensures you get pixel-perfect accuracy every single time.
                  </p>
                </div>
              </div>
            </FadeInUp>

            {/* Step 3 */}
            <FadeInUp delay={400}>
              <div className="relative overflow-hidden rounded-[24px] p-8 border border-black/[0.04] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 group">
                <div className={cn("absolute -right-4 -top-8 text-[120px] text-black/[0.02] z-0 select-none", instrument.className)}>
                  03
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-black/[0.04] flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    <ClipboardCheck className="w-5 h-5" />
                  </div>
                  <h3 className={cn("text-[18px] font-semibold text-gray-900 mb-3", barlow.className)}>Export Instantly</h3>
                  <p className={cn("text-[14px] text-gray-500 leading-relaxed", barlow.className)}>
                    Get your colour instantly converted into HEX, RGBA, HSL, CMYK, CSS Variables, and even Tailwind CSS utility classes.
                  </p>
                </div>
              </div>
            </FadeInUp>

          </div>
        </div>
      </section>

      {/* ── Features Section (Bento Grid) ── */}
      <section
        className="py-24 px-4 flex flex-col items-center justify-center"
        style={{
          background: 'linear-gradient(150deg, rgba(255, 167, 246, 0.7) 0%, rgba(245, 243, 255, 0.7) 45%, rgba(255, 215, 168, 0.7) 100%)',
        }}
      >
        <div className="w-full max-w-5xl">
          <FadeInUp id="features">
            <div className="mb-16 text-center">
              <h2 className={cn("text-[32px] md:text-[44px] font-semibold tracking-tight text-gray-900 leading-none", barlow.className)}>
                Pro-level <span className={cn("text-gray-400", instrument.className)}
                  style={{ color: '#0032ff' }}>features</span>
              </h2>
              <p className={cn("mt-4 text-[15px] text-gray-500 font-medium max-w-lg mx-auto", barlow.className)}>
                Everything you need to manage colours perfectly, packed into a beautiful, lightweight interface.
              </p>
            </div>
          </FadeInUp>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 (Spans 2 columns on desktop) */}
            <FadeInUp delay={0} className="md:col-span-2">
              <div className="h-full relative overflow-hidden rounded-[24px] p-8 border border-black/[0.04] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 group">
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <h3 className={cn("text-[22px] font-semibold text-gray-900 mb-3", barlow.className)}>100% Local Processing</h3>
                    <p className={cn("text-[15px] text-gray-500 leading-relaxed max-w-md", barlow.className)}>
                      Your images never leave your device. ChromaGrab uses HTML5 Canvas to extract colours directly in your browser, ensuring complete privacy and zero upload times.
                    </p>
                  </div>
                  <div className="mt-8 flex gap-2">
                    <span className={cn("px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold tracking-wide", barlow.className)}>Privacy First</span>
                    <span className={cn("px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold tracking-wide", barlow.className)}>Zero Latency</span>
                  </div>
                </div>
              </div>
            </FadeInUp>

            {/* Feature 2 */}
            <FadeInUp delay={200} className="md:col-span-1">
              <div className="h-full relative overflow-hidden rounded-[24px] p-8 border border-black/[0.04] bg-[#1a1a1a] shadow-[0_8px_24px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 group">
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-white">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
                    </div>
                    <h3 className={cn("text-[20px] font-semibold text-white mb-3", barlow.className)}>Tailwind Ready</h3>
                    <p className={cn("text-[14px] text-gray-400 leading-relaxed", barlow.className)}>
                      Automatically finds the closest matching Tailwind CSS v3 utility class for any colour you pick.
                    </p>
                  </div>
                </div>
              </div>
            </FadeInUp>

            {/* Feature 3 */}
            <FadeInUp delay={400} className="md:col-span-1">
              <div className="h-full relative overflow-hidden rounded-[24px] p-8 border border-black/[0.04] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 group">
                <div className="relative z-10">
                  <h3 className={cn("text-[20px] font-semibold text-gray-900 mb-3", barlow.className)}>Smart History</h3>
                  <p className={cn("text-[14px] text-gray-500 leading-relaxed", barlow.className)}>
                    Never lose a colour. We automatically save your last 12 picked colours to your local browser storage so you can retrieve them anytime.
                  </p>
                </div>
              </div>
            </FadeInUp>

            {/* Feature 4 (Spans 2 columns) */}
            <FadeInUp delay={600} className="md:col-span-2">
              <div className="h-full relative overflow-hidden rounded-[24px] p-8 border border-black/[0.04] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 group">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
                  <div className="flex-1">
                    <h3 className={cn("text-[22px] font-semibold text-gray-900 mb-3", barlow.className)}>6+ Colour Formats</h3>
                    <p className={cn("text-[15px] text-gray-500 leading-relaxed", barlow.className)}>
                      Stop using external converters. Every time you pick a colour, we instantly generate it in HEX, RGBA, HSL, HSB, CMYK, and CSS variable formats.
                    </p>
                  </div>
                  <div className="flex-shrink-0 grid grid-cols-2 gap-2">
                    {['#HEX', 'rgba()', 'hsl()', 'cmyk()', 'hsb()', 'var()'].map((fmt) => (
                      <div key={fmt} className={cn("px-4 py-2 bg-gray-50 border border-black/[0.04] rounded-lg text-center font-mono text-xs text-gray-600", barlow.className)}>
                        {fmt}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* ── Shortcuts Section ── */}
      <section
        className="py-24 px-4 flex flex-col items-center justify-center pb-32"
        style={{
          background: 'linear-gradient(200deg, rgba(255, 215, 168, 0.7) 0%, rgba(245, 243, 255, 0.7) 45%, rgba(224, 231, 255, 0.7) 100%)',
        }}
      >
        <div className="w-full max-w-3xl">
          <FadeInUp id="shortcuts">
            <div className="mb-12 text-center">
              <h2 className={cn("text-[32px] md:text-[44px] font-semibold tracking-tight text-gray-900 leading-none", barlow.className)}>
                Built for <span className={cn("text-gray-400", instrument.className)}
                style={{color: '#ff0000'}}>speed</span>
              </h2>
              <p className={cn("mt-4 text-[15px] text-gray-500 font-medium", barlow.className)}>
                Keep your hands on the keyboard. Use these shortcuts to speed up your workflow.
              </p>
            </div>
          </FadeInUp>

          <FadeInUp delay={200}>
            <div className="rounded-[24px] p-2 border border-black/[0.04] bg-white/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
              <div className="bg-white rounded-[20px] p-8">
                <div className="flex flex-col gap-4">

                  {/* Shortcut 1 */}
                  <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-black/[0.04]">
                    <span className={cn("text-[16px] font-medium text-gray-700", barlow.className)}>Paste Image from Clipboard</span>
                    <div className="flex gap-2">
                      <kbd className={cn("min-w-[32px] h-8 flex items-center justify-center px-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-600 shadow-[0_2px_0_rgba(0,0,0,0.05)]", barlow.className)}>Ctrl</kbd>
                      <kbd className={cn("min-w-[32px] h-8 flex items-center justify-center px-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-600 shadow-[0_2px_0_rgba(0,0,0,0.05)]", barlow.className)}>V</kbd>
                    </div>
                  </div>

                  <div className="h-px w-full bg-black/[0.04]"></div>

                  {/* Shortcut 2 */}
                  <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-black/[0.04]">
                    <span className={cn("text-[16px] font-medium text-gray-700", barlow.className)}>Load Image via URL</span>
                    <div className="flex gap-2">
                      <kbd className={cn("min-w-[32px] h-8 flex items-center justify-center px-3 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-600 shadow-[0_2px_0_rgba(0,0,0,0.05)]", barlow.className)}>Enter</kbd>
                    </div>
                  </div>

                  <div className="h-px w-full bg-black/[0.04]"></div>

                  {/* Shortcut 3 */}
                  <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-black/[0.04]">
                    <span className={cn("text-[16px] font-medium text-gray-700", barlow.className)}>Click Canvas Pixel</span>
                    <div className="flex gap-2">
                      <kbd className={cn("h-8 flex items-center justify-center px-3 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-600 shadow-[0_2px_0_rgba(0,0,0,0.05)]", barlow.className)}>Left Click</kbd>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ── SEO / Info Section ── */}
      <section className="py-24 px-4 flex flex-col items-center justify-center bg-white relative overflow-hidden"
        style={{
          background: 'linear-gradient(172deg, rgba(224, 231, 255, 0.7) 0%, rgba(255, 255, 255, 0.7) 45%, rgba(255, 255, 255, 0.7) 100%)',
        }}>
        <div className="w-full max-w-5xl relative z-10">

          {/* Rating Banner */}
          <FadeInUp delay={0}>
            <div className="flex justify-center mb-20">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-8 py-4 bg-white rounded-2xl border border-black/[0.06] shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-transform hover:-translate-y-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-6 h-6 fill-[#FBBF24] text-[#FBBF24]" />
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <span className={cn("text-[15px] font-medium text-gray-800", barlow.className)}>
                    Do you like ChromaGrab?
                  </span>
                  <a href="#" className={cn("text-[15px] font-semibold text-[#10986C] hover:text-[#0d805b] hover:underline transition-colors", barlow.className)}>
                    Give our service 5 stars. ↗
                  </a>
                </div>
              </div>
            </div>
          </FadeInUp>

          {/* Main 2-Column Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Text Content */}
            <FadeInUp delay={200}>
              <div className="space-y-6">
                <h2 className={cn("text-[40px] leading-tight font-semibold text-gray-900 tracking-tight", barlow.className)}>
                  Colour Picker
                </h2>

                <p className={cn("text-[20px] text-gray-800 font-medium", barlow.className)}>
                  Click on the image to pick a colour...
                </p>

                <p className={cn("text-[16px] text-gray-500 leading-relaxed", barlow.className)}>
                  Use the online colour picker above to select a colour and get the HTML Colour Code of this pixel. Also you get the HEX colour code value, RGB value and HSB value. Under 'Use your image' you can upload your own image (for example a screenshot of your desktop), paste an image from clipboard, or put a picture URL in the textbox. Alternatively, use 'Pick from Screen' to grab colours directly from your monitor.
                </p>
              </div>
            </FadeInUp>

            {/* Right: Abstract Graphic (Tailwind CSS Flower) */}
            <FadeInUp delay={400} className="flex justify-center lg:justify-end">
              <div className="relative w-[320px] h-[320px] flex items-center justify-center pointer-events-none opacity-80 mix-blend-multiply">
                {/* 8 Petals generated with rotation */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation) => (
                  <div
                    key={rotation}
                    className="absolute w-14 h-[140px] bg-gray-200/80 rounded-full origin-bottom"
                    style={{
                      transform: `translateY(-50%) rotate(${rotation}deg) translateY(-20px)`,
                      borderBottomLeftRadius: '8px',
                      borderBottomRightRadius: '8px',
                    }}
                  />
                ))}
                {/* Center dot to tie it together */}
                <div className="absolute w-8 h-8 bg-white rounded-full z-10" />
              </div>
            </FadeInUp>

          </div>
        </div>
      </section>

      {/* ── Interactive Split-Layout FAQ Section ── */}
      <section className="py-32 px-4 bg-white border-t border-black/[0.04]">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column: Sticky Header */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <FadeInUp id="faq" delay={0}>
                <h2 className={cn("text-[36px] md:text-[48px] font-semibold tracking-tight text-gray-900 leading-none text-left", barlow.className)}>
                  Frequently asked <br className="hidden lg:block" />
                  <span className={cn("text-gray-400", instrument.className)}>questions</span>
                </h2>
                <p className={cn("mt-6 text-[16px] text-gray-500 font-medium text-left max-w-sm", barlow.className)}>
                  Everything you need to know about the product and how it works. Can't find an answer? Feel free to reach out.
                </p>
              </FadeInUp>
            </div>
          </div>

          {/* Right Column: Interactive Accordion */}
          <div className="lg:col-span-7">
            <div className="flex flex-col border-t border-gray-200">
              {faqs.map((faq, index) => (
                <FadeInUp key={index} delay={index * 100}>
                  <div className="border-b border-gray-200">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="flex justify-between items-center w-full py-6 text-left group cursor-pointer"
                    >
                      <span className={cn("text-[18px] font-semibold transition-colors", 
                        openFaq === index ? "text-[#10986C]" : "text-gray-900 group-hover:text-[#10986C]", 
                        barlow.className
                      )}>
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: openFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex-shrink-0 ml-4"
                      >
                        <ChevronDown className={cn("w-5 h-5 transition-colors", 
                          openFaq === index ? "text-[#10986C]" : "text-gray-400 group-hover:text-[#10986C]"
                        )} />
                      </motion.div>
                    </button>
                    
                    {/* The Smooth Expanding Answer */}
                    <AnimatePresence>
                      {openFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className={cn("pb-6 text-[15px] text-gray-500 leading-relaxed pr-8", barlow.className)}>
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── NEW Minimal Footer ── */}
      <MinimalFooter />

      <ImageSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onImageLoad={handleImageLoad}
      />
    </div>
  );
}
