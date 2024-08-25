import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core'; // datetime picker component
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';

@Component({
  selector: 'app-date-time-picker',
  standalone: true,
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.css'],
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDatetimepickerModule,
    MatMomentDatetimeModule,
    CommonModule,
  ],
})

export class DateTimePickerComponent {
  selectedDate: Date | null = null;
  selectedTime: string = '';

  get formattedDateTime(): string {
    if (!this.selectedDate || !this.selectedTime) {
      return '';
    }

    const [hours, minutes] = this.selectedTime.split(':');
    const date = new Date(this.selectedDate);
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));

    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  }
}
