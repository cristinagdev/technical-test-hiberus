import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { userLogged } from '../interfaces/userLogged.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.url;
  private loggedIn$ = new BehaviorSubject<boolean>(this.userHasToken());

  constructor(private httpClient: HttpClient) {}

  get getLoggedInObservable(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  register(formValue: userLogged): Observable<any> {
    return this.httpClient
      .post<userLogged>(`${this.baseUrl}auth/sign-up`, formValue)
      .pipe(catchError((error) => this.errorHandler(error)));
  }

  login(formValue: userLogged): Observable<any> {
    return this.httpClient
      .post<userLogged>(`${this.baseUrl}auth/log-in`, formValue)
      .pipe(
        tap(() => {
          this.loggedIn$.next(true);
        }),
        catchError((error) => this.errorHandler(error))
      );
  }

  userHasToken(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.loggedIn$.next(false);
  }

  getUser(): Observable<userLogged> {
    return this.httpClient.get<userLogged>(`${this.baseUrl}users/me`);
  }

  errorHandler(error: HttpErrorResponse): Observable<any> {
    let errorMessage = {};
    if (error) {
      errorMessage = {
        status: error.status,
        message: error.error.message,
      };
    }
    return throwError(() => errorMessage);
  }
}
