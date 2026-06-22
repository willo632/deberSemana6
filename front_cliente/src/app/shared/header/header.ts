import { Component, signal, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface Notification {
  id: number;
  icon: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
}

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private auth = inject(AuthService);
  private router = inject(Router);

  nombreCompleto = computed(() => this.auth.nombre() ?? this.auth.username() ?? 'Usuario');
  initials = computed(() => this.nombreCompleto().slice(0, 2).toUpperCase());

  unreadCount = signal(3);

  notifications = signal<Notification[]>([
    { id: 1, icon: 'bi-person-check-fill', title: 'Nuevo cliente registrado', desc: 'Carlos Mendoza se unió al sistema', time: 'hace 5 min', unread: true },
    { id: 2, icon: 'bi-cart-check-fill', title: 'Venta completada', desc: 'Orden #4821 procesada exitosamente', time: 'hace 23 min', unread: true },
    { id: 3, icon: 'bi-exclamation-triangle-fill', title: 'Stock bajo detectado', desc: 'Producto "Monitor 24" con 3 unidades', time: 'hace 1h', unread: true },
    { id: 4, icon: 'bi-file-earmark-check-fill', title: 'Reporte generado', desc: 'Informe mensual de ventas listo', time: 'hace 3h', unread: false },
  ]);

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
