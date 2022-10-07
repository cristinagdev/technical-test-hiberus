import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: any;

  constructor(private authService: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      surname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {},
      error: (error) => {
        if (error.status === 409) {
          this.errorMessage = 'El email ya existe';
        } else {
          this.errorMessage = 'Algo ha ido mal. Inténtalo de nuevo más tarde';
        }
      },
      complete: () => {
        Swal.fire({
          title: '¡Usuario registrado!',
          text: 'Inicia Sesión',
          icon: 'success',
        });
        this.router.navigate(['auth/login']);
      },
    });
  }

  checkForm(controlName: string, errorName: string): boolean {
    if (
      this.registerForm.get(controlName)?.hasError(errorName) &&
      this.registerForm.get(controlName)?.touched
    ) {
      return true;
    } else {
      return false;
    }
  }
}
