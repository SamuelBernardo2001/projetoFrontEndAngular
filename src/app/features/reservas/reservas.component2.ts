import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservaService } from '../../core/services/reserva.service';
import { Reserva } from '../../core/models/reserva.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent implements OnInit {
  form!: FormGroup;
  detalhes: string = '';
  reservaAtual?: Reserva;
  precoDiaria = 200; // valor base, pode ser parametrizado

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

    // recalcular detalhes quando datas ou hóspedes mudarem
    this.form.valueChanges.subscribe(() => {
      if (this.form.valid) this.atualizarDetalhes();
      else this.detalhes = '';
    });
  }

  private atualizarDetalhes() {
    const { checkin, checkout, hospedes } = this.form.value;
    const dias = this.reservaSrv.calcularDias(checkin, checkout);
    if (dias <= 0) {
      this.detalhes = '';
      return;
    }
    const valor = dias * this.precoDiaria;
    this.reservaAtual = {
      checkin,
      checkout,
      hospedes: Number(hospedes),
      dias,
      valor
    };
    this.detalhes = [
      `Check-in: ${checkin}`,
      `Check-out: ${checkout}`,
      `Hóspedes: ${hospedes}`,
      `Diárias: ${dias}`,
      `Valor: R$ ${valor.toFixed(2)}`
    ].join(' • ');
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // já atualizamos detalhes via valueChanges — garantir que reservaAtual está ok
    const checkin = this.form.value.checkin;
    const checkout = this.form.value.checkout;
    const dias = this.reservaSrv.calcularDias(checkin, checkout);
    if (dias <= 0) {
      alert('Por favor selecione um período válido (check-out deve ser após check-in).');
      return;
    }
    // exibir resumo para confirmação (já mostrado no template)
    this.atualizarDetalhes();
  }

  confirmarPagamento() {
    if (!this.reservaAtual) {
      alert('Sem informações de reserva. Preencha o formulário corretamente.');
      return;
    }

    this.reservaSrv.criar(this.reservaAtual).subscribe({
      next: () => {
        alert('Pagamento confirmado e reserva criada com sucesso!');
        // navegar para tela de reservas confirmadas
        this.router.navigate(['/reservas/confirmadas']);
      },
      error: (err) => {
        console.error('Erro ao criar reserva', err);
        alert('Ocorreu um erro ao criar a reserva. Tente novamente.');
      }
    });
  }
}
