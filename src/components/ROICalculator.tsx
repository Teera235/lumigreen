"use client";
import { useState, useMemo } from "react";
import { Calculator, Lightbulb, Clock, Zap, Leaf, DollarSign, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn } from "./animations/MotionWrapper";

export default function ROICalculator() {
  const [numLights, setNumLights] = useState(30);
  const [wattage, setWattage] = useState(12);
  const [hoursPerDay, setHoursPerDay] = useState(12);
  const [electricityRate, setElectricityRate] = useState(4.5);

  const calculations = useMemo(() => {
    const workingDays = 260;
    const energyConsumption = (wattage * hoursPerDay * numLights * workingDays) / 1000;
    const yearlySavings = energyConsumption * electricityRate;
    const co2Reduction = energyConsumption * 0.4857;
    const investmentCost = 11000;
    const paybackYears = investmentCost / yearlySavings;
    const roi = ((yearlySavings * 5 - investmentCost) / investmentCost) * 100;

    return {
      energyConsumption: energyConsumption.toFixed(2),
      yearlySavings: yearlySavings.toFixed(2),
      co2Reduction: co2Reduction.toFixed(2),
      paybackYears: paybackYears.toFixed(2),
      roi: roi.toFixed(2),
    };
  }, [numLights, wattage, hoursPerDay, electricityRate]);

  const sliderInputs = [
    { icon: Lightbulb, label: "จำนวนหลอดไฟ", value: numLights, setValue: setNumLights, min: 1, max: 100, step: 1, unit: "หลอด", minLabel: "1", maxLabel: "100" },
    { icon: Zap, label: "กำลังไฟต่อหลอด", value: wattage, setValue: setWattage, min: 5, max: 50, step: 1, unit: "W", minLabel: "5W", maxLabel: "50W" },
    { icon: Clock, label: "ชั่วโมงใช้งาน/วัน", value: hoursPerDay, setValue: setHoursPerDay, min: 1, max: 24, step: 1, unit: "ชม.", minLabel: "1", maxLabel: "24" },
    { icon: DollarSign, label: "ค่าไฟต่อหน่วย", value: electricityRate, setValue: setElectricityRate, min: 2, max: 8, step: 0.1, unit: "บาท", minLabel: "2", maxLabel: "8", isDecimal: true },
  ];

  return (
    <section id="calculator" className="py-12 sm:py-20 bg-gray-900 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-8 sm:mb-12">
            <motion.div
              className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4 text-sm sm:text-base"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium">ROI Calculator</span>
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">คำนวณความคุ้มค่า</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-2">
              กรอกข้อมูลการใช้ไฟฟ้าปัจจุบัน เพื่อดูว่า LumiGreen จะช่วยประหยัดได้เท่าไหร่ (คำนวณจาก 260 วันทำงาน/ปี)
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <motion.div
            className="bg-gray-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl"
            whileHover={{ boxShadow: "0 0 60px rgba(16, 185, 129, 0.15)" }}
          >
            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {sliderInputs.map((input, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <label className="flex items-center gap-2 text-white font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                    <input.icon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                    {input.label}
                  </label>
                  <input
                    type="range"
                    min={input.min}
                    max={input.max}
                    step={input.step}
                    value={input.value}
                    onChange={(e) => input.setValue(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-500 text-xs sm:text-sm">{input.minLabel}</span>
                    <motion.span
                      className="text-emerald-400 font-bold text-sm sm:text-base"
                      key={input.value}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                    >
                      {input.isDecimal ? input.value.toFixed(1) : input.value} {input.unit}
                    </motion.span>
                    <span className="text-gray-500 text-xs sm:text-sm">{input.maxLabel}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Results */}
            <div className="border-t border-gray-700 pt-6 sm:pt-8">
              <h3 className="text-white font-semibold text-base sm:text-lg mb-4 sm:mb-6 text-center">ผลการคำนวณ</h3>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <motion.div
                  className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-3 sm:p-4 text-center"
                  whileHover={{ scale: 1.03 }}
                >
                  <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-200 mx-auto mb-1 sm:mb-2" />
                  <motion.div
                    className="text-lg sm:text-2xl font-bold text-white"
                    key={calculations.yearlySavings}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                  >
                    {Number(calculations.yearlySavings).toLocaleString()}
                  </motion.div>
                  <div className="text-emerald-200 text-xs sm:text-sm">บาท/ปี</div>
                  <div className="text-emerald-300 text-[10px] sm:text-xs mt-0.5 sm:mt-1">ประหยัดค่าไฟ</div>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-3 sm:p-4 text-center"
                  whileHover={{ scale: 1.03 }}
                >
                  <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-green-200 mx-auto mb-1 sm:mb-2" />
                  <motion.div
                    className="text-lg sm:text-2xl font-bold text-white"
                    key={calculations.co2Reduction}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                  >
                    {Number(calculations.co2Reduction).toLocaleString()}
                  </motion.div>
                  <div className="text-green-200 text-xs sm:text-sm">kg CO₂/ปี</div>
                  <div className="text-green-300 text-[10px] sm:text-xs mt-0.5 sm:mt-1">ลดคาร์บอน</div>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-3 sm:p-4 text-center"
                  whileHover={{ scale: 1.03 }}
                >
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-blue-200 mx-auto mb-1 sm:mb-2" />
                  <motion.div
                    className="text-lg sm:text-2xl font-bold text-white"
                    key={calculations.paybackYears}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                  >
                    {calculations.paybackYears}
                  </motion.div>
                  <div className="text-blue-200 text-xs sm:text-sm">ปี</div>
                  <div className="text-blue-300 text-[10px] sm:text-xs mt-0.5 sm:mt-1">ระยะคืนทุน</div>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-3 sm:p-4 text-center"
                  whileHover={{ scale: 1.03 }}
                >
                  <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-amber-200 mx-auto mb-1 sm:mb-2" />
                  <motion.div
                    className="text-lg sm:text-2xl font-bold text-white"
                    key={calculations.roi}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                  >
                    {Number(calculations.roi).toLocaleString()}%
                  </motion.div>
                  <div className="text-amber-200 text-xs sm:text-sm">ROI (5 ปี)</div>
                  <div className="text-amber-300 text-[10px] sm:text-xs mt-0.5 sm:mt-1">ผลตอบแทน</div>
                </motion.div>
              </div>

              <div className="bg-gray-700/50 rounded-xl p-3 sm:p-4 text-center">
                <p className="text-gray-400 text-xs sm:text-sm">
                  <span className="block sm:inline">พลังงานที่ประหยัดได้: <span className="text-white font-semibold">{calculations.energyConsumption} kWh/ปี</span></span>
                  <span className="hidden sm:inline mx-2">|</span>
                  <span className="block sm:inline mt-1 sm:mt-0">ต้นทุน LumiGreen: <span className="text-emerald-400 font-semibold">11,000 บาท</span></span>
                </p>
                <p className="text-gray-500 text-[10px] sm:text-xs mt-2">
                  * CO₂ emission factor: 0.4857 kg/kWh (ค่าเฉลี่ยประเทศไทย)
                </p>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
