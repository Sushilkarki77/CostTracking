import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeFIlter } from './income-filter';

describe('IncomeFIlter', () => {
  let component: IncomeFIlter;
  let fixture: ComponentFixture<IncomeFIlter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeFIlter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeFIlter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
