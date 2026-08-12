"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Leaf, Heart, Award, Users } from 'lucide-react';
import { Reveal } from "@/components/Reveal";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function AboutPage() {
  const t = useTranslations();

  const values = (Array.isArray(t.raw("about.values")) ? t.raw("about.values") : []) as {
    title: string; body: string;
  }[];

  const team = (Array.isArray(t.raw("about.team")) ? t.raw("about.team") : []) as {
    name: string; role: string; bio: string; image: string;
  }[];

  const stats = (Array.isArray(t.raw("about.stats")) ? t.raw("about.stats") : []) as {
    value: string; label: string;
  }[];

  const valueIcons = [Leaf, Heart, Award, Users];

  return (
    <div className="bg-[var(--background)] min-h-screen">
      {/* Hero */}
      <Reveal>
        <section className="pt-20 pb-0 bg-[var(--foreground)] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-end">
            <div className="pb-16 md:pb-24">
              <p className="text-xs font-semibold tracking-widest uppercase text-[var(--accent)] mb-4">{t("about.eyebrow")}</p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-5 text-balance">{t("about.heading")}</h1>
              <p className="text-white/70 text-lg leading-relaxed text-pretty">{t("about.heroBody")}</p>
            </div>
            <div className="self-end">
              <img
                src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/7a2565b8ad8b4a8895d95aa83de449ca.webp"
                alt="The Pet360 studio and design team"
                className="w-full h-[420px] object-cover rounded-t-3xl"
              />
            </div>
          </div>
        </section>
      </Reveal>

      {/* Stats bar */}
      <Reveal>
        <section className="bg-[var(--card)] border-b border-[var(--border)] py-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            >
              {stats.map((s, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <p className="text-3xl font-bold text-[var(--primary)]">{s.value}</p>
                  <p className="text-sm text-[var(--muted-foreground)] mt-1">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* Story */}
      <Reveal>
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[var(--primary)] mb-3">{t("about.storyEyebrow")}</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-5 text-balance">{t("about.storyHeading")}</h2>
              <p className="text-[var(--muted-foreground)] leading-relaxed mb-4 text-pretty">{t("about.storyBody1")}</p>
              <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">{t("about.storyBody2")}</p>
            </div>
            <div className="relative">
              <img
                src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/eecde36d550749a580bb43b02d6567f8.jpg"
                alt="Pet360 founder with her dog"
                className="rounded-3xl w-full h-[440px] object-cover shadow-[0_8px_48px_rgba(0,0,0,0.12)]"
              />
            </div>
          </div>
        </section>
      </Reveal>

      {/* Values */}
      <Reveal>
        <section className="py-20 md:py-28 bg-[var(--card)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase text-[var(--primary)] mb-2">{t("about.valuesEyebrow")}</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)] text-balance">{t("about.valuesHeading")}</h2>
            </div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {values.map((val, i) => {
                const Icon = valueIcons[i % valueIcons.length];
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="bg-[var(--background)] rounded-2xl p-6 border border-[var(--border)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)]"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mb-4">
                      <Icon size={18} className="text-[var(--primary)]" />
                    </div>
                    <h3 className="font-bold text-[var(--foreground)] mb-2">{val.title}</h3>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{val.body}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* Team */}
      {team.length > 0 && (
        <Reveal>
          <section className="py-20 md:py-28 bg-[var(--background)]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-14">
                <p className="text-xs font-semibold tracking-widest uppercase text-[var(--primary)] mb-2">{t("about.teamEyebrow")}</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)] text-balance">{t("about.teamHeading")}</h2>
              </div>
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {team.map((member, i) => (
                  <motion.div key={i} variants={fadeUp} className="text-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-[var(--border)] shadow-[0_4px_16px_rgba(0,0,0,0.10)]"
                    />
                    <h3 className="font-bold text-[var(--foreground)] mb-0.5">{member.name}</h3>
                    <p className="text-xs text-[var(--primary)] font-semibold mb-2">{member.role}</p>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{member.bio}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        </Reveal>
      )}
    </div>
  );
}
