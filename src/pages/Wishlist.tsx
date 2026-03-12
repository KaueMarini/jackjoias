import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface WishlistProduct {
  wishlist_item_id: string;
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  category: string | null;
}

export default function Wishlist() {
  const { user } = useAuth();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [items, setItems] = useState<WishlistProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWishlist = async () => {
    if (!user) { setIsLoading(false); return; }

    const { data: wishlist } = await supabase
      .from('wishlists')
      .select('id')
      .eq('cliente_id', user.id)
      .maybeSingle();

    if (!wishlist) { setIsLoading(false); return; }

    const { data: wishlistItems } = await supabase
      .from('wishlist_items')
      .select('id, produto_id')
      .eq('wishlist_id', wishlist.id);

    if (!wishlistItems?.length) { setItems([]); setIsLoading(false); return; }

    const productIds = wishlistItems.map(i => i.produto_id);
    const { data: products } = await supabase
      .from('products')
      .select('id, name, price, image_url, category')
      .in('id', productIds);

    const merged = wishlistItems.map(wi => {
      const p = products?.find(p => p.id === wi.produto_id);
      return p ? { wishlist_item_id: wi.id, ...p } : null;
    }).filter(Boolean) as WishlistProduct[];

    setItems(merged);
    setIsLoading(false);
  };

  useEffect(() => { fetchWishlist(); }, [user]);

  const removeItem = async (wishlistItemId: string) => {
    const { error } = await supabase.from('wishlist_items').delete().eq('id', wishlistItemId);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      setItems(prev => prev.filter(i => i.wishlist_item_id !== wishlistItemId));
      toast({ title: "Removido da lista de desejos" });
    }
  };

  const addToCart = (product: WishlistProduct) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url || "/placeholder.svg",
      quantity: 1,
    });
    toast({ title: "Adicionado ao carrinho!" });
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center py-32">
          <Heart className="w-16 h-16 text-muted-foreground/30 mb-4" />
          <h2 className="font-serif text-2xl mb-2">Lista de Desejos</h2>
          <p className="text-muted-foreground mb-6">Faça login para ver sua lista de desejos</p>
          <Link to="/auth">
            <Button className="btn-gold">Entrar</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-serif text-3xl">Lista de Desejos</h1>
            <p className="text-muted-foreground text-sm mt-1">{items.length} {items.length === 1 ? 'item' : 'itens'}</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Sua lista de desejos está vazia</p>
            <Link to="/" className="inline-block mt-4">
              <Button variant="outline">Explorar produtos</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item, index) => (
              <motion.div
                key={item.wishlist_item_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-sm border border-border overflow-hidden group"
              >
                <Link to={`/produto/${item.id}`} className="block aspect-square overflow-hidden">
                  <img
                    src={item.image_url || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.category || "Joia"}</p>
                  <h3 className="font-serif text-lg mt-1">{item.name}</h3>
                  <p className="text-primary font-medium mt-1">{formatCurrency(item.price)}</p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="btn-gold flex-1" onClick={() => addToCart(item)}>
                      <ShoppingCart className="w-4 h-4 mr-1" /> Carrinho
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => removeItem(item.wishlist_item_id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
