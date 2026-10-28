import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from './model/category';
import { CATEGORY_DATA } from './model/mock-categories';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    constructor() { }

    //mockear datos de Categorias
    getCategories(): Observable<Category[]> {
        return of(CATEGORY_DATA);
    }

    //EDITAR CATEGORIA
    saveCategory(category: Category): Observable<Category> {
        // Aqui sería el "GUARDAR" botón
        return of(null);
    }

    //ELIMINAR CATEGORIA
    // Lo de dentro de Observable<any> es el tipo de dato que devuelve la función, 
    // en este caso un observable de cualquier tipo
    deleteCategory(idCategory: number): Observable<any> { 
        return of(null);
    }
}