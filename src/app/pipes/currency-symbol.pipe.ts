import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencySymbol'
})
export class CurrencySymbolPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch(value) {
      case 'euros':
        return '€';
      case 'EU': 
        return '€';
      case 'GBP': 
        return '£';
      case 'USD':
        return '$';
      case 'CFA': 
        return 'CFA';
      default: 
        return value;
    }
  }

}
