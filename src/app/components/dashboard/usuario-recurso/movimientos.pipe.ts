import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movimientos'
})
export class MovimientosPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
