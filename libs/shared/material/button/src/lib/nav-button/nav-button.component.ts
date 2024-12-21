import { Component, InputSignal, OnInit, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'kps-nav-button',
  templateUrl: './nav-button.component.html',
  styles: ``,
  standalone: true,
  imports: [RouterLinkWithHref, RouterLinkActive, MatButton, MatIcon],
})
export class NavButtonComponent implements OnInit {
  iconName: InputSignal<string | undefined> = input<string>();
  buttonText: InputSignal<string | undefined> = input<string>();

  /**Provides navigation link for the button defualts to `null` */
  navLink = input<string[] | undefined | null>(null);

  ngOnInit(): void {
    this.checkInputErrors();
  }

  private checkInputErrors(): void {
    if (!this.iconName() && !this.buttonText()) {
      throw Error(
        'Please provide one either `buttonText` or `iconName` or both'
      );
    }
  }
}
