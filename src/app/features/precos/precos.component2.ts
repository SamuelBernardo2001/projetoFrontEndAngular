import { Component } from '@angular/core';

@Component({
  selector: 'app-precos',
  templateUrl: './precos.component.html',
  styleUrls: ['./precos.component.scss']
})
export class PrecosComponent {
  planos = [
    { titulo: 'Diária Padrão', descricao: '1 a 2 hóspedes. Incluso: Wi-Fi e estacionamento.', preco: 200 },
    { titulo: 'Diária Família', descricao: 'Até 4 hóspedes. Cama extra sob consulta.', preco: 320 },
    { titulo: 'Pacote Fim de Semana', descricao: '2 noites com café da manhã.', preco: 380 }
  ];
}
