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
  imports: [NgxEditorModule,  ReactiveFormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit, OnDestroy {
  placeholder = input<string>('Type here...');
  controller = input.required<FormControl>();
  minLength = input<number>(0);
  maxLength = input<number>(1000);
  outputFormat = input<'html' | 'doc'>('doc');

  editor: Editor = new Editor({
    history: true,
    keyboardShortcuts: true,
    inputRules: true,
    features: {linkOnPaste: true, resizeImage: true}, 
  });

  toolbar: Toolbar = [
    ['bold', 'italic', 'underline', 'strike'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['format_clear'],
  ];

  ngOnInit(): void {
    this.editor.commands.focus().exec();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
