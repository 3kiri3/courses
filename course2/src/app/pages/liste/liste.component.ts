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
export class ListeComponent implements OnInit {
  listeCombinee: Ingredient[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Recette[]>('http://localhost:4000/api/recettes')
      .subscribe(recettes => {
        const map = new Map<string, Ingredient>();

        for (const recette of recettes) {
          for (const ingr of recette.ingredients) {
            const key = `${ingr.nom}-${ingr.unite}`;

            if (map.has(key)) {
              map.get(key)!.quantite += Number(ingr.quantite);
            } else {
              map.set(key, {
                nom: ingr.nom,
                quantite: Number(ingr.quantite),
                unite: ingr.unite,
                checked: false // initialise le champ
              });
            }
          }
        }

        this.listeCombinee = Array.from(map.values());
      });
  }

  supprimerChecked() {
    const itemsASupprimer = this.listeCombinee.filter(item => item.checked);

    // Pour éviter des suppressions simultanées mal gérées, on envoie une requête après l'autre
    for (const item of itemsASupprimer) {
      this.http.delete('http://localhost:4000/api/ingredient', {
        body: { nom: item.nom }
      }).subscribe(() => {
        console.log(`${item.nom} supprimé du JSON`);
        this.listeCombinee = this.listeCombinee.filter(i => i.nom !== item.nom);
      });
    }
  }
}
