"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { useState } from "react";
import { Star, Search, SlidersHorizontal } from 'lucide-react';
import { Reveal } from "@/components/Reveal";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardV: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function ShopPage() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const products = (Array.isArray(t.raw("product-grid")) ? t.raw("product-grid") : []) as {
    id: string; name: string; price: string; originalPrice: string | null;
    rating: number; reviewCount: number; discount: number | null;
    description: string; image: string; category: string;
  }[];

  const categories = (Array.isArray(t.raw("category-filter")) ? t.raw("category-filter") : []) as string[];

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "All Products" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const sortOptions = [
    { value: "featured", label: t("shopPage.sortFeatured") },
    { value: "price-asc", label: t("shopPage.sortPriceAsc") },
    { value: "price-desc", label: t("shopPage.sortPriceDesc") },
    { value: "rating", label: t("shopPage.sortRating") },
  ];

  return (
    <div className="bg-[var(--background)] min-h-screen">
      {/* Header */}
      <Reveal>
        <section className="pt-20 pb-12 bg-[var(--card)] border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-[var(--primary)] mb-2">{t("shopPage.eyebrow")}</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] mb-3 text-balance">{t("shopPage.heading")}</h1>
            <p className="text-[var(--muted-foreground)] max-w-xl text-pretty">{t("shopPage.body")}</p>
          </div>
        </section>
      </Reveal>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {/* Filters row */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("shopPage.searchPlaceholder")}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={15} className="text-[var(--muted-foreground)]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={"px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border " + (
                activeCategory === cat
                  ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-[0_2px_12px_rgba(224,123,79,0.3)]"
                  : "bg-transparent text-[var(--foreground)] border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-[var(--muted-foreground)] mb-6">
          {filtered.length} {t("shopPage.resultsLabel")}
        </p>

        {/* Product grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filtered.map((product) => (
            <motion.div
              key={product.id}
              variants={cardV}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="group bg-[var(--card)] rounded-2xl overflow-hidden border border-[var(--border)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.14)] transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.discount && (
                  <span className="absolute top-3 left-3 bg-[var(--primary)] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    -{product.discount}%
                  </span>
                )}
              </div>
              <div className="p-4">
                <p className="text-xs text-[var(--muted-foreground)] mb-1">{product.category}</p>
                <h3 className="font-semibold text-[var(--foreground)] text-sm leading-snug mb-2">{product.name}</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed mb-3 line-clamp-2">{product.description}</p>
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
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    className="text-xs font-semibold bg-[var(--primary)] text-white px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity"
                  >
                    {t("shop.addToCart")}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-[var(--muted-foreground)] text-lg">{t("shopPage.noResults")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
