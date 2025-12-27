import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-photos',
  imports: [FormsModule, CommonModule],
  templateUrl: './photos.html',
  styleUrl: './photos.css',
})
export class Photos implements OnInit {

  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  photosList: any[] = [];        // full data
  pagedPhotos: any[] = [];       // current page data

  currentPage = 1;
  pageSize = 4;
  totalPages = 0;

  newPhoto: any = {
    "albumId": 0,
    "id": 0,
    "title": "",
    "url": "",
    "thumbnailUrl": ""
  };

  ngOnInit(): void {
    this.getAllPhotos();
  }

  getAllPhotos() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/photos')
      .subscribe({
        next: response => {
          console.log('Photos loaded', response.length);
          this.photosList = response;
          this.totalPages = Math.ceil(response.length / this.pageSize);
          this.currentPage = 1;
          this.updatePage();
          this.cdr.markForCheck();
        },
        error: err => {
          console.error('API Error', err);
        }
      });
  }

  updatePage() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedPhotos = this.photosList.slice(start, end);
    console.log('PAGE DATA:', this.pagedPhotos.length);
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

  onSavePhoto() {
    this.http.post("https://jsonplaceholder.typicode.com/photos", this.newPhoto)
      .subscribe({
        next: response => {
          console.log("Successfully Saved " + response);
        },
        error: err => {
          console.log("On Save photo error" + err)
        }

      });
  }

  onUpdatePhoto(){
    this.http.put("https://jsonplaceholder.typicode.com/photos/"+this.newPhoto.id, this.newPhoto).subscribe({
      next: response => {
        console.log("Photo updated photo " , response);
      }, error: err => {
        console.log("Error on update " , err)
      }
    });
  }

  photoEdit(item: any) {
    this.newPhoto = item;
  }

  photoDelete(item: any){
    this.http.delete("https://jsonplaceholder.typicode.com/photos/"+this.newPhoto.id)
    .subscribe({
      next: response => {
        console.log("Successfully deleted " , response);
      }, error: err => {
        console.log("Error on delete " , err);
      }
    });
  }

  formReset() {
    this.newPhoto = {
      "albumId": 0,
      "id": 0,
      "title": "",
      "url": "",
      "thumbnailUrl": ""
    };
  }
}
