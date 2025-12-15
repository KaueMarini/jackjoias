import { motion } from "framer-motion";
import { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-24 right-6 w-80 sm:w-96 bg-background border border-border/50 shadow-elevated rounded-sm z-50 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-cream px-4 py-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-foreground">Consultor AURUM</h3>
                  <span className="text-xs text-muted-foreground">Assistente IA</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-80 p-4 overflow-y-auto">
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-cream rounded-sm p-3 max-w-[80%]">
                <p className="text-sm text-foreground font-sans leading-relaxed">
                  Olá! Sou seu consultor pessoal de joias. Como posso ajudá-la hoje?
                </p>
                <p className="text-sm text-foreground font-sans leading-relaxed mt-2">
                  Posso recomendar peças baseadas no seu estilo, esclarecer dúvidas sobre materiais ou auxiliar na escolha do presente perfeito.
                </p>
              </div>
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-2 mt-4">
              {["Ver anéis de noivado", "Presentes até R$ 2.000", "Tendências 2025"].map((suggestion) => (
                <button
                  key={suggestion}
                  className="text-xs font-sans text-primary border border-primary/30 rounded-full px-3 py-1.5 hover:bg-primary/5 transition-colors duration-300"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-cream border border-border/50 rounded-sm px-4 py-2 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button className="bg-primary text-primary-foreground p-2 rounded-sm hover:bg-primary-dark transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-gold rounded-full shadow-gold flex items-center justify-center z-50 group"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-primary-foreground" />
        ) : (
          <MessageCircle className="w-6 h-6 text-primary-foreground" />
        )}
        
        {/* Pulse effect */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
        )}
      </motion.button>
    </>
  );
};
