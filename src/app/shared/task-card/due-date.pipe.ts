import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dueDate',
  standalone: true
})
export class DueDatePipe implements PipeTransform {
  transform(dueDate: string): string {
    if (!dueDate) return '';

    const now = new Date();
    const date = new Date(dueDate);
    const difference = Math.floor((now.getTime() - date.getTime()) / 1000);

    return this.formatTimeDifference(Math.abs(difference));
  }

  private formatTimeDifference(seconds: number): string {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);

    if (days > 0) {
      return `${days} day${days !== 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    } else {
      return `${seconds} second${seconds !== 1 ? 's' : ''}`;
    }
  }
}
