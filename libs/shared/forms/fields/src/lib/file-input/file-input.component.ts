import { Component, InputSignal, input, output } from '@angular/core';
import { MatCard, MatCardContent, MatCardFooter } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatList, MatListItem } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatHint } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormFieldComponent } from '../form-field/form-field.component';

/**
 * Extracts files from a given fileList to return an array of files
 * @param fileList FileList
 * @returns Array<File>
 */
export function extractFileList(fileList: FileList): Array<File> {
  const files: Array<File> = [];
  for (let index = 0; index < fileList.length; index++) {
    files.push(fileList[index]);
  }

  return files;
}

@Component({
  selector: 'kps-file-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    // card
    MatCard,
    MatCardFooter,
    MatCardContent,
    // lists
    MatListItem,
    MatList,

    // other
    MatDivider,
    MatIcon,
    MatHint,
    MatButtonModule,
  ],
  templateUrl: './file-input.component.html',
  styles: ``,
})
export class FileInputComponent extends FormFieldComponent {
  /** By default does not allow multiple selection */
  multiSelection = input<boolean>(false);
  /** By default, accepts all file formats */
  acceptedFormats: InputSignal<string> = input<string>('*');

  selectedFilesChange = output<FileList>();
  selectedFiles: Array<File> = [];

  onFileSelection($event: Event): void {
    const inputElement: HTMLInputElement = $event.target as HTMLInputElement;
    if (inputElement.files) {
      this.selectedFiles = extractFileList(inputElement.files);
      this.selectedFilesChange.emit(inputElement.files);
    }
  }
}
