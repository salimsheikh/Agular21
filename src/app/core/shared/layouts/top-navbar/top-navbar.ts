import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../features/auth/auth-service';

@Component({
  selector: 'app-top-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './top-navbar.html',
  styleUrl: './top-navbar.css',
})
export class TopNavbar {
  private authService = inject(AuthService);  
  private router = inject(Router);
  logout(){
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
