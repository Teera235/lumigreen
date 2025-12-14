"use client";
import { Zap, Eye, DollarSign, Thermometer } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "./animations/MotionWrapper";

const problems = [
  {
    icon: Zap,
    title: "ใช้พลังงานสูง",
    description: "อาคารเรียนใช้ไฟฟ้าเฉลี่ย 150-250 kWh/ตร.ม./ปี ระบบแสงสว่างคิดเป็น 10-20%",
    stat: "150-250",
    statUnit: "kWh",
    color: "from-amber-500 to-orange-500",
    iconBg: "bg-amber-500",
  },
  {
    icon: DollarSign,
    title: "ราคาแพงมาก",
    description: "Light Pipe ทั่วไปราคาสูงถึง 45,000 บาท/ชุด ทำให้โรงเรียนเข้าถึงยาก",
    stat: "45,000",
    statUnit: "บาท",
    color: "from-red-500 to-rose-500",
    iconBg: "bg-red-500",
  },
  {
    icon: Thermometer,
    title: "ความร้อนเข้าอาคาร",
    description: "ท่อแสงทั่วไปนำความร้อนเข้าสู่อาคาร ต้องใช้แอร์มากขึ้น",
    stat: "+",
    statUnit: "Heat",
    color: "from-orange-500 to-red-500",
    iconBg: "bg-orange-500",
  },
  {
    icon: Eye,
    title: "แสงไม่สม่ำเสมอ",
    description: "ความสว่างขึ้นอยู่กับสภาพอากาศ ส่งผลต่อสายตาและสมาธิ",
    stat: "ไม่คงที่",
    statUnit: "Lux",
    color: "from-gray-500 to-gray-600",
    iconBg: "bg-gray-500",
  },
];

export default function ProblemSection() {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <motion.span
              className="inline-block bg-red-100 text-red-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              whileHover={{ scale: 1.05 }}
            >
              ปัญหาที่พบ
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ทำไมต้อง <span className="text-emerald-600">LumiGreen</span>?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              ระบบแสงสว่างในอาคารเรียนปัจจุบันมีปัญหาหลายด้าน ที่ส่งผลกระทบต่อค่าใช้จ่าย สุขภาพ และการเรียนรู้
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
          {problems.map((problem, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100 h-full relative overflow-hidden group"
                whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
              >
                {/* Gradient Overlay on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${problem.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <motion.div
                  className={`w-14 h-14 ${problem.iconBg} rounded-2xl flex items-center justify-center mb-5 shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <problem.icon className="w-7 h-7 text-white" />
                </motion.div>

                <div className="mb-4">
                  <span className={`text-3xl font-bold bg-gradient-to-r ${problem.color} bg-clip-text text-transparent`}>
                    {problem.stat}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">{problem.statUnit}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{problem.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{problem.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
