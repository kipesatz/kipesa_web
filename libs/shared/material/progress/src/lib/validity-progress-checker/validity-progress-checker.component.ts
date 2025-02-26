import {
  Component,
  computed,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'kps-validity-progress-checker',
  imports: [MatProgressBar, MatIcon],
  templateUrl: './validity-progress-checker.component.html',
  styleUrls: ['./validity-progress-checker.component.scss'],
})
export class ValidityProgressCheckerComponent implements OnInit, OnDestroy {
  formGroup = input.required<FormGroup>();
  formProgress = signal<number>(0);
  private subscriptions = new Subscription();

  isComplete = computed(() => this.formProgress() === 100);

  progressText = computed(
    () => `Validity: ${Math.round(this.formProgress())}%`
  );

  progressColor = computed(() => {
    const progress = this.formProgress();
    if (progress < 30) return 'warn';
    if (progress < 70) return 'accent';
    return 'primary';
  });

  ngOnInit(): void {
    this.subscriptions.add(
      this.formGroup().valueChanges.subscribe(() => this.trackFormChanges())
    );
  }
  private trackFormChanges(): void {
    const controls = Object.values(this.formGroup().controls);
    const totalFields = controls.length;
    const filledFields = controls.filter(
      (control) =>
        control.value !== null &&
        control.value !== '' &&
        !control.pristine &&
        control.valid
    ).length;

    this.formProgress.set((filledFields / totalFields) * 100);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
