import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 border border-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 border border-primary/10 rounded-full translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="text-sm font-sans tracking-[0.3em] text-primary uppercase">
            Newsletter
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mt-4 mb-6">
            Receba Novidades
            <br />
            <span className="text-primary italic">Exclusivas</span>
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mb-6" />

          <p className="font-sans text-muted-foreground leading-relaxed mb-8">
            Cadastre-se para receber em primeira mão nossas novas coleções, 
            ofertas especiais e convites para eventos exclusivos.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail"
              required
              className="flex-1 bg-background border border-border/50 rounded-sm px-6 py-4 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
            <Button type="submit" variant="gold" size="xl" className="whitespace-nowrap">
              Inscrever-se
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <p className="text-xs font-sans text-muted-foreground mt-4">
            Ao se inscrever, você concorda com nossa política de privacidade.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
