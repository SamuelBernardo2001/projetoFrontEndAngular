import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';                  // ← ADICIONADO AQUI

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatOptionModule } from '@angular/material/core';


// Components
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { TokenInterceptor } from './core/interceptors/token.interceptor';

// Layout
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

// Features
import { HomeComponent } from './features/home/home.component';
import { GaleriaComponent } from './features/galeria/galeria.component';
import { ReservasComponent } from './features/reservas/reservas.component';
import { ReservasConfirmadasComponent } from './features/reservas/reservas-confirmadas.component';
import { CadastroComponent } from './features/cadastro/cadastro.component';
import { AvaliacoesComponent } from './features/avaliacoes/avaliacoes.component';
import { InformacoesComponent } from './features/informacoes/informacoes.component';
import { PrecosComponent } from './features/precos/precos.component';
import { LoginComponent } from './features/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    GaleriaComponent,
    ReservasComponent,
    ReservasConfirmadasComponent,
    CadastroComponent,
    AvaliacoesComponent,
    InformacoesComponent,
    PrecosComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(ROUTES),

    // Angular Material Modules
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    MatOptionModule // <-- Aqui está correto, no imports!
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }