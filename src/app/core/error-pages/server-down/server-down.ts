import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-server-down',
  imports: [],
  templateUrl: './server-down.html',
  styleUrl: './server-down.css',
})
export class ServerDown {
  private http = inject(HttpClient);
  private router = inject(Router);

  apiBaseUrl = environment.apiBaseUrl;  

  retry() {

    // Ping API (health check)
    this.http.get(this.apiBaseUrl).subscribe({
      next: () => {
        // server is up → redirect home
        this.router.navigateByUrl('/');
      },
      error: () => {
        // alert('Server still down. Please try again later.');
        this.router.navigateByUrl('/');
      }
    });
  }
}