// src/components/UI/minimal-footer.tsx
import {
  Heart,
  Mail,
  MessageSquare,
  Share,
  Link,
  ExternalLink,
} from 'lucide-react';

export function MinimalFooter() {
  const year = new Date().getFullYear();

  const company = [
    { title: 'About Us', href: '#' },
    { title: 'Careers', href: '#' },
    { title: 'Brand assets', href: '#' },
    { title: 'Privacy Policy', href: '#' },
    { title: 'Terms of Service', href: '#' },
  ];

  const resources = [
    { title: 'Blog', href: '#' },
    { title: 'Help Center', href: '#' },
    { title: 'Contact Support', href: '#' },
    { title: 'Community', href: '#' },
    { title: 'Security', href: '#' },
  ];

  const socialLinks = [
    { icon: <Heart className="size-4" />, link: '#' },
    { icon: <Mail className="size-4" />, link: '#' },
    { icon: <MessageSquare className="size-4" />, link: '#' },
    { icon: <Share className="size-4" />, link: '#' },
    { icon: <Link className="size-4" />, link: '#' },
    { icon: <ExternalLink className="size-4" />, link: '#' },
  ];

  return (
    <footer className="relative bg-white pt-16">
      <div className="bg-[radial-gradient(35%_80%_at_30%_0%,rgba(0,0,0,0.03),transparent)] mx-auto max-w-6xl md:border-x border-black/[0.04]">
        <div className="bg-black/[0.04] absolute inset-x-0 h-px w-full" />
        <div className="grid max-w-6xl grid-cols-6 gap-6 p-8">
          <div className="col-span-6 flex flex-col gap-5 md:col-span-4">
            <a href="#" className="w-max text-gray-900">
              <span className="font-bold text-xl">ChromaLens</span>
            </a>
            <p className="text-gray-500 max-w-sm text-sm text-balance">
              The fastest, frictionless way to pick, convert, and copy colours directly from your browser.
            </p>
            <div className="flex gap-2 mt-4">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  className="hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded-md border border-black/[0.08] p-2 transition-colors"
                  target="_blank"
                  href={item.link}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-gray-900 font-semibold mb-3 block text-sm">
              Resources
            </span>
            <div className="flex flex-col gap-2">
              {resources.map(({ href, title }, i) => (
                <a
                  key={i}
                  className="w-max text-sm text-gray-500 duration-200 hover:text-gray-900 hover:underline"
                  href={href}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-gray-900 font-semibold mb-3 block text-sm">
              Company
            </span>
            <div className="flex flex-col gap-2">
              {company.map(({ href, title }, i) => (
                <a
                  key={i}
                  className="w-max text-sm text-gray-500 duration-200 hover:text-gray-900 hover:underline"
                  href={href}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-black/[0.04] absolute inset-x-0 h-px w-full" />
        <div className="flex max-w-6xl flex-col justify-between gap-2 pt-6 pb-8 px-8">
          <p className="text-gray-400 text-center text-sm">
            © {year} ChromaLens. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
