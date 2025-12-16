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
  const status = ok ? "OK" : low ? "LOW" : "HIGH";
  const statusColor = ok ? "#22c55e" : low ? "#eab308" : "#3b82f6";

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="text-gray-400 hover:text-gray-600">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${online ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
          {online ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
          {online ? "Online" : "Offline"}
        </div>
      </div>

      {/* Main Layout - 2 Columns */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center lg:items-start justify-center max-w-5xl mx-auto">
        
        {/* Left - Big Circle */}
        <div className="flex flex-col items-center">
          <div 
            className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full flex items-center justify-center shadow-2xl"
            style={{ backgroundColor: "#d1d5db" }}
          >
            <div className="text-center">
              <Sun className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-2 text-white" />
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white">{d.lux.toFixed(0)}</div>
              <div className="text-white/80 text-lg">Lux</div>
            </div>
          </div>
          
          {/* Status & Info */}
          <div className="mt-6 text-center">
            <div className="text-2xl font-bold mb-1" style={{ color: statusColor }}>{status}</div>
            <div className="text-gray-500">Target: {d.setpoint} Lux ({pct.toFixed(0)}%)</div>
          </div>
          
          {/* Branding */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Image src="/logo.png" alt="Logo" width={28} height={28} />
              <span className="text-xl font-bold text-emerald-600">Lumigreen</span>
            </div>
            <p className="text-gray-400 text-sm">King Mongkut&apos;s University of<br/>Technology Thonburi</p>
          </div>
        </div>

        {/* Right - 4 Cards Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-md lg:max-w-lg">
          {/* Brightness Card */}
          <div className="bg-gray-300 rounded-3xl p-5 sm:p-6 aspect-[4/3] flex flex-col justify-between">
            <Sun className="w-8 h-8 text-white" />
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">{d.brightness.toFixed(0)}%</div>
              <div className="text-white/70 text-sm">Brightness</div>
            </div>
          </div>

          {/* Power Card */}
          <div className="bg-gray-300 rounded-3xl p-5 sm:p-6 aspect-[4/3] flex flex-col justify-between">
            <Zap className="w-8 h-8 text-white" />
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">{d.power.toFixed(1)}W</div>
              <div className="text-white/70 text-sm">Power</div>
            </div>
          </div>

          {/* Energy Card */}
          <div className="bg-gray-300 rounded-3xl p-5 sm:p-6 aspect-[4/3] flex flex-col justify-between">
            <Battery className="w-8 h-8 text-white" />
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">{d.energy.toFixed(2)}Wh</div>
              <div className="text-white/70 text-sm">Energy</div>
            </div>
          </div>

          {/* CO2 Card */}
          <div className="bg-gray-300 rounded-3xl p-5 sm:p-6 aspect-[4/3] flex flex-col justify-between">
            <Leaf className="w-8 h-8 text-white" />
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">{d.carbon.toFixed(3)}kg</div>
              <div className="text-white/70 text-sm">CO₂ Saved</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
