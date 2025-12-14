"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Ring } from "@react-three/drei";
import * as THREE from "three";
import { FadeIn } from "./animations/MotionWrapper";
import {
  Sun, Zap, Battery, TrendingDown, Leaf,
  Activity, Wifi, WifiOff, RefreshCw, Sparkles
} from "lucide-react";

const BLYNK_TOKEN = "O9C2s8T0nrrOmFjShVi-S9YsH4KUMSKs";
const BLYNK_SERVER = "https://blynk.cloud/external/api";

interface SensorData {
  lux: number;
  pwm: number;
  current: number;
  power: number;
  energy: number;
  energySaved: number;
  energyCost: number;
  energySavedBaht: number;
  error: number;
  setpoint: number;
  co2Emission: number;
  co2Saved: number;
}

const defaultData: SensorData = {
  lux: 0, pwm: 0, current: 0, power: 0, energy: 0, energySaved: 0,
  energyCost: 0, energySavedBaht: 0, error: 0, setpoint: 500, co2Emission: 0, co2Saved: 0,
};

// 3D Glowing Orb Component
function GlowingOrb({ intensity = 0.5, color = "#10b981" }: { intensity?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={intensity}
        />
      </Sphere>
      <Ring args={[1.2, 1.4, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
      </Ring>
      <Ring args={[1.5, 1.6, 64]} rotation={[Math.PI / 3, 0, 0]}>
        <meshBasicMaterial color={color} transparent opacity={0.2} side={THREE.DoubleSide} />
      </Ring>
    </Float>
  );
}

// Animated Particles
function Particles({ count = 50, color = "#10b981" }: { count?: number; color?: string }) {
  const mesh = useRef<THREE.Points>(null);
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
      mesh.current.rotation.x = state.clock.elapsedTime * 0.03;
    }
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial size={0.05} color={color} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// Circular Progress Ring - Responsive
function CircularProgress({ value, max, size = 200, strokeWidth = 12, className = "" }: {
  value: number; max: number; size?: number; strokeWidth?: number; className?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min(value / max, 1);
  const offset = circumference - progress * circumference;

  return (
    <svg width={size} height={size} className={`transform -rotate-90 ${className}`} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={strokeWidth}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="url(#progressGradient)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1, ease: "easeOut" }}
        filter="url(#glow)"
      />
    </svg>
  );
}

// Stat Card Component - Mobile Optimized
function StatCard({ icon: Icon, label, value, unit, subtext, colorFrom, colorTo }: {
  icon: React.ComponentType<{ className?: string }>; label: string; value: string; unit: string; subtext?: string; colorFrom: string; colorTo: string;
}) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-500" />
      <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div 
          className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg"
          style={{ background: `linear-gradient(to bottom right, ${colorFrom}, ${colorTo})` }}
        >
          <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
        </div>
        
        <p className="text-gray-400 text-xs sm:text-sm mb-1">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-xl sm:text-3xl font-bold text-white">{value}</span>
          <span className="text-gray-500 text-xs sm:text-sm">{unit}</span>
        </div>
        {subtext && <p className="text-gray-500 text-[10px] sm:text-xs mt-1">{subtext}</p>}
      </div>
    </div>
  );
}

export default function LiveDashboard() {
  const [data, setData] = useState<SensorData>(defaultData);
  const [isOnline, setIsOnline] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const pins = ["V1", "V2", "V3", "V4", "V5", "V7", "V8", "V9", "V6", "V10", "V11", "V12"];
      const responses = await Promise.all(
        pins.map(pin =>
          fetch(`${BLYNK_SERVER}/get?token=${BLYNK_TOKEN}&${pin}`)
            .then(res => res.json())
            .catch(() => [0])
        )
      );

      setData({
        lux: parseFloat(responses[0]) || 0,
        pwm: parseFloat(responses[1]) || 0,
        current: parseFloat(responses[2]) || 0,
        power: parseFloat(responses[3]) || 0,
        energy: parseFloat(responses[4]) || 0,
        energySaved: parseFloat(responses[5]) || 0,
        energyCost: parseFloat(responses[6]) || 0,
        energySavedBaht: parseFloat(responses[7]) || 0,
        error: parseFloat(responses[8]) || 0,
        setpoint: parseFloat(responses[9]) || 500,
        co2Emission: parseFloat(responses[10]) || 0,
        co2Saved: parseFloat(responses[11]) || 0,
      });
      setIsOnline(true);
      setLastUpdate(new Date());
      setIsLoading(false);
    } catch {
      setIsOnline(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const getLuxColor = () => {
    if (data.lux >= 450 && data.lux <= 550) return "#10b981";
    if (data.lux < 300) return "#f59e0b";
    return "#3b82f6";
  };

  const getLuxStatus = () => {
    if (data.lux >= 450 && data.lux <= 550) return { text: "✓ เหมาะสม", color: "text-emerald-400" };
    if (data.lux < 300) return { text: "⚠ แสงน้อย", color: "text-amber-400" };
    return { text: "● แสงมาก", color: "text-blue-400" };
  };

  const luxStatus = getLuxStatus();

  return (
    <section id="live" className="py-12 sm:py-24 bg-[#0a0a0f] relative overflow-hidden min-h-screen">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-8 sm:mb-16">
            <motion.div
              className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-emerald-500 rounded-full blur-xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative bg-gradient-to-r from-emerald-500 to-cyan-500 p-2 sm:p-3 rounded-full">
                  <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <span className="text-emerald-400 font-bold text-sm sm:text-lg tracking-wider uppercase">Live Dashboard</span>
              <motion.span
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-red-400'}`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Real-time
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Monitoring
              </span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-lg px-4">
              ข้อมูลจาก ESP32 + Blynk IoT อัพเดททุก 2 วินาที
            </p>
          </div>
        </FadeIn>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12">
          {/* 3D Visualization */}
          <div className="md:col-span-1">
            <motion.div
              className="relative bg-gray-900/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden h-[280px] sm:h-[400px]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0">
                <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                  <ambientLight intensity={0.2} />
                  <pointLight position={[10, 10, 10]} intensity={1} color={getLuxColor()} />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
                  <Suspense fallback={null}>
                    <GlowingOrb intensity={data.lux / 500} color={getLuxColor()} />
                    <Particles count={100} color={getLuxColor()} />
                  </Suspense>
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
              </div>

              {/* Overlay Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-gray-900 to-transparent">
                <p className="text-gray-400 text-xs sm:text-sm mb-1">ความสว่างปัจจุบัน</p>
                <div className="flex items-baseline gap-2">
                  <motion.span
                    className="text-3xl sm:text-5xl font-bold text-white"
                    key={data.lux}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                  >
                    {data.lux.toFixed(0)}
                  </motion.span>
                  <span className="text-gray-400 text-base sm:text-xl">Lux</span>
                </div>
                <p className={`text-xs sm:text-sm font-medium mt-1 ${luxStatus.color}`}>{luxStatus.text}</p>
              </div>
            </motion.div>
          </div>

          {/* Circular Gauge */}
          <div className="md:col-span-1">
            <motion.div
              className="relative bg-gray-900/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-8 h-[280px] sm:h-[400px] flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="relative w-[160px] h-[160px] sm:w-[220px] sm:h-[220px]">
                <CircularProgress value={data.lux} max={750} size={160} strokeWidth={10} className="sm:hidden" />
                <CircularProgress value={data.lux} max={750} size={220} strokeWidth={14} className="hidden sm:block" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 mb-1 sm:mb-2" />
                  <motion.span
                    className="text-2xl sm:text-4xl font-bold text-white"
                    key={data.lux}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                  >
                    {((data.lux / data.setpoint) * 100).toFixed(0)}%
                  </motion.span>
                  <span className="text-gray-500 text-xs sm:text-sm">of target</span>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-gray-400 text-xs sm:text-sm">เป้าหมาย</p>
                <p className="text-xl sm:text-2xl font-bold text-emerald-400">{data.setpoint} Lux</p>
              </div>
            </motion.div>
          </div>

          {/* Status Panel */}
          <div className="md:col-span-2 lg:col-span-1">
            <motion.div
              className="bg-gray-900/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 h-auto sm:h-[400px] flex flex-col"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-white font-bold text-base sm:text-lg">System Status</h3>
                <div className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full ${isOnline ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                  {isOnline ? <Wifi className="w-3 h-3 sm:w-4 sm:h-4" /> : <WifiOff className="w-3 h-3 sm:w-4 sm:h-4" />}
                  <span className="text-[10px] sm:text-xs font-medium">{isOnline ? 'Online' : 'Offline'}</span>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 flex-1">
                {/* PWM */}
                <div className="bg-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-xs sm:text-sm">PWM Output</span>
                    <span className="text-white font-bold text-sm sm:text-base">{data.pwm.toFixed(0)}/255</span>
                  </div>
                  <div className="h-1.5 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(data.pwm / 255) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Power */}
                <div className="bg-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-xs sm:text-sm">Power</span>
                    <span className="text-white font-bold text-sm sm:text-base">{data.power.toFixed(2)} W</span>
                  </div>
                  <div className="h-1.5 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(data.power / 24) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Error */}
                <div className="bg-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs sm:text-sm">Error</span>
                    <motion.span
                      className={`font-bold text-sm sm:text-base ${Math.abs(data.error) < 50 ? 'text-emerald-400' : 'text-amber-400'}`}
                      key={data.error}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                    >
                      {data.error > 0 ? '+' : ''}{data.error.toFixed(1)} Lux
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* Last Update */}
              <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-white/10 mt-3 sm:mt-0">
                <span className="text-gray-500 text-[10px] sm:text-xs">
                  {lastUpdate ? `อัพเดท: ${lastUpdate.toLocaleTimeString('th-TH')}` : 'กำลังโหลด...'}
                </span>
                <motion.button
                  onClick={fetchData}
                  className="p-1.5 sm:p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                  whileHover={{ rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <RefreshCw className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 ${isLoading ? 'animate-spin' : ''}`} />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <StatCard icon={Zap} label="กระแสไฟฟ้า" value={data.current.toFixed(3)} unit="A" subtext={`${data.power.toFixed(2)} W`} colorFrom="#a855f7" colorTo="#ec4899" />
          <StatCard icon={Battery} label="พลังงานใช้" value={data.energy.toFixed(2)} unit="Wh" subtext={`${data.energyCost.toFixed(2)} บาท`} colorFrom="#06b6d4" colorTo="#3b82f6" />
          <StatCard icon={TrendingDown} label="พลังงานประหยัด" value={data.energySaved.toFixed(2)} unit="Wh" subtext={`${data.energySavedBaht.toFixed(2)} บาท`} colorFrom="#10b981" colorTo="#14b8a6" />
          <StatCard icon={Leaf} label="CO₂ ลดได้" value={data.co2Saved.toFixed(4)} unit="kg" subtext={`ปล่อย ${data.co2Emission.toFixed(4)} kg`} colorFrom="#22c55e" colorTo="#10b981" />
        </div>

        {/* Bottom Banner */}
        <FadeIn delay={0.5}>
          <motion.div
            className="relative bg-gradient-to-r from-emerald-600/20 via-cyan-600/20 to-blue-600/20 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 overflow-hidden"
            whileHover={{ scale: 1.01 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-blue-500/10" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm sm:text-base">LumiGreen IoT System</p>
                  <p className="text-gray-400 text-xs sm:text-sm">ESP32 + Blynk + PID Control</p>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-around sm:justify-end">
                <div className="text-center">
                  <p className="text-lg sm:text-2xl font-bold text-emerald-400">{data.setpoint}</p>
                  <p className="text-gray-500 text-[10px] sm:text-xs">Target Lux</p>
                </div>
                <div className="text-center">
                  <p className="text-lg sm:text-2xl font-bold text-cyan-400">PID</p>
                  <p className="text-gray-500 text-[10px] sm:text-xs">Control</p>
                </div>
                <div className="text-center">
                  <p className="text-lg sm:text-2xl font-bold text-blue-400">24/7</p>
                  <p className="text-gray-500 text-[10px] sm:text-xs">Monitoring</p>
                </div>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
