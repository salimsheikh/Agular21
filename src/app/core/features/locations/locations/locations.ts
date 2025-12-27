import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { LocationListModel } from './location.model';
import { LoctionService } from './location-service';
import { FormsModule } from '@angular/forms';

interface LocationResponse {
  data: LocationListModel[];
}

@Component({
  selector: 'app-locations',
  imports: [FormsModule],
  templateUrl: './locations.html',
  styleUrl: './locations.css',
})
export class Locations implements OnInit {
  private locationService = inject(LoctionService);
  private cdr = inject(ChangeDetectorRef);
  itemList: LocationListModel[] = [];
  pagedItems: LocationListModel[] = [];  

  currentPage = 1;
  pageSize = 10;
  totalPages = 0;

  newItem: LocationListModel = {
    locationId: 0,
    locationName: ""
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(){
    this.locationService.getLocation().subscribe({
      next: (res: LocationResponse) => {
        this.itemList = res.data;        
        this.totalPages = Math.ceil(this.itemList.length / this.pageSize);
        this.currentPage = 1;
        this.updatePage();        
        this.cdr.markForCheck();
      }, error: err => {
        console.log("Error on loading items");
      }    
    });
  }

  updatePage() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedItems = this.itemList.slice(start, end);
    console.log('PAGE DATA:', this.pagedItems);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePage();
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage - 1);
  }

  onEdit(data:LocationListModel){
    this.newItem = data;
  }

  onDelete(data:LocationListModel){
    alert(data.locationId);
    this.locationService.onDelete(data.locationId).subscribe({
      next: res => { console.log(res);this.loadItems();},
      error: err => {console.log(err)}
    });
    
  }

  formReset(){
    this.newItem = {
      locationId: 0,
      locationName: ""
    };
  }
}
