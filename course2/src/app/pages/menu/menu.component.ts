import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component'; 
import { RouterLink } from '@angular/router';
import { ModaleComponent } from '../modale/modale.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CarouselComponent, RouterLink, ModaleComponent, CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css','../home/home.component.css']
})
export class MenuComponent {
  mode: 'ajout' = 'ajout';
  isModalOpen = false;

    openModal() {
  this.isModalOpen = true;
  
}

closeModal() {
  this.isModalOpen = false;
  
}
  
  
}
