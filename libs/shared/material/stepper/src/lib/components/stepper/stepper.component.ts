import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  contentChildren,
  effect,
  inject,
  input,
  OnDestroy,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { StepperStepComponent } from '../stepper-step/stepper-step.component';
import { StepperOrientation } from '@angular/cdk/stepper';
import { StepperService } from '../../services';

export type StepperSidebarPosition = 'left' | 'right';

@Component({
  selector: 'kps-stepper',
  imports: [NgClass],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class StepperComponent implements AfterContentInit, OnDestroy {
  constructor() {
    effect(() => {
      // Re-initialize when steps change
      if (this.stepComponents()) {
        this.initSteps();
      }
    });
  }
  orientation = input<StepperOrientation>('vertical');
  sidebarPosition = input<StepperSidebarPosition>('left');
  title = input('Stepper');
  description = input('');
  theme = input<'light' | 'dark'>('dark');
  logo = input<string>('');
  linear = input<boolean>(false);

  stepComponents = contentChildren(StepperStepComponent);
  private stepperService = inject(StepperService);
  private cdr = inject(ChangeDetectorRef);

  steps = this.stepperService.steps$;
  currentStepIndex = this.stepperService.currentStepIndex$;

  ngAfterContentInit(): void {
    this.initSteps();
  }

  selectStep(index: number): void {
    this.stepperService.goToStep(index);
  }

  get stepCountLabel(): string {
    return `Step ${this.currentStepIndex() + 1}`;
  }

  ngOnDestroy(): void {
    this.stepperService.clear();
  }

  private initSteps(): void {
    // this.stepperService.clear(); // Clear existing steps first
    this.stepComponents().forEach((step) => {
      this.stepperService.removeStep(step);
    });

    this.stepComponents().forEach((step) => {
      this.stepperService.addStep(step);
    });
  }
}
