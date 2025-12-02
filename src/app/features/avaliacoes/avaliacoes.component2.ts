import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvaliacaoService } from '../../core/services/avaliacao.service';
import { Avaliacao } from '../../core/models/avaliacao.model';

@Component({
  selector: 'app-avaliacoes',
  templateUrl: './avaliacoes.component.html',
  styleUrls: ['./avaliacoes.component.scss']
})
export class AvaliacoesComponent implements OnInit {
  form: FormGroup;
  avaliacoes: Avaliacao[] = [];
  loading = false;

  constructor(private fb: FormBuilder, private avSrv: AvaliacaoService) {
    this.form = this.fb.group({
      mensagem: ['', [Validators.required, Validators.minLength(5)]],
      estrelas: [5, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.avSrv.listar().subscribe({
      next: (data) => { this.avaliacoes = data || []; this.loading = false; },
      error: (err) => { console.error(err); this.loading = false; }
    });
  }

  enviar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload: Avaliacao = this.form.value;
    this.avSrv.criar(payload).subscribe({
      next: () => { this.form.reset({ estrelas: 5 }); this.load(); },
      error: (err) => { console.error(err); alert('Erro ao enviar avaliação'); }
    });
  }

  remover(id?: number) {
    if (!id) return;
    if (!confirm('Deseja remover esta avaliação?')) return;
    this.avSrv.excluir(id).subscribe({ next: () => this.load(), error: (e) => console.error(e) });
  }
}
