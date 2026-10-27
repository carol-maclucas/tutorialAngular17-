import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../model/category';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../category';
import { MatDialog } from '@angular/material/dialog';
import { CategoryEditComponent } from '../category-edit/category-edit';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  styleUrl: './category-list.page.scss',
  templateUrl: './category-list.page.html',
})

export class CategoryListPage implements OnInit {
    dataSource = new MatTableDataSource<Category>();
    displayedColumns: string[] = ['id', 'name', 'action'];
    //Inyeccion moderna
    protected readonly categoryService = inject(CategoryService);
    protected readonly dialog = inject(MatDialog);

    // Instacia de CategoryService
    constructor(
      // Inyección clasica
      //private categoryService: CategoryService,
      //private dialog: MatDialog
    ) { }
    
    // EDITAR CATEGORIA
    createCategory() {    
      // Abrir el diálogo para crear una nueva categoría
      const dialogRef = this.dialog.open(CategoryEditComponent, {
        data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(!result) return; // Si no hay resultado, no hacer nada

        this.loadData();
      });
    } 
    editCategory(category: Category) {
      const dialogRef = this.dialog.open(CategoryEditComponent, {
        data: { category }
      });
      dialogRef.afterClosed().subscribe(result => {
        if(!result) return;
        this.loadData();
      });
    }
    
    // Al INICIAR la página, se cargan los datos de las categorías
    ngOnInit(): void {
      this.loadData();
    }
    // Cargar datos
    loadData(): void {
        this.categoryService.getCategories().subscribe( 
          categories => {this.dataSource.data = categories;});
    }
}

