import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservaService } from '../../core/services/reserva.service';
import { Reserva } from '../../core/models/reserva.model';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent implements OnInit {
  form!: FormGroup;
  detalhes = '';
  reservaAtual?: Reserva;

  constructor(
    private fb: FormBuilder,
    private reservaSrv: ReservaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const hoje = new Date().toISOString().split('T')[0];
    this.form = this.fb.group({
      checkin: [hoje, Validators.required],
      checkout: [hoje, Validators.required],
      hospedes: [1, [Validators.required, Validators.min(1)]],
      formaPagamento: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { checkin, checkout, hospedes } = this.form.value;
    const dias = this.reservaSrv.calcularDias(checkin, checkout);

    if (dias <= 0) {
      alert('Data inválida. Check-out deve ser depois do Check-in.');
      return;
    }

    const valor = dias * 200;
    this.reservaAtual = { 
      checkin, 
      checkout, 
      hospedes: Number(hospedes), 
      dias, 
      valor 
    };
    
    this.detalhes = `Check-in: ${checkin}, Check-out: ${checkout}, Hóspedes: ${hospedes}, Diárias: ${dias}, Valor: R$ ${valor.toFixed(2)}`;
  }

  confirmarPagamento(): void {
    if (!this.reservaAtual) return;

    this.reservaSrv.criar(this.reservaAtual).subscribe({
      next: () => {
        alert('Pagamento confirmado e reserva criada!');
        this.router.navigate(['/reservas/confirmadas']);
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao criar reserva.');
      }
    });
  }
}