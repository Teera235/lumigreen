"use client";
import { useState, useEffect } from "react";
import { Sun, Zap, Battery, Leaf, Wifi, WifiOff, ArrowLeft } from "lucide-react";
import Link from "next/link";

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

  return (
    <div className="h-screen bg-gray-950 text-white flex flex-col">
      {/* Header - แน่นติดบน */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-900 border-b border-gray-800">
        <Link href="/" className="text-gray-400 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>
        <span className="text-gray-400 text-sm font-medium">LumiGreen Live</span>
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${online ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
          {online ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
          {online ? "Online" : "Offline"}
        </div>
      </div>

      {/* Main Content - ติดกันหมด */}
      <div className="flex-1 flex flex-col">
        {/* Lux Display - ใหญ่ขึ้น ติดกับ header */}
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-900/50 px-4 py-6">
          <div className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full flex items-center justify-center border-[6px]`}
            style={{ 
              backgroundColor: `rgba(${ok ? "34,197,94" : low ? "234,179,8" : "59,130,246"}, 0.1)`, 
              borderColor: ok ? "#22c55e" : low ? "#eab308" : "#3b82f6" 
            }}>
            <div className="text-center">
              <Sun className="w-10 h-10 mx-auto mb-2" style={{ color: ok ? "#22c55e" : low ? "#eab308" : "#3b82f6" }} />
              <div className="text-6xl sm:text-7xl font-bold">{d.lux.toFixed(0)}</div>
              <div className="text-gray-400">Lux</div>
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold" style={{ color: ok ? "#4ade80" : low ? "#facc15" : "#60a5fa" }}>{status}</div>
          <div className="text-gray-500 text-sm">Target: {d.setpoint} Lux ({pct.toFixed(0)}%)</div>
        </div>

        {/* Stats - ติดกันไม่มี gap */}
        <div className="grid grid-cols-4 divide-x divide-gray-800 bg-gray-900 border-t border-gray-800">
          {[
            { icon: Sun, label: "Brightness", val: `${d.brightness.toFixed(0)}%`, color: "#a855f7", pct: d.brightness },
            { icon: Zap, label: "Power", val: `${d.power.toFixed(1)}W`, color: "#f59e0b", pct: (d.power/30)*100 },
            { icon: Battery, label: "Energy", val: `${d.energy.toFixed(1)}Wh`, color: "#06b6d4", pct: Math.min((d.energy/100)*100, 100) },
            { icon: Leaf, label: "CO₂", val: `${d.carbon.toFixed(3)}kg`, color: "#22c55e", pct: Math.min((d.carbon/0.1)*100, 100) },
          ].map((s, i) => (
            <div key={i} className="p-3 text-center">
              <s.icon className="w-5 h-5 mx-auto mb-1" style={{ color: s.color }} />
              <div className="text-xl font-bold">{s.val}</div>
              <div className="text-gray-500 text-[10px] uppercase">{s.label}</div>
              <div className="mt-2 h-1.5 bg-gray-800 rounded-full overflow-hidden mx-2">
                <div className="h-full rounded-full" style={{ width: `${Math.min(s.pct, 100)}%`, backgroundColor: s.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
