import { motion } from "framer-motion";
import { Gem, Truck, Shield, Award } from "lucide-react";

const features = [
  {
    icon: Gem,
    title: "Ouro 18k Certificado",
    description: "Todas as peças são confeccionadas com ouro 18k de alta pureza, com certificado de autenticidade.",
  },
  {
    icon: Award,
    title: "Design Exclusivo",
    description: "Cada joia é criada por designers especializados, unindo tradição e contemporaneidade.",
  },
  {
    icon: Shield,
    title: "Garantia Vitalícia",
    description: "Garantia contra defeitos de fabricação e assistência técnica especializada.",
  },
  {
    icon: Truck,
    title: "Entrega Segura",
    description: "Embalagem luxuosa e envio com rastreamento completo e seguro.",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-sans tracking-[0.3em] text-primary uppercase">
            Por que nos escolher
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mt-4 mb-6">
            Excelência em Cada Detalhe
          </h2>
          <div className="w-16 h-px bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-primary/20 mb-6 group-hover:border-primary/40 transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Decorative divider */}
        <div className="mt-24 divider-gold" />
      </div>
    </section>
  );
};
