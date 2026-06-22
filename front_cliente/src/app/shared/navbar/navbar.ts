import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavChild {
  label: string;
  icon: string;
  route: string;
  badge?: string;
}

interface NavItem {
  label: string;
  icon: string;
  route?: string;
  children?: NavChild[];
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  navItems = signal<NavItem[]>([
    { label: 'Inicio', icon: 'bi-house-door-fill', route: '/' },
    {
      label: 'Clientes', icon: 'bi-people-fill',
      children: [
        { label: 'Lista de Clientes', icon: 'bi-person-lines-fill', route: '/clientes' },
        { label: 'Nuevo Cliente',     icon: 'bi-person-plus-fill',  route: '/clientes/nuevo' },
        { label: 'Segmentos',         icon: 'bi-diagram-3-fill',    route: '/clientes/segmentos' },
      ],
    },
    {
      label: 'Productos', icon: 'bi-box-seam-fill',
      children: [
        { label: 'Catálogo',       icon: 'bi-grid-fill',       route: '/productos' },
        { label: 'Nuevo Producto', icon: 'bi-plus-square-fill', route: '/productos/nuevo' },
        { label: 'Inventario',     icon: 'bi-archive-fill',    route: '/productos/inventario', badge: 'Stock bajo' },
        { label: 'Categorías',     icon: 'bi-tags-fill',       route: '/productos/categorias' },
      ],
    },
    {
      label: 'Ventas', icon: 'bi-cart3',
      children: [
        { label: 'Órdenes',      icon: 'bi-receipt-cutoff',  route: '/ventas' },
        { label: 'Nueva Venta',  icon: 'bi-cart-plus-fill',  route: '/ventas/nueva' },
        { label: 'Cotizaciones', icon: 'bi-file-text-fill',  route: '/ventas/cotizaciones' },
      ],
    },
    {
      label: 'Reportes', icon: 'bi-bar-chart-line-fill',
      children: [
        { label: 'Resumen',    icon: 'bi-speedometer2',   route: '/reportes/resumen' },
        { label: 'Ventas',     icon: 'bi-graph-up-arrow', route: '/reportes/ventas' },
        { label: 'Inventario', icon: 'bi-table',          route: '/reportes/inventario' },
        { label: 'Clientes',   icon: 'bi-people',         route: '/reportes/clientes' },
      ],
    },
    {
      label: 'Configuración', icon: 'bi-gear-fill',
      children: [
        { label: 'General',       icon: 'bi-sliders',        route: '/config/general' },
        { label: 'Usuarios',      icon: 'bi-person-gear',    route: '/config/usuarios' },
        { label: 'Permisos',      icon: 'bi-shield-fill',    route: '/config/permisos' },
        { label: 'Integraciones', icon: 'bi-plug-fill',      route: '/config/integraciones' },
      ],
    },
  ]);
}
