import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RecetteService } from '../../services/recette.service';



@Component({
  selector: 'modale',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modale.component.html',
  styleUrls: ['./modale.component.css' ]
})
export class ModaleComponent {
  @Input() mode: 'ajout' | 'lecture' = 'lecture'; 
  @Input() nomplat!: string;
  @Input() nombrePersonnes!: number;
  @Input() urlImage!: string;
  @Input() quantite!: string;
  @Input() ingredients: { nom: string; quantite: string; unite: string }[] = [];
  @Input() recettes: any[] = []; 

  @Input() image!: string;
  @Output() close = new EventEmitter<void>();
  constructor(
    private http: HttpClient,
    private recetteService: RecetteService) 
  {console.log('RecetteService:', this.recetteService);}


  isModalOpen = false;
  current = 0;             //c'est faux, il faut utiliser l'info du parent.
  ingredientNom: string = ''; 
  ingredientQuantite: string = '';
  unite: string = ''; 

  imageToShow: string | ArrayBuffer | null = null;

  ngOnInit() {
    this.imageToShow = this.urlImage || null;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    
    const file = input.files[0];
    const reader = new FileReader();
    
    reader.onload = () => {
      this.imageToShow = reader.result;
    };
    
    reader.readAsDataURL(file);
  }




  openModal(index: number, mode : string) {
  this.isModalOpen = true;
  this.current = index;
}

closeModal() {
  this.close.emit();
}

onInput(event: Event) {
  const input = event.target as HTMLInputElement;
  
  let value = input.value;
  
  if (value.includes('.')) {
    const intValue = Math.floor(parseFloat(value));
    input.value = intValue.toString();
  }
}


saveIngredient(nom: string, quantite: string, unite: string) {
    if (nom && quantite && unite) {
      this.ingredients.push({ nom, quantite, unite });
      this.ingredientNom = '';
      this.ingredientQuantite = '';
      this.unite = '';
    } else {
      alert('Veuillez remplir tous les champs de l\'ingrédient.');
    }
  }


saveRecipe() {
  if (!this.nomplat || !this.nombrePersonnes || !this.urlImage || this.ingredients.length === 0) {
    alert('Veuillez remplir tous les champs avant de sauvegarder la recette.');
    return;
  }

  console.log('Service dispo ?', this.recetteService);  

  if (!this.recetteService) {
    console.error('❌ Service non injecté !');
    return;
  }

  const baseRecipe = {
    nom: this.nomplat,
    personnes: this.nombrePersonnes,
    image: this.urlImage,
    ingredients: this.ingredients.map(ingredient => ({
      nom: ingredient.nom,
      quantite: ingredient.quantite,
      unite: ingredient.unite
    }))
  };

  this.recetteService.getNextId().subscribe({
    next: id => {
      const newRecipe = { id, ...baseRecipe };
      this.recetteService.addRecette(newRecipe).subscribe({
        next: () => {
          alert('Recette sauvegardée !');
          this.closeModal();
        },
        error: err => console.error('Erreur POST :', err)
      });
    },
    error: err => console.error('Erreur ID :', err)
  });
}



}
