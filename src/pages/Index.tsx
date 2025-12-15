import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { BenefitsBar } from "@/components/BenefitsBar";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { AboutSection } from "@/components/AboutSection";
import { CollectionShowcase } from "@/components/CollectionShowcase";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { ChatWidget } from "@/components/ChatWidget";
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
        <NewsletterSection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
