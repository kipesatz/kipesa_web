import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[kpsStepFooter]',
})
export class StepFooterDirective {
  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.display = 'flex';
    this.elementRef.nativeElement.style.gap = '1rem';
    this.elementRef.nativeElement.style.marginTop = '1rem';
  }
}
