"use client";
import { useState, useEffect } from "react";
import { Sun, Zap, Leaf, TrendingDown, ArrowLeft, DollarSign } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// ข้อมูลห้อง Sandbox
const ROOM_SIZE = 16;
const OLD_POWER = 100;
const NEW_LED_POWER = 30;
const LIGHTPIPE_CONTRIBUTION = 0.6;
const HOURS_PER_DAY = 10;
const DAYS_PER_YEAR = 260;
const ELEC_RATE = 4.5;
const EF = 0.4682;

// คำนวณ
const OLD_ENERGY_KWH = (OLD_POWER * HOURS_PER_DAY * DAYS_PER_YEAR) / 1000;
const AVG_LED_USAGE = NEW_LED_POWER * (1 - LIGHTPIPE_CONTRIBUTION * 0.7);
const NEW_ENERGY_KWH = (AVG_LED_USAGE * HOURS_PER_DAY * DAYS_PER_YEAR) / 1000;
const SAVED_ENERGY_KWH = OLD_ENERGY_KWH - NEW_ENERGY_KWH;
const SAVED_COST = SAVED_ENERGY_KWH * ELEC_RATE;
const OLD_CO2 = OLD_ENERGY_KWH * EF;
const NEW_CO2 = NEW_ENERGY_KWH * EF;
const SAVED_CO2 = OLD_CO2 - NEW_CO2;

