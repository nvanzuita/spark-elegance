import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Mentorias from "@/components/Mentorias";
import About from "@/components/About";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Services />
      <Mentorias />
      <About />
      <Booking />
      <Footer />
    </div>
  );
};

export default Index;
