import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModaleComponent } from '../modale/modale.component';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, ModaleComponent],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  //à prendre dans la base de données
  // si bdd vide, le carousel ne s'affiche pas
  images = [
    '/assets/ace.jpg',
    '/assets/oui4.jpg',
    '/assets/ace.jpg',
    '/assets/ace.jpg',
    '/assets/ace.jpg'
  ];
  isModalOpenLecture = false;
  current = 0;

  get visibleImages() {
    const len = this.images.length;
    return [
      this.images[(this.current) % len],
      this.images[(this.current + 1) % len],
      this.images[(this.current + 2) % len],
      this.images[(this.current + 3) % len],
      this.images[(this.current + 4) % len],
      this.images[(this.current + 5) % len],
    ];
  }

  prev() {
    this.current = (this.current - 1 + this.images.length) % this.images.length;
  }

  next() {
    this.current = (this.current + 1) % this.images.length;
  }

  openModal(index: number) {
  this.isModalOpenLecture = true;
  this.current = index;
}

closeModal() {
  this.isModalOpenLecture = false;
  this.current = 0;  //techniquement c'est faux
}


}
