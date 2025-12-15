import { motion } from "framer-motion";
import { CreditCard, Truck, Shield, RotateCcw } from "lucide-react";

const benefits = [
  {
    icon: CreditCard,
    title: "12x Sem Juros",
    description: "Parcele em até 12x no cartão",
  },
  {
    icon: Truck,
    title: "Frete Grátis",
    description: "Para compras acima de R$ 500",
  },
  {
    icon: Shield,
    title: "Compra Segura",
    description: "Site 100% protegido",
  },
  {
    icon: RotateCcw,
    title: "Troca Garantida",
    description: "30 dias para trocar",
  },
];

export const BenefitsBar = () => {
  return (
    <section className="py-8 bg-foreground">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-3 text-background"
            >
              <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center flex-shrink-0">
                <benefit.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-sans text-sm font-medium">{benefit.title}</p>
                <p className="font-sans text-xs text-background/60">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
