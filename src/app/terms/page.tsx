import { Barlow, Instrument_Serif } from 'next/font/google';
import { cn } from '@/lib/utils';
import { MinimalFooter } from '@/components/UI/minimal-footer';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const barlow = Barlow({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

const instrument = Instrument_Serif({
  weight: ['400'],
  style: ['italic'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'Terms of Service | ChromaLens',
};

export default function TermsPage() {
  const lastUpdated = "April 1, 2026";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Simple Header */}
      <header className="border-b border-black/[0.05] bg-white sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className={cn("text-sm font-medium", barlow.className)}>Back to Home</span>
          </Link>
          <span className={cn("font-bold text-lg tracking-tight", barlow.className)}>ChromaLens</span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-20">
        <div className="mb-12">
          <h1 className={cn("text-[40px] md:text-[56px] font-semibold tracking-tight text-gray-900 leading-none mb-4", barlow.className)}>
            Terms of <span className={cn("text-primary", instrument.className)}>Service</span>
          </h1>
          <p className={cn("text-gray-500", barlow.className)}>Last updated: {lastUpdated}</p>
        </div>

        <div className={cn("prose prose-gray max-w-none prose-headings:font-semibold prose-headings:tracking-tight space-y-8 text-gray-600 leading-relaxed", barlow.className)}>
          
          <section>
            <h2 className="text-2xl text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using ChromaLens (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">2. Description of Service</h2>
            <p>
              ChromaLens is a free, web-based utility designed to extract, convert, and manage colour codes from user-provided images, URLs, and screen captures. The Service is provided "as is" and "as available".
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">3. Fair Use</h2>
            <p>
              You agree to use the Service only for lawful purposes. You are strictly prohibited from using the image URL proxy feature to maliciously overload servers, bypass authentication walls, or scrape restricted content. We reserve the right to block access to the Service or proxy for any IP address demonstrating abusive behaviour.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">4. Disclaimer of Warranties & Accuracy</h2>
            <p>
              While we strive for pixel-perfect accuracy, colour rendering can vary drastically based on monitor calibration, OS-level display settings (such as True Tone or Night Shift), and browser rendering engines. Therefore, we do not warrant that the colour codes extracted will perfectly match the physical or intended colour in all environments. The Service is used entirely at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">5. Limitation of Liability</h2>
            <p>
              In no event shall ChromaLens, its developers, or affiliates be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </section>

        </div>
      </main>

      <MinimalFooter />
    </div>
  );
}
