import { Component, OnInit } from '@angular/core';
import { userLogged } from 'src/app/auth/interfaces/userLogged.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserlistService } from '../../services/userlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userLogged?: userLogged;
  id: string = '';
  errorMessage?: string;
  userProfileForm: FormGroup;

  constructor(
    private authService: AuthService,
    private usersService: UserlistService
  ) {
    this.userProfileForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      surname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getUserLogged();
  }

  getUserLogged() {
    this.authService.getUser().subscribe((user) => {
      this.userLogged = user;
    });
  }

  editProfile(id: any) {
    this.usersService.updateUserById(id, this.userProfileForm.value).subscribe({
      next: (data) => {
        console.log(data);
      },
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
        this.userProfileForm.reset();
        Swal.fire({
          title: '¡Usuario editado!',
          text: 'Has editado un usuario',
          icon: 'success',
        });
        this.getUserLogged();
      },
    });
  }
}
