import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';

const appWindow = getCurrentWebviewWindow();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  title = 'Kanban Board';

  minimizeWindow() {
    void appWindow.minimize();
  }

  maximizeWindow() {
    void appWindow.toggleMaximize();
  }

  closeWindow() {
    void appWindow.close();
  }
}
