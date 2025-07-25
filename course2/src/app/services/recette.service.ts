import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {
  constructor(private http: HttpClient) {
    console.log('RecetteService instancié');
  }

  getRecettes(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:4000/api/recettes');
  }

  getNextId(): Observable<number> {
    return this.getRecettes().pipe(
      map(recettes => {
        if (recettes.length === 0) return 1;
        const maxId = Math.max(...recettes.map(r => r.id || 0));
        return maxId + 1;
      })
    );
  }

  addRecette(recette: any): Observable<any> {
    return this.http.post('http://localhost:4000/api/recettes', recette);
  }
}
