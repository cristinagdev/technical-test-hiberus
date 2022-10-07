import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../interfaces/userResponse.interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserlistService {
  private baseUrl = environment.url;

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<any> {
    return this.httpClient.get<UserResponse[]>(`${this.baseUrl}users`);
  }

  getUserById(id: string): Observable<UserResponse> {
    return this.httpClient
      .get<UserResponse>(`${this.baseUrl}users/${id}`)
      .pipe(catchError((error) => this.errorHandler(error)));
  }

  deleteUserById(id: string): Observable<any> {
    return this.httpClient
      .delete<UserResponse>(`${this.baseUrl}users/${id}`)
      .pipe(catchError((error) => this.errorHandler(error)));
  }

  updateUserById(id: string, body: any): Observable<UserResponse> {
    return this.httpClient
      .put<UserResponse>(`${this.baseUrl}users/${id}`, body)
      .pipe(catchError((error) => this.errorHandler(error)));
  }

  errorHandler(error: HttpErrorResponse): Observable<any> {
    let errorMessage = {};
    console.log(error);
    if (error) {
      errorMessage = {
        status: error.status,
        message: error.error.message,
      };
    }
    return throwError(() => errorMessage);
  }
}
