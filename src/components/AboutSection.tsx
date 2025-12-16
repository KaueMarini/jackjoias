import { motion } from "framer-motion";
import aboutImage from "@/assets/about-image.jpg";

export const AboutSection = () => {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-32 h-32 border border-primary/20" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-primary/20" />
              
              <div className="relative overflow-hidden">
                <img
                  src={aboutImage}
                  alt="Modelo usando joias Jake Joias"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Experience badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-8 -right-8 lg:right-8 bg-primary text-primary-foreground p-6 text-center"
            >
              <span className="font-serif text-4xl block">27</span>
              <span className="text-xs tracking-wider uppercase">Anos de<br />Tradição</span>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-sm font-sans tracking-[0.3em] text-primary uppercase">
              Nossa História
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mt-4 mb-6">
              Tradição em Cada
              <br />
              <span className="text-primary italic">Detalhe</span>
            </h2>
            <div className="w-16 h-px bg-primary mb-8" />

            <p className="font-sans text-muted-foreground leading-relaxed mb-6">
              Desde 1998, a Jake Joias tem sido sinônimo de excelência em joalheria artesanal. 
              Nossa paixão pelo ofício nasceu de uma tradição familiar que valoriza cada detalhe, 
              cada curva e cada brilho.
            </p>

            <p className="font-sans text-muted-foreground leading-relaxed mb-8">
              Trabalhamos exclusivamente com ouro 18k e pedras preciosas selecionadas, 
              garantindo que cada peça seja uma obra de arte única. Nossos artesãos 
              combinam técnicas tradicionais com design contemporâneo para criar joias 
              que transcendem o tempo.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              <div className="text-center">
                <span className="font-serif text-2xl text-primary block">2.500+</span>
                <span className="text-xs font-sans text-muted-foreground tracking-wider uppercase">
                  Peças Criadas
                </span>
              </div>
              <div className="text-center">
                <span className="font-serif text-2xl text-primary block">100%</span>
                <span className="text-xs font-sans text-muted-foreground tracking-wider uppercase">
                  Artesanal
                </span>
              </div>
              <div className="text-center">
                <span className="font-serif text-2xl text-primary block">18k</span>
                <span className="text-xs font-sans text-muted-foreground tracking-wider uppercase">
                  Ouro Puro
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
