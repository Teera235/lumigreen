"use client";
import { useState, useEffect } from "react";
import { Sun, Zap, Leaf, TrendingDown, ArrowLeft, Lightbulb, DollarSign, Factory } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// ข้อมูลห้อง Sandbox
const ROOM_SIZE = 16; // ตร.ม.
const OLD_POWER = 100; // W (ไฟเดิมเปิดตลอด)
const NEW_LED_POWER = 30; // W (หลอด LED ใหม่)
const LIGHTPIPE_CONTRIBUTION = 0.6; // Light pipe ช่วยได้ 60% ของเวลากลางวัน
const HOURS_PER_DAY = 10;
const DAYS_PER_YEAR = 260;
const ELEC_RATE = 4.5; // บาท/kWh
const EF = 0.4682; // kgCO₂/kWh

// คำนวณ
const OLD_ENERGY_KWH = (OLD_POWER * HOURS_PER_DAY * DAYS_PER_YEAR) / 1000; // 260 kWh/year
const AVG_LED_USAGE = NEW_LED_POWER * (1 - LIGHTPIPE_CONTRIBUTION * 0.7); // LED ใช้เฉลี่ย ~40% เพราะ light pipe ช่วย
const NEW_ENERGY_KWH = (AVG_LED_USAGE * HOURS_PER_DAY * DAYS_PER_YEAR) / 1000; // ~78 kWh/year
const SAVED_ENERGY_KWH = OLD_ENERGY_KWH - NEW_ENERGY_KWH; // ~182 kWh/year
const SAVED_COST = SAVED_ENERGY_KWH * ELEC_RATE; // ~819 บาท/year
const OLD_CO2 = OLD_ENERGY_KWH * EF; // ~122 kg
const NEW_CO2 = NEW_ENERGY_KWH * EF; // ~37 kg
const SAVED_CO2 = OLD_CO2 - NEW_CO2; // ~85 kg

