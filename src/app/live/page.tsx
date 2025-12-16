"use client";
import { useState, useEffect } from "react";
import { Sun, Zap, Battery, Leaf, Wifi, WifiOff, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";

const BLYNK_TOKEN = "O9C2s8T0nrrOmFjShVi-S9YsH4KUMSKs";
const BLYNK_SERVER = "https://blynk.cloud/external/api";

interface SensorData {
  lux: number;
  brightness: number;
  power: number;
  energy: number;
  carbon: number;
  setpoint: number;
}

const defaultData: SensorData = { lux: 0, brightness: 0, power: 0, energy: 0, carbon: 0, setpoint: 100 };

export default function LivePage() {
  const [data, setData] = useState<SensorData>(defaultData);
  const [isOnline, setIsOnline] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  const fetchData = async () => {
    try {
      const pins = ["V1", "V2", "V4", "V5", "V6", "V10"];
      const responses = await Promise.all(
        pins.map(pin => fetch(`${BLYNK_SERVER}/get?token=${BLYNK_TOKEN}&${pin}`).then(res => res.json()).catch(() => [0]))
      );
      setData({
        lux: parseFloat(responses[0]) || 0,
        brightness: parseFloat(responses[1]) || 0,
        power: parseFloat(responses[2]) || 0,
        energy: parseFloat(responses[3]) || 0,
        carbon: parseFloat(responses[4]) || 0,
        setpoint: parseFloat(responses[5]) || 100,
      });
      setIsOnline(true);
      setLastUpdate(new Date().toLocaleTimeString("th-TH"));
    } catch {
      setIsOnline(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const luxPercent = Math.min((data.lux / data.setpoint) * 100, 150);
  const luxStatus = data.lux >= data.setpoint * 0.9 && data.lux <= data.setpoint * 1.1 ? "OK" : data.lux < data.setpoint * 0.9 ? "LOW" : "HIGH";
  const statusColor = luxStatus === "OK" ? "text-green-400" : luxStatus === "LOW" ? "text-yellow-400" : "text-blue-400";
  const bgColor = luxStatus === "OK" ? "bg-green-500" : luxStatus === "LOW" ? "bg-yellow-500" : "bg-blue-500";

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Back</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-gray-500 text-sm">{lastUpdate}</span>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${isOnline ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
            {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            {isOnline ? "Online" : "Offline"}
          </div>
          <button onClick={fetchData} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Lux Display */}
      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-40 h-40 sm:w-56 sm:h-56 rounded-full ${bgColor}/20 border-4 ${bgColor.replace("bg-", "border-")} mb-4`}>
          <div>
            <Sun className={`w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-2 ${statusColor}`} />
            <div className="text-5xl sm:text-7xl font-bold">{data.lux.toFixed(0)}</div>
            <div className="text-gray-400 text-lg">Lux</div>
          </div>
        </div>
        <div className={`text-2xl font-bold ${statusColor}`}>{luxStatus}</div>
        <div className="text-gray-500">Target: {data.setpoint} Lux ({luxPercent.toFixed(0)}%)</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <Sun className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-gray-400 text-sm">Brightness</span>
          </div>
          <div className="text-3xl font-bold">{data.brightness.toFixed(1)}%</div>
          <div className="mt-2 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: `${data.brightness}%` }} />
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-gray-400 text-sm">Power</span>
          </div>
          <div className="text-3xl font-bold">{data.power.toFixed(2)}</div>
          <div className="text-gray-500 text-sm">Watts</div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
              <Battery className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-gray-400 text-sm">Energy</span>
          </div>
          <div className="text-3xl font-bold">{data.energy.toFixed(2)}</div>
          <div className="text-gray-500 text-sm">Wh</div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-gray-400 text-sm">CO2</span>
          </div>
          <div className="text-3xl font-bold">{data.carbon.toFixed(4)}</div>
          <div className="text-gray-500 text-sm">kg</div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 text-gray-600 text-sm">
        LumiGreen IoT  ESP32 + Blynk + PID Control
      </div>
    </div>
  );
}
