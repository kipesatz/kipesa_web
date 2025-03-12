import { computed, effect, Injectable, signal } from '@angular/core';
import { StepperStepComponent } from '../components';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class StepperService {
  private _steps = signal<StepperStepComponent[]>([]);
  private _currentStepIndex = signal<number>(0);
  private _linearMode = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (this._steps() || this._currentStepIndex() || this._linearMode()) {
        this.updateStepsState();
      }
    });
  }

  steps$ = computed(() => this._steps());
  currentStepIndex$ = computed(() => this._currentStepIndex());
  linear$ = computed(() => this._linearMode());
  currentStep$ = computed(() => this.steps$()[this.currentStepIndex$()]);

  setCurrentStepIndex(index: number) {
    this._currentStepIndex.set(index);
  }

  setLinearMode(linear: boolean): void {
    this._linearMode.set(linear);
  }

  addStep(step: StepperStepComponent): void {
    this._steps.update((steps) => [...steps, step]);
  }

  removeStep(step: StepperStepComponent): void {
    this._steps.update((steps) => steps.filter((_step) => _step !== step));
  }

  private updateStepsState(): void {
    this.steps$().forEach((step, index) => {
      step.setCompleted(index < this.currentStepIndex$());
    });
  }

  next(): boolean {
    // In linear mode, check if controls are valid before proceeding
    if (
      this.linear$() &&
      this.currentStep$() &&
      this.currentStep$().stepControls().length > 0
    ) {
      if (!this.areControlsValid(this.currentStep$().stepControls())) {
        this.currentStep$()
          .stepControls()
          .forEach((control) => {
            if (control) {
              control.markAllAsTouched();
            }
          });
        return false;
      }
    }

    if (this.currentStepIndex$() < this.steps$().length - 1) {
      // Update the index after marking completion
      this.currentStep$().setCompleted(true)
      this._currentStepIndex.update((index) => index + 1);
      return true;
    }

    return false;
  }

  previous(): boolean {
    if (this.currentStepIndex$() > 0) {
      this._currentStepIndex.update((index) => index - 1);
      return true;
    }
    return false;
  }

  goToStep(index: number): boolean {
    if (index < 0 || index >= this.steps$().length) {
      return false;
    }

    // In linear mode, can only navigate to completed steps or next available step
    if (this.linear$()) {
      const completedSteps = this.steps$().filter(
        (step) => step.completed
      ).length;
      if (index > completedSteps && index !== this.currentStepIndex$() + 1) {
        return false;
      }
    }

    // Navigate to step
    this._currentStepIndex.set(index);
    return true;
  }

  /**
   * Check if all controls in the array are valid
   */
  private areControlsValid(controls: AbstractControl[]): boolean {
    for (const control of controls) {
      if (!control || control.invalid) {
        return false;
      }
    }
    return true;
  }

  public clear(): void {
    this._steps.set([]);
    this._currentStepIndex.set(0);
    this._linearMode.set(false);
  }
}
