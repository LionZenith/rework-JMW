import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, Instagram, Mail, ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero-gymnastics.jpg";
import aboutImg from "@/assets/about-portrait.png";
import silhouette from "@/assets/gymnast-silhouette.png";

const NAV_ITEMS = [
  { label: "Über mich", href: "about" },
  { label: "Erfolge", href: "achievements" },
  { label: "Blog", href: "blog" },
  { label: "Fanclub", href: "fanclub" },
  { label: "Partner", href: "partners" },
  { label: "Sponsoring", href: "sponsoring" },
];

const ACHIEVEMENTS = [
  { year: "2025", title: "Europameisterschaften", detail: "Qualifikation fürs Mehrkampf-Finale" },
  { year: "2024", title: "Nationale Meisterin", detail: "Schwebebalken & Boden" },
  { year: "2024", title: "Weltcup-Serie", detail: "Top 15 — Cottbus, Deutschland" },
  { year: "2023", title: "Europäische Jugendspiele", detail: "Vertretung Liechtensteins" },
  { year: "2023", title: "Nationaler Rekord", detail: "Höchste Mehrkampf-Punktzahl aller Zeiten" },
  { year: "2022", title: "Jugend-Europameisterschaften", detail: "Bestes Ergebnis für Liechtenstein" },
];

