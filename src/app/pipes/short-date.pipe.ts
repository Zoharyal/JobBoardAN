import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDate'
})
export class ShortDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value.toLowerCase() === 'asap') {
      return 'dès que possible';
    } else if (value.indexOf('-') > -1 ) {
      let fullDate, rest;
      [fullDate, rest] = value.toLowerCase().split('t');

      let year, month, date;
      [year, month, date] = fullDate.split('-');

      return `${date}/${month}/${year}`;

    } else {
        return '--';
    }
  }

}
