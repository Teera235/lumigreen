"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "หน้าแรก" },
    { href: "#innovation", label: "นวัตกรรม" },
    { href: "/live", label: "🔴 Live", isLive: true },
    { href: "#product", label: "สินค้า" },
    { href: "#impact", label: "ผลลัพธ์" },
    { href: "#calculator", label: "คำนวณ ROI" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-gray-200/50"
          : "bg-white/50 backdrop-blur-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.a
            href="#home"
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="relative"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image src="/logo.png" alt="LumiGreen Logo" width={44} height={44} className="w-11 h-11" />
            </motion.div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                LumiGreen
              </span>
              <p className="text-[10px] text-gray-400 -mt-1">Smart Light Pipe</p>
            </div>
          </motion.a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              link.isLive ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 bg-red-500 text-white rounded-full font-medium text-sm hover:bg-red-600 transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-gray-600 hover:text-emerald-600 transition-colors font-medium text-sm"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {link.label}
                  <motion.span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                    whileHover={{ width: "60%" }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              )
            ))}
            <motion.a
              href="#contact"
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-full font-medium text-sm shadow-lg shadow-emerald-500/30"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(16, 185, 129, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              สั่งซื้อ
            </motion.a>
          </div>

          <motion.button
            className="md:hidden p-2 rounded-xl bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X className="w-6 h-6 text-gray-700" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu className="w-6 h-6 text-gray-700" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden py-6 border-t border-gray-100"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-2">
                {navLinks.map((link, index) => (
                  link.isLive ? (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block py-3 px-4 bg-red-500 text-white rounded-xl font-medium text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      className="block py-3 px-4 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors font-medium"
                      onClick={() => setIsOpen(false)}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {link.label}
                    </motion.a>
                  )
                ))}
                <motion.a
                  href="#contact"
                  className="block py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-medium text-center mt-4"
                  onClick={() => setIsOpen(false)}
                >
                  สั่งซื้อเลย
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