const PARTNERS = [
  "Hilti Foundation",
  "Liechtensteinisches Olympisches Komitee",
  "VP Bank",
  "Ivoclar",
  "Hoval",
  "Ospelt Group",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <img src={silhouette} alt="" className="h-8 w-8 object-contain" />
            <span className="font-display text-lg font-semibold tracking-wide text-foreground">
              Julia <span className="text-accent-red">Weissenhofer</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                className="font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-foreground"
            aria-label="Menü umschalten"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={`#${item.href}`}
                  onClick={() => setMenuOpen(false)}
                  className="font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative h-screen overflow-hidden">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0">
          <img
            src={heroImg}
            alt="Julia Weissenhofer am Schwebebalken"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/30 to-background" />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-body text-xs tracking-[0.35em] uppercase text-primary-foreground/70 mb-4"
          >
            Kunstturnerin — Liechtenstein
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-primary-foreground tracking-tight"
          >
            Julia
            <br />
            <span className="font-semibold">Weissenhofer</span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex gap-1 mt-6"
          >
            <div className="w-8 h-[2px] bg-accent-red" />
            <div className="w-8 h-[2px] bg-accent-gold" />
            <div className="w-8 h-[2px] bg-primary" />
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <ChevronDown className="text-primary-foreground/50" size={28} />
        </motion.div>
      </section>

      {/* Über mich */}
      <section id="about" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={0}
            >
              <img
                src={aboutImg}
                alt="Julia Weissenhofer Porträt"
                className="w-full max-w-md mx-auto aspect-[3/4] object-cover rounded-sm shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              <motion.p variants={fadeUp} custom={0} className="font-body text-xs tracking-[0.3em] uppercase text-primary">
                Über mich
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="font-display text-4xl lg:text-5xl font-light text-foreground">
                Anmut trifft <span className="italic font-medium text-accent-red">Entschlossenheit</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="font-body text-base leading-relaxed text-muted-foreground">
                Aufgewachsen in Liechtenstein, setzt Julia Weissenhofer seit ihrem sechsten
                Lebensjahr neue Massstäbe im Kunstturnen. Als Vertreterin einer der kleinsten
                Nationen Europas auf der Weltbühne bringt sie unerschütterliches Engagement
                und eine tiefe Leidenschaft für ihren Sport mit.
              </motion.p>
              <motion.p variants={fadeUp} custom={3} className="font-body text-base leading-relaxed text-muted-foreground">
                Julia trainiert in Schaan und ist spezialisiert auf Schwebebalken und
                Bodenturnen — eine Verbindung aus technischer Präzision und künstlerischem
                Ausdruck. Ihr Ziel: das Kunstturnen Liechtensteins auf die internationale
                Landkarte zu setzen.
              </motion.p>
              <motion.div variants={fadeUp} custom={4} className="flex gap-4 pt-2">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="mailto:kunstturnen@julia-weissenhofer.li"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent-red hover:border-accent-red transition-colors"
                >
                  <Mail size={18} />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Erfolge */}
      <section id="achievements" className="py-24 lg:py-32 bg-primary">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} custom={0} className="font-body text-xs tracking-[0.3em] uppercase text-accent-red">
              Karriere-Highlights
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-4xl lg:text-5xl font-light text-primary-foreground mt-3">
              Erfolge
            </motion.h2>
          </motion.div>

          <div className="space-y-0">
            {ACHIEVEMENTS.map((a, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr_1fr] gap-4 md:gap-8 py-6 border-b border-primary-foreground/10 items-baseline"
              >
                <span className="font-display text-2xl font-light text-accent-red">{a.year}</span>
                <span className="font-display text-lg md:text-xl text-primary-foreground">{a.title}</span>
                <span className="font-body text-sm text-primary-foreground/50 hidden md:block">{a.detail}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} custom={0} className="font-body text-xs tracking-[0.3em] uppercase text-primary">
              Aktuell
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-4xl lg:text-5xl font-light text-foreground mt-3">
              Aus dem Blog
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Vorbereitung auf die EM 2025", date: "Feb 2025", excerpt: "Mein Trainingsweg hin zum grössten Wettkampf des Jahres..." },
              { title: "Ein Tag in meinem Leben", date: "Jan 2025", excerpt: "Wie ein typischer Trainingstag zwischen Halle und Schule aussieht..." },
              { title: "Rückblick auf 2024", date: "Dez 2024", excerpt: "Ein Jahr voller Wachstum, Herausforderungen und unvergesslicher Momente..." },
            ].map((post, i) => (
              <motion.article
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/3] bg-muted rounded-sm mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
                    <img src={silhouette} alt="" className="h-16 opacity-10" />
                  </div>
                </div>
                <p className="font-body text-xs text-muted-foreground tracking-wider uppercase">{post.date}</p>
                <h3 className="font-display text-xl mt-1 text-foreground group-hover:text-accent-red transition-colors">
                  {post.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed">{post.excerpt}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Fanclub */}
      <section id="fanclub" className="py-24 lg:py-32 bg-secondary">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p variants={fadeUp} custom={0} className="font-body text-xs tracking-[0.3em] uppercase text-accent-red">
              Werde Teil des Teams
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-4xl lg:text-5xl font-light text-foreground mt-3">
              Fanclub
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="font-body text-base text-muted-foreground mt-6 leading-relaxed max-w-lg mx-auto">
              Sei Teil von Julias Reise! Tritt dem Fanclub bei und erhalte exklusive Updates,
              Einblicke hinter die Kulissen und frühzeitigen Zugang zu Wettkampfplänen.
            </motion.p>
            <motion.a
              variants={fadeUp}
              custom={3}
              href="mailto:kunstturnen@julia-weissenhofer.li"
              className="inline-block mt-8 px-8 py-3 bg-accent-red text-accent-red-foreground font-body text-sm tracking-wider uppercase rounded-sm hover:opacity-90 transition-opacity"
            >
              Kontakt aufnehmen
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Partner */}
      <section id="partners" className="py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <motion.p variants={fadeUp} custom={0} className="font-body text-xs tracking-[0.3em] uppercase text-primary">
              Unterstützt von
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl font-light text-foreground mt-3">
              Partner
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-x-12 gap-y-4 items-center"
          >
            {PARTNERS.map((p, i) => (
              <motion.span
                key={p}
                variants={fadeUp}
                custom={i}
                className="font-body text-sm tracking-wider text-muted-foreground/60 hover:text-primary transition-colors cursor-default"
              >
                {p}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sponsoring */}
      <section id="sponsoring" className="py-16 lg:py-20 bg-muted/50">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary">Unterstützung</p>
          <h2 className="font-display text-3xl font-light text-foreground mt-3">Sponsoring</h2>
          <p className="font-body text-sm text-muted-foreground mt-4 leading-relaxed max-w-lg mx-auto">
            Interesse, Julias sportliche Karriere zu unterstützen? Melde dich, um
            Partnerschaftsmöglichkeiten und Sponsoring-Pakete zu besprechen.
          </p>
          <a
            href="mailto:kunstturnen@julia-weissenhofer.li"
            className="inline-block mt-6 text-sm font-body tracking-wider text-accent hover:underline underline-offset-4 transition-colors"
          >
            kunstturnen@julia-weissenhofer.li
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-display text-sm text-muted-foreground">
            © 2025 Julia Weissenhofer
          </span>
          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
              <Instagram size={16} />
            </a>
            <a href="mailto:kunstturnen@julia-weissenhofer.li" className="text-muted-foreground hover:text-accent-red transition-colors">
              <Mail size={16} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
