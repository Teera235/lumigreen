"use client";
import { useState, useEffect } from "react";
import { Sun, Zap, Leaf, TrendingDown, ArrowLeft, Activity, BarChart3, FlaskConical, AlertTriangle, Building2, Timer } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Fixed Parameters
const ROOM_SIZE = 42;
const OLD_POWER = 200;
const HOURS_PER_DAY = 10;
const DAYS_PER_YEAR = 260;
const ELEC_RATE = 4.5;
const EF = 0.4682;
const REDUCTION = 0.4;

// Calculations
const OLD_ENERGY_KWH = (OLD_POWER * HOURS_PER_DAY * DAYS_PER_YEAR) / 1000;
const SAVED_ENERGY_KWH = OLD_ENERGY_KWH * REDUCTION;
const SAVED_ENERGY_MWH = SAVED_ENERGY_KWH / 1000;
const SAVED_CO2_TON = (SAVED_ENERGY_KWH * EF) / 1000;
const SAVED_COST = SAVED_ENERGY_KWH * ELEC_RATE;

export default function SandboxPage() {
  const [page, setPage] = useState(0);
  const [counter, setCounter] = useState({ energy: 0, co2: 0, cost: 0 });
  const [scenario, setScenario] = useState(0);
  const [simData, setSimData] = useState({ naturalLight: 65, lux: 450, ledPower: 12, pidReduction: 58 });
  const [timeLeft, setTimeLeft] = useState(10);

  // Auto switch pages every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPage(p => (p + 1) % 4);
      setTimeLeft(10);
    }, 10000);
    const countdown = setInterval(() => setTimeLeft(t => t > 0 ? t - 1 : 10), 1000);
    return () => { clearInterval(interval); clearInterval(countdown); };
  }, []);

  // Animate counters on page 0
  useEffect(() => {
    if (page === 0) {
      setCounter({ energy: 0, co2: 0, cost: 0 });
      let step = 0;
      const interval = setInterval(() => {
        step++;
        const p = step / 60;
        setCounter({ energy: SAVED_ENERGY_MWH * p, co2: SAVED_CO2_TON * p, cost: SAVED_COST * p });
        if (step >= 60) clearInterval(interval);
      }, 33);
      return () => clearInterval(interval);
    }
  }, [page]);

  // Simulate live data on page 1
  useEffect(() => {
    if (page === 1) {
      const interval = setInterval(() => {
        setSimData({
          naturalLight: 60 + Math.random() * 20,
          lux: 420 + Math.random() * 60,
          ledPower: 10 + Math.random() * 8,
          pidReduction: 55 + Math.random() * 15,
        });
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [page]);

  // Auto toggle scenarios on page 3
  useEffect(() => {
    if (page === 3) {
      setScenario(0);
      const interval = setInterval(() => setScenario(s => (s + 1) % 3), 3000);
      return () => clearInterval(interval);
    }
  }, [page]);

  const pages = [
    { icon: BarChart3, label: "Overview" },
    { icon: Activity, label: "Real-Time" },
    { icon: TrendingDown, label: "Peak Load" },
    { icon: FlaskConical, label: "What-If" },
  ];

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-50 via-gray-50 to-emerald-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <Link href="/" className="text-gray-400 hover:text-emerald-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={28} height={28} />
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">LumiGreen</span>
          <span className="text-gray-400 text-sm font-medium">Sandbox</span>
        </div>
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500 w-4">{timeLeft}</span>
        </div>
      </div>

      {/* Page Tabs */}
      <div className="flex justify-center gap-2 py-3 bg-white/50">
        {pages.map((p, i) => (
          <button
            key={i}
            onClick={() => { setPage(i); setTimeLeft(10); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              page === i 
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30" 
                : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <p.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{p.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-hidden">
        {/* PAGE 0 - Overview */}
        {page === 0 && (
          <div className="h-full flex flex-col">
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Sandbox Overview</h1>
              <p className="text-gray-500 text-sm mt-1">
                Pilot: {ROOM_SIZE}m² • {OLD_POWER}W baseline • {HOURS_PER_DAY}h/day • {DAYS_PER_YEAR} days/year
              </p>
            </div>
            
            <div className="flex-1 grid grid-cols-3 gap-4 max-w-4xl mx-auto w-full">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 shadow-xl shadow-emerald-500/20 flex flex-col justify-center items-center text-white">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                  <Zap className="w-7 h-7" />
                </div>
                <div className="text-5xl font-bold">{counter.energy.toFixed(2)}</div>
                <div className="text-white/70 mt-1 text-sm">MWh/year saved</div>
              </div>
              
              <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl p-6 shadow-xl shadow-teal-500/20 flex flex-col justify-center items-center text-white">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                  <Leaf className="w-7 h-7" />
                </div>
                <div className="text-5xl font-bold">{counter.co2.toFixed(2)}</div>
                <div className="text-white/70 mt-1 text-sm">tons CO₂/year</div>
              </div>
              
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl p-6 shadow-xl shadow-amber-500/20 flex flex-col justify-center items-center text-white">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                  <TrendingDown className="w-7 h-7" />
                </div>
                <div className="text-5xl font-bold">฿{counter.cost.toFixed(0)}</div>
                <div className="text-white/70 mt-1 text-sm">THB/year saved</div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-sm italic">&quot;This sandbox room is a scaled-down model of the entire campus.&quot;</p>
            </div>
          </div>
        )}

        {/* PAGE 1 - Real-Time */}
        {page === 1 && (
          <div className="h-full flex flex-col">
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Real-Time Operation</h1>
              <p className="text-gray-500 text-sm mt-1">Live PID control simulation</p>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-4 max-w-3xl mx-auto w-full">
              <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <Sun className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-500 font-medium">Natural Light</span>
                </div>
                <div className="text-5xl font-bold text-gray-800">{simData.naturalLight.toFixed(0)}%</div>
                <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-500" style={{ width: `${simData.naturalLight}%` }} />
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-500 font-medium">Illuminance</span>
                </div>
                <div className="text-5xl font-bold text-gray-800">{simData.lux.toFixed(0)}<span className="text-xl text-gray-400 ml-1">Lux</span></div>
                <div className="mt-3 text-gray-400 text-sm">Target: 500 Lux</div>
              </div>
              
              <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-500 font-medium">LED Power</span>
                </div>
                <div className="text-5xl font-bold text-gray-800">{simData.ledPower.toFixed(1)}<span className="text-xl text-gray-400 ml-1">W</span></div>
                <div className="mt-3 text-gray-400 text-sm">Max: 30W</div>
              </div>
              
              <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-500 font-medium">PID Reduction</span>
                </div>
                <div className="text-5xl font-bold text-gray-800">{simData.pidReduction.toFixed(0)}%</div>
                <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full transition-all duration-500" style={{ width: `${simData.pidReduction}%` }} />
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-sm italic">&quot;PID controller continuously minimizes unnecessary electrical demand.&quot;</p>
            </div>
          </div>
        )}

        {/* PAGE 2 - Peak Load */}
        {page === 2 && (
          <div className="h-full flex flex-col">
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Peak Load Reduction</h1>
              <p className="text-gray-500 text-sm mt-1">Daily load profile comparison</p>
            </div>
            
            <div className="flex-1 bg-white rounded-2xl p-5 shadow-lg border border-gray-100 max-w-4xl mx-auto w-full">
              <div className="flex items-end justify-between h-44 gap-1 mb-4">
                {[6,7,8,9,10,11,12,13,14,15,16,17,18].map((hour) => {
                  const isPeak = hour >= 10 && hour <= 14;
                  const baseline = isPeak ? 200 : 150;
                  const withLumi = isPeak ? 80 : 100;
                  return (
                    <div key={hour} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex gap-0.5 items-end h-36">
                        <div className="flex-1 bg-gradient-to-t from-red-400 to-red-300 rounded-t transition-all" style={{ height: `${(baseline/200)*100}%` }} />
                        <div className="flex-1 bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t transition-all" style={{ height: `${(withLumi/200)*100}%` }} />
                      </div>
                      <span className="text-[10px] text-gray-400">{hour}:00</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex justify-center gap-6">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-400 rounded" /><span className="text-gray-500 text-sm">Baseline</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded" /><span className="text-gray-500 text-sm">With LumiGreen</span></div>
              </div>
              
              <div className="mt-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-3 text-center">
                <span className="text-emerald-600 font-semibold">10:00–14:00 Peak:</span>
                <span className="text-gray-700 ml-2 font-bold">60% load reduction</span>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-sm italic">&quot;Peak demand reduction directly lowers grid carbon intensity.&quot;</p>
            </div>
          </div>
        )}

        {/* PAGE 3 - What-If */}
        {page === 3 && (
          <div className="h-full flex flex-col">
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">What-If Analysis</h1>
              <div className="flex justify-center gap-2 mt-3">
                {["No LumiGreen", "30 Rooms", "System OFF"].map((s, i) => (
                  <button key={i} onClick={() => setScenario(i)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${scenario === i ? "bg-emerald-500 text-white shadow-lg" : "bg-white text-gray-500 border border-gray-200"}`}>{s}</button>
                ))}
              </div>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              {scenario === 0 && (
                <div className="text-center bg-white rounded-3xl p-8 shadow-xl border border-red-100 max-w-lg">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/30">
                    <AlertTriangle className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-red-600 mb-4">If NO LumiGreen</h2>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-red-50 rounded-xl p-3"><div className="text-3xl font-bold text-red-500">+{SAVED_ENERGY_MWH.toFixed(2)}</div><div className="text-gray-500 text-xs">MWh wasted</div></div>
                    <div className="bg-red-50 rounded-xl p-3"><div className="text-3xl font-bold text-red-500">+{SAVED_CO2_TON.toFixed(2)}</div><div className="text-gray-500 text-xs">tons CO₂</div></div>
                    <div className="bg-red-50 rounded-xl p-3"><div className="text-3xl font-bold text-red-500">+฿{SAVED_COST.toFixed(0)}</div><div className="text-gray-500 text-xs">extra cost</div></div>
                  </div>
                </div>
              )}
              
              {scenario === 1 && (
                <div className="text-center bg-white rounded-3xl p-8 shadow-xl border border-emerald-100 max-w-lg">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
                    <Building2 className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-emerald-600 mb-4">If Installed in 30 Rooms</h2>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-emerald-50 rounded-xl p-3"><div className="text-3xl font-bold text-emerald-500">{(SAVED_ENERGY_MWH * 30).toFixed(1)}</div><div className="text-gray-500 text-xs">MWh/year</div></div>
                    <div className="bg-teal-50 rounded-xl p-3"><div className="text-3xl font-bold text-teal-500">{(SAVED_CO2_TON * 30).toFixed(1)}</div><div className="text-gray-500 text-xs">tons CO₂</div></div>
                    <div className="bg-amber-50 rounded-xl p-3"><div className="text-3xl font-bold text-amber-500">฿{(SAVED_COST * 30 / 1000).toFixed(0)}k</div><div className="text-gray-500 text-xs">THB/year</div></div>
                  </div>
                  <div className="mt-4 text-gray-400 text-sm">Scalable • Policy-ready</div>
                </div>
              )}
              
              {scenario === 2 && (
                <div className="text-center bg-white rounded-3xl p-8 shadow-xl border border-orange-100 max-w-lg">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30">
                    <AlertTriangle className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-orange-600 mb-2">System OFF</h2>
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-4">
                    <div className="text-2xl font-bold text-orange-500 mb-2">⚡ Load Spikes Immediately</div>
                    <p className="text-gray-500 text-sm">&quot;Without intelligent control, energy waste returns instantly.&quot;</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-white/80 backdrop-blur-sm border-t border-gray-200 text-center">
        <p className="text-gray-400 text-xs">&quot;LumiGreen is not just a lighting system. It is a demand-side decarbonization tool for universities.&quot;</p>
      </div>
    </div>
  );
}
