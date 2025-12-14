"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show banner after 3 seconds
      setTimeout(() => setShowInstallBanner(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Check if installed via app installed event
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setShowInstallBanner(false);
      setDeferredPrompt(null);
    });

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  if (isInstalled || !showInstallBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-50"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
      >
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/10">
          <button
            onClick={() => setShowInstallBanner(false)}
            className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold text-sm">ติดตั้ง LumiGreen App</h3>
              <p className="text-gray-400 text-xs mt-0.5">
                เข้าถึงได้เร็วขึ้น ใช้งานแบบ Offline
              </p>
            </div>
          </div>

          <motion.button
            onClick={handleInstall}
            className="w-full mt-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-4 h-4" />
            ติดตั้งเลย
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
