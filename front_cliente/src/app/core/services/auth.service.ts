import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthSession, LoginResponse, ValidateResponse } from '../interfaces/iauth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly STORAGE_KEY = 'auth_session';
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/auth`;

  private _nombre = signal<string | null>(this._loadField('nombre'));
  private _username = signal<string | null>(this._loadField('username'));
  private _sessionValidated = false;

  readonly nombre = this._nombre.asReadonly();
  readonly username = this._username.asReadonly();

  private _loadField(field: keyof AuthSession): string | null {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return null;
    try {
      return (JSON.parse(raw) as AuthSession)[field] as string ?? null;
    } catch {
      return null;
    }
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password });
  }

  validateSession(username: string): Observable<ValidateResponse> {
    return this.http.post<ValidateResponse>(`${this.apiUrl}/validate`, { username });
  }

  saveSession(username: string, nombre: string): void {
    const session: AuthSession = { username, nombre, loginTime: new Date().toISOString() };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(session));
    this._username.set(username);
    this._nombre.set(nombre);
    this._sessionValidated = true;
  }

  getUsername(): string | null {
    return this._username();
  }

  isLoggedIn(): boolean {
    return !!this._username();
  }

  isSessionValidated(): boolean {
    return this._sessionValidated;
  }

  markValidated(): void {
    this._sessionValidated = true;
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this._username.set(null);
    this._nombre.set(null);
    this._sessionValidated = false;
  }
}
