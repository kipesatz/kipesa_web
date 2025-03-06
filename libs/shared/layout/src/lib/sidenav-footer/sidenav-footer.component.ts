import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'kps-sidenav-footer',
  imports: [MatIcon, MatIconButton],
  templateUrl: './sidenav-footer.component.html',
  styleUrl: './sidenav-footer.component.scss',
})
export class SidenavFooterComponent {}
