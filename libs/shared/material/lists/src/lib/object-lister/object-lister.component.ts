import { Component, contentChild, input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import {
  MatList,
  MatListItem,
  MatListItemLine,
  MatListItemTitle,
} from '@angular/material/list';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';

export type ObjListerDisplayMode = 'colon' | 'table' | 'list';

@Component({
  selector: 'kps-object-lister',
  imports: [
    // card
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,

    // list
    MatList,
    MatListItem,
    MatListItemLine,
    MatListItemTitle,

    // table
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,

    // other
    NgTemplateOutlet,
  ],
  templateUrl: './object-lister.component.html',
  styleUrl: './object-lister.component.scss',
})
export class ObjectListerComponent {
  listGroupTitle = input<string>('');
  data = input<any>();
  displayMode = input<ObjListerDisplayMode>('colon');
  showKeys = input<string[]>([]);
  hideKeys = input<string[]>([]);

  headerActionTemplate = contentChild<TemplateRef<any>>('headerAction');
  customItemTemplate = contentChild<TemplateRef<any>>('customItemTemplate');

  get displayKeys(): string[] {
    let keys = Object.keys(this.data() || {});

    // Filter by showKeys if provided
    if (this.showKeys().length > 0) {
      keys = keys.filter((key) => this.showKeys().includes(key));
    }

    // Filter out hideKeys
    if (this.hideKeys().length > 0) {
      keys = keys.filter((key) => !this.hideKeys().includes(key));
    }

    return keys;
  }

  get tableColumns(): string[] {
    return ['key', 'value'];
  }

  getDisplayLabel(key: string): string {
    return this.extractKeyLabel(key);
  }

  getValue(key: string): any {
    return this.data()[key];
  }

  private extractKeyLabel(camelCaseText: string): string {
    // Split the camelCase text into words
    const words = camelCaseText.split(/(?=[A-Z])/);

    // Capitalize the first letter of the first word and lowercase the rest
    const titleCaseWords = words.map((word, index) => {
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      return word.toLowerCase();
    });

    // Join the words back together with spaces
    return titleCaseWords.join(' ');
  }
}