export default function SandboxPage() {
  const [animatedValues, setAnimatedValues] = useState({ energy: 0, cost: 0, co2: 0 });
  const [lightOn, setLightOn] = useState(true);
  const [sunPosition, setSunPosition] = useState(50);

  // Animate values on load
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

  // Animate sun position
  useEffect(() => {
    const interval = setInterval(() => {
      setSunPosition(p => {
        const newP = p + 0.5;
        return newP > 100 ? 0 : newP;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Auto toggle light based on sun
  useEffect(() => {
    const isDaytime = sunPosition > 20 && sunPosition < 80;
    setLightOn(!isDaytime || sunPosition < 30 || sunPosition > 70);
  }, [sunPosition]);

  const isDaytime = sunPosition > 20 && sunPosition < 80;
  const lightIntensity = isDaytime ? Math.sin((sunPosition - 20) / 60 * Math.PI) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-emerald-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <Link href="/" className="text-gray-400 hover:text-emerald-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={28} height={28} />
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">LumiGreen</span>
          <span className="text-gray-400 text-sm font-medium">Sandbox Model</span>
        </div>
        <div className="w-5" />
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Sandbox Room Analysis</h1>
          <p className="text-gray-500 mt-1">ห้องทดสอบขนาด {ROOM_SIZE} ตร.ม. • Light Pipe + Smart LED 30W</p>
        </div>

        {/* Main Content - 3D Model + Stats */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* 3D Room Model */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
              <Factory className="w-5 h-5 text-emerald-500" />
              3D Sandbox Model
            </h2>
            
            {/* 3D Room CSS */}
            <div className="relative h-72 perspective-[800px]">
              {/* Sun indicator */}
              <div className="absolute top-2 left-0 right-0 flex items-center gap-2 px-4">
                <Sun className="w-5 h-5 text-yellow-500" />
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 rounded-full transition-all duration-100"
                    style={{ width: `${sunPosition}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{isDaytime ? "Day" : "Night"}</span>
              </div>

              {/* 3D Room */}
              <div className="absolute inset-0 mt-10 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
                <div 
                  className="relative w-48 h-36 transition-all duration-300"
                  style={{ 
                    transform: "rotateX(-20deg) rotateY(-30deg)",
                    transformStyle: "preserve-3d"
                  }}
                >
                  {/* Floor */}
                  <div 
                    className="absolute w-48 h-36 rounded-lg"
                    style={{ 
                      background: `linear-gradient(135deg, ${isDaytime ? '#d1fae5' : '#374151'} 0%, ${isDaytime ? '#a7f3d0' : '#1f2937'} 100%)`,
                      transform: "rotateX(90deg) translateZ(-72px)",
                      boxShadow: "inset 0 0 30px rgba(0,0,0,0.1)"
                    }}
                  />
                  
                  {/* Back Wall */}
                  <div 
                    className="absolute w-48 h-36 rounded-lg border-2 border-gray-300"
                    style={{ 
                      background: isDaytime 
                        ? `linear-gradient(180deg, rgba(254,249,195,${lightIntensity/100}) 0%, #f3f4f6 100%)`
                        : "#374151",
                      transform: "translateZ(-72px)"
                    }}
                  >
                    {/* Light Pipe on ceiling */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-gradient-to-b from-white to-gray-200 rounded-full border border-gray-300 shadow-lg">
                      {isDaytime && (
                        <div 
                          className="absolute inset-0 rounded-full animate-pulse"
                          style={{ 
                            background: `radial-gradient(circle, rgba(253,224,71,${lightIntensity/100}) 0%, transparent 70%)`,
                            boxShadow: `0 0 ${lightIntensity/3}px ${lightIntensity/5}px rgba(253,224,71,0.5)`
                          }}
                        />
                      )}
                    </div>
                    
                    {/* LED Light */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-8 h-2 bg-gray-300 rounded">
                      {lightOn && (
                        <div 
                          className="absolute inset-0 rounded animate-pulse"
                          style={{ 
                            background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(253,224,71,0.6) 100%)",
                            boxShadow: "0 0 20px 10px rgba(253,224,71,0.4)"
                          }}
                        />
                      )}
                    </div>
                    
                    {/* Window */}
                    <div className="absolute top-12 right-4 w-10 h-14 bg-gradient-to-b from-sky-300 to-sky-400 rounded border-2 border-gray-400">
                      {isDaytime && (
                        <div className="absolute inset-0 bg-yellow-200/50 animate-pulse" />
                      )}
                    </div>
                  </div>
                  
                  {/* Left Wall */}
                  <div 
                    className="absolute w-36 h-36 rounded-lg border-2 border-gray-300"
                    style={{ 
                      background: isDaytime ? "#e5e7eb" : "#4b5563",
                      transform: "rotateY(90deg) translateZ(-24px) translateX(-54px)"
                    }}
                  />
                  
                  {/* Right Wall (transparent for view) */}
                  <div 
                    className="absolute w-36 h-36 rounded-lg border-2 border-dashed border-gray-300"
                    style={{ 
                      background: "transparent",
                      transform: "rotateY(-90deg) translateZ(-168px) translateX(54px)"
                    }}
                  />
                  
                  {/* Desk */}
                  <div 
                    className="absolute w-20 h-3 bg-amber-700 rounded"
                    style={{ 
                      transform: "translateX(14px) translateY(60px) translateZ(-40px) rotateX(-90deg)"
                    }}
                  />
                </div>
              </div>

              {/* Status */}
              <div className="absolute bottom-2 left-4 right-4 flex justify-between text-xs">
                <div className={`px-2 py-1 rounded-full ${isDaytime ? "bg-yellow-100 text-yellow-700" : "bg-gray-700 text-gray-300"}`}>
                  ☀️ Light Pipe: {isDaytime ? `${lightIntensity.toFixed(0)}%` : "0%"}
                </div>
                <div className={`px-2 py-1 rounded-full ${lightOn ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-500"}`}>
                  💡 LED: {lightOn ? "ON" : "OFF"}
                </div>
              </div>
            </div>
            
            <p className="text-center text-gray-400 text-sm mt-2">
              Light Pipe นำแสงธรรมชาติเข้ามา → LED ทำงานเฉพาะเมื่อจำเป็น
            </p>
          </div>

          {/* Comparison Stats */}
          <div className="space-y-4">
            {/* Before vs After */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <h2 className="text-lg font-bold text-gray-700 mb-4">เปรียบเทียบระบบ</h2>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Before */}
                <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
                  <div className="text-red-500 font-bold text-sm mb-2">❌ ระบบเดิม</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">กำลังไฟ</span>
                      <span className="font-bold text-gray-700">{OLD_POWER}W</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">เปิดตลอด</span>
                      <span className="font-bold text-gray-700">{HOURS_PER_DAY} ชม./วัน</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">ไฟฟ้า/ปี</span>
                      <span className="font-bold text-red-500">{OLD_ENERGY_KWH.toFixed(0)} kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">ค่าไฟ/ปี</span>
                      <span className="font-bold text-red-500">฿{(OLD_ENERGY_KWH * ELEC_RATE).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">CO₂/ปี</span>
                      <span className="font-bold text-red-500">{OLD_CO2.toFixed(1)} kg</span>
                    </div>
                  </div>
                </div>
                
                {/* After */}
                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                  <div className="text-emerald-500 font-bold text-sm mb-2">✅ LumiGreen</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Light Pipe</span>
                      <span className="font-bold text-gray-700">+{(LIGHTPIPE_CONTRIBUTION * 100).toFixed(0)}% แสง</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">LED</span>
                      <span className="font-bold text-gray-700">{NEW_LED_POWER}W (PID)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">ไฟฟ้า/ปี</span>
                      <span className="font-bold text-emerald-500">{NEW_ENERGY_KWH.toFixed(0)} kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">ค่าไฟ/ปี</span>
                      <span className="font-bold text-emerald-500">฿{(NEW_ENERGY_KWH * ELEC_RATE).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">CO₂/ปี</span>
                      <span className="font-bold text-emerald-500">{NEW_CO2.toFixed(1)} kg</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Summary */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 text-white shadow-lg shadow-emerald-500/20">
                <Zap className="w-6 h-6 mb-2 opacity-80" />
                <div className="text-3xl font-bold">{animatedValues.energy.toFixed(0)}</div>
                <div className="text-white/70 text-xs">kWh/ปี ประหยัด</div>
                <div className="text-white/50 text-[10px] mt-1">({((SAVED_ENERGY_KWH/OLD_ENERGY_KWH)*100).toFixed(0)}% ลดลง)</div>
              </div>
              
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-4 text-white shadow-lg shadow-amber-500/20">
                <DollarSign className="w-6 h-6 mb-2 opacity-80" />
                <div className="text-3xl font-bold">฿{animatedValues.cost.toFixed(0)}</div>
                <div className="text-white/70 text-xs">บาท/ปี ประหยัด</div>
                <div className="text-white/50 text-[10px] mt-1">(@{ELEC_RATE} บาท/kWh)</div>
              </div>
              
              <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl p-4 text-white shadow-lg shadow-teal-500/20">
                <Leaf className="w-6 h-6 mb-2 opacity-80" />
                <div className="text-3xl font-bold">{animatedValues.co2.toFixed(1)}</div>
                <div className="text-white/70 text-xs">kg CO₂/ปี ลด</div>
                <div className="text-white/50 text-[10px] mt-1">(EF={EF} kg/kWh)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scale Up Analysis */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
          <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-emerald-500" />
            ถ้าขยายไป 10 / 50 / 100 ห้อง
          </h2>
          
          <div className="grid grid-cols-3 gap-4">
            {[10, 50, 100].map(rooms => (
              <div key={rooms} className="bg-gradient-to-br from-gray-50 to-emerald-50 rounded-2xl p-4 border border-emerald-100">
                <div className="text-2xl font-bold text-emerald-600 mb-2">{rooms} ห้อง</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">ประหยัดไฟ</span>
                    <span className="font-bold text-gray-700">{((SAVED_ENERGY_KWH * rooms)/1000).toFixed(1)} MWh/ปี</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">ประหยัดเงิน</span>
                    <span className="font-bold text-amber-600">฿{((SAVED_COST * rooms)/1000).toFixed(1)}k/ปี</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">ลด CO₂</span>
                    <span className="font-bold text-teal-600">{((SAVED_CO2 * rooms)/1000).toFixed(2)} ตัน/ปี</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-gray-400 text-sm">&quot;LumiGreen: Light Pipe + Smart LED = ลดคาร์บอนฟุตพริ้นท์อย่างยั่งยืน&quot;</p>
          <p className="text-gray-300 text-xs mt-1">KMUTT • Demand-side Decarbonization</p>
        </div>
      </div>
    </div>
  );
}
