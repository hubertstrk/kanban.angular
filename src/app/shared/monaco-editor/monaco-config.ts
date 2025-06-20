import { environment } from '../../../environments/environment';

// This function configures the Monaco editor to load its worker files from the correct location
export function configureMonacoEditor(): void {
  // Set the base path for Monaco editor workers
  const isProduction = environment?.production ?? false;
  const baseUrl = isProduction ?
    window.location.origin + '/assets' :
    '/assets';

  // Configure Monaco's loader
  (window as any).MonacoEnvironment = {
    getWorkerUrl: function (moduleId: string, label: string) {
      if (label === 'json') {
        return `${baseUrl}/monaco/language/json/json.worker.js`;
      }
      if (label === 'css' || label === 'scss' || label === 'less') {
        return `${baseUrl}/monaco/language/css/css.worker.js`;
      }
      if (label === 'html' || label === 'handlebars' || label === 'razor') {
        return `${baseUrl}/monaco/language/html/html.worker.js`;
      }
      if (label === 'typescript' || label === 'javascript') {
        return `${baseUrl}/monaco/language/typescript/ts.worker.js`;
      }
      return `${baseUrl}/monaco/editor/editor.worker.js`;
    }
  };
}
