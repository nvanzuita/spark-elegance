import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Novidades from "@/components/Novidades";
import Services from "@/components/Services";
import Mentorias from "@/components/Mentorias";
import About from "@/components/About";
import Booking from "@/components/Booking";
import Location from "@/components/Location";
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
      <Novidades />
      <Services />
      <Mentorias />
      <About />
      <Booking />
      <Location />
      <Reviews />
      <FAQ />
      <FloatingBadge />
      <Footer />
    </div>
  );
};

export default Index;
