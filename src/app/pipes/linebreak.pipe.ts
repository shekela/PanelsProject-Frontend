import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linebreak'
})
export class LinebreakPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value) return ''; // Handle null or undefined values
    return value.replace(/\.\s?/g, '.<br>'); // Replace periods with a single <br> tag
  }

}
