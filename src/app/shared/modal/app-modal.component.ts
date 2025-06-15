import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IconService} from '@services/icons.service';
import {SafeHtml} from '@angular/platform-browser';
import {ButtonComponent} from '../button/app-button.component';
import {AppDeviderComponent} from '../devider/app-devider.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent, AppDeviderComponent],
  templateUrl: './app-modal.component.html',
  providers: [IconService],
})
export class ModalComponent implements OnInit {
  @Input() isOpen = false;
  @Input() closeOnBackdropClick = true;

  @Output() closed = new EventEmitter<void>();

  icons: { [key: string]: SafeHtml } = {};

  constructor(private iconService: IconService) {
  }

  ngOnInit(): void {
    this.iconService.getIcons([
      'material-symbols-light--close-rounded'
    ]).subscribe((icons: { [key: string]: SafeHtml }) => {
      this.icons = icons;
    });
  }

  close(): void {
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdropClick && event.target === event.currentTarget) {
      this.close();
    }
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }

  get backdropClasses(): string {
    return 'fixed inset-0 backdrop-blur-sm';
  }

  get modalClasses(): string {
    return `
      fixed inset-0 z-50 flex items-center justify-center overflow-y-auto
      ${this.isOpen ? 'visible' : 'invisible'}
    `;
  }

  get contentClasses(): string {
    return `
      bg-white dark:bg-zinc-800 text-black dark:text-neutral-100 rounded-lg shadow-xl transform transition-all
      w-4/5 md:w-1/2 mx-auto
      ${this.isOpen ? 'translate-y-0' : '-translate-y-4'}
    `;
  }
}
