import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCategories } from '../../../store/category.actions';
import { selectAllCategories } from '../../../store/category.selectors';
import { AsyncPipe, DatePipe } from '@angular/common';


@Component({
  selector: 'app-category-list-component',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './category-list-component.html',
  styleUrl: './category-list-component.scss',
})
export class CategoryListComponent {
  private store = inject(Store);
   categories$ = this.store.select(selectAllCategories);

  constructor(){
    this.store.dispatch(loadCategories())
  }
   

}
