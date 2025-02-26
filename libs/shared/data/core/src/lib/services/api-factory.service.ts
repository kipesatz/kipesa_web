import { inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiFactoryService {
  private baseUrl = 'http://localhost:8000'; // Default base URL
  private resourcePath = '';
  private http = inject(HttpClient);

  configure(resourcePath: string, baseUrl?: string): void {
    this.baseUrl = baseUrl ?? this.baseUrl;
    this.resourcePath = resourcePath;
  }

  get<T>(endpoint = '', params?: HttpParams) {
    return this.http.get<T>(`${this.baseUrl}${this.resourcePath}${endpoint}`, {
      params,
    });
  }

  post<T, P>(endpoint = '', payload: P) {
    return this.http.post<T>(
      `${this.baseUrl}${this.resourcePath}${endpoint}`,
      payload
    );
  }

  put<T, P>(endpoint = '', payload: P) {
    return this.http.put<T>(
      `${this.baseUrl}${this.resourcePath}${endpoint}`,
      payload
    );
  }

  delete<T>(endpoint = '') {
    return this.http.delete<T>(
      `${this.baseUrl}${this.resourcePath}${endpoint}`
    );
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}

export interface HttpOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  context?: HttpContext;
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?: {
    includeHeaders?: string[];
  };
}
