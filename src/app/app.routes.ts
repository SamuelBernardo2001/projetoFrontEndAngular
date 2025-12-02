import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { GaleriaComponent } from './features/galeria/galeria.component';
import { ReservasComponent } from './features/reservas/reservas.component';
import { ReservasConfirmadasComponent } from './features/reservas/reservas-confirmadas.component';
import { CadastroComponent } from './features/cadastro/cadastro.component';
import { AvaliacoesComponent } from './features/avaliacoes/avaliacoes.component';
import { InformacoesComponent } from './features/informacoes/informacoes.component';
import { PrecosComponent } from './features/precos/precos.component';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './core/services/auth.guard';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'reservas', component: ReservasComponent },
  { 
    path: 'reservas/confirmadas', 
    component: ReservasConfirmadasComponent, 
    canActivate: [AuthGuard] 
  },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'avaliacoes', component: AvaliacoesComponent },
  { path: 'informacoes', component: InformacoesComponent },
  { path: 'precos', component: PrecosComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin', 
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'home' }
];