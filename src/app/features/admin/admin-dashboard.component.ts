import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../core/services/reserva.service';
import { CadastroService } from '../../core/services/cadastro.service';
import { AvaliacaoService } from '../../core/services/avaliacao.service';
import { Reserva } from '../../core/models/reserva.model';
import { Cadastro } from '../../core/models/cadastro.model';
import { Avaliacao } from '../../core/models/avaliacao.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  reservas: Reserva[] = [];
  cadastros: Cadastro[] = [];
  avaliacoes: Avaliacao[] = [];

  reservasCols = ['checkin', 'checkout', 'hospedes', 'dias', 'valor', 'acoes'];
  cadastrosCols = ['nome', 'cpf', 'celular', 'email', 'acoes'];

  constructor(
    private reservaSrv: ReservaService,
    private cadastroSrv: CadastroService,
    private avaliacaoSrv: AvaliacaoService
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.loadReservas();
    this.loadCadastros();
    this.loadAvaliacoes();
  }

  loadReservas(): void {
    this.reservaSrv.listar().subscribe(r => this.reservas = r || []);
  }

  loadCadastros(): void {
    this.cadastroSrv.listar().subscribe(c => this.cadastros = c || []);
  }

  loadAvaliacoes(): void {
    this.avaliacaoSrv.listar().subscribe(a => this.avaliacoes = a || []);
  }

  removerReserva(id?: number): void {
    if (!id) return;
    if (confirm('Confirmar exclusão da reserva?')) {
      this.reservaSrv.excluir(id).subscribe(() => {
        alert('Reserva excluída');
        this.loadReservas();
      });
    }
  }

  removerCadastro(id?: number): void {
    if (!id) return;
    if (confirm('Confirmar exclusão do cadastro?')) {
      this.cadastroSrv.excluir(id).subscribe(() => {
        alert('Cadastro excluído');
        this.loadCadastros();
      });
    }
  }

  removerAvaliacao(id?: number): void {
    if (!id) return;
    if (confirm('Confirmar exclusão da avaliação?')) {
      this.avaliacaoSrv.excluir(id).subscribe(() => {
        alert('Avaliação excluída');
        this.loadAvaliacoes();
      });
    }
  }

  exportJSON(entity: 'reservas' | 'cadastros' | 'avaliacoes'): void {
    let data: any[] = [];
    if (entity === 'reservas') data = this.reservas;
    if (entity === 'cadastros') data = this.cadastros;
    if (entity === 'avaliacoes') data = this.avaliacoes;

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${entity}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  exportCSV(entity: 'reservas' | 'cadastros' | 'avaliacoes'): void {
    let header = '';
    let lines: string[] = [];

    if (entity === 'reservas') {
      header = 'Check-in,Check-out,Hóspedes,Diárias,Valor\n';
      lines = this.reservas.map(r => 
        `${r.checkin},${r.checkout},${r.hospedes},${r.dias},${r.valor.toFixed(2)}`
      );
    } else if (entity === 'cadastros') {
      header = 'Nome,CPF,Celular,Email\n';
      lines = this.cadastros.map(c => 
        `${c.nome},${c.cpf},${c.celular},${c.email}`
      );
    } else if (entity === 'avaliacoes') {
      header = 'Mensagem,Estrelas,Data\n';
      lines = this.avaliacoes.map(a => 
        `${a.mensagem},${a.estrelas},${a.data || ''}`
      );
    }

    const blob = new Blob([header + lines.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${entity}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
}