// src/components/UI/minimal-footer.tsx
"use client";

import { motion } from "framer-motion";
import { Mail, Star, ArrowUpRight, ExternalLink } from "lucide-react";

export function MinimalFooter() {
  const year = new Date().getFullYear();

  const company = [
    { title: "About Developer", href: "https://github.com/rishiuttamsahu-lang" },
    { title: "Contact Support", href: "mailto:rishiuttamsahu@gmail.com" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
  ];

  const resources = [
    { title: "Features", href: "#features" },
    { title: "Keyboard Shortcuts", href: "#shortcuts" },
    { title: "FAQ", href: "#faq" },
    { title: "Source Code", href: "https://github.com/rishiuttamsahu-lang/color-picker" },
  ];

  const socialLinks = [
    { icon: <Star className="size-4" />, label: "GitHub", link: "https://github.com/rishiuttamsahu-lang/color-picker" },
    { icon: <Mail className="size-4" />, label: "Email", link: "mailto:rishiuttamsahu@gmail.com" },
    { icon: <ExternalLink className="size-4" />, label: "Portfolio", link: "https://rishi-sahu.vercel.app" },
  ];

  return (
    <footer className="relative overflow-hidden bg-background border-t border-border/30">
      {/* Ambient glow blobs — mirrors the hero */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -bottom-24 left-1/4 h-[340px] w-[340px] rounded-full bg-primary/[0.07] blur-[120px]" />
        <div className="absolute -top-16 right-1/4 h-[280px] w-[280px] rounded-full bg-accent/[0.12] blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[200px] w-[200px] rounded-full bg-primary/[0.05] blur-[90px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 md:px-8 lg:px-12">

        {/* ── Top divider line ── */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border/60 to-transparent" />

        {/* ── Main grid ── */}
        <div className="grid grid-cols-6 gap-8 py-14">

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-6 flex flex-col gap-5 md:col-span-4"
          >
            {/* Logo pill — mirrors hero badge */}
            <a
              href="#"
              className="inline-flex w-max items-center gap-2 rounded-full border border-border/40 bg-background/60 px-4 py-2 backdrop-blur transition-all hover:border-primary/40 hover:bg-primary/5"
            >
              <Star className="size-4 text-primary" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
                ChromaGrab
              </span>
            </a>

            <p className="max-w-sm text-sm leading-relaxed text-foreground/60">
              The fastest, frictionless way to pick, convert, and copy colours
              directly from your browser — with pixel-perfect accuracy.
            </p>

            {/* Social icons */}
            <div className="mt-1 flex gap-2">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.link}
                  aria-label={item.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center rounded-full border border-border/40 bg-background/60 p-2.5 text-foreground/50 backdrop-blur transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Resources column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="col-span-3 w-full md:col-span-1"
          >
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.25em] text-foreground/40">
              Resources
            </span>
            <div className="flex flex-col gap-2.5">
              {resources.map(({ href, title }) => (
                <a
                  key={title}
                  href={href}
                  target={href.startsWith('http') ? "_blank" : undefined}
                  rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="group flex w-max items-center gap-1 text-sm text-foreground/60 transition-colors duration-200 hover:text-foreground"
                >
                  {title}
                  <ArrowUpRight className="size-3 opacity-0 -translate-y-px translate-x-px transition-all group-hover:opacity-60" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Company column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="col-span-3 w-full md:col-span-1"
          >
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.25em] text-foreground/40">
              Company
            </span>
            <div className="flex flex-col gap-2.5">
              {company.map(({ href, title }) => (
                <a
                  key={title}
                  href={href}
                  target={href.startsWith('http') || href.startsWith('mailto:') ? "_blank" : undefined}
                  rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="group flex w-max items-center gap-1 text-sm text-foreground/60 transition-colors duration-200 hover:text-foreground"
                >
                  {title}
                  <ArrowUpRight className="size-3 opacity-0 -translate-y-px translate-x-px transition-all group-hover:opacity-60" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border/60 to-transparent" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center justify-between gap-3 py-6 sm:flex-row"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/40">
            © {year} ChromaGrab. All rights reserved.
          </p>

          {/* Subtle colour-swatch accent strip */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {[
              "bg-primary/70",
              "bg-accent/70",
              "bg-primary/40",
              "bg-foreground/20",
              "bg-accent/40",
            ].map((cls, i) => (
              <span
                key={i}
                className={`inline-block h-2 w-2 rounded-full ${cls}`}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </footer>
  );
}