import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Ingredient {
  nom: string;
  quantite: number;
  unite: string;
  checked?: boolean; 
}

interface Recette {
  ingredients: Ingredient[];
}

@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.css'
})
export class ListeComponent {
  listeCombinee: Ingredient[] = [];

  constructor(private http: HttpClient) {}

  
}
