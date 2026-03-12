import { useEffect, useState } from "react";
import { Package, ShoppingCart, DollarSign, TrendingUp, Users, Coins } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    totalCustomers: 0,
    latestGoldPrice: null as number | null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [productsRes, ordersRes, profilesRes, goldRes] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact' }),
        supabase.from('orders').select('id, total, status'),
        supabase.from('profiles').select('id', { count: 'exact' }),
        supabase.from('gold_quotations').select('preco_grama, tipo').order('data_cotacao', { ascending: false }).limit(1),
      ]);

      const orders = ordersRes.data || [];
      const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total), 0);
      const pendingOrders = orders.filter(o => o.status === 'pending').length;

      setStats({
        totalProducts: productsRes.count || 0,
        totalOrders: orders.length,
        totalRevenue,
        pendingOrders,
        totalCustomers: profilesRes.count || 0,
        latestGoldPrice: goldRes.data?.[0]?.preco_grama ?? null,
      });
    };

    fetchStats();
  }, []);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const statCards = [
    { label: "Total Produtos", value: stats.totalProducts, icon: Package, color: "text-primary" },
    { label: "Total Pedidos", value: stats.totalOrders, icon: ShoppingCart, color: "text-blue-500" },
    { label: "Receita Total", value: formatCurrency(stats.totalRevenue), icon: DollarSign, color: "text-green-500" },
    { label: "Pedidos Pendentes", value: stats.pendingOrders, icon: TrendingUp, color: "text-orange-500" },
    { label: "Total Clientes", value: stats.totalCustomers, icon: Users, color: "text-violet-500" },
    { 
      label: "Ouro (última cotação)", 
      value: stats.latestGoldPrice ? `${formatCurrency(stats.latestGoldPrice)}/g` : "Sem cotação", 
      icon: Coins, 
      color: "text-primary" 
    },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-card p-6 rounded-sm shadow-luxury border border-border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground font-sans">{stat.label}</span>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-serif font-medium">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
