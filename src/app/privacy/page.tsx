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
  title: 'Privacy Policy | ChromaLens',
};

export default function PrivacyPage() {
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
            Privacy <span className={cn("text-primary", instrument.className)}>Policy</span>
          </h1>
          <p className={cn("text-gray-500", barlow.className)}>Last updated: {lastUpdated}</p>
        </div>

        <div className={cn("prose prose-gray max-w-none prose-headings:font-semibold prose-headings:tracking-tight space-y-8 text-gray-600 leading-relaxed", barlow.className)}>
          
          <section>
            <h2 className="text-2xl text-gray-900 mb-4">1. Local Processing & Image Data</h2>
            <p>
              ChromaLens is built with privacy as its core principle. <strong>We do not upload, store, or process any of your images on external servers.</strong> 
              When you upload an image, paste from your clipboard, or use the screen picker, all colour extraction and image rendering happens entirely locally within your browser using the HTML5 Canvas API.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">2. Data Storage (Local Storage)</h2>
            <p>
              To improve your user experience, ChromaLens utilizes your browser's Local Storage to save your recent colour history (the last 12 colours you picked). This data remains exclusively on your personal device and is never transmitted to us or any third parties. You can clear this history at any time using the "Clear All" button in the application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">3. Image URL Proxy</h2>
            <p>
              If you choose to load an image via a URL, the request is routed through a secure, stateless Next.js proxy server purely to bypass CORS (Cross-Origin Resource Sharing) restrictions. We do not log, track, or save the URLs you input or the images that are routed through this proxy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">4. Analytics</h2>
            <p>
              We may collect completely anonymous, aggregated telemetry data (such as page views and basic interactions) to help us understand how the tool is being used and to prioritize future features. This data contains no personally identifiable information (PII) and cannot be linked back to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">5. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or our data practices, please reach out to the developer at <a href="mailto:rishiuttamsahu@gmail.com" className="text-primary hover:underline">rishiuttamsahu@gmail.com</a>.
            </p>
          </section>

        </div>
      </main>

      <MinimalFooter />
    </div>
  );
}
