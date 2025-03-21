import {
  AfterContentInit,
  Component,
  contentChildren,
  effect,
  ElementRef,
  HostListener,
  input,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Subject, fromEvent, takeUntil } from 'rxjs';
import { SliderItemChange } from '../slider-item-change.interface';
import { CardSliderItemComponent } from '../card-slider-item/card-slider-item.component';

@Component({
  selector: 'kps-card-slider',
  imports: [MatIconButton, MatIcon],
  templateUrl: './card-slider.component.html',
  styleUrl: './card-slider.component.scss',
})
export class CardSliderComponent
  implements OnInit, OnDestroy, AfterContentInit
{
  showNavigation = input<boolean>(true);
  activeSlideChange = output<SliderItemChange>();
  sliderItems = contentChildren<CardSliderItemComponent>(
    CardSliderItemComponent
  );

  activeSlideIndex = 0;
  private destroy$ = new Subject<void>();
  private mouseDown = false;
  private startX = 0;
  private moveThreshold = 50;

  constructor(private elementRef: ElementRef) {
    effect(() => {
      if (this.sliderItems()) {
        // If items change, update accordingly
        this.updateActiveSlide();
        this.emitActiveSlide();
      }
    });
  }

  ngOnInit(): void {
    this.setupMouseEvents();
  }

  ngAfterContentInit(): void {
    if (this.sliderItems().length > 0) {
      // Set the first item as active initially
      this.updateActiveSlide();
      this.emitActiveSlide();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      this.navigatePrevious();
    } else if (event.key === 'ArrowRight') {
      this.navigateNext();
    }
  }

  navigatePrevious(): void {
    if (this.activeSlideIndex > 0) {
      this.activeSlideIndex--;
      this.updateActiveSlide();
      this.emitActiveSlide();
    }
  }

  navigateNext(): void {
    if (this.activeSlideIndex < this.sliderItems().length - 1) {
      this.activeSlideIndex++;
      this.updateActiveSlide();
      this.emitActiveSlide();
    }
  }

  private setupMouseEvents(): void {
    const element = this.elementRef.nativeElement;

    fromEvent<MouseEvent>(element, 'mousedown')
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: MouseEvent) => {
        this.mouseDown = true;
        this.startX = event.clientX;
      });

    fromEvent<MouseEvent>(document, 'mousemove')
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: MouseEvent) => {
        if (!this.mouseDown) return;

        const xDiff = this.startX - event.clientX;

        if (Math.abs(xDiff) > this.moveThreshold) {
          if (xDiff > 0) {
            this.navigateNext();
          } else {
            this.navigatePrevious();
          }
          this.mouseDown = false;
        }
      });

    fromEvent(document, 'mouseup')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.mouseDown = false;
      });
  }

  private updateActiveSlide(): void {
    this.sliderItems().forEach((item, index) => {
      item.active.set(index === this.activeSlideIndex);
    });
  }

  private emitActiveSlide(): void {
    const activeItem = this.sliderItems()[this.activeSlideIndex];
    if (activeItem) {
      this.activeSlideChange.emit({
        index: this.activeSlideIndex,
        item: activeItem,
      });
    }
  }
}
