import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild,} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";

import * as monaco from 'monaco-editor';

import {Subject, takeUntil} from 'rxjs';
import {Store} from '@ngrx/store';
import {MonacoEditorModule} from 'ngx-monaco-editor-v2';

import {AppState} from '@store/index';

import {editorOptions} from "@app/shared/monaco-editor/monaco-options";

import {selectDarkMode} from "@store/settings/settings.selectors";

@Component({
  selector: 'app-monaco-editor',
  standalone: true,
  imports: [CommonModule, MonacoEditorModule, FormsModule],
  templateUrl: './app-monaco-editor.component.html'
})
export class MonacoEditorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('editorContainer', {static: true}) editorContainer!: ElementRef;

  @Input() content: string = '';

  @Output() contentChange = new EventEmitter<string>();

  private monacoInstance!: monaco.editor.IStandaloneCodeEditor;

  defaultEditorOptions = editorOptions;

  currentEditorOptions = editorOptions;

  resizeObserver!: ResizeObserver;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
  ) {
  }

  ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver(() => {
      this.monacoInstance?.layout();
    });
    this.resizeObserver.observe(this.editorContainer.nativeElement);
  }

  onEditorInit(editor: monaco.editor.IStandaloneCodeEditor) {
    this.monacoInstance = editor;

    this.store.select(selectDarkMode).pipe(takeUntil(this.destroy$)).subscribe((dark) => {
      const updatedOptions = {
        ...this.defaultEditorOptions,
        theme: dark ? 'vs-dark' : 'vs',
      }
      this.monacoInstance.updateOptions(updatedOptions);
    })
  }

  onTextChange(value: string) {
    if (!value || value.length === 0) return;

    this.content = value;
    this.contentChange.emit(this.content);
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    this.destroy$.next();
    this.destroy$.complete();
  }
}
