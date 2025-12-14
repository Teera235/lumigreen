"use client";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FadeIn, FloatingElement, PulseGlow } from "./animations/MotionWrapper";

const quickStats = [
  { value: "56", unit: "ใบ", label: "กระป๋องต่อชุด", color: "from-emerald-500 to-emerald-600" },
  { value: "500", unit: "Lux", label: "ความสว่างคงที่", color: "from-blue-500 to-blue-600" },
  { value: "11K", unit: "฿", label: "ราคาต่อชุด", color: "from-amber-500 to-amber-600" },
];

export default function HeroSection() {
  return (
    <section id="home" className="pt-20 sm:pt-16 min-h-screen flex items-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-amber-50" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-emerald-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-200/30 rounded-full blur-3xl" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
          <div>
            <FadeIn delay={0.1}>
              <motion.div 
                className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/80 backdrop-blur-sm border border-emerald-200 text-emerald-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-sm"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                นวัตกรรมใหม่ 2024
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4">
                <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">LumiGreen</span>
              </h1>
              <p className="text-base sm:text-xl md:text-2xl text-gray-700 font-medium mb-1 sm:mb-2">
                ระบบท่อแสงอัจฉริยะเพื่ออาคารยั่งยืน
              </p>
              <p className="text-gray-500 text-xs sm:text-sm mb-2 flex items-center gap-1.5 sm:gap-2">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                ทดสอบจริงที่ มจธ. (KMUTT)
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-sm sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                เปลี่ยน <span className="font-semibold text-emerald-600">&quot;ขยะ&quot;</span> ให้เป็น{" "}
                <span className="font-semibold text-amber-500">&quot;แสงสว่าง&quot;</span>{" "}
                ด้วยวัสดุ Upcycling ผสาน IoT ควบคุมแสงอัตโนมัติ ประหยัดพลังงาน
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-10">
                {quickStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl sm:rounded-2xl px-3 sm:px-5 py-2.5 sm:py-4 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex items-baseline gap-0.5 sm:gap-1">
                      <span className={`text-lg sm:text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </span>
                      <span className="text-gray-500 text-xs sm:text-sm">{stat.unit}</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <motion.a
                  href="#calculator"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  คำนวณ ROI
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.span>
                </motion.a>
                <motion.a
                  href="#innovation"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all border border-gray-200 shadow-sm text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ดูรายละเอียด
                </motion.a>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.3} direction="left">
            <div className="relative mt-8 lg:mt-0">
              <FloatingElement>
                <motion.div
                  className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/20 border border-white/50"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/hero-image.png"
                    alt="Light Pipe บนหลังคา + ห้องเรียนสว่าง"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </motion.div>
              </FloatingElement>

              <PulseGlow className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 w-20 sm:w-32 h-20 sm:h-32 bg-amber-400 rounded-full blur-2xl opacity-60" />
              <PulseGlow className="absolute -top-4 sm:-top-6 -left-4 sm:-left-6 w-24 sm:w-40 h-24 sm:h-40 bg-emerald-400 rounded-full blur-3xl opacity-40" />
              
              {/* Floating Badge */}
              <motion.div
                className="absolute -bottom-2 sm:-bottom-4 left-2 sm:-left-4 bg-white rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-xl border border-gray-100"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-[10px] sm:text-xs text-gray-500">ประหยัดค่าไฟ</p>
                <p className="text-sm sm:text-lg font-bold text-emerald-600">4,665 บาท/ปี</p>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
