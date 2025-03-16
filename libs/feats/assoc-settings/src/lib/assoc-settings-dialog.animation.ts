import { transition, trigger, style, animate } from '@angular/animations';

export const assocSettingsDialogAnimation = trigger('dialogAnimation', [
  transition(':enter', [
    style({
      opacity: 0.3,
      transform: 'scale(0.3)',
    }),
    animate(
      '500ms ease-in',
      style({
        opacity: 1,
        transform: 'scale(1)',
      })
    ),
  ]),
  transition(':leave', [
    animate(
      '500ms ease-out',
      style({
        opacity: 0.3,
        transform: 'scale(0.3)',
      })
    ),
  ]),
]);

export const assocSettingsFadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0.3 }),
    animate('500ms ease-in', style({ opacity: 1 })),
  ]),
  transition(':leave', [animate('500ms ease-out', style({ opacity: 0 }))]),
]);
