"use client";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "./animations/MotionWrapper";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Mail, href: "mailto:contact@lumigreen.co.th", label: "Email" },
];

const quickLinks = [
  { label: "หน้าแรก", href: "#home" },
  { label: "นวัตกรรม", href: "#innovation" },
  { label: "สินค้า", href: "#product" },
  { label: "คำนวณ ROI", href: "#calculator" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-20 pb-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <StaggerContainer className="grid md:grid-cols-4 gap-12 mb-16" staggerDelay={0.1}>
          {/* Brand */}
          <StaggerItem className="md:col-span-2">
            <motion.div className="flex items-center gap-3 mb-6" whileHover={{ scale: 1.02 }}>
              <Image src="/logo.png" alt="LumiGreen Logo" width={48} height={48} className="w-12 h-12" />
              <div>
                <span className="text-2xl font-bold">LumiGreen</span>
                <p className="text-emerald-400 text-sm font-medium">Clean Energy For Life</p>
              </div>
            </motion.div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              นวัตกรรมท่อแสงอัจฉริยะจากวัสดุ Upcycling ผสาน IoT เพื่อแสงสว่างที่ยั่งยืน ประหยัดพลังงาน และเป็นมิตรกับสิ่งแวดล้อม
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-11 h-11 bg-white/5 hover:bg-emerald-500/20 rounded-xl flex items-center justify-center transition-colors"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5 text-gray-400 hover:text-emerald-400" />
                </motion.a>
              ))}
            </div>
          </StaggerItem>

          {/* Quick Links */}
          <StaggerItem>
            <h3 className="font-bold text-lg mb-6">ลิงก์ด่วน</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </StaggerItem>

          {/* Contact */}
          <StaggerItem>
            <h3 className="font-bold text-lg mb-6">ติดต่อเรา</h3>
            <ul className="space-y-4">
              <li>
                <motion.a href="mailto:contact@lumigreen.co.th" className="flex items-start gap-3 text-gray-400 hover:text-emerald-400 transition-colors" whileHover={{ x: 5 }}>
                  <Mail className="w-5 h-5 mt-0.5 shrink-0" />
                  <span>contact@lumigreen.co.th</span>
                </motion.a>
              </li>
              <li>
                <motion.a href="tel:02-XXX-XXXX" className="flex items-start gap-3 text-gray-400 hover:text-emerald-400 transition-colors" whileHover={{ x: 5 }}>
                  <Phone className="w-5 h-5 mt-0.5 shrink-0" />
                  <span>02-XXX-XXXX</span>
                </motion.a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                  <span>มจธ. บางมด<br />กรุงเทพมหานคร</span>
                </div>
              </li>
            </ul>
          </StaggerItem>
        </StaggerContainer>

        {/* Bottom Bar */}
        <FadeIn delay={0.5}>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 LumiGreen. All rights reserved. | Developed with 💚 for sustainability
            </p>
            <motion.button
              onClick={scrollToTop}
              className="w-11 h-11 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-xl flex items-center justify-center transition-colors"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 text-emerald-400" />
            </motion.button>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
