import { Component } from '@angular/core';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent {
  imagemSelecionada: string | null = null;

  fotos = [
    { src: '/assets/img/quarto1.webp', alt: 'Quarto 1' },
    { src: '/assets/img/quarto2.webp', alt: 'Quarto 2' },
    { src: '/assets/img/paisagem1.webp', alt: 'Paisagem 1' },
    { src: '/assets/img/paisagem2.webp', alt: 'Paisagem 2' }
  ];

  abrirImagem(img: string) {
    this.imagemSelecionada = img;
  }

  fecharModal() {
    this.imagemSelecionada = null;
  }
}
