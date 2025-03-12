import {
  Directive,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  Renderer2,
} from '@angular/core';
import { StepperService } from '../services';

@Directive({
  selector: '[kpsStepperNext]',
})
export class StepperNextDirective {
  kpsStepperNext = input<any>();

  private stepperService = inject(StepperService);
  private elRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  constructor() {
    effect(() => {
      if (this.stepperService.linear$() && this.stepperService.currentStep$()) {
        this.updateButtonState(this.stepperService.currentStep$().isValid);
      }
    });
  }

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    const success = this.stepperService.next();

    // If in linear mode and navigation failed due to validation
    if (!success && this.stepperService.linear$()) {
      // Add shake animation or other feedback
      this.addErrorFeedback();
    }
  }

  private updateButtonState(isValid: boolean): void {
    if (!isValid) {
      this.renderer.setStyle(this.elRef.nativeElement, 'opacity', '0.7');
    } else {
      this.renderer.removeStyle(this.elRef.nativeElement, 'opacity');
    }
  }

  private addErrorFeedback(): void {
    // Add shake animation class
    this.renderer.addClass(this.elRef.nativeElement, 'validation-error');

    // Remove it after animation completes
    setTimeout(() => {
      this.renderer.removeClass(this.elRef.nativeElement, 'validation-error');
    }, 500);
  }
}
