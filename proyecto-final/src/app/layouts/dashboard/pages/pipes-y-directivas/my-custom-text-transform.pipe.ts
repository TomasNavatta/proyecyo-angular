import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCustomTextTransform'
})
export class MyCustomTextTransformPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {

    if (args[0] === 'u') {
      return value.toLowerCase();

    }else {
      return value.toUpperCase()
    }

  }

}
