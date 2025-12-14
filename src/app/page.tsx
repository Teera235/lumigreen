import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import InnovationSection from "@/components/InnovationSection";
import WorkflowSection from "@/components/WorkflowSection";
import VideoSection from "@/components/VideoSection";
import LiveDashboard from "@/components/LiveDashboard";
import ProductShowcase from "@/components/ProductShowcase";
import ImpactSection from "@/components/ImpactSection";
import ROICalculator from "@/components/ROICalculator";
import Footer from "@/components/Footer";
import InstallPWA from "@/components/InstallPWA";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <InnovationSection />
      <WorkflowSection />
      <VideoSection />
      <LiveDashboard />
      <ProductShowcase />
      <ImpactSection />
      <ROICalculator />
      <Footer />
      <InstallPWA />
    </main>
  );
}
