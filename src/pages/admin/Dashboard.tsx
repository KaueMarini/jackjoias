import { useEffect, useState } from "react";
import { Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [productsRes, ordersRes] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact' }),
        supabase.from('orders').select('id, total, status')
      ]);

      const orders = ordersRes.data || [];
      const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total), 0);
      const pendingOrders = orders.filter(o => o.status === 'pending').length;

      setStats({
        totalProducts: productsRes.count || 0,
        totalOrders: orders.length,
        totalRevenue,
        pendingOrders
      });
    };

    fetchStats();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const statCards = [
    { 
      label: "Total Produtos", 
      value: stats.totalProducts, 
      icon: Package, 
      color: "text-primary" 
    },
    { 
      label: "Total Pedidos", 
      value: stats.totalOrders, 
      icon: ShoppingCart, 
      color: "text-blue-500" 
    },
    { 
      label: "Receita Total", 
      value: formatCurrency(stats.totalRevenue), 
      icon: DollarSign, 
      color: "text-green-500" 
    },
    { 
      label: "Pedidos Pendentes", 
      value: stats.pendingOrders, 
      icon: TrendingUp, 
      color: "text-orange-500" 
    },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
