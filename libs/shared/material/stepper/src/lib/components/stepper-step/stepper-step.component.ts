import {
  Component,
  computed,
  contentChild,
  inject,
  input,
  signal,
  TemplateRef,
} from '@angular/core';
import { StepContentDirective } from '../../directives';
import { NgTemplateOutlet } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { StepperService } from '../../services';

@Component({
  selector: 'kps-stepper-step',
  imports: [NgTemplateOutlet],
  templateUrl: './stepper-step.component.html',
  styleUrl: './stepper-step.component.scss',
})
export class StepperStepComponent {
  private stepperService = inject(StepperService);
  private _completed = signal(false);

  label = input<string>('');
  description = input<string>('');
  stepControls = input<AbstractControl[]>([]);

  contentTemplate = contentChild<StepContentDirective | null>(
    StepContentDirective
  );

  active = computed(() => this === this.stepperService.currentStep$());
  completed = computed(() => this._completed());

  //marks a step as completed
  setCompleted(value: boolean) {
    this._completed.set(value);
  }

  get content(): TemplateRef<unknown> | null {
    const _tmpl = this.contentTemplate();
    return _tmpl ? _tmpl.templateRef : null;
  }

  /**
   * Check if all form controls associated with this step are valid
   */
  get isValid(): boolean {
    if (!this.stepControls() || this.stepControls().length === 0) {
      return true;
    }

    return this.stepControls().every((control) => control && control.valid);
  }
}
