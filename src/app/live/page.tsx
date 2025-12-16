"use client";
import { useState, useEffect } from "react";
import { Sun, Zap, Battery, Leaf, Wifi, WifiOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const BLYNK_TOKEN = "O9C2s8T0nrrOmFjShVi-S9YsH4KUMSKs";
const BLYNK_API = "https://blynk.cloud/external/api";

export default function LivePage() {
  const [d, setD] = useState({ lux: 0, brightness: 0, power: 0, energy: 0, carbon: 0, setpoint: 100 });
  const [online, setOnline] = useState(false);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const r = await Promise.all(["V1","V2","V4","V5","V6","V10"].map(p => 
          fetch(`${BLYNK_API}/get?token=${BLYNK_TOKEN}&${p}`).then(r => r.json()).catch(() => 0)
        ));
        setD({ lux: +r[0]||0, brightness: +r[1]||0, power: +r[2]||0, energy: +r[3]||0, carbon: +r[4]||0, setpoint: +r[5]||100 });
        setOnline(true);
      } catch { setOnline(false); }
    };
    fetch_();
    const i = setInterval(fetch_, 2000);
    return () => clearInterval(i);
  }, []);

  const pct = Math.min((d.lux / d.setpoint) * 100, 150);
  const ok = d.lux >= d.setpoint * 0.9 && d.lux <= d.setpoint * 1.1;
  const low = d.lux < d.setpoint * 0.9;
  const status = ok ? "OPTIMAL" : low ? "LOW" : "HIGH";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-emerald-50 p-4 sm:p-6 lg:p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium hidden sm:inline">Back to Home</span>
        </Link>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${online ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : "bg-red-100 text-red-700 border border-red-200"}`}>
          {online ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
          {online ? "Connected" : "Offline"}
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-center max-w-6xl mx-auto">
        
        {/* Left - Main Gauge */}
        <div className="flex flex-col items-center">
          {/* Lux Circle */}
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 blur-2xl opacity-30 scale-110" />
            
            {/* Main circle */}
            <div className="relative w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 flex items-center justify-center shadow-2xl shadow-emerald-500/30">
              {/* Inner ring */}
              <div className="absolute inset-3 rounded-full border-4 border-white/20" />
              
              <div className="text-center z-10">
                <Sun className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 text-white/90" />
                <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight">{d.lux.toFixed(0)}</div>
                <div className="text-white/70 text-lg font-medium tracking-wider">LUX</div>
              </div>
            </div>
          </div>
          
          {/* Status Badge */}
          <div className={`mt-6 px-6 py-2 rounded-full font-bold text-sm tracking-wider ${ok ? "bg-emerald-100 text-emerald-700" : low ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>
            {status}
          </div>
          
          {/* Target Info */}
          <div className="mt-3 text-gray-500 text-sm">
            Target: <span className="font-semibold text-gray-700">{d.setpoint} Lux</span> • {pct.toFixed(0)}% achieved
          </div>
          
          {/* Branding */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Image src="/logo.png" alt="Logo" width={32} height={32} className="drop-shadow-md" />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">LumiGreen</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">King Mongkut&apos;s University of<br/>Technology Thonburi</p>
          </div>
        </div>

        {/* Right - Stats Cards */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm sm:max-w-md">
          {/* Brightness */}
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl p-5 sm:p-6 shadow-xl shadow-violet-500/20 aspect-[4/3] flex flex-col justify-between">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">{d.brightness.toFixed(0)}%</div>
              <div className="text-white/60 text-sm font-medium">Brightness</div>
            </div>
          </div>

          {/* Power */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl p-5 sm:p-6 shadow-xl shadow-amber-500/20 aspect-[4/3] flex flex-col justify-between">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">{d.power.toFixed(1)}<span className="text-xl">W</span></div>
              <div className="text-white/60 text-sm font-medium">Power</div>
            </div>
          </div>

          {/* Energy */}
          <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-3xl p-5 sm:p-6 shadow-xl shadow-cyan-500/20 aspect-[4/3] flex flex-col justify-between">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Battery className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">{d.energy.toFixed(2)}<span className="text-lg">Wh</span></div>
              <div className="text-white/60 text-sm font-medium">Energy Used</div>
            </div>
          </div>

          {/* CO2 */}
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl p-5 sm:p-6 shadow-xl shadow-emerald-500/20 aspect-[4/3] flex flex-col justify-between">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">{d.carbon.toFixed(3)}<span className="text-lg">kg</span></div>
              <div className="text-white/60 text-sm font-medium">CO₂ Saved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-10 text-gray-400 text-xs">
        Real-time data from ESP32 + Blynk IoT • Updates every 2 seconds
      </div>
    </div>
  );
}
