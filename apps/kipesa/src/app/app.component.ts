import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { MembershipDataModule } from '@kps/data/associations';
import { map, startWith, timer } from 'rxjs';
import { MyMembershipStore } from './store';

@Component({
  selector: 'kps-root',
  imports: [RouterOutlet, MembershipDataModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MyMembershipStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly myMembershipStore = inject(MyMembershipStore);

  // loading
  pageLoading = toSignal(
    timer(1500).pipe(
      map(() => false),
      startWith(true)
    )
  );
}
