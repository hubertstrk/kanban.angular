import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {getCurrentWebviewWindow} from '@tauri-apps/api/webviewWindow';
import {Subject, takeUntil} from 'rxjs';
import {IconService} from "@services/icons.service";
import {SafeHtml} from '@angular/platform-browser';

import {ButtonComponent} from '../shared/button/app-button.component';

const appWindow = getCurrentWebviewWindow();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  providers: [IconService],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  icons: { [key: string]: SafeHtml } = {};

  constructor(
    private iconService: IconService
  ) {
  }

  ngOnInit() {
    this.iconService
      .getIcons([
        'material-symbols-light--minimize-rounded',
        'material-symbols-light--square-outline-rounded',
        'material-symbols-light--close-rounded',
      ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(icons => {
        this.icons = icons;
      });
  }

  minimizeWindow() {
    void appWindow.minimize();
  }

  maximizeWindow() {
    void appWindow.toggleMaximize();
  }

  closeWindow() {
    void appWindow.close();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
