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
    <div className="h-screen w-screen bg-gradient-to-br from-slate-50 via-gray-50 to-emerald-50 p-3 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <Link href="/" className="text-gray-400 hover:text-emerald-600">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${online ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
          {online ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
          {online ? "Online" : "Offline"}
        </div>
      </div>

      {/* Main Layout - เต็มจอ */}
      <div className="flex-1 flex flex-row gap-6 items-center justify-center">
        
        {/* Left - Main Gauge - ใหญ่ขึ้น */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 blur-2xl opacity-30 scale-110" />
            <div className="relative w-56 h-56 rounded-full bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 flex items-center justify-center shadow-2xl shadow-emerald-500/30">
              <div className="absolute inset-3 rounded-full border-2 border-white/20" />
              <div className="text-center z-10">
                <Sun className="w-10 h-10 mx-auto mb-1 text-white/90" />
                <div className="text-7xl font-bold text-white tracking-tight">{d.lux.toFixed(0)}</div>
                <div className="text-white/70 text-lg font-medium">LUX</div>
              </div>
            </div>
          </div>
          
          <div className={`mt-4 px-5 py-1.5 rounded-full font-bold text-sm tracking-wider ${ok ? "bg-emerald-100 text-emerald-700" : low ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>
            {status}
          </div>
          
          <div className="mt-2 text-gray-500 text-sm">
            Target: {d.setpoint} Lux ({pct.toFixed(0)}%)
          </div>
          
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Image src="/logo.png" alt="Logo" width={28} height={28} />
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">LumiGreen</span>
            </div>
            <p className="text-gray-400 text-xs mt-1">KMUTT</p>
          </div>
        </div>

        {/* Right - Stats Cards - ใหญ่ขึ้น */}
        <div className="grid grid-cols-2 gap-3" style={{ width: "380px" }}>
          {/* Brightness */}
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl p-5 shadow-xl shadow-violet-500/20">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <div className="text-4xl font-bold text-white">{d.brightness.toFixed(0)}%</div>
            <div className="text-white/60 text-sm mt-1">Brightness</div>
          </div>

          {/* Power */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl p-5 shadow-xl shadow-amber-500/20">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="text-4xl font-bold text-white">{d.power.toFixed(1)}W</div>
            <div className="text-white/60 text-sm mt-1">Power</div>
          </div>

          {/* Energy */}
          <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-3xl p-5 shadow-xl shadow-cyan-500/20">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
              <Battery className="w-5 h-5 text-white" />
            </div>
            <div className="text-4xl font-bold text-white">{d.energy.toFixed(2)}Wh</div>
            <div className="text-white/60 text-sm mt-1">Energy</div>
          </div>

          {/* CO2 */}
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl p-5 shadow-xl shadow-emerald-500/20">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="text-4xl font-bold text-white">{d.carbon.toFixed(3)}kg</div>
            <div className="text-white/60 text-sm mt-1">CO₂ Saved</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-400 text-xs">
        ESP32 + Blynk IoT • Real-time
      </div>
    </div>
  );
}
