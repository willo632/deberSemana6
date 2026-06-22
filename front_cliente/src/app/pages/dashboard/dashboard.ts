import { Component, signal } from '@angular/core';

interface KpiCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
  iconBg: string;
  iconClr: string;
}

interface Order {
  id: string;
  client: string;
  initial: string;
  product: string;
  amount: string;
  status: 'Completado' | 'Pendiente' | 'Cancelado' | 'En proceso';
  date: string;
}

interface TopProduct {
  name: string;
  sales: number;
  pct: number;
  revenue: string;
}

interface ChartBar {
  month: string;
  value: number;
  label: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  kpis = signal<KpiCard[]>([
    {
      title: 'Total Clientes',   value: '2,847', change: '+12.5%', trend: 'up',
      icon: 'bi-people-fill',    iconBg: '#eff6ff', iconClr: '#0d6efd',
    },
    {
      title: 'Ventas del Mes',   value: '$184,293', change: '+8.3%', trend: 'up',
      icon: 'bi-cart-fill',      iconBg: '#f0fdf4', iconClr: '#16a34a',
    },
    {
      title: 'Productos Activos', value: '1,204', change: '-2.1%', trend: 'down',
      icon: 'bi-box-seam-fill',  iconBg: '#fff7ed', iconClr: '#ea580c',
    },
    {
      title: 'Ingresos YTD',     value: '$1.2M',  change: '+24.7%', trend: 'up',
      icon: 'bi-graph-up-arrow', iconBg: '#faf5ff', iconClr: '#7c3aed',
    },
  ]);

  orders = signal<Order[]>([
    { id: '#ORD-8821', client: 'Empresa Acme S.A.',   initial: 'A', product: 'Licencia Enterprise',    amount: '$4,200', status: 'Completado', date: '18 Jun, 2026' },
    { id: '#ORD-8820', client: 'TechCorp Ltda.',       initial: 'T', product: 'Soporte Premium Anual', amount: '$1,800', status: 'En proceso', date: '18 Jun, 2026' },
    { id: '#ORD-8819', client: 'Global Trading S.L.',  initial: 'G', product: 'Módulo de Reportes',    amount: '$950',   status: 'Pendiente',  date: '17 Jun, 2026' },
    { id: '#ORD-8818', client: 'Innovatech S.A.S.',    initial: 'I', product: 'Setup & Onboarding',    amount: '$3,500', status: 'Completado', date: '17 Jun, 2026' },
    { id: '#ORD-8817', client: 'Distribuidora Norte',  initial: 'D', product: 'Plan Business x12',     amount: '$2,400', status: 'Cancelado',  date: '16 Jun, 2026' },
    { id: '#ORD-8816', client: 'StartupLab Inc.',      initial: 'S', product: 'Módulo CRM',            amount: '$780',   status: 'Completado', date: '16 Jun, 2026' },
    { id: '#ORD-8815', client: 'Corporación Sur',      initial: 'C', product: 'Consultoría 10h',       amount: '$1,200', status: 'En proceso', date: '15 Jun, 2026' },
  ]);

  topProducts = signal<TopProduct[]>([
    { name: 'Licencia Enterprise',    sales: 142, pct: 85, revenue: '$596K' },
    { name: 'Soporte Premium Anual',  sales: 98,  pct: 65, revenue: '$176K' },
    { name: 'Módulo CRM',             sales: 87,  pct: 58, revenue: '$68K'  },
    { name: 'Plan Business x12',      sales: 74,  pct: 49, revenue: '$178K' },
    { name: 'Setup & Onboarding',     sales: 61,  pct: 40, revenue: '$214K' },
  ]);

  chartBars = signal<ChartBar[]>([
    { month: 'Ene', value: 65,  label: '$64K'  },
    { month: 'Feb', value: 52,  label: '$52K'  },
    { month: 'Mar', value: 78,  label: '$78K'  },
    { month: 'Abr', value: 68,  label: '$68K'  },
    { month: 'May', value: 85,  label: '$85K'  },
    { month: 'Jun', value: 92,  label: '$92K'  },
    { month: 'Jul', value: 70,  label: '$70K'  },
    { month: 'Ago', value: 88,  label: '$88K'  },
    { month: 'Sep', value: 95,  label: '$95K'  },
    { month: 'Oct', value: 82,  label: '$82K'  },
    { month: 'Nov', value: 91,  label: '$91K'  },
    { month: 'Dic', value: 100, label: '$100K' },
  ]);

  statusCls(status: string): string {
    const map: Record<string, string> = {
      'Completado': 'badge-success',
      'Pendiente':  'badge-warning',
      'Cancelado':  'badge-danger',
      'En proceso': 'badge-info',
    };
    return map[status] ?? '';
  }
}
