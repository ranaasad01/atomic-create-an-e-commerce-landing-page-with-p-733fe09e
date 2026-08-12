"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from 'lucide-react';
import { Reveal } from "@/components/Reveal";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function CollectionsPage() {
  const t = useTranslations();

  const collections = (Array.isArray(t.raw("featured-collections")) ? t.raw("featured-collections") : []) as {
    title: string; description: string; cta: string; image: string;
  }[];

  const extras = (Array.isArray(t.raw("collections-extras")) ? t.raw("collections-extras") : []) as {
    title: string; description: string; image: string;
  }[];

  return (
    <div className="bg-[var(--background)] min-h-screen">
      {/* Header */}
      <Reveal>
        <section className="pt-20 pb-14 bg-[var(--card)] border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-xs font-semibold tracking-widest uppercase text-[var(--primary)] mb-3">{t("collectionsPage.eyebrow")}</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] mb-4 text-balance">{t("collectionsPage.heading")}</h1>
            <p className="text-[var(--muted-foreground)] max-w-xl mx-auto text-pretty text-lg">{t("collectionsPage.body")}</p>
          </div>
        </section>
      </Reveal>

      {/* Main collections grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {collections.map((col, i) => (
              <motion.a
                key={i}
                href="/shop"
                variants={item}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-3xl overflow-hidden block"
                style={{ minHeight: "380px" }}
              >
                <img
                  src={col.image}
                  alt={col.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h2 className="text-white font-bold text-2xl mb-2">{col.title}</h2>
                  <p className="text-white/75 text-sm leading-relaxed mb-4">{col.description}</p>
                  <span className="inline-flex items-center gap-2 text-white text-sm font-semibold bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 group-hover:bg-white/30 transition-colors">
                    {col.cta} <ArrowRight size={14} />
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Extras / seasonal */}
      {extras.length > 0 && (
        <Reveal>
          <section className="pb-24 bg-[var(--background)]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8">{t("collectionsPage.seasonalHeading")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {extras.map((ex, i) => (
                  <motion.a
                    key={i}
                    href="/shop"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="group relative rounded-2xl overflow-hidden block"
                    style={{ minHeight: "260px" }}
                  >
                    <img
                      src={ex.image}
                      alt={ex.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-bold text-lg mb-1">{ex.title}</h3>
                      <p className="text-white/70 text-xs">{ex.description}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      )}

      {/* CTA strip */}
      <Reveal>
        <section className="py-16 bg-[var(--primary)]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4 text-balance">{t("collectionsPage.ctaHeading")}</h2>
            <p className="text-white/80 mb-8 text-pretty">{t("collectionsPage.ctaBody")}</p>
            <motion.a
              href="/shop"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 bg-white text-[var(--primary)] px-8 py-3.5 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t("collectionsPage.ctaButton")} <ArrowRight size={15} />
            </motion.a>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
