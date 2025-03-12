import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[kpsStepContent]',
})
export class StepContentDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
