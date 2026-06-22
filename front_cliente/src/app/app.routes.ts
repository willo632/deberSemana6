import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { ClientesComponent } from './features/clientes.component/clientes.component';
import { NuevoCliente } from './features/nuevo-cliente/nuevo-cliente';
import { LoginComponent } from './features/login/login.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Iniciar Sesión — NexusERP' },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: '',               component: Dashboard,         title: 'Dashboard — NexusERP' },
      { path: 'clientes',       component: ClientesComponent, title: 'Clientes — NexusERP' },
      { path: 'clientes/nuevo', component: NuevoCliente,      title: 'Nuevo Cliente — NexusERP' },
    ],
  },
  { path: '**', redirectTo: '' },
];
