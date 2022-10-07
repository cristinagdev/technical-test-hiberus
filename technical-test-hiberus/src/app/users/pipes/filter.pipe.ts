import { Pipe, PipeTransform } from '@angular/core';
import { userLogged } from 'src/app/auth/interfaces/userLogged.interface';
import { UserResponse } from '../interfaces/userResponse.interfaces';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    users: UserResponse[],
    page: number = 0,
    user: userLogged | undefined
  ): UserResponse[] {
    const userListFiltered = users.filter((users) => {
      return users.id != user?.id;
    });

    return userListFiltered.slice(page, page + 8);
  }
}
