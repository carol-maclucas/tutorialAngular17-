import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../model/category';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../category';

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

    constructor(
      private categoryService: CategoryService,
    ) { }

    ngOnInit(): void {
        this.categoryService.getCategories().subscribe( // Fetch categories from the service
          categories => {this.dataSource.data = categories;});
    }
}
