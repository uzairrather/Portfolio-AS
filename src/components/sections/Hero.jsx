import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const roles = [
  "Full-Stack Developer",
  "MERN Stack Engineer",
  "React Native Developer",
  "Next.js Developer",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.slice(0, charIndex + 1));
        setCharIndex((i) => i + 1);
        if (charIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(current.slice(0, charIndex - 1));
        setCharIndex((i) => i - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };
  const item = {
    hidden: { y: 40, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Gradient overlay — lighter so DNA shows through */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(6,13,31,0.85) 30%, rgba(6,13,31,0.3) 50%, transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-10"
        style={{ background: "linear-gradient(to top, #060d1f, transparent)" }}
      />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-20 max-w-7xl mx-auto px-6 pt-28 pb-16"
      >
        {/* Status badge */}
        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 mb-8"
        >
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="text-accent text-xs font-mono-custom tracking-widest">
            AVAILABLE FOR WORK
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p
          variants={item}
          className="font-mono-custom text-text-dim text-sm tracking-widest mb-4"
        >
          Hi, I'm
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={item}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-none mb-4"
        >
          <span className="text-white">Ausif Mohammad Rather</span>
          <span className="text-accent">.</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          variants={item}
          className="flex items-center gap-3 mb-8 h-12"
        >
          <span className="font-display text-2xl md:text-3xl text-accent font-bold">
            {displayText}
          </span>
          <span className="w-0.5 h-8 bg-accent animate-pulse" />
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={item}
          className="max-w-lg text-text-dim text-base leading-relaxed mb-10"
        >
          Full Stack MERN Developer with 3+ years building scalable web & mobile
          apps — from gamified platforms and AI-powered tools to e-commerce
          solutions. React.js · Next.js · Node.js · React Native · MongoDB ·
          TypeScript.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="flex flex-wrap items-center gap-4"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(0,255,135,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById("projects")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-4 bg-accent text-bg font-bold rounded-xl text-sm tracking-wide"
          >
            View Projects →
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById("contact")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-4 border border-border text-text hover:border-accent/50 rounded-xl text-sm tracking-wide transition-colors glass"
          >
            Contact Me
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={item}
          className="flex flex-wrap items-center gap-8 mt-16"
        >
          {[
            { value: "3+", label: "Years Experience" },
            { value: "30+", label: "API Tests Written" },
            { value: "5+", label: "Projects Shipped" },
            { value: "15", label: "Attack Vectors Covered" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl font-bold text-gradient">
                {stat.value}
              </div>
              <div className="text-text-dim text-xs mt-1 tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-text-dim text-xs font-mono-custom tracking-widest">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-accent to-transparent"
        />
      </motion.div>
    </section>
  );
}
