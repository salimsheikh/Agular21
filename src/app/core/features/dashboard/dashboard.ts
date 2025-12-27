import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DashboardSummary } from './dashboard.model';
import { DashboardService } from './dashboard-service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class Dashboard implements OnInit {  
  private cdr = inject(ChangeDetectorRef);

  private dashboardService = inject(DashboardService);

  dashboard: DashboardSummary = {
    skillsCount: 0,
    locationsCount: 0,
    categoriesCount: 0,
    designationCount: 0
  };  

  ngOnInit(): void {
    this.loadSummary();
  }

  loadSummary(){
    this.dashboardService.getSummary().subscribe({
      next: res => {
        this.dashboard = res;
        this.cdr.markForCheck();
      }, error: err => console.log(err)      
    });
  }
}
