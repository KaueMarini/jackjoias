import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Success() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId;

  useEffect(() => {
    if (!orderId) {
      navigate('/');
    }
  }, [orderId, navigate]);

  if (!orderId) return null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-green-600" />
        </motion.div>

        <h1 className="font-serif text-3xl mb-4">Pedido Confirmado!</h1>
        
        <p className="text-muted-foreground mb-2">
          Obrigado pela sua compra. Seu pedido foi recebido com sucesso.
        </p>
        
        <div className="bg-muted/50 rounded-sm p-4 mb-8">
          <p className="text-sm text-muted-foreground mb-1">Número do pedido</p>
          <p className="font-mono text-lg font-medium">#{orderId.slice(0, 8)}</p>
        </div>

        <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground mb-8">
          <Package className="w-4 h-4" />
          <span>Você receberá atualizações por email</span>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={() => navigate('/')}
            className="w-full btn-gold"
          >
            Continuar Comprando
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="mt-8">
          <a 
            href="/" 
            className="font-serif text-xl tracking-wider"
          >
            <span className="text-primary">JACK</span> JOIAS
          </a>
        </div>
      </motion.div>
    </div>
  );
}
