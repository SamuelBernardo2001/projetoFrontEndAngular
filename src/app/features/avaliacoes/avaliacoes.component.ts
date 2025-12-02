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

  constructor(
    private fb: FormBuilder,
    private avSrv: AvaliacaoService
  ) {
    this.form = this.fb.group({
      mensagem: ['', [Validators.required, Validators.minLength(5)]],
      estrelas: [5, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.avSrv.listar().subscribe(data => this.avaliacoes = data || []);
  }

  enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Avaliacao = this.form.value;
    this.avSrv.criar(payload).subscribe(() => {
      this.form.reset({ estrelas: 5 });
      this.load();
    });
  }
}