import { Directive, effect, ElementRef, HostBinding, inject, input, Renderer2, SimpleChanges } from '@angular/core';
import { ExpenseSummary } from '../interfaces/app.interface';

@Directive({
  selector: '[appIsItemActive]'
})
export class IsItemActive {

  current = input.required<string>();
  direction = input.required<string>();
  target = input.required<Record<keyof ExpenseSummary, '-1' | '1'> | {}>();
  class = input.required<string>();
  el = inject(ElementRef);
  renderer = inject(Renderer2);
  
  e = effect(() => {
    const isActive = Object.entries(this.target()).some(
      ([key, value]) => key === this.current() && value === this.direction()
    );

    if (isActive) {
      this.renderer.addClass(this.el.nativeElement, this.class());
    } else {
      this.renderer.removeClass(this.el.nativeElement, this.class());
    }
  })

}
