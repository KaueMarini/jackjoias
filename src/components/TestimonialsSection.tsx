import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Maria Fernanda",
    location: "São Paulo, SP",
    rating: 5,
    text: "O anel de noivado que compramos é simplesmente perfeito. O atendimento foi impecável e a qualidade superou todas as expectativas. Meu noivo ficou encantado!",
    product: "Anel Solitário Eterno",
  },
  {
    id: 2,
    name: "Carolina Santos",
    location: "Rio de Janeiro, RJ",
    rating: 5,
    text: "Comprei um colar para minha mãe como presente de aniversário. Ela chorou de emoção quando abriu. A embalagem é luxuosa e a peça é magnífica.",
    product: "Colar Mandala Sol",
  },
  {
    id: 3,
    name: "Juliana Oliveira",
    location: "Belo Horizonte, MG",
    rating: 5,
    text: "Segunda vez comprando na Jack Joias e não me decepciono. As peças são únicas e o acabamento é impecável. Viraram minhas joias preferidas!",
    product: "Argolas Clássicas",
  },
];

export const TestimonialsSection = () => {
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
            Depoimentos
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mt-4 mb-6">
            O Que Dizem Nossas Clientes
          </h2>
          <div className="w-16 h-px bg-primary mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-cream p-8 relative group"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-primary/20">
                <Quote className="w-10 h-10" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Text */}
              <p className="font-sans text-muted-foreground leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="border-t border-border/50 pt-4">
                <p className="font-serif text-foreground">{testimonial.name}</p>
                <p className="text-xs font-sans text-muted-foreground">{testimonial.location}</p>
                <p className="text-xs font-sans text-primary mt-1">{testimonial.product}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
