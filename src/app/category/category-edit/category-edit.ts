import { Component, OnInit, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../category';
import { Category } from '../model/category';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  selector: 'app-category-edit',
  standalone: true,
  styleUrl: './category-edit.scss',
  templateUrl: './category-edit.html',
})
export class CategoryEditComponent implements OnInit {
  // Inyección
  protected readonly dialogRef = inject(MatDialogRef<CategoryEditComponent>);
  protected readonly data = inject(MAT_DIALOG_DATA) as { category: Category };
  protected readonly categoryService = inject(CategoryService);

  protected readonly id = signal<number | null>(null);
  protected readonly name = signal<string | null>(null);

  // Al iniciar, se cargan los datos del formulario
  ngOnInit(): void {
    this.loadFormData(this.data.category ?? null);
  }

  // Cargar datos
  loadFormData(initialData: Category | null): void {
    this.id.set(initialData?.id ?? null);
    this.name.set(initialData?.name ?? null);
  }

  // Guardar datos
  onSave() {
    const id = this.id();
    const name = this.name();
    if(!name) {
      return;
    }
    // CREAR UN OBJETO DE CATEGORIA con los datos del formulario
    const category = { id, name } as Category;
    // 'as Category' al crear una nueva categoría, el id será null y el backend lo generará automáticamente.

    // LLAMAR AL SERVICIO de CategoryService
    this.categoryService.saveCategory(category).subscribe(() => {
    this.dialogRef.close(true);
    });
  }

  onClose() {
      this.dialogRef.close();
  }
}