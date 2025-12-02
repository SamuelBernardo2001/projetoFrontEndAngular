import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from './api-base.service';
import { Avaliacao } from '../models/avaliacao.model';

@Injectable({ providedIn: 'root' })
export class AvaliacaoService {
  constructor(private api: ApiBaseService) {}

  listar(): Observable<Avaliacao[]> {
    return this.api.get<Avaliacao[]>('avaliacoes');
  }

  criar(a: Avaliacao): Observable<Avaliacao> {
    a.data = new Date().toISOString();
    return this.api.post<Avaliacao>('avaliacoes', a);
  }

  excluir(id: number): Observable<any> {
    return this.api.delete('avaliacoes', id);
  }
}