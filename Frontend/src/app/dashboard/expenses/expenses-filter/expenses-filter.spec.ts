import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesFilter } from './expenses-filter';

describe('ExpensesFilter', () => {
  let component: ExpensesFilter;
  let fixture: ComponentFixture<ExpensesFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensesFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
