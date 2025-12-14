"use client";
import { Recycle, Cpu, Sun, Battery, Smartphone, Thermometer, Layers } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "./animations/MotionWrapper";

const hardwareFeatures = [
  {
    icon: "🥫",
    title: "ท่อสะท้อนแสงจากกระป๋องอลูมิเนียม",
    description: "ใช้กระป๋องอลูมิเนียมใช้แล้ว 56 ใบ ต่อ 1 ชุด นำมาตัดและต่อกันเป็นท่อสะท้อนแสง",
    isEmoji: true,
  },
  {
    icon: Sun,
    title: "โดมรับแสง PET รีไซเคิล",
    description: "ผลิตจากพลาสติก PET (ขวดน้ำดื่ม) นำมารีไซเคิลและขึ้นรูปเป็นโดมรับแสง",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    icon: Thermometer,
    title: "มุมหัก 30 องศา (No Heat)",
    description: "ออกแบบท่อให้มีมุมงอ 30 องศา ป้องกันความร้อนเข้าสู่อาคาร แต่ยังนำแสงได้ดี",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    icon: Layers,
    title: "Modular System",
    description: "ระบบโมดูลาร์ ถอดประกอบได้ แยกชิ้นส่วนได้ ติดตั้งง่าย บำรุงรักษาสะดวก",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
];

const softwareFeatures = [
  {
    icon: Cpu,
    title: "PID Control (500 Lux คงที่)",
    description: "ใช้ระบบควบคุมแบบ PID รักษาระดับความสว่างให้คงที่ที่ 500 Lux ตลอดเวลา ไม่กระพริบ ไม่ปวดตา",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Battery,
    title: "Hybrid Power + Solar Cell",
    description: "มีแผงโซลาร์เซลล์ชาร์จไฟเข้าแบตเตอรี่ จ่ายไฟให้ระบบควบคุมและ LED เสริม ไม่ต้องดึงไฟบ้านตลอด",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    icon: Smartphone,
    title: "IoT Dashboard (Real-time)",
    description: "ใช้ ESP32 + MQTT ส่งข้อมูลไป Node-RED แสดงค่า Lux, กระแสไฟ, สถานะผ่าน Mobile App แบบ Real-time",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
];

export default function InnovationSection() {
  return (
    <section id="innovation" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Innovation</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">นวัตกรรม LumiGreen</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ผสมผสานเทคโนโลยี Upcycling และ Smart IoT เพื่อแสงสว่างที่ยั่งยืนและประหยัดพลังงาน
            </p>
          </div>
        </FadeIn>

        {/* Part 1: Hardware */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <FadeIn direction="right">
            <motion.div
              className="rounded-2xl overflow-hidden shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/pipe-diagram.png"
                alt="แผนภาพท่อทำมุม 30 องศา"
                width={500}
                height={500}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </FadeIn>

          <div>
            <FadeIn delay={0.2}>
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Recycle className="w-6 h-6 text-emerald-600" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Hardware Design</h3>
                  <p className="text-gray-500 text-sm">โครงสร้างจากวัสดุ Upcycling</p>
                </div>
              </div>
            </FadeIn>

            <StaggerContainer className="space-y-5" staggerDelay={0.1}>
              {hardwareFeatures.map((feature, index) => (
                <StaggerItem key={index}>
                  <motion.div className="flex gap-4 group cursor-pointer" whileHover={{ x: 8 }}>
                    <motion.div
                      className={`w-10 h-10 ${feature.bgColor || "bg-gray-100"} rounded-lg flex items-center justify-center shrink-0`}
                    >
                      {feature.isEmoji ? (
                        <span className="text-lg">{feature.icon as string}</span>
                      ) : (
                        <feature.icon className={`w-5 h-5 ${feature.color}`} />
                      )}
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

        {/* Part 2: Software */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <FadeIn delay={0.2}>
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Cpu className="w-6 h-6 text-blue-600" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Smart IoT System</h3>
                  <p className="text-gray-500 text-sm">ระบบควบคุมแสงอัจฉริยะ</p>
                </div>
              </div>
            </FadeIn>

            <StaggerContainer className="space-y-5" staggerDelay={0.1}>
              {softwareFeatures.map((feature, index) => (
                <StaggerItem key={index}>
                  <motion.div className="flex gap-4 group cursor-pointer" whileHover={{ x: 8 }}>
                    <motion.div
                      className={`w-10 h-10 ${feature.bgColor} rounded-lg flex items-center justify-center shrink-0`}
                    >
                      <feature.icon className={`w-5 h-5 ${feature.color}`} />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Workflow Summary */}
            <FadeIn delay={0.4}>
              <div className="mt-8 bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">หลักการทำงาน:</span> ใช้แสงธรรมชาติเป็นหลัก 
                  หากแสง {"<"} 500 Lux → LED เสริมอัตโนมัติ | หากแสง {">"} 500 Lux → ชาร์จแบตเตอรี่
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn direction="left" className="order-1 lg:order-2">
            <motion.div
              className="rounded-2xl overflow-hidden shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/dashboard.png"
                alt="IoT Dashboard Interface"
                width={500}
                height={500}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
