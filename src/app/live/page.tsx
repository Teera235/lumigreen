"use client";
import { useState, useEffect } from "react";
import { Sun, Zap, Leaf, TrendingDown, ArrowLeft, Activity, BarChart3, FlaskConical, AlertTriangle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Fixed Parameters
const ROOM_SIZE = 42; // m²
const OLD_POWER = 200; // W
const HOURS_PER_DAY = 10;
const DAYS_PER_YEAR = 260;
const ELEC_RATE = 4.5; // THB/kWh
const EF = 0.4682; // kgCO₂/kWh
const REDUCTION = 0.4; // 40%

// Calculations
const OLD_ENERGY_KWH = (OLD_POWER * HOURS_PER_DAY * DAYS_PER_YEAR) / 1000; // 520 kWh/year
const SAVED_ENERGY_KWH = OLD_ENERGY_KWH * REDUCTION; // 208 kWh
const SAVED_ENERGY_MWH = SAVED_ENERGY_KWH / 1000; // 0.208 MWh
const SAVED_CO2_KG = SAVED_ENERGY_KWH * EF; // ~97 kg
const SAVED_CO2_TON = SAVED_CO2_KG / 1000; // ~0.097 ton
const SAVED_COST = SAVED_ENERGY_KWH * ELEC_RATE; // ~936 THB

export default function LivePage() {
  const [page, setPage] = useState(0);
  const [counter, setCounter] = useState({ energy: 0, co2: 0, cost: 0 });
  const [scenario, setScenario] = useState(0);
  const [simData, setSimData] = useState({ naturalLight: 65, lux: 450, ledPower: 12, pidReduction: 58 });

  // Auto switch pages every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => setPage(p => (p + 1) % 4), 10000);
    return () => clearInterval(interval);
  }, []);

  // Animate counters on page 0
  useEffect(() => {
    if (page === 0) {
      setCounter({ energy: 0, co2: 0, cost: 0 });
      const duration = 2000;
      const steps = 60;
      let step = 0;
      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        setCounter({
          energy: SAVED_ENERGY_MWH * progress,
          co2: SAVED_CO2_TON * progress,
          cost: SAVED_COST * progress,
        });
        if (step >= steps) clearInterval(interval);
      }, duration / steps);
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
      const interval = setInterval(() => setScenario(s => (s + 1) % 3), 4000);
      return () => clearInterval(interval);
    }
  }, [page]);

  const pages = ["Overview", "Real-Time", "Peak Load", "What-If"];

  return (
    <div className="h-screen w-screen bg-gray-950 text-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <Link href="/" className="text-gray-500 hover:text-emerald-400"><ArrowLeft className="w-5 h-5" /></Link>
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={24} height={24} />
          <span className="font-bold text-emerald-400">LumiGreen</span>
          <span className="text-gray-500 text-sm">Sandbox</span>
        </div>
        <div className="flex gap-1">
          {pages.map((_, i) => (
            <button key={i} onClick={() => setPage(i)} className={`w-2 h-2 rounded-full transition-all ${page === i ? "bg-emerald-400 w-6" : "bg-gray-700"}`} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-hidden">
        {/* PAGE 0 - Overview */}
        {page === 0 && (
          <div className="h-full flex flex-col">
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-emerald-400">Sandbox Overview</h1>
              <p className="text-gray-500 text-sm">Pilot room: {ROOM_SIZE}m² • {OLD_POWER}W baseline • {HOURS_PER_DAY}h/day</p>
            </div>
            
            <div className="flex-1 grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-emerald-900/50 to-emerald-950 rounded-2xl p-6 border border-emerald-800/50 flex flex-col justify-center items-center">
                <Zap className="w-10 h-10 text-emerald-400 mb-3" />
                <div className="text-5xl font-bold text-emerald-400">{counter.energy.toFixed(2)}</div>
                <div className="text-gray-400 mt-1">MWh/year saved</div>
              </div>
              
              <div className="bg-gradient-to-br from-teal-900/50 to-teal-950 rounded-2xl p-6 border border-teal-800/50 flex flex-col justify-center items-center">
                <Leaf className="w-10 h-10 text-teal-400 mb-3" />
                <div className="text-5xl font-bold text-teal-400">{counter.co2.toFixed(2)}</div>
                <div className="text-gray-400 mt-1">tons CO₂/year</div>
              </div>
              
              <div className="bg-gradient-to-br from-amber-900/50 to-amber-950 rounded-2xl p-6 border border-amber-800/50 flex flex-col justify-center items-center">
                <TrendingDown className="w-10 h-10 text-amber-400 mb-3" />
                <div className="text-5xl font-bold text-amber-400">฿{counter.cost.toFixed(0)}</div>
                <div className="text-gray-400 mt-1">THB/year saved</div>
              </div>
            </div>
            
            <div className="mt-4 text-center text-gray-500 text-sm italic">
              &quot;This sandbox room is a scaled-down model of the entire campus.&quot;
            </div>
          </div>
        )}

        {/* PAGE 1 - Real-Time Operation */}
        {page === 1 && (
          <div className="h-full flex flex-col">
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-emerald-400 flex items-center justify-center gap-2">
                <Activity className="w-6 h-6" /> Real-Time Operation
              </h1>
              <p className="text-gray-500 text-sm">Live PID control simulation</p>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
                <div className="flex items-center gap-2 mb-4">
                  <Sun className="w-6 h-6 text-yellow-400" />
                  <span className="text-gray-400">Natural Light Contribution</span>
                </div>
                <div className="text-6xl font-bold text-yellow-400">{simData.naturalLight.toFixed(0)}%</div>
                <div className="mt-3 h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all duration-500" style={{ width: `${simData.naturalLight}%` }} />
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-6 h-6 text-emerald-400" />
                  <span className="text-gray-400">Current Illuminance</span>
                </div>
                <div className="text-6xl font-bold text-emerald-400">{simData.lux.toFixed(0)}<span className="text-2xl text-gray-500 ml-1">Lux</span></div>
                <div className="mt-3 text-gray-500 text-sm">Target: 500 Lux</div>
              </div>
              
              <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-6 h-6 text-cyan-400" />
                  <span className="text-gray-400">LED Power (PID Output)</span>
                </div>
                <div className="text-6xl font-bold text-cyan-400">{simData.ledPower.toFixed(1)}<span className="text-2xl text-gray-500 ml-1">W</span></div>
                <div className="mt-3 text-gray-500 text-sm">Max: 30W</div>
              </div>
              
              <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingDown className="w-6 h-6 text-purple-400" />
                  <span className="text-gray-400">PID Reduction</span>
                </div>
                <div className="text-6xl font-bold text-purple-400">{simData.pidReduction.toFixed(0)}%</div>
                <div className="mt-3 h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500" style={{ width: `${simData.pidReduction}%` }} />
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center text-gray-500 text-sm italic">
              &quot;PID controller continuously minimizes unnecessary electrical demand.&quot;
            </div>
          </div>
        )}

        {/* PAGE 2 - Peak Load Reduction */}
        {page === 2 && (
          <div className="h-full flex flex-col">
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-emerald-400 flex items-center justify-center gap-2">
                <BarChart3 className="w-6 h-6" /> Peak Load Reduction
              </h1>
              <p className="text-gray-500 text-sm">Daily load profile comparison</p>
            </div>
            
            <div className="flex-1 bg-gray-900 rounded-2xl p-5 border border-gray-800">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Load (W)</span>
                <span>Time of Day</span>
              </div>
              
              {/* Simple bar chart */}
              <div className="flex items-end justify-between h-48 gap-1">
                {[6,7,8,9,10,11,12,13,14,15,16,17,18].map((hour) => {
                  const isPeak = hour >= 10 && hour <= 14;
                  const baseline = isPeak ? 200 : 150;
                  const withLumi = isPeak ? 80 : 100;
                  return (
                    <div key={hour} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex gap-0.5 items-end h-40">
                        <div className="flex-1 bg-red-500/60 rounded-t transition-all" style={{ height: `${(baseline/200)*100}%` }} />
                        <div className="flex-1 bg-emerald-500 rounded-t transition-all" style={{ height: `${(withLumi/200)*100}%` }} />
                      </div>
                      <span className="text-[10px] text-gray-500">{hour}</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500/60 rounded" /><span className="text-gray-400 text-sm">Baseline</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded" /><span className="text-gray-400 text-sm">With LumiGreen</span></div>
              </div>
              
              <div className="mt-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-center">
                <span className="text-emerald-400 font-semibold">10:00–14:00 Peak:</span>
                <span className="text-white ml-2">60% load reduction</span>
              </div>
            </div>
            
            <div className="mt-4 text-center text-gray-500 text-sm italic">
              &quot;Peak demand reduction directly lowers grid carbon intensity.&quot;
            </div>
          </div>
        )}

        {/* PAGE 3 - What-If Analysis */}
        {page === 3 && (
          <div className="h-full flex flex-col">
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-emerald-400 flex items-center justify-center gap-2">
                <FlaskConical className="w-6 h-6" /> What-If Analysis
              </h1>
              <div className="flex justify-center gap-2 mt-2">
                {["No LumiGreen", "30 Rooms", "System OFF"].map((s, i) => (
                  <button key={i} onClick={() => setScenario(i)} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${scenario === i ? "bg-emerald-500 text-white" : "bg-gray-800 text-gray-400"}`}>{s}</button>
                ))}
              </div>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              {scenario === 0 && (
                <div className="text-center">
                  <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-red-400 mb-2">If NO LumiGreen</h2>
                  <div className="grid grid-cols-3 gap-6 mt-6">
                    <div><div className="text-4xl font-bold text-red-400">+{SAVED_ENERGY_MWH.toFixed(2)}</div><div className="text-gray-500 text-sm">MWh wasted</div></div>
                    <div><div className="text-4xl font-bold text-red-400">+{SAVED_CO2_TON.toFixed(2)}</div><div className="text-gray-500 text-sm">tons CO₂</div></div>
                    <div><div className="text-4xl font-bold text-red-400">+฿{SAVED_COST.toFixed(0)}</div><div className="text-gray-500 text-sm">extra cost</div></div>
                  </div>
                </div>
              )}
              
              {scenario === 1 && (
                <div className="text-center">
                  <div className="text-6xl mb-4">🏫</div>
                  <h2 className="text-xl font-bold text-emerald-400 mb-2">If Installed in 30 Rooms</h2>
                  <div className="grid grid-cols-3 gap-6 mt-6">
                    <div><div className="text-4xl font-bold text-emerald-400">{(SAVED_ENERGY_MWH * 30).toFixed(1)}</div><div className="text-gray-500 text-sm">MWh/year</div></div>
                    <div><div className="text-4xl font-bold text-teal-400">{(SAVED_CO2_TON * 30).toFixed(1)}</div><div className="text-gray-500 text-sm">tons CO₂</div></div>
                    <div><div className="text-4xl font-bold text-amber-400">฿{(SAVED_COST * 30 / 1000).toFixed(0)}k</div><div className="text-gray-500 text-sm">THB/year</div></div>
                  </div>
                  <div className="mt-4 text-gray-400 text-sm">Scalable • Policy-ready</div>
                </div>
              )}
              
              {scenario === 2 && (
                <div className="text-center">
                  <div className="text-6xl mb-4">⚠️</div>
                  <h2 className="text-xl font-bold text-orange-400 mb-2">System OFF</h2>
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mt-4 max-w-md">
                    <div className="text-3xl font-bold text-orange-400 mb-2">Load Spikes Immediately</div>
                    <p className="text-gray-400">&quot;Without intelligent control, energy waste returns instantly.&quot;</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-800 text-center">
        <p className="text-gray-500 text-xs">&quot;LumiGreen is not just a lighting system. It is a demand-side decarbonization tool for universities.&quot;</p>
      </div>
    </div>
  );
}
