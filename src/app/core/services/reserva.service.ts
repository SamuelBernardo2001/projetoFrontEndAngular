import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva.model';
import { ApiBaseService } from './api-base.service';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  constructor(private api: ApiBaseService) {}

  listar(): Observable<Reserva[]> {
    return this.api.get<Reserva[]>('reservas');
  }

  buscarPorId(id: number): Observable<Reserva> {
    return this.api.get<Reserva>(`reservas/${id}`);
  }

  criar(reserva: Reserva): Observable<Reserva> {
    return this.api.post<Reserva>('reservas', reserva);
  }

  atualizar(reserva: Reserva): Observable<Reserva> {
    if (!reserva.id) throw new Error('Reserva precisa de id para atualizar');
    return this.api.put<Reserva>('reservas', reserva.id, reserva);
  }

  excluir(id: number): Observable<any> {
    return this.api.delete('reservas', id);
  }

  calcularDias(checkin: string, checkout: string): number {
    const d1 = new Date(checkin);
    const d2 = new Date(checkout);
    const diff = d2.getTime() - d1.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}