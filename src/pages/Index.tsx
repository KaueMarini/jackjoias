import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { BenefitsBar } from "@/components/BenefitsBar";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { AboutSection } from "@/components/AboutSection";
import { CollectionShowcase } from "@/components/CollectionShowcase";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ConsultantSection } from "@/components/ConsultantSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <BenefitsBar />
        <FeaturedProducts />
        <AboutSection />
        <CollectionShowcase />
        <FeaturesSection />
        <TestimonialsSection />
        <ConsultantSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
