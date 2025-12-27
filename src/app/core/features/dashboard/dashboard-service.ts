import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardSummary } from './dashboard.model';
import { API } from '../../api-endpoints';

@Injectable({
  providedIn: 'root',
})

export class DashboardService {
  private http = inject(HttpClient);
  getSummary(): Observable<DashboardSummary>{
    return this.http.get<DashboardSummary>(API.DASHBOARD_SUMMARY);;
  }
}
