import { motion } from "framer-motion";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif text-2xl mb-4">
              <span className="text-primary">JAKE</span> JOIAS
            </h3>
            <p className="font-sans text-sm text-background/70 leading-relaxed mb-6">
              Joalheria artesanal de luxo, especializada em peças exclusivas em ouro 18k desde 1998.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-background/70 hover:text-primary transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-primary transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Collections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-serif text-lg text-background mb-4">Coleções</h4>
            <ul className="space-y-3">
              {["Anéis", "Colares", "Pulseiras", "Brincos", "Alianças"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-sans text-sm text-background/70 hover:text-primary transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Help */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-serif text-lg text-background mb-4">Ajuda</h4>
            <ul className="space-y-3">
              {["Guia de Tamanhos", "Cuidados com Joias", "Política de Troca", "FAQ", "Rastrear Pedido"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-sans text-sm text-background/70 hover:text-primary transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-serif text-lg text-background mb-4">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="font-sans text-sm text-background/70">(11) 3456-7890</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="font-sans text-sm text-background/70">contato@jakejoias.com.br</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="font-sans text-sm text-background/70">
                  Rua Oscar Freire, 1234<br />
                  Jardins, São Paulo - SP
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-sans text-xs text-background/50">
              © 2025 Jake Joias. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-sans text-xs text-background/50 hover:text-primary transition-colors duration-300">
                Política de Privacidade
              </a>
              <a href="#" className="font-sans text-xs text-background/50 hover:text-primary transition-colors duration-300">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
