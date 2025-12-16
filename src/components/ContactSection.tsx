"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "./animations/MotionWrapper";
import { Send, MessageCircle, Mail, Phone, MapPin, CheckCircle } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitted(true);
    setIsLoading(false);
  };

  const contactInfo = [
    { icon: Mail, label: "อีเมล", value: "contact@lumigreen.co.th", href: "mailto:contact@lumigreen.co.th" },
    { icon: Phone, label: "โทรศัพท์", value: "02-XXX-XXXX", href: "tel:02-XXX-XXXX" },
    { icon: MapPin, label: "ที่อยู่", value: "มจธ. บางมด กรุงเทพฯ", href: "#" },
  ];

  return (
    <section id="contact-form" className="py-12 sm:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-emerald-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-100/30 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-10 sm:mb-16">
            <motion.span
              className="inline-block bg-emerald-100 text-emerald-700 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4"
              whileHover={{ scale: 1.05 }}
            >
              📬 Contact Us
            </motion.span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              ติดต่อสอบถาม
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-lg">
              สนใจสั่งซื้อหรือต้องการข้อมูลเพิ่มเติม ติดต่อเราได้เลย
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <FadeIn delay={0.2}>
            <motion.div
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100"
              whileHover={{ boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }}
            >
              {isSubmitted ? (
                <motion.div
                  className="text-center py-8 sm:py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10 }}
                  >
                    <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">ส่งข้อความสำเร็จ!</h3>
                  <p className="text-gray-600 text-sm sm:text-base">เราจะติดต่อกลับโดยเร็วที่สุด</p>
                  <motion.button
                    onClick={() => { setIsSubmitted(false); setFormData({ name: "", email: "", phone: "", message: "" }); }}
                    className="mt-6 text-emerald-600 font-medium hover:underline text-sm sm:text-base"
                    whileHover={{ scale: 1.05 }}
                  >
                    ส่งข้อความใหม่
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">ชื่อ-นามสกุล</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm sm:text-base"
                        placeholder="กรอกชื่อของคุณ"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">เบอร์โทรศัพท์</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm sm:text-base"
                        placeholder="08X-XXX-XXXX"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">อีเมล</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm sm:text-base"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">ข้อความ</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all resize-none text-sm sm:text-base"
                      placeholder="สนใจสอบถามเรื่อง..."
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 disabled:opacity-70 text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <>
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        ส่งข้อความ
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </FadeIn>

          {/* Contact Info & Line */}
          <FadeIn delay={0.3}>
            <div className="space-y-4 sm:space-y-6">
              {/* Line Official */}
              <motion.a
                href="https://line.me/ti/p/@lumigreen"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#06C755] rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-white shadow-xl"
                whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(6, 199, 85, 0.3)" }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <div>
                    <p className="font-bold text-lg sm:text-xl">Line Official</p>
                    <p className="text-white/80 text-sm sm:text-base">@lumigreen</p>
                  </div>
                </div>
                <p className="mt-3 sm:mt-4 text-white/90 text-sm sm:text-base">แอดไลน์เพื่อสอบถามและรับข่าวสารโปรโมชั่น</p>
              </motion.a>

              {/* Contact Cards */}
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  className="flex items-center gap-4 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg border border-gray-100"
                  whileHover={{ x: 10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs sm:text-sm">{info.label}</p>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">{info.value}</p>
                  </div>
                </motion.a>
              ))}

              {/* Map Preview */}
              <motion.div
                className="bg-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden h-40 sm:h-48 relative"
                whileHover={{ scale: 1.02 }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.5!2d100.4942!3d13.6513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2a2!2sKMUTT!5e0!3m2!1sth!2sth!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
