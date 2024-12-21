import { Component, OnInit, input } from '@angular/core';
import { BaseButtonComponent } from '../base-button/base-button.component';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'kps-button',
  templateUrl: './button.component.html',
  styleUrls: ['button.component.scss'],
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIcon, NgClass, NgTemplateOutlet],
})
export class ButtonComponent extends BaseButtonComponent implements OnInit {
  text = input<string | undefined>();
  isFullWidth = input<boolean>(false);

  ngOnInit(): void {
    if (!this.text() && !this.icon()) {
      throw Error('Please provide either icon or text or both to the button');
    }
  }
}
