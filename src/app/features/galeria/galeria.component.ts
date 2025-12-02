import { Component, OnInit } from '@angular/core';
import { GaleriaService } from '../../core/services/galeria.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent implements OnInit {
  imagens: string[] = [];
  show = false;
  index = 0;

  constructor(private galeria: GaleriaService) {}

  ngOnInit(): void {
    this.imagens = this.galeria.listar();
  }

  open(i: number): void {
    this.index = i;
    this.show = true;
  }

  close(): void {
    this.show = false;
  }

  prev(e: Event): void {
    e.stopPropagation();
    this.index = (this.index - 1 + this.imagens.length) % this.imagens.length;
  }

  next(e: Event): void {
    e.stopPropagation();
    this.index = (this.index + 1) % this.imagens.length;
  }
}