"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, Check } from 'lucide-react';
import { Reveal } from "@/components/Reveal";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ContactPage() {
  const t = useTranslations();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) setSent(true);
  };

  const contactInfo = (Array.isArray(t.raw("contact.info")) ? t.raw("contact.info") : []) as {
    label: string; value: string; detail: string;
  }[];

  const infoIcons = [Mail, Phone, MapPin, Clock];

  return (
    <div className="bg-[var(--background)] min-h-screen">
      {/* Header */}
      <Reveal>
        <section className="pt-20 pb-14 bg-[var(--card)] border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-xs font-semibold tracking-widest uppercase text-[var(--primary)] mb-3">{t("contact.eyebrow")}</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] mb-4 text-balance">{t("contact.heading")}</h1>
            <p className="text-[var(--muted-foreground)] max-w-xl mx-auto text-pretty text-lg">{t("contact.body")}</p>
          </div>
        </section>
      </Reveal>

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-5 gap-16">
          {/* Contact info */}
          <div className="md:col-span-2">
            <Reveal>
              <div>
                <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">{t("contact.infoHeading")}</h2>
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-5"
                >
                  {contactInfo.map((info, i) => {
                    const Icon = infoIcons[i % infoIcons.length];
                    return (
                      <motion.div key={i} variants={fadeUp} className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                          <Icon size={16} className="text-[var(--primary)]" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-0.5">{info.label}</p>
                          <p className="text-sm font-medium text-[var(--foreground)]">{info.value}</p>
                          <p className="text-xs text-[var(--muted-foreground)]">{info.detail}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                <div className="mt-10 rounded-2xl overflow-hidden border border-[var(--border)]">
                  <img
                    src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/363f33e343494669b0d08ebfe758eb40.webp"
                    alt="The Pet360 customer care team"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5 bg-[var(--card)]">
                    <p className="text-sm font-semibold text-[var(--foreground)] mb-1">{t("contact.teamTitle")}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{t("contact.teamBody")}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Contact form */}
          <div className="md:col-span-3">
            <Reveal>
              <div className="bg-[var(--card)] rounded-3xl border border-[var(--border)] p-8 shadow-[0_4px_32px_rgba(0,0,0,0.06)]">
                <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">{t("contact.formHeading")}</h2>
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-14 h-14 rounded-full bg-[var(--accent)]/30 flex items-center justify-center mx-auto mb-4">
                      <Check size={24} className="text-[var(--foreground)]" />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{t("contact.successTitle")}</h3>
                    <p className="text-[var(--muted-foreground)] text-sm">{t("contact.successBody")}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-[var(--foreground)] mb-1.5">{t("contact.nameLabel")}</label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder={t("contact.namePlaceholder")}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[var(--foreground)] mb-1.5">{t("contact.emailLabel")}</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                          placeholder={t("contact.emailPlaceholder")}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--foreground)] mb-1.5">{t("contact.subjectLabel")}</label>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                        placeholder={t("contact.subjectPlaceholder")}
                        className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--foreground)] mb-1.5">{t("contact.messageLabel")}</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                        placeholder={t("contact.messagePlaceholder")}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 resize-none"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full flex items-center justify-center gap-2 bg-[var(--primary)] text-white py-3.5 rounded-xl font-semibold text-sm shadow-[0_4px_16px_rgba(224,123,79,0.3)] hover:shadow-[0_6px_24px_rgba(224,123,79,0.4)] transition-all duration-300"
                    >
                      <Send size={15} /> {t("contact.submitButton")}
                    </motion.button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
