"use client";
import { Sun, Cpu, Battery, Wifi } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "./animations/MotionWrapper";

const workflowSteps = [
  {
    icon: Sun,
    step: "01",
    title: "รับแสง",
    description: "LDR Sensor รับค่าแสงธรรมชาติจากโดมรับแสง PET",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Cpu,
    step: "02",
    title: "ประมวลผล",
    description: "ESP32 ตรวจสอบค่า Lux เทียบกับเป้าหมาย 500 Lux",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Battery,
    step: "03",
    title: "ควบคุม",
    description: "แสง < 500 → LED เสริม | แสง > 500 → ชาร์จแบต",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Wifi,
    step: "04",
    title: "รายงาน",
    description: "ส่งข้อมูลผ่าน MQTT ไป Dashboard แบบ Real-time",
    color: "from-purple-500 to-pink-500",
  },
];

export default function WorkflowSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-20">
            <motion.span
              className="inline-block bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              whileHover={{ scale: 1.05 }}
            >
              How It Works
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ระบบทำงานอย่างไร?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              ระบบ PID Control อัตโนมัติ รักษาความสว่าง 500 Lux ตลอดเวลา
            </p>
          </div>
        </FadeIn>

        {/* Desktop Flow */}
        <StaggerContainer className="hidden md:grid grid-cols-4 gap-8" staggerDelay={0.15}>
          {workflowSteps.map((step, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="relative text-center"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Connector Line */}
                {index < workflowSteps.length - 1 && (
                  <div className="absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-100 hidden lg:block" />
                )}

                {/* Step Number */}
                <motion.div
                  className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center z-10"
                  whileHover={{ scale: 1.2 }}
                >
                  <span className="text-xs font-bold text-gray-400">{step.step}</span>
                </motion.div>

                {/* Icon */}
                <motion.div
                  className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl`}
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <step.icon className="w-12 h-12 text-white" />
                </motion.div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Mobile Flow */}
        <StaggerContainer className="md:hidden space-y-4" staggerDelay={0.1}>
          {workflowSteps.map((step, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="flex items-start gap-4 bg-gray-50 rounded-2xl p-5"
                whileHover={{ x: 10 }}
              >
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shrink-0 shadow-lg`}
                  whileHover={{ scale: 1.1 }}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <span className="text-xs font-bold text-gray-400">{step.step}</span>
                  <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                  <p className="text-gray-500 text-sm">{step.description}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Summary */}
        <FadeIn delay={0.5}>
          <motion.div
            className="mt-16 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 rounded-3xl p-8 text-white text-center shadow-2xl shadow-emerald-500/20"
            whileHover={{ scale: 1.01 }}
          >
            <p className="text-xl font-medium mb-2">
              💡 หลักการ Hybrid: ใช้แสงธรรมชาติเป็นหลัก หากไม่พอ LED จะเสริมอัตโนมัติ
            </p>
            <p className="text-emerald-100">
              ระบบ PID ทำให้แสงคงที่ Smooth & Stable ไม่มีการกระพริบให้ปวดตา
            </p>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
