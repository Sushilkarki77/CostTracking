import { Component, inject, model } from '@angular/core';
import { Store } from '@ngrx/store';
import { createCategory, deleteCategory, loadCategories } from '../../../store/category/category.actions';
import { selectAllCategories } from '../../../store/category/category.selectors';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Category } from '../../../common/interfaces/app.interface';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

interface Field {
  name: keyof Category;
  label: string;
  type: string
}


@Component({
  selector: 'app-category-list-component',
  imports: [AsyncPipe, DatePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './category-list-component.html',
  styleUrl: './category-list-component.scss',
})
export class CategoryListComponent {
  private store = inject(Store);
  categories$ = this.store.select(selectAllCategories);


  catForm = inject(FormBuilder).nonNullable.group({
    name: ["", Validators.required]
  })

  fields: Field[] = [
    { label: "Name", name: "name", type: "string" },
    { label: "Created", name: "createdAt", type: "date" },
  ]

  fieldNames = this.fields.map(x => x.name);

  actions = [
    {
      name: "delete",
      label: "Delete",
      function: (_id: string) => this.handleDelete(_id)
    }
  ]

  handleDelete(id: string) {

    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) this.store.dispatch(deleteCategory({ id }));

  }

  handleAddCategory() {

    if (!this.catForm.valid) return;

    const { name = "" } = this.catForm.value;

    this.catForm.reset();
    this.store.dispatch(createCategory({ name }))
  }

  constructor() {
    this.store.dispatch(loadCategories())
  }


}
