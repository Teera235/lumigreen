"use client";
import { useState, useEffect, Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { useLoader } from "@react-three/fiber";
import { Zap, Leaf, ArrowLeft, DollarSign, TrendingDown, Sun } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import * as THREE from "three";

const ROOM_SIZE = 16;
const OLD_POWER = 120;
const NEW_LED_POWER = 30;
const LIGHTPIPE_CONTRIBUTION = 0.6;
const HOURS_PER_DAY = 16;
const DAYS_PER_YEAR = 260;
const ELEC_RATE = 4.2;
const EF = 0.4999;

const OLD_ENERGY_KWH = (OLD_POWER * HOURS_PER_DAY * DAYS_PER_YEAR) / 1000;
const AVG_LED_USAGE = NEW_LED_POWER * (1 - LIGHTPIPE_CONTRIBUTION * 0.7);
const NEW_ENERGY_KWH = (AVG_LED_USAGE * HOURS_PER_DAY * DAYS_PER_YEAR) / 1000;
const SAVED_ENERGY_KWH = OLD_ENERGY_KWH - NEW_ENERGY_KWH;
const SAVED_COST = SAVED_ENERGY_KWH * ELEC_RATE;
const OLD_CO2 = OLD_ENERGY_KWH * EF;
const NEW_CO2 = NEW_ENERGY_KWH * EF;
const SAVED_CO2 = OLD_CO2 - NEW_CO2;

// สีสำหรับแต่ละส่วน
const materialColors: { [key: string]: string } = {
  room: "#f5f5dc",      // ผนัง - สีครีม
  chair: "#8b4513",     // เก้าอี้ - สีน้ำตาล
  table: "#deb887",     // โต๊ะ - สีไม้
  bed: "#4169e1",       // เตียง - สีน้ำเงิน
  cushion: "#ff6b6b",   // หมอน - สีแดง
  borders: "#2f4f4f",   // ขอบ - สีเทาเข้ม
  book: "#228b22",      // หนังสือ - สีเขียว
  painting_1: "#ffd700", // รูปภาพ - สีทอง
  painting_2: "#ff69b4", // รูปภาพ - สีชมพู
};

function RoomModel() {
  const obj = useLoader(OBJLoader, "/models/low poly room.obj");
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const materialName = child.material?.name || "";
        const color = materialColors[materialName] || "#cccccc";
        child.material = new THREE.MeshStandardMaterial({
          color: color,
          roughness: 0.7,
          metalness: 0.1,
        });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [obj]);

  return (
    <primitive 
      ref={groupRef}
      object={obj} 
      scale={0.6} 
      position={[0, -3, 0]} 
      rotation={[-Math.PI / 2, 0, 0]}
    />
  );
}

