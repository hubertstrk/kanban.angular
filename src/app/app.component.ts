import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {Subject} from "rxjs";

import {Store} from '@ngrx/store';
import {loadSettings} from '@store/settings/settings.actions';
import {loadTasks} from '@store/tasks/tasks.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadSettings());
    this.store.dispatch(loadTasks());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
