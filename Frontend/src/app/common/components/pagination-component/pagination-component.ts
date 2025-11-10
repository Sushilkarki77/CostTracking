import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { ChevronLeft, ChevronRight } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular/src/icons';

@Component({
  selector: 'app-pagination-component',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './pagination-component.html',
  styleUrl: './pagination-component.scss',
})
export class PaginationComponent {

  totalItems = input.required<number>();
  currentPage = input.required<number>();
  numbersPerPage = input.required<number>();

  setCurrentPage = output<number>();

  pages = computed(() => {
    let totalPages = [];
    let pagesNumbers = Math.round(this.totalItems() / this.numbersPerPage());
    for (let i = 0; i < pagesNumbers; i++) {
      totalPages.push(i);
    }
    return totalPages;
  })

  right = ChevronRight;
  left = ChevronLeft;
  size = 18;

}
