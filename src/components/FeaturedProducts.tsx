import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import productNecklace from "@/assets/product-necklace.jpg";
import productBracelet from "@/assets/product-bracelet.jpg";
import productEarrings from "@/assets/product-earrings.jpg";
import heroRing from "@/assets/hero-ring.jpg";

const products = [
  {
    id: 1,
    name: "Anel Solitário Eterno",
    category: "Anéis",
    price: "R$ 4.890",
    image: heroRing,
    tag: "Bestseller",
  },
  {
    id: 2,
    name: "Colar Mandala Sol",
    category: "Colares",
    price: "R$ 3.290",
    image: productNecklace,
    tag: null,
  },
  {
    id: 3,
    name: "Bracelete Geométrico",
    category: "Pulseiras",
    price: "R$ 2.890",
    image: productBracelet,
    tag: "Novo",
  },
  {
    id: 4,
    name: "Argolas Clássicas",
    category: "Brincos",
    price: "R$ 1.990",
    image: productEarrings,
    tag: null,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export const FeaturedProducts = () => {
  return (
    <section id="collections" className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-sans tracking-[0.3em] text-primary uppercase">
            Destaques
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mt-4 mb-6">
            Peças Exclusivas
          </h2>
          <div className="w-16 h-px bg-primary mx-auto" />
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((product) => (
            <motion.article
              key={product.id}
              variants={itemVariants}
              className="group"
            >
              <Link to={`/produto/${product.id}`} className="block">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-background mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Tag */}
                  {product.tag && (
                    <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-sans tracking-wider uppercase px-3 py-1">
                      {product.tag}
                    </span>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
                  
                  {/* Quick view button */}
                  <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur-sm text-foreground text-sm font-sans tracking-wider uppercase py-3 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    Ver Detalhes
                  </div>
                </div>

                {/* Product Info */}
                <div className="text-center">
                  <span className="text-xs font-sans tracking-wider text-muted-foreground uppercase">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-lg text-foreground mt-1 mb-2 group-hover:text-primary transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="font-sans text-sm text-foreground">
                    {product.price}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-12"
        >
          <button className="font-sans text-sm tracking-[0.2em] text-foreground uppercase border-b border-primary/30 pb-1 hover:border-primary transition-colors duration-300">
            Ver Toda Coleção
          </button>
        </motion.div>
      </div>
    </section>
  );
};
