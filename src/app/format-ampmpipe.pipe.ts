import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatAMPM',
  standalone: true
})
export class FormatAMMPipe implements PipeTransform {

  transform(value: string | number): string {
    if (!value) return '';  // Return an empty string if value is falsy

    let date: Date;

    // Explicitly check and handle 'string' and 'number' types.
    if (typeof value === 'string' || typeof value === 'number') {
      date = new Date(value);  // Use value directly for Date parsing
    } else {
      return '';  // Return empty string if value is neither string nor number
    }

    // Check if the date is invalid (e.g., invalid date string or NaN)
    if (isNaN(date.getTime())) {
      return '';  // Return an empty string if the date is invalid
    }

    let hours = date.getHours();  // Get the hours
    let minutes = (date.getMinutes());  // Get the minutes
    
    let ampm = hours >= 12 ? 'PM' : 'AM';  // Determine AM/PM
    
    // Convert hour from 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12;  // If hours is 0, change it to 12 (12 AM case)
    
    // Format minutes to always show two digits (e.g., 09 instead of 9)
    minutes = minutes < 10 ? 0 + minutes : minutes;
    
    // Combine hours, minutes, and AM/PM into the final string
    let strTime = `${hours}:${minutes} ${ampm}`;
    
    return strTime;  // Return formatted time
  }
}
