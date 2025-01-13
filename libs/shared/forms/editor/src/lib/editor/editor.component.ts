import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'kps-editor',
  imports: [NgxEditorModule, ReactiveFormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit, OnDestroy {
  placeholder = input<string>('Type here...');
  control = input.required<FormControl>();
  minLength = input<number>(0);
  maxLength = input<number>(1000);
  outputFormat = input<'html' | 'doc'>('doc');

  editor: Editor = new Editor();

  toolbar: Toolbar = [
    ['bold', 'italic', 'underline'],
    ['ordered_list', 'bullet_list'],
    ['link'],
    ['align_left', 'align_center', 'align_right'],
    ['undo', 'redo'],
  ];

  ngOnInit(): void {
    this.editor.commands.focus().exec();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
