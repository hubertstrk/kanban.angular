import {Component, forwardRef, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app-text-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ]
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'number' = 'text';
  @Input() required = false;
  @Input() disabled = false;
  @Input() errorMessage = '';
  @Input() helperText = '';

  value: string = '';
  isFocused = false;

  // ControlValueAccessor implementation
  private onChange: (value: string) => void = () => {
  };
  private onTouched: () => void = () => {
  };

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.isFocused = false;
    this.onTouched();
  }

  onFocus(): void {
    this.isFocused = true;
  }

  /**
   * Get the computed classes for the input container
   */
  get containerClasses(): string {
    return `
      relative mb-4
      ${this.disabled ? 'opacity-60' : ''}
    `;
  }

  /**
   * Get the computed classes for the input element
   */
  get inputClasses(): string {
    return `
      block w-full px-3 py-2 border rounded-md shadow-sm
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
      ${this.errorMessage ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
      ${this.isFocused ? 'border-blue-500' : ''}
      bg-white dark:bg-gray-700
      text-gray-900 dark:text-gray-100
      placeholder-gray-400 dark:placeholder-gray-500
    `;
  }

  /**
   * Get the computed classes for the label
   */
  get labelClasses(): string {
    return `
      block mb-1 text-sm font-medium
      text-gray-700 dark:text-gray-300
      ${this.required ? 'required' : ''}
    `;
  }

  /**
   * Get the computed classes for the helper text
   */
  get helperTextClasses(): string {
    return `
      mt-1 text-sm
      ${this.errorMessage ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}
    `;
  }
}
