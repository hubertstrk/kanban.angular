import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { getVersion } from '@tauri-apps/api/app';
import { getCurrentWindow } from '@tauri-apps/api/window';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'kanban-app';
  appVersion = '';
  windowTitle = '';

  async ngOnInit() {
    try {

      const window = getCurrentWindow();

      // Get the app version from Tauri
      this.appVersion = await getVersion();

      // Get the window title
      this.windowTitle = await window.title();

      console.log('App version:', this.appVersion);
      console.log('Window title:', this.windowTitle);
    } catch (error) {
      console.error('Error initializing Tauri API:', error);
    }
  }
}