function LightPipe({ intensity }: { intensity: number }) {
  return (
    <group position={[0, 2, 0]}>
      <mesh>
        <cylinderGeometry args={[0.8, 1, 1.2, 32]} />
        <meshStandardMaterial color="#e5e7eb" metalness={0.9} roughness={0.1} />
      </mesh>
      <pointLight 
        position={[0, -1, 0]} 
        intensity={intensity * 10} 
        color="#fef08a" 
        distance={15}
        castShadow
      />
      {intensity > 0.3 && (
        <mesh position={[0, -2, 0]}>
          <coneGeometry args={[3, 3, 32, 1, true]} />
          <meshBasicMaterial 
            color="#fef08a" 
            transparent 
            opacity={intensity * 0.3} 
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

function Scene({ isDay, lightIntensity }: { isDay: boolean; lightIntensity: number }) {
  return (
    <>
      <ambientLight intensity={isDay ? 0.6 : 0.2} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={isDay ? lightIntensity * 1.5 : 0.3} 
        color={isDay ? "#fef08a" : "#94a3b8"}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <hemisphereLight intensity={0.3} color="#87ceeb" groundColor="#f5f5dc" />
      
      <Suspense fallback={
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
      }>
        <RoomModel />
        <LightPipe intensity={isDay ? lightIntensity : 0} />
      </Suspense>
      
      <ContactShadows position={[0, -3, 0]} opacity={0.5} scale={30} blur={2} />
      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        minDistance={8} 
        maxDistance={25}
        autoRotate
        autoRotateSpeed={0.3}
        target={[0, 0, 0]}
      />
    </>
  );
}

export default function SandboxPage() {
  const [animatedValues, setAnimatedValues] = useState({ energy: 0, cost: 0, co2: 0 });
  const [sunPosition, setSunPosition] = useState(30);

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
      setSunPosition(p => (p + 0.5) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const isDay = sunPosition > 15 && sunPosition < 85;
  const lightIntensity = isDay ? Math.sin((sunPosition / 100) * Math.PI) : 0;

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
          {/* 3D Room */}
          <div className="bg-white rounded-3xl p-4 shadow-xl border border-gray-100">
            <h2 className="text-lg font-bold text-gray-700 mb-2">🏠 3D Room Model</h2>
            
            {/* Sun Slider */}
            <div className="flex items-center gap-3 mb-2 px-2">
              <span className="text-xl">🌅</span>
              <div className="flex-1 h-3 bg-gradient-to-r from-orange-200 via-yellow-200 to-orange-200 rounded-full relative">
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-yellow-400 rounded-full shadow-lg border-2 border-yellow-500 flex items-center justify-center text-sm transition-all"
                  style={{ left: `calc(${sunPosition}% - 12px)` }}
                >☀️</div>
              </div>
              <span className="text-xl">🌙</span>
            </div>

            {/* 3D Canvas - ใหญ่ขึ้น */}
            <div className="h-96 rounded-2xl overflow-hidden bg-gradient-to-b from-sky-300 to-sky-100">
              <Canvas camera={{ position: [12, 10, 12], fov: 45 }} shadows>
                <Scene isDay={isDay} lightIntensity={lightIntensity} />
              </Canvas>
            </div>
            
            {/* Status */}
            <div className="flex justify-between mt-3 text-sm">
              <div className={`px-3 py-1.5 rounded-full font-medium ${isDay ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-200 text-slate-600'}`}>
                <Sun className="w-4 h-4 inline mr-1" />
                Light Pipe: {(lightIntensity * 100).toFixed(0)}%
              </div>
              <div className={`px-3 py-1.5 rounded-full font-medium ${lightIntensity < 0.5 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>
                💡 LED: {lightIntensity < 0.5 ? "ON" : "OFF"}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <h2 className="text-lg font-bold text-gray-700 mb-4">📊 เปรียบเทียบระบบ</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
                  <div className="text-red-500 font-bold text-sm mb-3">❌ ระบบเดิม</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">หลอดไฟ</span><span className="font-bold">{OLD_POWER}W</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">ไฟฟ้า/ปี</span><span className="font-bold text-red-500">{OLD_ENERGY_KWH.toFixed(0)} kWh</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">ค่าไฟ/ปี</span><span className="font-bold text-red-500">฿{(OLD_ENERGY_KWH * ELEC_RATE).toFixed(0)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">CO₂/ปี</span><span className="font-bold text-red-500">{OLD_CO2.toFixed(1)} kg</span></div>
                  </div>
                </div>
                
                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                  <div className="text-emerald-500 font-bold text-sm mb-3">✅ LumiGreen</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">Light Pipe</span><span className="font-bold text-emerald-600">+60%</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">ไฟฟ้า/ปี</span><span className="font-bold text-emerald-500">{NEW_ENERGY_KWH.toFixed(0)} kWh</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">ค่าไฟ/ปี</span><span className="font-bold text-emerald-500">฿{(NEW_ENERGY_KWH * ELEC_RATE).toFixed(0)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">CO₂/ปี</span><span className="font-bold text-emerald-500">{NEW_CO2.toFixed(1)} kg</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 text-white shadow-lg">
                <Zap className="w-6 h-6 mb-2 opacity-80" />
                <div className="text-3xl font-bold">{animatedValues.energy.toFixed(0)}</div>
                <div className="text-white/70 text-xs">kWh/ปี ประหยัด</div>
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
