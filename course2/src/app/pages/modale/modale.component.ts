import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



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
    private http: HttpClient)
  {}


  isModalOpen = false;
  current = 0;             //c'est faux, il faut utiliser l'info du parent.
  ingredientNom: string = ''; 
  ingredientQuantite: string = '';
  unite: string = ''; 

  imageToShow: string | ArrayBuffer | null = null;

  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
    this.close.emit();
  }

  //à changer quand tu fais le back
  onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageToShow = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

 


}
