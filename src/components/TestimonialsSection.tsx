"use client";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "./animations/MotionWrapper";
import { Star, Quote, Award, Trophy, Medal } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "ผศ.ดร. สมชาย วิศวกรรม",
    role: "อาจารย์ที่ปรึกษา มจธ.",
    content: "LumiGreen เป็นนวัตกรรมที่ผสมผสานแนวคิด Upcycling กับ IoT ได้อย่างลงตัว สามารถนำไปใช้งานจริงได้ทันที",
    rating: 5,
    avatar: "👨‍🏫",
  },
  {
    name: "คุณสมหญิง ประหยัดพลังงาน",
    role: "ผู้อำนวยการโรงเรียน",
    content: "หลังติดตั้ง LumiGreen ค่าไฟลดลงอย่างเห็นได้ชัด นักเรียนมีสมาธิในการเรียนมากขึ้น",
    rating: 5,
    avatar: "👩‍💼",
  },
  {
    name: "คุณวิศวะ นวัตกรรม",
    role: "วิศวกรพลังงาน",
    content: "ระบบ PID Control ทำงานได้แม่นยำมาก รักษาความสว่างได้คงที่ตลอดทั้งวัน",
    rating: 5,
    avatar: "👨‍💻",
  },
];

const awards = [
  { icon: Trophy, title: "Best Innovation", event: "KMUTT Engineering Fair 2024", color: "from-amber-400 to-amber-600" },
  { icon: Award, title: "Green Technology", event: "Thailand Sustainability Award", color: "from-emerald-400 to-emerald-600" },
  { icon: Medal, title: "IoT Excellence", event: "Smart Building Competition", color: "from-blue-400 to-blue-600" },
];

export default function TestimonialsSection() {
  return (
    <section className="py-12 sm:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-100/50 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Awards */}
        <FadeIn>
          <div className="text-center mb-12 sm:mb-16">
            <motion.span
              className="inline-block bg-amber-100 text-amber-700 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4"
              whileHover={{ scale: 1.05 }}
            >
              🏆 Awards & Recognition
            </motion.span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              รางวัลและการยอมรับ
            </h2>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-20" staggerDelay={0.1}>
          {awards.map((award, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl border border-gray-100 text-center"
                whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }}
              >
                <motion.div
                  className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${award.color} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <award.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </motion.div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{award.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm">{award.event}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Testimonials */}
        <FadeIn delay={0.2}>
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
              เสียงจากผู้ใช้งาน
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">ความคิดเห็นจากผู้ที่ได้ทดลองใช้ LumiGreen</p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6" staggerDelay={0.15}>
          {testimonials.map((testimonial, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl border border-gray-100 relative"
                whileHover={{ y: -5 }}
              >
                {/* Quote Icon */}
                <Quote className="absolute top-4 right-4 w-8 h-8 text-emerald-100" />

                {/* Rating */}
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-full flex items-center justify-center text-xl sm:text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</p>
                    <p className="text-gray-500 text-xs sm:text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
