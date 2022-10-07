import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogged$?: Observable<boolean>;
  constructor(private router: Router, private authService: AuthService) {
    this.isLogged$ = authService.getLoggedInObservable;
  }

  ngOnInit(): void {}

  logOut() {
    this.authService.logOut();
    this.router.navigate(['auth/login']);
  }
}
