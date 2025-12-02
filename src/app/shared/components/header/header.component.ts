import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  get isAuth(): boolean {
    return this.auth.isAuthenticated();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/home']);
  }

  go(path: string): void {
    this.router.navigate([path]);
  }

  toggleTheme(): void {
    document.body.classList.toggle('dark');
    localStorage.setItem('modo-tema',
      document.body.classList.contains('dark') ? 'dark' : 'light'
    );
  }
}