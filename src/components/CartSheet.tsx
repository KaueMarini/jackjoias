import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

export const CartSheet = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-serif flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Seu Carrinho ({totalItems})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg font-serif">Seu carrinho está vazio</p>
              <p className="text-sm mt-2">Explore nossas coleções exclusivas</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div 
                  key={`${item.id}-${item.size}`} 
                  className="flex gap-4 p-4 bg-secondary/50 rounded-sm"
                >
                  {item.image_url && (
                    <div className="w-20 h-20 bg-muted rounded-sm overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image_url} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-medium truncate">{item.name}</h4>
                    {item.size && (
                      <p className="text-xs text-muted-foreground mt-0.5">Tamanho: {item.size}</p>
                    )}
                    <p className="text-sm font-medium text-primary mt-1">{formatPrice(item.price)}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                          className="w-7 h-7 flex items-center justify-center border border-border rounded-sm hover:bg-muted transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                          className="w-7 h-7 flex items-center justify-center border border-border rounded-sm hover:bg-muted transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-t border-border pt-4 flex-col gap-4">
            <div className="flex justify-between items-center w-full">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-xl font-serif font-medium">{formatPrice(totalPrice)}</span>
            </div>
            <Button 
              onClick={handleCheckout}
              className="w-full btn-gold"
            >
              Finalizar Compra
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
