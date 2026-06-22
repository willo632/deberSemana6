import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClienteServices } from '../../core/services/cliente.services';
import { Icliente } from '../../core/interfaces/icliente';

@Component({
  selector: 'app-clientes',
  imports: [RouterLink],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent implements OnInit {
  private svc = inject(ClienteServices);

  clientes  = signal<Icliente[]>([]);
  loading   = signal(true);
  error     = signal('');
  search    = signal('');

  filtered = computed(() => {
    const term = this.search().toLowerCase().trim();
    if (!term) return this.clientes();
    return this.clientes().filter(c =>
      c.nombres.toLowerCase().includes(term) ||
      c.cedula.includes(term) ||
      c.correo.toLowerCase().includes(term) ||
      c.telefono.includes(term)
    );
  });

  ngOnInit(): void {
    this.svc.getAll().subscribe({
      next:  data => { this.clientes.set(data); this.loading.set(false); },
      error: ()   => { this.error.set('No se pudo conectar con el servidor. Verifique la API.'); this.loading.set(false); },
    });
  }

  onSearch(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
  }

  confirmDelete(id: number | undefined): void {
    if (!id) return;
    if (!confirm('¿Está seguro de eliminar este cliente? Esta acción no se puede deshacer.')) return;
    this.svc.delete(id).subscribe({
      next:  () => this.clientes.update(list => list.filter(c => c.id !== id)),
      error: () => alert('Error al eliminar el cliente.'),
    });
  }

  initials(nombres: string): string {
    return nombres.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  }
}
