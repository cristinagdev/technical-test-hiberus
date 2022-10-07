import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage?: string;

  constructor(private router: Router, private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        const { accessToken } = response;
        localStorage.setItem('token', accessToken);
      },
      error: (error) => {
        if (error.status === 404) {
          this.errorMessage = 'Email o contraseña incorrecta';
        } else {
          this.errorMessage = 'Algo ha ido mal. Inténtalo de nuevo más tarde';
        }
      },
      complete: () => {
        this.router.navigate(['/users/users-list']);
      },
    });
  }

  checkForm(controlName: string, errorName: string): boolean {
    if (
      this.loginForm.get(controlName)?.hasError(errorName) &&
      this.loginForm.get(controlName)?.touched
    ) {
      return true;
    } else {
      return false;
    }
  }
}
