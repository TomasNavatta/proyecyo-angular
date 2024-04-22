import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../../layouts/dashboard/pages/users/models';


@Pipe({
  name: 'nombreCompleto'
})
export class NombreCompletoPipe implements PipeTransform {
  transform(user: IUser): string {
    return `${user.firstName} ${user.lastName}`;
  }
}