import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Mentorias from "@/components/Mentorias";
import About from "@/components/About";
import Booking from "@/components/Booking";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingBadge from "@/components/FloatingBadge";
import Seo from "@/components/Seo";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo />
      <Navbar />
      <Hero />
      <Services />
      <Mentorias />
      <About />
      <Booking />
      <Reviews />
      <FAQ />
      <FloatingBadge />
      <Footer />
    </div>
  );
};

export default Index;
