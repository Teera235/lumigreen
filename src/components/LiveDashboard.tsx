"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "./animations/MotionWrapper";
import { Sun, Zap, Battery, TrendingDown, Leaf, Activity, Wifi, WifiOff, RefreshCw, Sparkles } from "lucide-react";

const BLYNK_TOKEN = "O9C2s8T0nrrOmFjShVi-S9YsH4KUMSKs";
const BLYNK_SERVER = "https://blynk.cloud/external/api";

interface SensorData { lux: number; pwm: number; current: number; power: number; energy: number; energySaved: number; energyCost: number; energySavedBaht: number; error: number; setpoint: number; co2Emission: number; co2Saved: number; }

const defaultData: SensorData = { lux: 0, pwm: 0, current: 0, power: 0, energy: 0, energySaved: 0, energyCost: 0, energySavedBaht: 0, error: 0, setpoint: 500, co2Emission: 0, co2Saved: 0 };

function CircularProgress({ value, max, size = 180, strokeWidth = 12 }: { value: number; max: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min(value / max, 1);
  const offset = circumference - progress * circumference;
  return (<svg width={size} height={size} className="transform -rotate-90"><defs><linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#10b981" /><stop offset="50%" stopColor="#06b6d4" /><stop offset="100%" stopColor="#f59e0b" /></linearGradient></defs><circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={strokeWidth} /><motion.circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="url(#pg)" strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }} transition={{ duration: 1, ease: "easeOut" }} /></svg>);
}

function StatCard({ icon: Icon, label, value, unit, subtext, colorFrom, colorTo }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; unit: string; subtext?: string; colorFrom: string; colorTo: string }) {
  return (<div className="relative group"><div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-500" /><div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-white/10"><div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 shadow-lg" style={{ background: `linear-gradient(to bottom right, ${colorFrom}, ${colorTo})` }}><Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" /></div><p className="text-gray-400 text-xs sm:text-sm mb-1">{label}</p><div className="flex items-baseline gap-1"><span className="text-xl sm:text-2xl font-bold text-white">{value}</span><span className="text-gray-500 text-xs sm:text-sm">{unit}</span></div>{subtext && <p className="text-gray-500 text-[10px] sm:text-xs mt-1">{subtext}</p>}</div></div>);
}

export default function LiveDashboard() {
  const [data, setData] = useState<SensorData>(defaultData);
  const [isOnline, setIsOnline] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const pins = ["V1","V2","V3","V4","V5","V7","V8","V9","V6","V10","V11","V12"];
      const responses = await Promise.all(pins.map(pin => fetch(`${BLYNK_SERVER}/get?token=${BLYNK_TOKEN}&${pin}`).then(res => res.json()).catch(() => [0])));
      setData({ lux: parseFloat(responses[0]) || 0, pwm: parseFloat(responses[1]) || 0, current: parseFloat(responses[2]) || 0, power: parseFloat(responses[3]) || 0, energy: parseFloat(responses[4]) || 0, energySaved: parseFloat(responses[5]) || 0, energyCost: parseFloat(responses[6]) || 0, energySavedBaht: parseFloat(responses[7]) || 0, error: parseFloat(responses[8]) || 0, setpoint: parseFloat(responses[9]) || 500, co2Emission: parseFloat(responses[10]) || 0, co2Saved: parseFloat(responses[11]) || 0 });
      setIsOnline(true); setLastUpdate(new Date()); setIsLoading(false);
    } catch { setIsOnline(false); setIsLoading(false); }
  };

  useEffect(() => { fetchData(); const interval = setInterval(fetchData, 2000); return () => clearInterval(interval); }, []);

  const getLuxColor = () => { if (data.lux >= 450 && data.lux <= 550) return "from-emerald-500 to-emerald-600"; if (data.lux < 300) return "from-amber-500 to-amber-600"; return "from-blue-500 to-blue-600"; };
  const getLuxStatus = () => { if (data.lux >= 450 && data.lux <= 550) return { text: "OK", color: "text-emerald-400" }; if (data.lux < 300) return { text: "Low", color: "text-amber-400" }; return { text: "High", color: "text-blue-400" }; };
  const luxStatus = getLuxStatus();

  return (
    <section id="live" className="py-12 sm:py-20 bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute inset-0"><div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" /><div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px]" /></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn><div className="text-center mb-10 sm:mb-16"><div className="inline-flex items-center gap-2 mb-4"><div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-2 rounded-full"><Activity className="w-5 h-5 text-white" /></div><span className="text-emerald-400 font-bold text-sm sm:text-base uppercase tracking-wider">Live Dashboard</span><span className={`w-2 h-2 rounded-full animate-pulse ${isOnline ? "bg-emerald-400" : "bg-red-400"}`} /></div><h2 className="text-3xl sm:text-5xl font-bold mb-4"><span className="text-white">Real-time </span><span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Monitoring</span></h2><p className="text-gray-500 text-sm sm:text-base">ESP32 + Blynk IoT</p></div></FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <motion.div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8 flex flex-col items-center justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br ${getLuxColor()} flex items-center justify-center mb-4 shadow-2xl`}><Sun className="w-12 h-12 sm:w-16 sm:h-16 text-white" /></div><p className="text-gray-400 text-sm mb-1">Lux</p><motion.div className="text-4xl sm:text-5xl font-bold text-white" key={data.lux} initial={{ scale: 1.1 }} animate={{ scale: 1 }}>{data.lux.toFixed(0)}</motion.div><p className={`text-sm font-medium mt-2 ${luxStatus.color}`}>{luxStatus.text}</p></motion.div>
          <motion.div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8 flex flex-col items-center justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}><div className="relative"><CircularProgress value={data.lux} max={750} /><div className="absolute inset-0 flex flex-col items-center justify-center"><motion.span className="text-3xl sm:text-4xl font-bold text-white" key={data.lux} initial={{ scale: 1.1 }} animate={{ scale: 1 }}>{((data.lux / data.setpoint) * 100).toFixed(0)}%</motion.span><span className="text-gray-500 text-sm">of target</span></div></div><div className="mt-4 text-center"><p className="text-gray-400 text-sm">Target</p><p className="text-xl font-bold text-emerald-400">{data.setpoint} Lux</p></div></motion.div>
          <motion.div className="md:col-span-2 lg:col-span-1 bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-white/10 p-5 sm:p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}><div className="flex items-center justify-between mb-4"><h3 className="text-white font-bold">Status</h3><div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs ${isOnline ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}{isOnline ? "Online" : "Offline"}</div></div><div className="space-y-3"><div className="bg-white/5 rounded-xl p-3"><div className="flex justify-between text-sm mb-1"><span className="text-gray-400">PWM</span><span className="text-white font-bold">{data.pwm.toFixed(0)}/255</span></div><div className="h-2 bg-gray-800 rounded-full overflow-hidden"><motion.div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" animate={{ width: `${(data.pwm / 255) * 100}%` }} /></div></div><div className="bg-white/5 rounded-xl p-3"><div className="flex justify-between text-sm mb-1"><span className="text-gray-400">Power</span><span className="text-white font-bold">{data.power.toFixed(2)} W</span></div><div className="h-2 bg-gray-800 rounded-full overflow-hidden"><motion.div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" animate={{ width: `${(data.power / 24) * 100}%` }} /></div></div><div className="bg-white/5 rounded-xl p-3 flex justify-between items-center"><span className="text-gray-400 text-sm">Error</span><span className={`font-bold ${Math.abs(data.error) < 50 ? "text-emerald-400" : "text-amber-400"}`}>{data.error.toFixed(1)} Lux</span></div></div><div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10"><span className="text-gray-500 text-xs">{lastUpdate ? lastUpdate.toLocaleTimeString("th-TH") : "Loading..."}</span><button onClick={fetchData} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg"><RefreshCw className={`w-4 h-4 text-gray-400 ${isLoading ? "animate-spin" : ""}`} /></button></div></motion.div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <StatCard icon={Zap} label="Current" value={data.current.toFixed(3)} unit="A" subtext={`${data.power.toFixed(2)} W`} colorFrom="#a855f7" colorTo="#ec4899" />
          <StatCard icon={Battery} label="Energy" value={data.energy.toFixed(2)} unit="Wh" subtext={`${data.energyCost.toFixed(2)} THB`} colorFrom="#06b6d4" colorTo="#3b82f6" />
          <StatCard icon={TrendingDown} label="Saved" value={data.energySaved.toFixed(2)} unit="Wh" subtext={`${data.energySavedBaht.toFixed(2)} THB`} colorFrom="#10b981" colorTo="#14b8a6" />
          <StatCard icon={Leaf} label="CO2" value={data.co2Saved.toFixed(4)} unit="kg" colorFrom="#22c55e" colorTo="#10b981" />
        </div>
        <FadeIn><div className="bg-gradient-to-r from-emerald-600/20 via-cyan-600/20 to-blue-600/20 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/10"><div className="flex flex-col sm:flex-row items-center justify-between gap-4"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center"><Sparkles className="w-5 h-5 text-white" /></div><div><p className="text-white font-bold text-sm sm:text-base">LumiGreen IoT</p><p className="text-gray-400 text-xs sm:text-sm">ESP32 + Blynk + PID</p></div></div><div className="flex items-center gap-6"><div className="text-center"><p className="text-lg font-bold text-emerald-400">{data.setpoint}</p><p className="text-gray-500 text-xs">Target</p></div><div className="text-center"><p className="text-lg font-bold text-cyan-400">PID</p><p className="text-gray-500 text-xs">Control</p></div><div className="text-center"><p className="text-lg font-bold text-blue-400">24/7</p><p className="text-gray-500 text-xs">Monitor</p></div></div></div></div></FadeIn>
      </div>
    </section>
  );
}
