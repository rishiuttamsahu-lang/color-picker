'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pipette, Upload, ImagePlus, ClipboardCheck } from 'lucide-react';
import { Barlow, Instrument_Serif } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ImageCanvas } from '@/components/Canvas/ImageCanvas';
import { useColourStore } from '@/store/useColourStore';
import { ImageSelectModal } from '@/components/UI/ImageSelectModal';
import { useEyeDropper } from '@/hooks/useEyeDropper';
import { LogoisumHero } from '@/components/UI/LogoisumHero';
import { FadeInUp } from '@/components/UI/FadeInUp';
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
    } catch {}
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
  const { pickedColour, history, setColour } = useColourStore();
  const { openScanner, isSupported, colorInputRef, handleColorInputChange } = useEyeDropper();

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
    } catch {}
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
          background: 'linear-gradient(135deg, #acd9ff 0%, #f5f3ff 45%, #c4ffec 100%)',
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
                      <FormatLine label="HEX"  value={pickedColour.hex} />
                      <FormatLine label="RGBA" value={pickedColour.rgba} />
                      <FormatLine label="HSL"  value={pickedColour.hsl} />
                      <FormatLine label="HSB"  value={pickedColour.hsb} />
                      <FormatLine label="CMYK" value={pickedColour.cmyk} />
                      <FormatLine label="CSS"  value={pickedColour.cssVar} />
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
        id="how-it-works"
        className="py-24 px-4 flex flex-col items-center justify-center"
        style={{
          background: 'linear-gradient(25deg, #ffa7f6 0%, #f5f3ff 45%, #c4ffec 100%)',
        }}
      >
        <div className="w-full max-w-5xl">
          <FadeInUp>
            <div className="mb-16 text-center">
              <h2 className={cn("text-[32px] md:text-[44px] font-semibold tracking-tight text-gray-900 leading-none", barlow.className)}>
                How it <span className={cn("text-gray-400", instrument.className)}>works</span>
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

      <ImageSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onImageLoad={handleImageLoad}
      />
    </div>
  );
}
