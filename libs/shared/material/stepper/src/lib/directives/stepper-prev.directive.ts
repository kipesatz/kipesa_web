import { Directive, HostListener, inject } from '@angular/core';
import { StepperService } from '../services';

@Directive({
  selector: '[kpsStepperPrev]',
})
export class StepperPrevDirective {
  private stepperService = inject(StepperService);

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    this.stepperService.previous();
  }
}