export default function SandboxPage() {
  const [animatedValues, setAnimatedValues] = useState({ energy: 0, cost: 0, co2: 0 });
  const [sunPosition, setSunPosition] = useState(30);
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const p = Math.min(step / 60, 1);
      setAnimatedValues({
        energy: SAVED_ENERGY_KWH * p,
        cost: SAVED_COST * p,
        co2: SAVED_CO2 * p,
      });
      if (step >= 60) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSunPosition(p => (p + 1) % 100);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsDay(sunPosition > 15 && sunPosition < 85);
  }, [sunPosition]);

  const lightPipeIntensity = isDay ? Math.sin((sunPosition / 100) * Math.PI) : 0;
  const ledOn = !isDay || lightPipeIntensity < 0.5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-emerald-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <Link href="/" className="text-gray-400 hover:text-emerald-600">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={28} height={28} />
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">LumiGreen</span>
          <span className="text-gray-400 text-sm">Sandbox</span>
        </div>
        <div className="w-5" />
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Sandbox Room Analysis</h1>
          <p className="text-gray-500 mt-1">ห้องทดสอบ {ROOM_SIZE} ตร.ม. • Light Pipe + Smart LED {NEW_LED_POWER}W</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Room Visualization */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <h2 className="text-lg font-bold text-gray-700 mb-4">🏠 ห้องจำลอง</h2>
            
            {/* Sun Slider */}
            <div className="flex items-center gap-3 mb-4 px-2">
              <span className="text-2xl">🌅</span>
              <div className="flex-1 h-3 bg-gradient-to-r from-orange-200 via-yellow-200 to-orange-200 rounded-full relative">
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-yellow-400 rounded-full shadow-lg border-2 border-yellow-500 flex items-center justify-center text-xs transition-all duration-150"
                  style={{ left: `calc(${sunPosition}% - 12px)` }}
                >
                  ☀️
                </div>
              </div>
              <span className="text-2xl">🌙</span>
            </div>

            {/* Simple Room SVG */}
            <div className="relative bg-gradient-to-b from-sky-100 to-sky-50 rounded-2xl p-4 h-64 overflow-hidden">
              {/* Sky */}
              <div className={`absolute inset-0 transition-all duration-500 ${isDay ? 'bg-gradient-to-b from-sky-300 to-sky-100' : 'bg-gradient-to-b from-slate-800 to-slate-600'}`} />
              
              {/* Sun/Moon */}
              <div 
                className="absolute w-12 h-12 rounded-full transition-all duration-300"
                style={{ 
                  left: `${sunPosition}%`,
                  top: `${30 - Math.sin((sunPosition / 100) * Math.PI) * 20}%`,
                  background: isDay ? 'radial-gradient(circle, #fde047 0%, #facc15 100%)' : 'radial-gradient(circle, #e2e8f0 0%, #94a3b8 100%)',
                  boxShadow: isDay ? '0 0 30px 10px rgba(253, 224, 71, 0.5)' : '0 0 20px 5px rgba(148, 163, 184, 0.3)'
                }}
              />

              {/* Room Structure */}
              <svg viewBox="0 0 300 180" className="absolute bottom-0 left-0 right-0 w-full h-48">
                {/* Floor */}
                <rect x="30" y="140" width="240" height="40" fill={isDay ? "#d1fae5" : "#374151"} rx="4" />
                
                {/* Back Wall */}
                <rect x="30" y="40" width="240" height="100" fill={isDay ? "#f3f4f6" : "#4b5563"} stroke="#d1d5db" strokeWidth="2" rx="4" />
                
                {/* Window */}
                <rect x="200" y="55" width="50" height="60" fill={isDay ? "#7dd3fc" : "#1e3a5a"} stroke="#94a3b8" strokeWidth="2" rx="2" />
                <line x1="225" y1="55" x2="225" y2="115" stroke="#94a3b8" strokeWidth="1" />
                <line x1="200" y1="85" x2="250" y2="85" stroke="#94a3b8" strokeWidth="1" />
                {isDay && <rect x="200" y="55" width="50" height="60" fill="rgba(253, 224, 71, 0.3)" rx="2" />}
                
                {/* Light Pipe (Roof) */}
                <ellipse cx="120" cy="45" rx="30" ry="8" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" />
                <ellipse cx="120" cy="45" rx="20" ry="5" fill={isDay ? `rgba(253, 224, 71, ${lightPipeIntensity})` : "#6b7280"} />
                {isDay && lightPipeIntensity > 0.3 && (
                  <>
                    <line x1="120" y1="53" x2="100" y2="130" stroke={`rgba(253, 224, 71, ${lightPipeIntensity * 0.5})`} strokeWidth="20" strokeLinecap="round" />
                    <line x1="120" y1="53" x2="140" y2="130" stroke={`rgba(253, 224, 71, ${lightPipeIntensity * 0.3})`} strokeWidth="15" strokeLinecap="round" />
                  </>
                )}
                
                {/* LED Light */}
                <rect x="55" y="50" width="30" height="8" fill="#9ca3af" rx="2" />
                {ledOn && (
                  <>
                    <rect x="55" y="50" width="30" height="8" fill="#fef08a" rx="2" />
                    <ellipse cx="70" cy="90" rx="35" ry="25" fill="rgba(254, 240, 138, 0.4)" />
                  </>
                )}
                
                {/* Desk */}
                <rect x="50" y="115" width="80" height="8" fill="#92400e" rx="2" />
                <rect x="55" y="123" width="8" height="17" fill="#78350f" />
                <rect x="117" y="123" width="8" height="17" fill="#78350f" />
                
                {/* Chair */}
                <rect x="75" y="125" width="30" height="5" fill="#1e40af" rx="2" />
                <rect x="75" y="130" width="30" height="10" fill="#1e3a8a" rx="2" />
                
                {/* Person */}
                <circle cx="90" cy="105" r="8" fill="#fcd34d" />
                <rect x="85" y="113" width="10" height="12" fill="#3b82f6" rx="2" />
                
                {/* Labels */}
                <text x="120" y="35" textAnchor="middle" fontSize="10" fill="#059669" fontWeight="bold">Light Pipe</text>
                <text x="70" y="45" textAnchor="middle" fontSize="8" fill={ledOn ? "#ca8a04" : "#6b7280"}>LED {ledOn ? "ON" : "OFF"}</text>
              </svg>

              {/* Status Badges */}
              <div className="absolute bottom-2 left-2 right-2 flex justify-between">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${isDay ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-700 text-slate-300'}`}>
                  ☀️ Light Pipe: {(lightPipeIntensity * 100).toFixed(0)}%
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${ledOn ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>
                  💡 LED: {ledOn ? "ON" : "OFF"}
                </div>
              </div>
            </div>
            
            <p className="text-center text-gray-400 text-sm mt-3">
              กลางวัน → Light Pipe นำแสงเข้า → LED ลดกำลัง | กลางคืน → LED ทำงานเต็มที่
            </p>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            {/* Comparison */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <h2 className="text-lg font-bold text-gray-700 mb-4">📊 เปรียบเทียบระบบ</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
                  <div className="text-red-500 font-bold text-sm mb-3">❌ ระบบเดิม</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">หลอดไฟ</span><span className="font-bold">{OLD_POWER}W</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">เปิดตลอด</span><span className="font-bold">{HOURS_PER_DAY} ชม./วัน</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">ไฟฟ้า/ปี</span><span className="font-bold text-red-500">{OLD_ENERGY_KWH.toFixed(0)} kWh</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">ค่าไฟ/ปี</span><span className="font-bold text-red-500">฿{(OLD_ENERGY_KWH * ELEC_RATE).toFixed(0)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">CO₂/ปี</span><span className="font-bold text-red-500">{OLD_CO2.toFixed(1)} kg</span></div>
                  </div>
                </div>
                
                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                  <div className="text-emerald-500 font-bold text-sm mb-3">✅ LumiGreen</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">Light Pipe</span><span className="font-bold text-emerald-600">+60% แสง</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">LED + PID</span><span className="font-bold">{NEW_LED_POWER}W</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">ไฟฟ้า/ปี</span><span className="font-bold text-emerald-500">{NEW_ENERGY_KWH.toFixed(0)} kWh</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">ค่าไฟ/ปี</span><span className="font-bold text-emerald-500">฿{(NEW_ENERGY_KWH * ELEC_RATE).toFixed(0)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">CO₂/ปี</span><span className="font-bold text-emerald-500">{NEW_CO2.toFixed(1)} kg</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Savings */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 text-white shadow-lg">
                <Zap className="w-6 h-6 mb-2 opacity-80" />
                <div className="text-3xl font-bold">{animatedValues.energy.toFixed(0)}</div>
                <div className="text-white/70 text-xs">kWh/ปี ประหยัด</div>
                <div className="text-white/50 text-[10px] mt-1">↓{((SAVED_ENERGY_KWH/OLD_ENERGY_KWH)*100).toFixed(0)}%</div>
              </div>
              
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-4 text-white shadow-lg">
                <DollarSign className="w-6 h-6 mb-2 opacity-80" />
                <div className="text-3xl font-bold">฿{animatedValues.cost.toFixed(0)}</div>
                <div className="text-white/70 text-xs">บาท/ปี ประหยัด</div>
              </div>
              
              <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl p-4 text-white shadow-lg">
                <Leaf className="w-6 h-6 mb-2 opacity-80" />
                <div className="text-3xl font-bold">{animatedValues.co2.toFixed(0)}</div>
                <div className="text-white/70 text-xs">kg CO₂/ปี ลด</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scale Up */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
          <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-emerald-500" />
            ถ้าขยายไป 10 / 50 / 100 ห้อง
          </h2>
          
          <div className="grid grid-cols-3 gap-4">
            {[10, 50, 100].map(rooms => (
              <div key={rooms} className="bg-gradient-to-br from-gray-50 to-emerald-50 rounded-2xl p-4 border border-emerald-100 text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">{rooms} ห้อง</div>
                <div className="space-y-1 text-sm">
                  <div>⚡ <span className="font-bold">{((SAVED_ENERGY_KWH * rooms)/1000).toFixed(1)}</span> MWh/ปี</div>
                  <div>💰 <span className="font-bold text-amber-600">฿{((SAVED_COST * rooms)/1000).toFixed(0)}k</span>/ปี</div>
                  <div>🌱 <span className="font-bold text-teal-600">{((SAVED_CO2 * rooms)/1000).toFixed(2)}</span> ตัน CO₂</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center py-4">
          <p className="text-gray-400 text-sm">&quot;Light Pipe + Smart LED = ลดคาร์บอนฟุตพริ้นท์อย่างยั่งยืน&quot;</p>
        </div>
      </div>
    </div>
  );
}
