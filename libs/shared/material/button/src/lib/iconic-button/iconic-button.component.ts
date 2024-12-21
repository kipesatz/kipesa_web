import { Component, OnInit } from '@angular/core';
import { BaseButtonComponent } from '../base-button/base-button.component';
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'kps-iconic-button',
  templateUrl: './iconic-button.component.html',
  styles: ``,
  standalone: true,
  imports: [RouterLink, MatIconButton, MatIcon],
})
export class IconicButtonComponent
  extends BaseButtonComponent
  implements OnInit
{
  ngOnInit(): void {
    if (!this.icon()) {
      throw Error('IconicButton must have an icon');
    }
  }
}
