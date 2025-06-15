import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {getCurrentWebviewWindow} from '@tauri-apps/api/webviewWindow';
import {Subject, takeUntil} from 'rxjs';
import {IconService} from "@services/icons.service";
import {SafeHtml} from '@angular/platform-browser';
import {SettingsService} from '@services/settings.service';
import {Settings} from '@models/settings.model';

import {ButtonComponent} from '../shared/button/app-button.component';
import {ModalComponent} from '../shared/modal/app-modal.component';
import {TextInputComponent} from '../shared/text-input/app-text-input.component';

const appWindow = getCurrentWebviewWindow();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, ModalComponent, TextInputComponent],
  providers: [IconService],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  icons: { [key: string]: SafeHtml } = {};
  settings: Settings | null = null;

  // Modal control
  isModalOpen = false;
  taskName = '';
  taskDescription = '';

  constructor(
    private iconService: IconService,
    private settingsService: SettingsService
  ) {
  }

  ngOnInit(): void {
    // load settings
    this.settingsService.readSettings()
      .pipe(takeUntil(this.destroy$))
      .subscribe(settings => {
        this.settings = settings;
        this.applyTheme();
      });

    // load icons
    this.iconService
      .getIcons([
        'material-symbols-light--minimize-rounded',
        'material-symbols-light--square-outline-rounded',
        'material-symbols-light--close-rounded',
        'fluent--dark-theme-24-filled',
        'fluent--weather-sunny-24-regular',
        'material-symbols-light--add'
      ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(icons => {
        this.icons = icons;
      });
  }

  toggleDarkMode(): void {
    if (this.settings) {
      this.settings.dark = !this.settings.dark;
      this.settingsService.saveSettings(this.settings)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.applyTheme();
        });
    }
  }

  createNewTask(): void {
    this.isModalOpen = true;
    this.taskName = '';
    this.taskDescription = '';
  }

  saveTask(): void {
    console.log('Task saved:', {name: this.taskName, description: this.taskDescription});
    this.closeModal();
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  minimizeWindow(): void {
    void appWindow.minimize();
  }

  maximizeWindow(): void {
    void appWindow.toggleMaximize();
  }

  closeWindow(): void {
    void appWindow.close();
  }

  private applyTheme(): void {
    this.settings?.dark
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
