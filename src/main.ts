import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from '@app/app.config';
import {AppComponent} from '@app/app.component';
import {configureMonacoEditor} from '@app/shared/monaco-editor/monaco-config';

// Configure Monaco environment
configureMonacoEditor();

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
