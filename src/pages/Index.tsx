import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, Instagram, Mail, ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero-gymnastics.jpg";
import aboutImg from "@/assets/about-portrait.jpg";
import silhouette from "@/assets/gymnast-silhouette.png";

const NAV_ITEMS = ["About", "Achievements", "Blog", "Fanclub", "Partners", "Sponsoring"];

const ACHIEVEMENTS = [
  { year: "2025", title: "European Championships", detail: "Qualified for all-around final" },
  { year: "2024", title: "National Champion", detail: "Balance beam & floor exercise" },
  { year: "2024", title: "World Cup Series", detail: "Top 15 finish — Cottbus, Germany" },
  { year: "2023", title: "European Youth Olympics", detail: "Representing Liechtenstein" },
  { year: "2023", title: "National Record", detail: "Highest all-around score in history" },
  { year: "2022", title: "Junior European Championships", detail: "Best result for Liechtenstein" },
];

const PARTNERS = [
  "Hilti Foundation",
  "Liechtenstein Olympic Committee",
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
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
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
              Julia <span className="text-accent">W.</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-accent transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-accent transition-colors"
                >
                  {item}
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
            alt="Julia Weissenhofer performing on balance beam"
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
            Artistic Gymnast — Liechtenstein
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
            className="w-16 h-[2px] bg-accent mt-6"
          />
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <ChevronDown className="text-primary-foreground/50" size={28} />
        </motion.div>
      </section>

      {/* About */}
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
                alt="Julia Weissenhofer portrait"
                className="w-full max-w-md mx-auto aspect-[3/4] object-cover rounded-sm shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              <motion.p variants={fadeUp} custom={0} className="font-body text-xs tracking-[0.3em] uppercase text-accent">
                About
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="font-display text-4xl lg:text-5xl font-light text-foreground">
                Grace meets <span className="italic font-medium">determination</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="font-body text-base leading-relaxed text-muted-foreground">
                Born and raised in Liechtenstein, Julia Weissenhofer has been pushing the
                boundaries of artistic gymnastics since she was six years old. Representing
                one of Europe's smallest nations on the world stage, she brings an unwavering
                commitment to excellence and a deep passion for her sport.
              </motion.p>
              <motion.p variants={fadeUp} custom={3} className="font-body text-base leading-relaxed text-muted-foreground">
                Training out of Schaan, Julia specializes in balance beam and floor exercise,
                combining technical precision with artistic expression. Her goal: to put
                Liechtenstein gymnastics on the international map.
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
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                >
                  <Mail size={18} />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section id="achievements" className="py-24 lg:py-32 bg-primary">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} custom={0} className="font-body text-xs tracking-[0.3em] uppercase text-accent">
              Career Highlights
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-4xl lg:text-5xl font-light text-primary-foreground mt-3">
              Achievements
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
                <span className="font-display text-2xl font-light text-accent">{a.year}</span>
                <span className="font-display text-lg md:text-xl text-primary-foreground">{a.title}</span>
                <span className="font-body text-sm text-primary-foreground/50 hidden md:block">{a.detail}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section id="blog" className="py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} custom={0} className="font-body text-xs tracking-[0.3em] uppercase text-accent">
              Latest
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-4xl lg:text-5xl font-light text-foreground mt-3">
              From the Blog
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Preparing for Europeans 2025", date: "Feb 2025", excerpt: "My training journey heading into the biggest competition of the year..." },
              { title: "A Day in My Life", date: "Jan 2025", excerpt: "What a typical training day looks like between the gym and school..." },
              { title: "Reflecting on 2024", date: "Dec 2024", excerpt: "Looking back at a year of growth, challenges, and unforgettable moments..." },
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
                <h3 className="font-display text-xl mt-1 text-foreground group-hover:text-accent transition-colors">
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
            <motion.p variants={fadeUp} custom={0} className="font-body text-xs tracking-[0.3em] uppercase text-accent">
              Join the Team
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-4xl lg:text-5xl font-light text-foreground mt-3">
              Fanclub
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="font-body text-base text-muted-foreground mt-6 leading-relaxed max-w-lg mx-auto">
              Be part of Julia's journey! Join the fanclub to get exclusive updates,
              behind-the-scenes content, and early access to competition schedules.
            </motion.p>
            <motion.a
              variants={fadeUp}
              custom={3}
              href="mailto:kunstturnen@julia-weissenhofer.li"
              className="inline-block mt-8 px-8 py-3 bg-accent text-accent-foreground font-body text-sm tracking-wider uppercase rounded-sm hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <motion.p variants={fadeUp} custom={0} className="font-body text-xs tracking-[0.3em] uppercase text-accent">
              Supported By
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl font-light text-foreground mt-3">
              Partners
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
                className="font-body text-sm tracking-wider text-muted-foreground/60 hover:text-accent transition-colors cursor-default"
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
          <p className="font-body text-xs tracking-[0.3em] uppercase text-accent">Support</p>
          <h2 className="font-display text-3xl font-light text-foreground mt-3">Sponsoring</h2>
          <p className="font-body text-sm text-muted-foreground mt-4 leading-relaxed max-w-lg mx-auto">
            Interested in supporting Julia's athletic career? Reach out to discuss
            partnership opportunities and sponsoring packages.
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
      <footer className="py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display text-sm text-muted-foreground">
            © 2025 Julia Weissenhofer
          </span>
          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
              <Instagram size={16} />
            </a>
            <a href="mailto:kunstturnen@julia-weissenhofer.li" className="text-muted-foreground hover:text-accent transition-colors">
              <Mail size={16} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
