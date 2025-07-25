import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ListeComponent } from '../liste/liste.component';

@Component({
  selector: 'app-groceries',
  standalone: true,
  imports: [RouterLink, CommonModule, ListeComponent],
  templateUrl: './groceries.component.html',
  styleUrl: './groceries.component.css'
})
export class GroceriesComponent {

}
