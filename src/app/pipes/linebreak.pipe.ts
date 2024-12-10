import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linebreak'
})
export class LinebreakPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    let formattedText = value.replace(/\.\s?/g, '.<br>\n<br>');
    return formattedText;
  }

}
