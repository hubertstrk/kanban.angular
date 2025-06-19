import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DropdownOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-dropdown.component.html',
})
export class DropdownComponent {
  @Input() options: DropdownOption[] = [];
  @Input() placeholder: string = 'Select an option';
  @Input() selectedValue: string | null = null;

  @Output() selectionChange = new EventEmitter<string>();

  isOpen = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(value: string) {
    this.selectedValue = value;
    this.selectionChange.emit(value);
    this.isOpen = false;
  }

  getSelectedLabel(): string {
    if (!this.selectedValue) {
      return this.placeholder;
    }

    const selectedOption = this.options.find(option => option.value === this.selectedValue);
    return selectedOption ? selectedOption.label : this.placeholder;
  }
}
