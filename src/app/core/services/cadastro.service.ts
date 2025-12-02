import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from './api-base.service';
import { Cadastro } from '../models/cadastro.model';

@Injectable({ providedIn: 'root' })
export class CadastroService {
  constructor(private api: ApiBaseService) {}

  listar(): Observable<Cadastro[]> {
    return this.api.get<Cadastro[]>('cadastros');
  }

  criar(c: Cadastro): Observable<Cadastro> {
    return this.api.post<Cadastro>('cadastros', c);
  }

  atualizar(id: number, c: Partial<Cadastro>): Observable<Cadastro> {
    return this.api.patch<Cadastro>('cadastros', id, c);
  }

  excluir(id: number): Observable<any> {
    return this.api.delete('cadastros', id);
  }
}