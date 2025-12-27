import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopNavbar } from "../top-navbar/top-navbar";

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, TopNavbar],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {

}
