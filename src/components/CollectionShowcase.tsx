import { motion } from "framer-motion";
import productNecklace from "@/assets/product-necklace.jpg";
import productBracelet from "@/assets/product-bracelet.jpg";

const categories = [
  {
    id: 1,
    name: "Anéis",
    description: "Solitários, alianças e anéis de cocktail",
    itemCount: 48,
    image: productBracelet,
  },
  {
    id: 2,
    name: "Colares",
    description: "Correntes, pingentes e gargantilhas",
    itemCount: 36,
    image: productNecklace,
  },
];

export const CollectionShowcase = () => {
  return (
    <section id="rings" className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-sans tracking-[0.3em] text-primary uppercase">
            Explore
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mt-4 mb-6">
            Nossas Categorias
          </h2>
          <div className="w-16 h-px bg-primary mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative overflow-hidden cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent flex flex-col justify-end p-8">
                <motion.div
                  initial={{ y: 20 }}
                  whileHover={{ y: 0 }}
                  className="text-background"
                >
                  <span className="text-xs font-sans tracking-wider text-primary uppercase mb-2 block">
                    {category.itemCount} peças
                  </span>
                  <h3 className="font-serif text-3xl mb-2">{category.name}</h3>
                  <p className="font-sans text-sm text-background/70 mb-4">
                    {category.description}
                  </p>
                  <span className="inline-block font-sans text-sm tracking-wider uppercase border-b border-primary pb-1 text-primary group-hover:border-primary/80 transition-colors">
                    Ver Coleção
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
