"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FadeIn } from "./animations/MotionWrapper";
import { Recycle, Zap, Shield, Wrench, Check, ArrowRight } from "lucide-react";

const features = [
  { icon: Recycle, label: "Upcycling", desc: "กระป๋อง 56 ใบ + PET", color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Zap, label: "Smart IoT", desc: "ESP32 + PID Control", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: Shield, label: "No Heat", desc: "มุมหัก 30 องศา", color: "text-amber-600", bg: "bg-amber-50" },
  { icon: Wrench, label: "Modular", desc: "ติดตั้งง่าย", color: "text-purple-600", bg: "bg-purple-50" },
];

const includes = [
  "โดมรับแสง PET รีไซเคิล",
  "ท่อสะท้อนแสงอลูมิเนียม",
  "ESP32 + Sensors",
  "Solar Cell + Battery",
  "LED เสริมอัตโนมัติ",
  "Mobile App Dashboard",
];

export default function ProductShowcase() {
  return (
    <section id="product" className="py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Product</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6">
              ชุดท่อแสงอัจฉริยะ <span className="text-emerald-600">LumiGreen</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              ครบชุดพร้อมติดตั้ง ราคาเดียว 11,000 บาท
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="right">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-amber-500/20 rounded-[2rem] blur-2xl" />
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/50">
                <Image
                  src="/product-sample.png"
                  alt="ตัวอย่างสินค้า LumiGreen"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Floating Price Tag */}
              <motion.div
                className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-2xl px-6 py-3 shadow-xl"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-xs opacity-80">ราคาพิเศษ</p>
                <p className="text-2xl font-bold">11,000฿</p>
              </motion.div>
            </motion.div>
          </FadeIn>

          <FadeIn direction="left" delay={0.2}>
            <div>
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-3`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h4 className="font-bold text-gray-900">{feature.label}</h4>
                    <p className="text-gray-500 text-sm">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* What's Included */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <h4 className="font-bold text-gray-900 mb-4">รวมในชุด:</h4>
                <div className="grid grid-cols-2 gap-3">
                  {includes.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-emerald-600" />
                      </div>
                      <span className="text-gray-600 text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="#contact"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-4 rounded-xl font-semibold shadow-lg shadow-emerald-500/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  สั่งซื้อเลย
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#calculator"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-gray-700 py-4 rounded-xl font-semibold border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  คำนวณ ROI
                </motion.a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
