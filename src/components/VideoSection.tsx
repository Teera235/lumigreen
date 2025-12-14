"use client";
import { motion } from "framer-motion";
import { FadeIn } from "./animations/MotionWrapper";
import { Play, Zap, Eye } from "lucide-react";

const videoFeatures = [
  { icon: Play, label: "สาธิตการทำงานจริง", color: "text-emerald-400", bg: "bg-emerald-500/20" },
  { icon: Zap, label: "ระบบ PID Control", color: "text-blue-400", bg: "bg-blue-500/20" },
  { icon: Eye, label: "500 Lux คงที่", color: "text-amber-400", bg: "bg-amber-500/20" },
];

export default function VideoSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <motion.span
              className="inline-block text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Demo Video
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ดูหลักการทำงาน
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              ชมการทำงานของระบบท่อแสงอัจฉริยะ LumiGreen แบบ Real-time
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/20"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            {/* Glow Border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-amber-500 rounded-3xl opacity-30 blur-sm" />
            
            <div className="relative bg-gray-900 rounded-3xl overflow-hidden">
              {/* Video Player - Autoplay like GIF */}
              <video
                className="w-full aspect-video object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src="/demo-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </FadeIn>

        {/* Video Features */}
        <FadeIn delay={0.4}>
          <div className="grid grid-cols-3 gap-6 mt-12">
            {videoFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mx-auto mb-3`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </motion.div>
                <p className="text-gray-300 font-medium">{feature.label}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
