"use client";
import { useState, useEffect } from "react";
import { Sun, Zap, Leaf, TrendingDown, ArrowLeft, Activity, BarChart3, FlaskConical, AlertTriangle, Building2, Timer } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ROOM_SIZE = 42;
const OLD_POWER = 200;
const HOURS_PER_DAY = 10;
const DAYS_PER_YEAR = 260;
const ELEC_RATE = 4.5;
const EF = 0.4682;
const REDUCTION = 0.4;

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

  useEffect(() => {
    const interval = setInterval(() => { setPage(p => (p + 1) % 4); setTimeLeft(10); }, 10000);
    const countdown = setInterval(() => setTimeLeft(t => t > 0 ? t - 1 : 10), 1000);
    return () => { clearInterval(interval); clearInterval(countdown); };
  }, []);

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

  useEffect(() => {
    if (page === 1) {
      const interval = setInterval(() => {
        setSimData({ naturalLight: 60 + Math.random() * 20, lux: 420 + Math.random() * 60, ledPower: 10 + Math.random() * 8, pidReduction: 55 + Math.random() * 15 });
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [page]);

  useEffect(() => {
    if (page === 3) { setScenario(0); const interval = setInterval(() => setScenario(s => (s + 1) % 3), 3000); return () => clearInterval(interval); }
  }, [page]);

  const pages = [
    { icon: BarChart3, label: "Overview" },
    { icon: Activity, label: "Real-Time" },
    { icon: TrendingDown, label: "Peak" },
    { icon: FlaskConical, label: "What-If" },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-gray-50 to-emerald-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <Link href="/" className="text-gray-400 hover:text-emerald-600"><ArrowLeft className="w-5 h-5" /></Link>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Image src="/logo.png" alt="Logo" width={24} height={24} className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-base sm:text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">LumiGreen</span>
          <span className="text-gray-400 text-xs sm:text-sm font-medium hidden sm:inline">Sandbox</span>
        </div>
        <div className="flex items-center gap-1">
          <Timer className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
          <span className="text-xs sm:text-sm text-gray-500 w-4">{timeLeft}</span>
        </div>
      </div>

      {/* Page Tabs */}
      <div className="flex justify-center gap-1 sm:gap-2 py-2 sm:py-3 bg-white/50 px-2">
        {pages.map((p, i) => (
          <button key={i} onClick={() => { setPage(i); setTimeLeft(10); }}
            className={`flex items-center gap-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              page === i ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30" : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200"
            }`}>
            <p.icon className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline sm:inline">{p.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-3 sm:p-4 overflow-auto">
        {/* PAGE 0 - Overview */}
        {page === 0 && (
          <div className="h-full flex flex-col">
            <div className="text-center mb-3 sm:mb-4">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-800">Sandbox Overview</h1>
              <p className="text-gray-500 text-[10px] sm:text-sm mt-1">
                {ROOM_SIZE}m² • {OLD_POWER}W • {HOURS_PER_DAY}h/day
              </p>
            </div>
            
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto w-full">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl shadow-emerald-500/20 flex flex-col justify-center items-center text-white">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-4">
                  <Zap className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                <div className="text-3xl sm:text-5xl font-bold">{counter.energy.toFixed(2)}</div>
                <div className="text-white/70 mt-1 text-xs sm:text-sm">MWh/year saved</div>
              </div>
              
              <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl shadow-teal-500/20 flex flex-col justify-center items-center text-white">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-4">
                  <Leaf className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                <div className="text-3xl sm:text-5xl font-bold">{counter.co2.toFixed(2)}</div>
                <div className="text-white/70 mt-1 text-xs sm:text-sm">tons CO₂/year</div>
              </div>
              
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl shadow-amber-500/20 flex flex-col justify-center items-center text-white">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-4">
                  <TrendingDown className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                <div className="text-3xl sm:text-5xl font-bold">฿{counter.cost.toFixed(0)}</div>
                <div className="text-white/70 mt-1 text-xs sm:text-sm">THB/year saved</div>
              </div>
            </div>
            
            <div className="mt-3 sm:mt-4 text-center">
              <p className="text-gray-400 text-[10px] sm:text-sm italic">&quot;Scaled-down model of the entire campus.&quot;</p>
            </div>
          </div>
        )}

        {/* PAGE 1 - Real-Time */}
        {page === 1 && (
          <div className="h-full flex flex-col">
            <div className="text-center mb-3 sm:mb-4">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-800">Real-Time Operation</h1>
              <p className="text-gray-500 text-[10px] sm:text-sm mt-1">Live PID simulation</p>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-2 sm:gap-4 max-w-3xl mx-auto w-full">
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-lg border border-gray-100">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Sun className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-gray-500 text-[10px] sm:text-sm font-medium">Natural Light</span>
                </div>
                <div className="text-3xl sm:text-5xl font-bold text-gray-800">{simData.naturalLight.toFixed(0)}%</div>
                <div className="mt-2 sm:mt-3 h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-500" style={{ width: `${simData.naturalLight}%` }} />
                </div>
              </div>
              
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-lg border border-gray-100">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Activity className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-gray-500 text-[10px] sm:text-sm font-medium">Illuminance</span>
                </div>
                <div className="text-3xl sm:text-5xl font-bold text-gray-800">{simData.lux.toFixed(0)}<span className="text-base sm:text-xl text-gray-400 ml-1">Lux</span></div>
                <div className="mt-2 sm:mt-3 text-gray-400 text-[10px] sm:text-sm">Target: 500 Lux</div>
              </div>
              
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-lg border border-gray-100">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-gray-500 text-[10px] sm:text-sm font-medium">LED Power</span>
                </div>
                <div className="text-3xl sm:text-5xl font-bold text-gray-800">{simData.ledPower.toFixed(1)}<span className="text-base sm:text-xl text-gray-400 ml-1">W</span></div>
                <div className="mt-2 sm:mt-3 text-gray-400 text-[10px] sm:text-sm">Max: 30W</div>
              </div>
              
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-lg border border-gray-100">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <TrendingDown className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-gray-500 text-[10px] sm:text-sm font-medium">PID Reduction</span>
                </div>
                <div className="text-3xl sm:text-5xl font-bold text-gray-800">{simData.pidReduction.toFixed(0)}%</div>
                <div className="mt-2 sm:mt-3 h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full transition-all duration-500" style={{ width: `${simData.pidReduction}%` }} />
                </div>
              </div>
            </div>
            
            <div className="mt-3 sm:mt-4 text-center">
              <p className="text-gray-400 text-[10px] sm:text-sm italic">&quot;PID minimizes electrical demand.&quot;</p>
            </div>
          </div>
        )}

        {/* PAGE 2 - Peak Load */}
        {page === 2 && (
          <div className="h-full flex flex-col">
            <div className="text-center mb-3 sm:mb-4">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-800">Peak Load Reduction</h1>
              <p className="text-gray-500 text-[10px] sm:text-sm mt-1">Daily load comparison</p>
            </div>
            
            <div className="flex-1 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-lg border border-gray-100 max-w-4xl mx-auto w-full">
              <div className="flex items-end justify-between h-32 sm:h-44 gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                {[6,7,8,9,10,11,12,13,14,15,16,17,18].map((hour) => {
                  const isPeak = hour >= 10 && hour <= 14;
                  const baseline = isPeak ? 200 : 150;
                  const withLumi = isPeak ? 80 : 100;
                  return (
                    <div key={hour} className="flex-1 flex flex-col items-center gap-0.5">
                      <div className="w-full flex gap-px items-end h-24 sm:h-36">
                        <div className="flex-1 bg-gradient-to-t from-red-400 to-red-300 rounded-t" style={{ height: `${(baseline/200)*100}%` }} />
                        <div className="flex-1 bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t" style={{ height: `${(withLumi/200)*100}%` }} />
                      </div>
                      <span className="text-[8px] sm:text-[10px] text-gray-400">{hour}</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex justify-center gap-3 sm:gap-6">
                <div className="flex items-center gap-1 sm:gap-2"><div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded" /><span className="text-gray-500 text-[10px] sm:text-sm">Baseline</span></div>
                <div className="flex items-center gap-1 sm:gap-2"><div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded" /><span className="text-gray-500 text-[10px] sm:text-sm">LumiGreen</span></div>
              </div>
              
              <div className="mt-3 sm:mt-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center">
                <span className="text-emerald-600 font-semibold text-xs sm:text-sm">10:00–14:00:</span>
                <span className="text-gray-700 ml-1 sm:ml-2 font-bold text-xs sm:text-sm">60% reduction</span>
              </div>
            </div>
            
            <div className="mt-3 sm:mt-4 text-center">
              <p className="text-gray-400 text-[10px] sm:text-sm italic">&quot;Peak reduction lowers carbon intensity.&quot;</p>
            </div>
          </div>
        )}

        {/* PAGE 3 - What-If */}
        {page === 3 && (
          <div className="h-full flex flex-col">
            <div className="text-center mb-3 sm:mb-4">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-800">What-If Analysis</h1>
              <div className="flex justify-center gap-1 sm:gap-2 mt-2 sm:mt-3">
                {["No LumiGreen", "30 Rooms", "OFF"].map((s, i) => (
                  <button key={i} onClick={() => setScenario(i)} className={`px-2 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-sm font-medium transition-all ${scenario === i ? "bg-emerald-500 text-white shadow-lg" : "bg-white text-gray-500 border border-gray-200"}`}>{s}</button>
                ))}
              </div>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              {scenario === 0 && (
                <div className="text-center bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl border border-red-100 max-w-sm sm:max-w-lg w-full mx-2">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg shadow-red-500/30">
                    <AlertTriangle className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h2 className="text-base sm:text-xl font-bold text-red-600 mb-3 sm:mb-4">If NO LumiGreen</h2>
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    <div className="bg-red-50 rounded-lg sm:rounded-xl p-2 sm:p-3"><div className="text-xl sm:text-3xl font-bold text-red-500">+{SAVED_ENERGY_MWH.toFixed(2)}</div><div className="text-gray-500 text-[8px] sm:text-xs">MWh</div></div>
                    <div className="bg-red-50 rounded-lg sm:rounded-xl p-2 sm:p-3"><div className="text-xl sm:text-3xl font-bold text-red-500">+{SAVED_CO2_TON.toFixed(2)}</div><div className="text-gray-500 text-[8px] sm:text-xs">tons</div></div>
                    <div className="bg-red-50 rounded-lg sm:rounded-xl p-2 sm:p-3"><div className="text-xl sm:text-3xl font-bold text-red-500">+฿{SAVED_COST.toFixed(0)}</div><div className="text-gray-500 text-[8px] sm:text-xs">THB</div></div>
                  </div>
                </div>
              )}
              
              {scenario === 1 && (
                <div className="text-center bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl border border-emerald-100 max-w-sm sm:max-w-lg w-full mx-2">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg shadow-emerald-500/30">
                    <Building2 className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h2 className="text-base sm:text-xl font-bold text-emerald-600 mb-3 sm:mb-4">30 Rooms Scale</h2>
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    <div className="bg-emerald-50 rounded-lg sm:rounded-xl p-2 sm:p-3"><div className="text-xl sm:text-3xl font-bold text-emerald-500">{(SAVED_ENERGY_MWH * 30).toFixed(1)}</div><div className="text-gray-500 text-[8px] sm:text-xs">MWh/yr</div></div>
                    <div className="bg-teal-50 rounded-lg sm:rounded-xl p-2 sm:p-3"><div className="text-xl sm:text-3xl font-bold text-teal-500">{(SAVED_CO2_TON * 30).toFixed(1)}</div><div className="text-gray-500 text-[8px] sm:text-xs">tons</div></div>
                    <div className="bg-amber-50 rounded-lg sm:rounded-xl p-2 sm:p-3"><div className="text-xl sm:text-3xl font-bold text-amber-500">฿{(SAVED_COST * 30 / 1000).toFixed(0)}k</div><div className="text-gray-500 text-[8px] sm:text-xs">THB/yr</div></div>
                  </div>
                  <div className="mt-3 sm:mt-4 text-gray-400 text-[10px] sm:text-sm">Scalable • Policy-ready</div>
                </div>
              )}
              
              {scenario === 2 && (
                <div className="text-center bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl border border-orange-100 max-w-sm sm:max-w-lg w-full mx-2">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg shadow-orange-500/30">
                    <AlertTriangle className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h2 className="text-base sm:text-xl font-bold text-orange-600 mb-2">System OFF</h2>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg sm:rounded-xl p-3 sm:p-4 mt-3 sm:mt-4">
                    <div className="text-lg sm:text-2xl font-bold text-orange-500 mb-1 sm:mb-2">⚡ Load Spikes</div>
                    <p className="text-gray-500 text-[10px] sm:text-sm">&quot;Energy waste returns instantly.&quot;</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-3 sm:px-4 py-2 sm:py-3 bg-white/80 backdrop-blur-sm border-t border-gray-200 text-center">
        <p className="text-gray-400 text-[9px] sm:text-xs">&quot;LumiGreen: demand-side decarbonization for universities.&quot;</p>
      </div>
    </div>
  );
}
