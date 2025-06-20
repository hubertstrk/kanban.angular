import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild,} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";

import * as monaco from 'monaco-editor';
import {Subject, takeUntil} from 'rxjs';
import {Store} from '@ngrx/store';
import {MonacoEditorModule} from 'ngx-monaco-editor-v2';

import {AppState, SettingsSelectors} from '@store/index';

import {editorOptions} from './monaco-options';

@Component({
  selector: 'app-monaco-editor',
  standalone: true,
  imports: [CommonModule, MonacoEditorModule, FormsModule],
  templateUrl: './app-monaco-editor.component.html',
})
export class MonacoEditorComponent implements OnInit, OnDestroy {
  @ViewChild('editorContainer', {static: true}) editorContainer!: ElementRef;

  @Input() content: string = '';

  @Output() contentChange = new EventEmitter<string>();

  private monacoInstance!: monaco.editor.IStandaloneCodeEditor;

  editorOptions = editorOptions;

  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select(SettingsSelectors.selectDarkMode)
      .pipe(takeUntil(this.destroy$))
      .subscribe(isDarkMode => {
        this.editorOptions = {
          ...this.editorOptions,
          theme: isDarkMode ? 'vs-dark' : 'vs-light'
        };
      });
  }

  onEditorInit(editor: monaco.editor.IStandaloneCodeEditor) {
    this.monacoInstance = editor;
  }

  onTextChange(value: string) {
    if (!value || value.length === 0) return;
    this.content = value;
    this.contentChange.emit(this.content);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
