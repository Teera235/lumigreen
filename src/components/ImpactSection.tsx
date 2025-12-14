"use client";
import { Clock, TrendingUp, GraduationCap, Leaf, Check, ShoppingCart, Zap, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "./animations/MotionWrapper";

const stats = [
  { icon: Clock, value: "2.36", suffix: " ปี", label: "ระยะเวลาคืนทุน", color: "from-emerald-500 to-teal-500" },
  { icon: TrendingUp, value: "112", suffix: "%", label: "ROI", color: "from-blue-500 to-indigo-500" },
  { icon: Zap, value: "4,665", suffix: " ฿", label: "ประหยัด/ปี", color: "from-amber-500 to-orange-500" },
  { icon: Leaf, value: "485", suffix: " kg", label: "ลด CO₂/ปี", color: "from-green-500 to-emerald-500" },
];

const performanceStats = [
  { icon: GraduationCap, value: "26%", label: "เพิ่มประสิทธิภาพการเรียนรู้", desc: "แสงธรรมชาติช่วยเพิ่มสมาธิ", color: "text-purple-600", bg: "bg-purple-50" },
  { icon: Eye, value: "0.578", label: "Uniformity", desc: "CV 10.81% แสงกระจายสม่ำเสมอ", color: "text-cyan-600", bg: "bg-cyan-50" },
];

const features = ["วัสดุและโครงสร้างครบชุด", "ESP32 + Sensors", "Solar Cell + Battery", "LED เสริมอัตโนมัติ", "Mobile Dashboard", "Modular ติดตั้งง่าย"];

const costBreakdown = [
  { item: "Diffuser, โคมสะท้อนแสง", price: "~1,800" },
  { item: "ESP32, Sensors, Solar, Battery", price: "~3,000" },
  { item: "ค่าแรงติดตั้ง", price: "900" },
  { item: "ค่าพัฒนาซอฟต์แวร์", price: "5,000" },
];

export default function ImpactSection() {
  return (
    <section id="impact" className="py-12 sm:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-emerald-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-blue-100/50 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-8 sm:mb-16">
            <motion.span className="inline-block bg-emerald-100 text-emerald-600 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4" whileHover={{ scale: 1.05 }}>
              Impact & Pricing
            </motion.span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              ผลลัพธ์ที่พิสูจน์แล้ว
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-lg px-2">
              ข้อมูลจากการทดสอบจริงที่ มจธ. พร้อมราคาที่คุ้มค่าที่สุด
            </p>
          </div>
        </FadeIn>

        {/* Main Stats */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12" staggerDelay={0.1}>
          {stats.map((stat, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl shadow-gray-200/50 border border-gray-100 text-center"
                whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }}
              >
                <motion.div
                  className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${stat.color} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </motion.div>
                <div className={`text-2xl sm:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-gray-500 font-medium text-xs sm:text-base">{stat.label}</div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Performance Stats */}
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-16">
            {performanceStats.map((stat, index) => (
              <motion.div key={index} className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-gray-100 flex items-center gap-3 sm:gap-5" whileHover={{ scale: 1.02 }}>
                <div className={`w-14 h-14 sm:w-20 sm:h-20 ${stat.bg} rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0`}>
                  <stat.icon className={`w-7 h-7 sm:w-10 sm:h-10 ${stat.color}`} />
                </div>
                <div>
                  <div className={`text-xl sm:text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-gray-900 font-semibold text-sm sm:text-base">{stat.label}</div>
                  <div className="text-gray-500 text-xs sm:text-sm">{stat.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Pricing */}
        <ScaleIn delay={0.3}>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              {/* Price Card */}
              <motion.div
                className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-2xl shadow-emerald-500/30 relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div className="absolute top-0 right-0 w-28 sm:w-40 h-28 sm:h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 5, repeat: Infinity }} />
                <motion.div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 5, repeat: Infinity }} />

                <div className="relative">
                  <motion.span className="inline-block bg-amber-400 text-amber-900 text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-4 sm:mb-6" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    ถูกกว่าท้องตลาด 4 เท่า
                  </motion.span>

                  <div className="mb-4 sm:mb-6">
                    <div className="text-4xl sm:text-6xl font-bold mb-1 sm:mb-2">11,000฿</div>
                    <p className="text-emerald-100 text-sm sm:text-base">ต่อชุด (รวมทุกอย่าง)</p>
                    <p className="text-emerald-200 text-xs sm:text-sm mt-1 sm:mt-2">
                      <span className="line-through opacity-70">45,000 บาท</span>
                      <span className="ml-2 text-amber-300 font-semibold">ประหยัด 34,000 บาท</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                    {features.map((feature, index) => (
                      <motion.div key={index} className="flex items-center gap-1.5 sm:gap-2" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + index * 0.05 }}>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        </div>
                        <span className="text-xs sm:text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button className="w-full bg-white text-emerald-700 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                    สนใจสั่งซื้อ
                  </motion.button>
                </div>
              </motion.div>

              {/* Cost Breakdown */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl border border-gray-100">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">รายละเอียดต้นทุน</h3>
                <div className="space-y-3 sm:space-y-4">
                  {costBreakdown.map((item, index) => (
                    <motion.div key={index} className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-100 last:border-0" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                      <span className="text-gray-600 text-sm sm:text-base">{item.item}</span>
                      <span className="font-bold text-gray-900 text-sm sm:text-base">{item.price} บาท</span>
                    </motion.div>
                  ))}
                  <div className="flex justify-between items-center pt-3 sm:pt-4 border-t-2 border-emerald-500">
                    <span className="font-bold text-gray-900 text-base sm:text-lg">รวมทั้งหมด</span>
                    <span className="font-bold text-emerald-600 text-xl sm:text-2xl">~11,000 บาท</span>
                  </div>
                </div>
                <p className="text-gray-400 text-[10px] sm:text-xs mt-4 sm:mt-6">* ค่าซอฟต์แวร์จะลดลงเมื่อผลิตจำนวนมาก</p>
              </div>
            </div>
          </div>
        </ScaleIn>
      </div>
    </section>
  );
}
