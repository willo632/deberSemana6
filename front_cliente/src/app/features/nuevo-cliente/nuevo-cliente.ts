import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ClienteServices } from '../../core/services/cliente.services';

@Component({
  selector: 'app-nuevo-cliente',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './nuevo-cliente.html',
  styleUrl: './nuevo-cliente.css',
})
export class NuevoCliente implements OnInit {
  private fb     = inject(FormBuilder);
  private svc    = inject(ClienteServices);
  private router = inject(Router);

  form!: FormGroup;
  saving  = signal(false);
  success = signal(false);
  errorMsg = signal('');

  ngOnInit(): void {
    this.form = this.fb.group({
      cedula:    ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern(/^\d+$/)]],
      nombres:   ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      correo:    ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      telefono:  ['', [Validators.required, Validators.pattern(/^\+?\d{7,15}$/)]],
      direccion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
    });
  }

  /* Acceso rápido a controles */
  f(name: string): AbstractControl { return this.form.get(name)!; }

  /* True cuando el campo es inválido Y fue tocado/modificado */
  isInvalid(name: string): boolean {
    const ctrl = this.f(name);
    return ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  /* Mensaje de error por campo */
  errorFor(name: string): string {
    const e = this.f(name).errors;
    if (!e) return '';
    if (e['required'])   return 'Este campo es obligatorio.';
    if (e['minlength'])  return `Mínimo ${e['minlength'].requiredLength} caracteres.`;
    if (e['maxlength'])  return `Máximo ${e['maxlength'].requiredLength} caracteres.`;
    if (e['pattern'])    return name === 'cedula'   ? 'Solo se permiten números.' :
                                name === 'telefono' ? 'Formato inválido (ej: 3001234567).' : 'Formato inválido.';
    if (e['email'])      return 'Ingrese un correo electrónico válido.';
    return 'Valor inválido.';
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    this.saving.set(true);
    this.errorMsg.set('');

    this.svc.create(this.form.value).subscribe({
      next: () => {
        this.saving.set(false);
        this.success.set(true);
        setTimeout(() => this.router.navigate(['/clientes']), 1800);
      },
      error: () => {
        this.saving.set(false);
        this.errorMsg.set('No se pudo guardar el cliente. Verifique la conexión con el servidor.');
      },
    });
  }

  reset(): void {
    this.form.reset();
    this.errorMsg.set('');
  }
}
