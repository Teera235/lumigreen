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
    <div className="h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-emerald-50 p-4 flex flex-col overflow-hidden">
      {/* Header - compact */}
      <div className="flex items-center justify-between mb-3">
        <Link href="/" className="flex items-center gap-1 text-gray-500 hover:text-emerald-600">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${online ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
          {online ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
          {online ? "Online" : "Offline"}
        </div>
      </div>

      {/* Main Layout - ALWAYS 2 columns */}
      <div className="flex-1 flex flex-row gap-4 items-center justify-center min-h-0">
        
        {/* Left - Main Gauge */}
        <div className="flex flex-col items-center justify-center flex-shrink-0">
          {/* Lux Circle */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 blur-xl opacity-30 scale-110" />
            <div className="relative w-44 h-44 rounded-full bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 flex items-center justify-center shadow-xl shadow-emerald-500/30">
              <div className="absolute inset-2 rounded-full border-2 border-white/20" />
              <div className="text-center z-10">
                <Sun className="w-7 h-7 mx-auto mb-1 text-white/90" />
                <div className="text-5xl font-bold text-white tracking-tight">{d.lux.toFixed(0)}</div>
                <div className="text-white/70 text-sm font-medium">LUX</div>
              </div>
            </div>
          </div>
          
          {/* Status */}
          <div className={`mt-3 px-4 py-1 rounded-full font-bold text-xs tracking-wider ${ok ? "bg-emerald-100 text-emerald-700" : low ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>
            {status}
          </div>
          
          <div className="mt-1 text-gray-500 text-xs">
            Target: {d.setpoint} Lux ({pct.toFixed(0)}%)
          </div>
          
          {/* Branding */}
          <div className="mt-3 text-center">
            <div className="flex items-center justify-center gap-1.5">
              <Image src="/logo.png" alt="Logo" width={24} height={24} />
              <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">LumiGreen</span>
            </div>
            <p className="text-gray-400 text-[10px]">KMUTT</p>
          </div>
        </div>

        {/* Right - Stats Cards - ALWAYS 2x2 grid */}
        <div className="grid grid-cols-2 gap-2 flex-shrink-0" style={{ width: "280px" }}>
          {/* Brightness */}
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-3 shadow-lg shadow-violet-500/20">
            <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center mb-2">
              <Sun className="w-4 h-4 text-white" />
            </div>
            <div className="text-2xl font-bold text-white">{d.brightness.toFixed(0)}%</div>
            <div className="text-white/60 text-xs">Brightness</div>
          </div>

          {/* Power */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-3 shadow-lg shadow-amber-500/20">
            <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center mb-2">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div className="text-2xl font-bold text-white">{d.power.toFixed(1)}W</div>
            <div className="text-white/60 text-xs">Power</div>
          </div>

          {/* Energy */}
          <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl p-3 shadow-lg shadow-cyan-500/20">
            <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center mb-2">
              <Battery className="w-4 h-4 text-white" />
            </div>
            <div className="text-2xl font-bold text-white">{d.energy.toFixed(1)}Wh</div>
            <div className="text-white/60 text-xs">Energy</div>
          </div>

          {/* CO2 */}
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-3 shadow-lg shadow-emerald-500/20">
            <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center mb-2">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <div className="text-2xl font-bold text-white">{d.carbon.toFixed(3)}kg</div>
            <div className="text-white/60 text-xs">CO₂ Saved</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-400 text-[10px] mt-2">
        ESP32 + Blynk IoT • Live
      </div>
    </div>
  );
}
