import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelize'
})
export class CamelizePipe implements PipeTransform {

  transform(str: any, args?: any): any {     
      return str.replace(/\W+(.)/g, function(match, chr) {
        return chr.toUpperCase();
    });
  }
}