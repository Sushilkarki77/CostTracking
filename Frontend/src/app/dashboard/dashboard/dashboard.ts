import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "../layout/header/header";
import { Sidebar } from "../layout/sidebar/sidebar";

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, Header, Sidebar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}
