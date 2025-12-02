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

  constructor(private reservaSrv: ReservaService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.reservaSrv.listar().subscribe(data => this.reservas = data);
  }

  cancelar(id?: number): void {
    if (!id) return;
    if (confirm('Deseja cancelar esta reserva?')) {
      this.reservaSrv.excluir(id).subscribe(() => this.load());
    }
  }
}