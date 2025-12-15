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
        <div className="text-center lg:text-left order-2 lg:order-1">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-block text-sm font-sans tracking-[0.3em] text-primary uppercase mb-4"
          >
            Coleção 2025
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-foreground mb-6"
          >
            Elegância
            <br />
            <span className="text-primary italic">Atemporal</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="w-16 h-px bg-primary mx-auto lg:mx-0 mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="font-sans text-muted-foreground text-lg md:text-xl max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed"
          >
            Joias exclusivas em ouro 18k, criadas para eternizar seus momentos mais preciosos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Button variant="gold" size="xl">
              Explorar Coleção
            </Button>
            <Button variant="outline-gold" size="xl">
              Sob Encomenda
            </Button>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative order-1 lg:order-2"
        >
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
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -bottom-4 -right-4 bg-background border border-primary/20 px-6 py-3 shadow-soft"
            >
              <span className="font-serif text-primary text-lg">18k</span>
              <span className="block text-xs text-muted-foreground tracking-wider">Ouro Puro</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-sans tracking-widest text-muted-foreground uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
};
