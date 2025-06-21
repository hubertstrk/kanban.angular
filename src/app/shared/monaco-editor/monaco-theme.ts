import {editor} from "monaco-editor";
import IStandaloneThemeData = editor.IStandaloneThemeData;

export enum EditorThemeNames {
  Dark = 'app-dark',
  Light = 'app-light',
}

export const EditorThemes: Record<string, IStandaloneThemeData> = {
  [EditorThemeNames.Dark]: {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#0e0e9c',
      'editor.foreground': '#4ade80',
      'editorCursor.foreground': '#4ade80',
      'editor.lineHighlightBackground': '#4f4f5a',
      'editorLineNumber.foreground': '#8b8b8b',
      'editorLineNumber.activeForeground': '#c6c6c6'
    }

  },
  [EditorThemeNames.Light]: {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#f4f4f5',
      'editor.foreground': '#3f3f46',
      'editorCursor.foreground': '#3f3f46',
      'editor.lineHighlightBackground': '#e5e5e5',
      'editorLineNumber.foreground': '#6b7280',
      'editorLineNumber.activeForeground': '#1f2937'
    }
  },
}
