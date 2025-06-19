import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app-date-picker.component.html',
})
export class DatePickerComponent {

  selectedDate: string | null = null;

  @Input() set date(value: string | null) {
    this.selectedDate = value;
  }

  @Output() dateChange = new EventEmitter<string>();

  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedDate = input.value;
    this.dateChange.emit(input.value);
  }
}
