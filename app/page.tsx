"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";

import { Reveal } from "@/components/Reveal";
import { Star, ArrowRight, Truck, RotateCcw, Leaf, Shield } from 'lucide-react';

const heroVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const heroImageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.75, ease: "easeOut", delay: 0.15 } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function HomePage() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Products");

  const collections = (Array.isArray(t.raw("featured-collections")) ? t.raw("featured-collections") : []) as {
    title: string; description: string; cta: string; image: string;
  }[];

  const products = (Array.isArray(t.raw("product-grid")) ? t.raw("product-grid") : []) as {
    id: string; name: string; price: string; originalPrice: string | null;
    rating: number; reviewCount: number; discount: number | null;
    description: string; image: string; category: string;
  }[];

  const testimonials = (Array.isArray(t.raw("testimonials-list")) ? t.raw("testimonials-list") : []) as {
    name: string; role: string; text: string; rating: number; avatar: string;
  }[];

  const categories = (Array.isArray(t.raw("category-filter")) ? t.raw("category-filter") : []) as string[];

  const filteredProducts = activeCategory === "All Products"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  const trustItems = [
    { icon: Truck, label: t("trust.shipping") },
    { icon: RotateCcw, label: t("trust.returns") },
    { icon: Leaf, label: t("trust.eco") },
    { icon: Shield, label: t("trust.safe") },
  ];

  return (
    <>
      {/* PROMO BANNER */}
      <div className="bg-[var(--primary)] text-white text-center py-2.5 px-4 text-sm font-medium tracking-wide">
        {t("promo-banner.emoji")} {t("promo-banner.heading")} &nbsp;
        <a href="/shop" className="underline underline-offset-2 hover:opacity-80 transition-opacity">
          {t("promo-banner.cta")}
        </a>
      </div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--background)] pt-16 pb-0 md:pt-20">
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-30" style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-end">
          {/* Left copy */}
          <motion.div variants={heroVariants} initial="hidden" animate="visible" className="pb-16 md:pb-24">
            <span className="inline-block mb-5 px-3 py-1 rounded-full bg-[var(--accent)]/20 text-[var(--foreground)] text-xs font-semibold tracking-widest uppercase">
              {t("hero.eyebrow")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--foreground)] leading-[1.08] text-balance mb-6">A House They'll Love as Much as You Do</h1>
            <p className="text-[var(--muted-foreground)] text-lg leading-relaxed max-w-md mb-8 text-pretty">
              {t("hero.body")}
            </p>
            <div className="flex flex-wrap gap-3">
              <motion.a href="/shop" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-7 py-3.5 rounded-full font-semibold text-sm shadow-[0_4px_20px_rgba(224,123,79,0.35)] hover:shadow-[0_6px_28px_rgba(224,123,79,0.45)] transition-all duration-300">
                {t("hero.cta")} <ArrowRight size={16} />
              </motion.a>
              <motion.a href="/collections" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 border border-[var(--border)] text-[var(--foreground)] px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[var(--card)] transition-all duration-300">
                {t("hero.scrollCta")}
              </motion.a>
            </div>
            {/* Social proof strip */}
            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (<img key={i} src={"/images/avatar-pet-owner-" + i + ".jpg"} alt="" className="w-8 h-8 rounded-full border-2 border-[var(--background)] object-cover" />))}
              </div>
              <div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={12} className="fill-[var(--primary)] text-[var(--primary)]" />
                  ))}
                </div>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{t("hero.socialProof")}</p>
              </div>
            </div>
          </motion.div>

          {/* Right hero image */}
          <motion.div variants={heroImageVariants} initial="hidden" animate="visible" className="relative self-end">
            <div className="relative rounded-t-3xl overflow-hidden shadow-[0_-8px_48px_rgba(0,0,0,0.10)]">
              <img src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/7dd1bc8582254b7a8c51915fdcd414f8.webp" alt="A golden retriever resting on a linen cloud bed in a beautifully styled living room" className="w-full h-[480px] md:h-[560px] object-cover" />
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.5 }} className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.10)]">
                <p className="text-xs font-semibold text-[var(--foreground)]">{t("hero.badgeTitle")}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{t("hero.badgeBody")}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* TRUST BAR */}
      <Reveal>
        <section className="bg-[var(--card)] border-y border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trustItems.map((item, i) => (
                <motion.div key={i} variants={cardVariant} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[var(--accent)]/20 flex items-center justify-center flex-shrink-0">
                    <item.icon size={16} className="text-[var(--foreground)]" />
                  </div>
                  <span className="text-sm font-medium text-[var(--foreground)]">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>
      {/* FEATURED COLLECTIONS */}
      <Reveal>
        <section className="py-20 md:py-28 bg-[var(--background)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-[var(--primary)] mb-2">{t("collections.eyebrow")}</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)] text-balance">{t("collections.heading")}</h2>
              </div>
              <a href="/collections" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--primary)] hover:gap-2.5 transition-all duration-200">
                {t("collections.viewAll")} <ArrowRight size={15} />
              </a>
            </div>

            {/* Asymmetric bento grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {collections.map((col, i) => {
                const isLarge = i === 0;
                const colSpan = isLarge ? "md:col-span-7" : i === 1 ? "md:col-span-5" : "md:col-span-4";
                return (
                  <motion.a key={i} href="/collections" variants={cardVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ y: -4 }} transition={{ duration: 0.3 }} className={"group relative rounded-2xl overflow-hidden " + colSpan + (isLarge ? " row-span-2" : "") + " block"} style={{ minHeight: isLarge ? "480px" : "220px" }}>
                    <img src={col.image} alt={col.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-bold text-xl mb-1">{col.title}</h3>
                      <p className="text-white/80 text-sm leading-snug mb-3 line-clamp-2">{col.description}</p>
                      <span className="inline-flex items-center gap-1.5 text-white text-xs font-semibold bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30 group-hover:bg-white/30 transition-colors">
                        {col.cta} <ArrowRight size={12} />
                      </span>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>
      {/* PRODUCT GRID */}
      <Reveal>
        <section className="py-20 md:py-28 bg-[var(--card)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold tracking-widest uppercase text-[var(--primary)] mb-2">{t("shop.eyebrow")}</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-4 text-balance">{t("shop.heading")}</h2>
              <p className="text-[var(--muted-foreground)] max-w-xl mx-auto text-pretty">{t("shop.body")}</p>
            </div>

            {/* Category filter pills */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCategory(cat)}
                  className={"px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border " + (
                    activeCategory === cat
                      ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-[0_2px_12px_rgba(224,123,79,0.3)]"
                      : "bg-transparent text-[var(--foreground)] border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  )}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Product cards */}
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (<motion.div key={product.id} variants={cardVariant} whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className="group bg-[var(--background)] rounded-2xl overflow-hidden border border-[var(--border)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.14)] transition-all duration-300">
                <div className="relative overflow-hidden aspect-square">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  {product.discount && (
                    <span className="absolute top-3 left-3 bg-[var(--primary)] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      -{product.discount}%
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-[var(--muted-foreground)] mb-1">{product.category}</p>
                  <h3 className="font-semibold text-[var(--foreground)] text-sm leading-snug mb-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={11}
                          className={s <= Math.round(product.rating) ? "fill-[var(--primary)] text-[var(--primary)]" : "text-[var(--border)]"}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[var(--muted-foreground)]">({product.reviewCount})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-bold text-[var(--foreground)]">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-[var(--muted-foreground)] line-through">{product.originalPrice}</span>
                      )}
                    </div>
                    <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }} className="text-xs font-semibold bg-[var(--primary)] text-white px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity">
                      {t("shop.addToCart")}
                    </motion.button>
                  </div>
                </div>
              </motion.div>))}
            </motion.div>

            <div className="text-center mt-12">
              <motion.a href="/shop" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 border-2 border-[var(--primary)] text-[var(--primary)] px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-[var(--primary)] hover:text-white transition-all duration-300">
                {t("shop.viewAll")} <ArrowRight size={15} />
              </motion.a>
            </div>
          </div>
        </section>
      </Reveal>
      {/* TESTIMONIALS */}
      <Reveal>
        <section className="py-20 md:py-28 bg-[var(--foreground)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-widest uppercase text-[var(--accent)] mb-2">{t("testimonials.eyebrow")}</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white text-balance">{t("testimonials.heading")}</h2>
            </div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {testimonials.map((item, i) => (
                <motion.div key={i} variants={cardVariant} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={13} className="fill-[var(--primary)] text-[var(--primary)]" />
                    ))}
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed flex-1">&ldquo;{item.text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                    <img src={item.avatar} alt={item.name} className="w-9 h-9 rounded-full object-cover border border-white/20" />
                    <div>
                      <p className="text-white text-sm font-semibold">{item.name}</p>
                      <p className="text-white/50 text-xs">{item.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>
      {/* BRAND STORY SPLIT */}
      <Reveal>
        <section className="py-20 md:py-28 bg-[var(--background)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/eecde36d550749a580bb43b02d6567f8.jpg" alt="Pet360 founder with her dog in a beautifully designed home" className="rounded-3xl w-full h-[480px] object-cover shadow-[0_8px_48px_rgba(0,0,0,0.12)]" />
              <div className="absolute -bottom-6 -right-6 bg-[var(--card)] border border-[var(--border)] rounded-2xl px-5 py-4 shadow-[0_4px_24px_rgba(0,0,0,0.10)]">
                <p className="text-2xl font-bold text-[var(--foreground)]">{t("brand.statValue")}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{t("brand.statLabel")}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[var(--primary)] mb-3">{t("brand.eyebrow")}</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-5 text-balance">{t("brand.heading")}</h2>
              <p className="text-[var(--muted-foreground)] leading-relaxed mb-4 text-pretty">{t("brand.body1")}</p>
              <p className="text-[var(--muted-foreground)] leading-relaxed mb-8 text-pretty">{t("brand.body2")}</p>
              <motion.a href="/about" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 bg-[var(--foreground)] text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:opacity-85 transition-opacity">
                {t("brand.cta")} <ArrowRight size={15} />
              </motion.a>
            </div>
          </div>
        </section>
      </Reveal>
      {/* NEWSLETTER */}
      <Reveal>
        <section className="py-20 md:py-24 bg-[var(--accent)]/20">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <p className="text-xs font-semibold tracking-widest uppercase text-[var(--primary)] mb-3">{t("newsletter.eyebrow")}</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-4 text-balance">{t("newsletter.heading")}</h2>
            <p className="text-[var(--muted-foreground)] mb-8 text-pretty">{t("newsletter.body")}</p>
            {subscribed ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl px-6 py-5 text-[var(--foreground)] font-medium">
                {t("newsletter.successMessage")}
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("newsletter.placeholder")} required className="flex-1 px-5 py-3.5 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40" />
                <motion.button type="submit" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="bg-[var(--primary)] text-white px-6 py-3.5 rounded-full font-semibold text-sm whitespace-nowrap shadow-[0_4px_16px_rgba(224,123,79,0.3)] hover:shadow-[0_6px_24px_rgba(224,123,79,0.4)] transition-all duration-300">
                  {t("newsletter.cta")}
                </motion.button>
              </form>
            )}
            <p className="text-xs text-[var(--muted-foreground)] mt-4">{t("newsletter.disclaimer")}</p>
          </div>
        </section>
      </Reveal>
    </>
  );
}
