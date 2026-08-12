"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Camera as Instagram, Heart } from 'lucide-react';

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const footerSections = [
    {
      title: t("footer.shopTitle"),
      links: [
        { label: t("footer.allProducts"), href: "#product-grid" },
        { label: t("footer.newArrivals"), href: "#product-grid" },
        { label: t("footer.bestsellers"), href: "#product-grid" },
        { label: t("footer.sale"), href: "#promo-banner" },
        { label: t("footer.giftCards"), href: "#newsletter" },
      ],
    },
    {
      title: t("footer.collectionsTitle"),
      links: [
        { label: t("footer.bedsAndBedding"), href: "#featured-collections" },
        { label: t("footer.bowlsAndFeeders"), href: "#featured-collections" },
        { label: t("footer.furnitureAndShelves"), href: "#featured-collections" },
        { label: t("footer.toysAndPlay"), href: "#featured-collections" },
        { label: t("footer.groomingAndSpa"), href: "#featured-collections" },
      ],
    },
    {
      title: t("footer.helpTitle"),
      links: [
        { label: t("footer.faqs"), href: "#newsletter" },
        { label: t("footer.shippingReturns"), href: "#newsletter" },
        { label: t("footer.sizeGuide"), href: "#newsletter" },
        { label: t("footer.trackOrder"), href: "#newsletter" },
        { label: t("footer.contactUs"), href: "#newsletter" },
      ],
    },
    {
      title: t("footer.aboutTitle"),
      links: [
        { label: t("footer.ourStory"), href: "#testimonials" },
        { label: t("footer.sustainability"), href: "#testimonials" },
        { label: t("footer.press"), href: "#testimonials" },
        { label: t("footer.careers"), href: "#testimonials" },
        { label: t("footer.affiliate"), href: "#testimonials" },
      ],
    },
  ];

  return (
    <footer className="bg-[var(--foreground)] text-white/80">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Pet<span className="text-[var(--primary)]">360</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-white/60 mb-6 max-w-xs">
              {t("footer.brandBody")}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { label: "Instagram", icon: Instagram, href: "#" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[var(--primary)] transition-all duration-200"
                >
                  <social.icon className="h-4 w-4 text-white" />
                </a>
              ))}
              <a
                href="#"
                aria-label="Pinterest"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[var(--primary)] transition-all duration-200"
              >
                <svg className="h-4 w-4 text-white fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[var(--primary)] transition-all duration-200"
              >
                <svg className="h-4 w-4 text-white fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={pathname === "/" ? link.href : "/" + link.href}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors duration-200">
              {t("footer.privacyPolicy")}
            </a>
            <a href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors duration-200">
              {t("footer.termsConditions")}
            </a>
            <a href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors duration-200">
              {t("footer.cookieSettings")}
            </a>
          </div>
          <p className="text-xs text-white/40 flex items-center gap-1">
            {t("footer.madeWith")} <Heart className="h-3 w-3 text-[var(--primary)] fill-current" aria-hidden="true" /> {t("footer.forPets")}
          </p>
        </div>
      </div>
    </footer>
  );
}