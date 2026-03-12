import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface GoldQuotation {
  id: string;
  tipo: string;
  preco_grama: number;
  data_cotacao: string;
  observacao: string | null;
  created_at: string;
}

export default function GoldQuotations() {
  const [quotations, setQuotations] = useState<GoldQuotation[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editing, setEditing] = useState<GoldQuotation | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    tipo: "",
    preco_grama: "",
    data_cotacao: new Date().toISOString().split('T')[0],
    observacao: ""
  });

  const fetchQuotations = async () => {
    const { data, error } = await supabase
      .from('gold_quotations')
      .select('*')
      .order('data_cotacao', { ascending: false });

    if (error) {
      toast({ title: "Erro ao carregar cotações", description: error.message, variant: "destructive" });
    } else {
      setQuotations(data || []);
    }
  };

  useEffect(() => { fetchQuotations(); }, []);

  const resetForm = () => {
    setFormData({ tipo: "", preco_grama: "", data_cotacao: new Date().toISOString().split('T')[0], observacao: "" });
    setEditing(null);
  };

  const openDialog = (q?: GoldQuotation) => {
    if (q) {
      setEditing(q);
      setFormData({
        tipo: q.tipo,
        preco_grama: q.preco_grama.toString(),
        data_cotacao: q.data_cotacao,
        observacao: q.observacao || ""
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      tipo: formData.tipo.trim(),
      preco_grama: parseFloat(formData.preco_grama),
      data_cotacao: formData.data_cotacao,
      observacao: formData.observacao.trim() || null
    };

    try {
      if (editing) {
        const { error } = await supabase.from('gold_quotations').update(payload).eq('id', editing.id);
        if (error) throw error;
        toast({ title: "Cotação atualizada" });
      } else {
        const { error } = await supabase.from('gold_quotations').insert([payload]);
        if (error) throw error;
        toast({ title: "Cotação registrada" });
      }
      setIsDialogOpen(false);
      resetForm();
      fetchQuotations();
    } catch (error: any) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta cotação?")) return;
    const { error } = await supabase.from('gold_quotations').delete().eq('id', id);
    if (error) {
      toast({ title: "Erro ao excluir", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Cotação excluída" });
      fetchQuotations();
    }
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const formatDate = (date: string) =>
    new Date(date + 'T12:00:00').toLocaleDateString('pt-BR');

  const goldTypes = ["Ouro 18k", "Ouro 14k", "Ouro 10k", "Ouro 24k", "Ouro Branco 18k", "Ouro Rosé 18k"];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl">Cotação do Ouro</h1>
          <p className="text-muted-foreground text-sm mt-1">Gerencie os preços por grama</p>
        </div>
        <Button onClick={() => openDialog()} className="btn-gold">
          <Plus className="w-4 h-4 mr-2" />
          Nova Cotação
        </Button>
      </div>

      {/* Latest quotations cards */}
      {quotations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {quotations.slice(0, 6).map((q) => (
            <div key={q.id} className="bg-card p-5 rounded-sm border border-border shadow-luxury">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-muted-foreground font-sans">{q.tipo}</p>
                  <p className="text-2xl font-serif font-medium text-primary mt-1">
                    {formatCurrency(q.preco_grama)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">por grama • {formatDate(q.data_cotacao)}</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openDialog(q)}>
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-destructive" onClick={() => handleDelete(q.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
              {q.observacao && <p className="text-xs text-muted-foreground mt-3 italic">{q.observacao}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Full table */}
      <div className="bg-card rounded-sm border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Preço/grama</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Observação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Nenhuma cotação registrada
                </TableCell>
              </TableRow>
            ) : (
              quotations.map((q) => (
                <TableRow key={q.id}>
                  <TableCell className="font-medium">{q.tipo}</TableCell>
                  <TableCell className="text-primary font-medium">{formatCurrency(q.preco_grama)}</TableCell>
                  <TableCell>{formatDate(q.data_cotacao)}</TableCell>
                  <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate">
                    {q.observacao || "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openDialog(q)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(q.id)} className="hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">
              {editing ? "Editar Cotação" : "Nova Cotação"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Ouro *</Label>
              <select
                id="tipo"
                value={formData.tipo}
                onChange={(e) => setFormData(prev => ({ ...prev, tipo: e.target.value }))}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Selecione...</option>
                {goldTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preco">Preço por grama (R$) *</Label>
                <Input
                  id="preco"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.preco_grama}
                  onChange={(e) => setFormData(prev => ({ ...prev, preco_grama: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="data">Data *</Label>
                <Input
                  id="data"
                  type="date"
                  value={formData.data_cotacao}
                  onChange={(e) => setFormData(prev => ({ ...prev, data_cotacao: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="obs">Observação</Label>
              <Textarea
                id="obs"
                value={formData.observacao}
                onChange={(e) => setFormData(prev => ({ ...prev, observacao: e.target.value }))}
                rows={2}
                placeholder="Ex: Cotação de mercado B3"
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading} className="btn-gold">
                {isLoading ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
