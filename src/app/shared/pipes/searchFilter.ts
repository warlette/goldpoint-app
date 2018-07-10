import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'searchfilter'
})

@Injectable()
export class SearchFilterPipe implements PipeTransform {
 transform(items: any[], field: string, value: string): any[] {
   if (!items) return [];
   if (!field) return items;
   return items.filter(it => {
       //it[field] == value
       var searchee = "";
       if (typeof it[field] === 'string') {
        searchee = it[field];
        value = value || "";
        if (searchee.toLowerCase().includes(value.toLowerCase())) {
            return true;
        }
       } else {
           return (it[field] == value);
       }
   });
 }
}