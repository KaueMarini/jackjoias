import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Heart, Share2, Minus, Plus, ShoppingBag, Check, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";

import heroRing from "@/assets/hero-ring.jpg";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (!error && data) {
        // Get image URL - handle both external URLs and fallback
        const imageUrl = data.image_url && (data.image_url.startsWith('http://') || data.image_url.startsWith('https://'))
          ? data.image_url
          : heroRing;
        
        setProduct({
          ...data,
          images: [imageUrl],
          details: data.description ? [data.description] : ["Peça exclusiva em ouro 18k", "Acabamento artesanal", "Certificado de autenticidade incluso"],
          tag: null
        });
      }
      setIsLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl text-foreground mb-4">Produto não encontrado</h1>
          <Link to="/" className="text-primary hover:underline">
            Voltar para a loja
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes?.length > 0) {
      toast({
        title: "Selecione um tamanho",
        description: "Por favor, escolha um tamanho antes de adicionar ao carrinho.",
        variant: "destructive",
      });
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize || undefined,
      image_url: product.images?.[0]
    });

    toast({
      title: "Adicionado ao carrinho",
      description: `${product.name}${selectedSize ? ` (${selectedSize})` : ''} foi adicionado ao seu carrinho.`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar para a loja
            </Link>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-square overflow-hidden bg-cream rounded-sm"
              >
                {product.tag && (
                  <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-sans tracking-wider uppercase px-3 py-1 z-10">
                    {product.tag}
                  </span>
                )}
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = heroRing;
                  }}
                />
              </motion.div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 h-20 overflow-hidden rounded-sm transition-all duration-300 ${
                        selectedImage === index 
                          ? "ring-2 ring-primary ring-offset-2" 
                          : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - imagem ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:py-4">
              <div className="mb-6">
                <span className="text-sm font-sans tracking-wider text-primary uppercase">
                  {product.category}
                </span>
                <h1 className="font-serif text-3xl md:text-4xl text-foreground mt-2 mb-4">
                  {product.name}
                </h1>
                <p className="font-serif text-2xl text-primary">
                  {formatPrice(product.price)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  ou 12x de {formatPrice(product.price / 12)} sem juros
                </p>
              </div>

              <div className="w-16 h-px bg-primary mb-6" />

              <p className="font-sans text-muted-foreground leading-relaxed mb-8">
                {product.description || "Peça exclusiva da coleção Jake Joias, produzida artesanalmente com materiais de alta qualidade."}
              </p>

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-sans text-sm font-medium text-foreground">
                      Tamanho
                    </span>
                    <button className="text-xs text-primary hover:underline">
                      Guia de tamanhos
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[48px] h-10 px-4 font-sans text-sm border rounded-sm transition-all duration-300 ${
                          selectedSize === size
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-transparent text-foreground border-border hover:border-primary"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <span className="font-sans text-sm font-medium text-foreground block mb-3">
                  Quantidade
                </span>
                <div className="inline-flex items-center border border-border rounded-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-sans text-foreground">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-8">
                <Button 
                  variant="gold" 
                  size="xl" 
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Adicionar ao Carrinho
                </Button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-14 h-14 flex items-center justify-center border rounded-sm transition-all duration-300 ${
                    isWishlisted 
                      ? "bg-primary/10 border-primary text-primary" 
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-primary" : ""}`} />
                </button>
                <button className="w-14 h-14 flex items-center justify-center border border-border rounded-sm text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Benefits */}
              <div className="space-y-3 py-6 border-t border-border">
                <div className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="font-sans text-muted-foreground">Em estoque - envio imediato</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="w-4 h-4 text-primary" />
                  <span className="font-sans text-muted-foreground">Frete grátis para compras acima de R$ 500</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="font-sans text-muted-foreground">Garantia vitalícia contra defeitos</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RotateCcw className="w-4 h-4 text-primary" />
                  <span className="font-sans text-muted-foreground">30 dias para troca ou devolução</span>
                </div>
              </div>

              {/* Details */}
              <div className="py-6 border-t border-border">
                <h3 className="font-serif text-lg text-foreground mb-4">Detalhes do Produto</h3>
                <ul className="space-y-2">
                  {product.details.map((detail: string, index: number) => (
                    <li key={index} className="font-sans text-sm text-muted-foreground">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default ProductDetail;