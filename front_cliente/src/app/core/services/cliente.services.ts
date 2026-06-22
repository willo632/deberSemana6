import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Icliente } from '../interfaces/icliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteServices {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/Clientes`;

  getAll(): Observable<Icliente[]> {
    return this.http.get<Icliente[]>(this.base);
  }

  getById(id: number): Observable<Icliente> {
    return this.http.get<Icliente>(`${this.base}/${id}`);
  }

  create(cliente: Icliente): Observable<Icliente> {
    return this.http.post<Icliente>(this.base, cliente);
  }

  update(id: number, cliente: Icliente): Observable<Icliente> {
    return this.http.put<Icliente>(`${this.base}/${id}`, cliente);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
