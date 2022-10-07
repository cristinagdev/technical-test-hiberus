import { Component, OnInit } from '@angular/core';
import { userLogged } from 'src/app/auth/interfaces/userLogged.interface';
import { UserResponse } from '../../interfaces/userResponse.interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserlistService } from '../../services/userlist.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  usersList: UserResponse[] = [];
  editForm: FormGroup;
  userLogged?: userLogged;
  page: number = 0;
  errorMessage?: string;
  id: string = '';

  constructor(
    private usersService: UserlistService,
    private authService: AuthService
  ) {
    this.editForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      surname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getUserLogged();

    this.getAllUsers();
  }

  getAllUsers() {
    this.usersService.getUsers().subscribe((data) => {
      const { items } = data;
      this.usersList = items;
    });
  }

  getUserLogged() {
    this.authService.getUser().subscribe((user) => {
      this.userLogged = user;
    });
  }

  deleteUser(id: string) {
    this.usersService.deleteUserById(id).subscribe({
      next: (data) => {},
      error: (error) => {
        if (error) {
          this.errorMessage = 'Algo ha ido mal inténtalo de nuevo más tarde';
        }
        Swal.fire({
          title: 'Oops...',
          text: this.errorMessage,
          icon: 'error',
        });
      },
      complete: () => {
        Swal.fire({
          title: '¡Usuario borrado!',
          text: 'Has borrado un usuario',
          icon: 'success',
        });
        this.getAllUsers();
      },
    });
  }

  getUserId(id: string) {
    this.id = id;
  }

  editUser(id: string) {
    this.usersService.updateUserById(this.id, this.editForm.value).subscribe({
      next: (data) => {},
      error: (error) => {
        if (error) {
          this.errorMessage = 'Algo ha ido mal inténtalo de nuevo más tarde';
        }
        Swal.fire({
          title: 'Oops...',
          text: this.errorMessage,
          icon: 'error',
        });
      },
      complete: () => {
        this.editForm.reset();
        Swal.fire({
          title: '¡Usuario editado!',
          text: 'Has editado un usuario',
          icon: 'success',
        });
        this.getAllUsers();
      },
    });
  }

  checkForm(controlName: string, errorName: string): boolean {
    if (
      this.editForm.get(controlName)?.hasError(errorName) &&
      this.editForm.get(controlName)?.touched
    ) {
      return true;
    } else {
      return false;
    }
  }

  nextPage() {
    this.page += 8;
  }

  previousPage() {
    if (this.page > 0) {
      this.page -= 8;
    }
  }
}
