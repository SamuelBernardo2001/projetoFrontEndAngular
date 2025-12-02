import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GaleriaService } from '../../core/services/galeria.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  imagens: string[] = [];

  constructor(
    private galeria: GaleriaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.imagens = this.galeria.listar().slice(0, 3);
  }

  go(path: string): void {
    this.router.navigate([path]);
  }
}