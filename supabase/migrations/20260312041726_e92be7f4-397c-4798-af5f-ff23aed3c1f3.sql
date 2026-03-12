
-- Add phone column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone text;

-- Update handle_new_user to include phone
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'phone');
  RETURN NEW;
END;
$function$;

-- Create trigger if not exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create wishlists table
CREATE TABLE public.wishlists (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cliente_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(cliente_id)
);

ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own wishlist" ON public.wishlists
  FOR SELECT TO authenticated USING (auth.uid() = cliente_id);

CREATE POLICY "Users can create their own wishlist" ON public.wishlists
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = cliente_id);

CREATE POLICY "Users can delete their own wishlist" ON public.wishlists
  FOR DELETE TO authenticated USING (auth.uid() = cliente_id);

-- Create wishlist_items table
CREATE TABLE public.wishlist_items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wishlist_id uuid REFERENCES public.wishlists(id) ON DELETE CASCADE NOT NULL,
  produto_id uuid REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(wishlist_id, produto_id)
);

ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own wishlist items" ON public.wishlist_items
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.wishlists WHERE id = wishlist_items.wishlist_id AND cliente_id = auth.uid())
  );

CREATE POLICY "Users can add items to their wishlist" ON public.wishlist_items
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM public.wishlists WHERE id = wishlist_items.wishlist_id AND cliente_id = auth.uid())
  );

CREATE POLICY "Users can remove items from their wishlist" ON public.wishlist_items
  FOR DELETE TO authenticated USING (
    EXISTS (SELECT 1 FROM public.wishlists WHERE id = wishlist_items.wishlist_id AND cliente_id = auth.uid())
  );

-- Create gold_quotations table for admin
CREATE TABLE public.gold_quotations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tipo text NOT NULL,
  preco_grama numeric NOT NULL,
  data_cotacao date NOT NULL DEFAULT CURRENT_DATE,
  observacao text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.gold_quotations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view gold quotations" ON public.gold_quotations
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert gold quotations" ON public.gold_quotations
  FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update gold quotations" ON public.gold_quotations
  FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete gold quotations" ON public.gold_quotations
  FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
