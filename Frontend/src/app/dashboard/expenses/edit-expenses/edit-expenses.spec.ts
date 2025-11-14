import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExpenses } from './edit-expenses';

describe('EditExpenses', () => {
  let component: EditExpenses;
  let fixture: ComponentFixture<EditExpenses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditExpenses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditExpenses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
