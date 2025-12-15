import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroRing from "@/assets/hero-ring.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-fade pointer-events-none" />
      
      {/* Gold accent line */}
      <div className="absolute top-1/4 left-0 w-32 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-1/4 right-0 w-32 h-px bg-gradient-to-l from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="text-center lg:text-left order-2 lg:order-1 animate-fade-up">
          <span className="inline-block text-sm font-sans tracking-[0.3em] text-primary uppercase mb-4">
            Coleção 2025
          </span>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-foreground mb-6">
            Elegância
            <br />
            <span className="text-primary italic">Atemporal</span>
          </h1>

          <div className="w-16 h-px bg-primary mx-auto lg:mx-0 mb-6" />

          <p className="font-sans text-muted-foreground text-lg md:text-xl max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed">
            Joias exclusivas em ouro 18k, criadas para eternizar seus momentos mais preciosos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button variant="gold" size="xl">
              Explorar Coleção
            </Button>
            <Button variant="outline-gold" size="xl">
              Sob Encomenda
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative order-1 lg:order-2 animate-fade-in">
          <div className="relative mx-auto w-full max-w-lg">
            {/* Decorative frame */}
            <div className="absolute -inset-4 border border-primary/20 rounded-sm" />
            <div className="absolute -inset-8 border border-primary/10 rounded-sm" />
            
            {/* Image container */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-square overflow-hidden rounded-sm shadow-elevated"
            >
              <img
                src={heroRing}
                alt="Anel de ouro com diamante - Coleção exclusiva Jack Joias"
                className="w-full h-full object-cover"
              />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 shimmer opacity-30" />
            </motion.div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-background border border-primary/20 px-6 py-3 shadow-soft">
              <span className="font-serif text-primary text-lg">18k</span>
              <span className="block text-xs text-muted-foreground tracking-wider">Ouro Puro</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in">
        <span className="text-xs font-sans tracking-widest text-muted-foreground uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-primary to-transparent"
        />
      </div>
    </section>
  );
};
