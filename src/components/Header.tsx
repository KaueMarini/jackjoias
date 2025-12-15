import { motion } from "framer-motion";
import { ShoppingBag, Menu, X, Search, User } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { name: "Coleções", href: "#collections" },
  { name: "Anéis", href: "#rings" },
  { name: "Colares", href: "#necklaces" },
  { name: "Pulseiras", href: "#bracelets" },
  { name: "Brincos", href: "#earrings" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="/"
              className="font-serif text-2xl tracking-wider text-foreground"
            >
              <span className="text-primary">JACK</span> JOIAS
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden lg:flex items-center gap-8"
          >
            {navLinks.map((link, index) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-sm font-sans tracking-wide text-muted-foreground hover:text-primary transition-colors duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </motion.ul>

          {/* Icons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <button className="p-2 text-muted-foreground hover:text-primary transition-colors duration-300">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-muted-foreground hover:text-primary transition-colors duration-300 hidden sm:block">
              <User className="w-5 h-5" />
            </button>
            <button className="p-2 text-muted-foreground hover:text-primary transition-colors duration-300 relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-medium">
                0
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 pb-4 border-t border-border/50"
          >
            <ul className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-sm font-sans tracking-wide text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </nav>
    </header>
  );
};
