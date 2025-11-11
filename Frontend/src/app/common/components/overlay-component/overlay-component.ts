import { CommonModule } from '@angular/common';
import { Component, input,  TemplateRef } from '@angular/core';

@Component({
  selector: 'app-overlay-component',
  imports: [CommonModule],
  templateUrl: './overlay-component.html',
  styleUrl: './overlay-component.scss',
})
export class OverlayComponent {

  visible = input.required<boolean>();
  template =  input.required<TemplateRef<void>>();

}
