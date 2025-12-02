import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../core/services/reserva.service';
import { Reserva } from '../../core/models/reserva.model';

@Component({
  selector: 'app-reservas-confirmadas',
  templateUrl: './reservas-confirmadas.component.html',
  styleUrls: ['./reservas-confirmadas.component.scss']
})
export class ReservasConfirmadasComponent implements OnInit {
  reservas: Reserva[] = [];
  loading = false;
  constructor(private reservaSrv: ReservaService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.reservaSrv.listar().subscribe({
      next: (data) => { this.reservas = data; this.loading = false; },
      error: (err) => { console.error(err); this.loading = false; alert('Erro ao carregar reservas'); }
    });
  }

  cancelar(id?: number) {
    if (!id) return;
    if (!confirm('Deseja cancelar esta reserva?')) return;
    this.reservaSrv.excluir(id).subscribe({
      next: () => { this.load(); },
      error: (err) => { console.error(err); alert('Erro ao cancelar reserva'); }
    });
  }
}
