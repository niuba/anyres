
import { HttpClient, HttpResponse } from '@angular/common/http';
import {
  IAnyresRequestOptions,
  IAnyresResponse,
  IHttpAdapter,
} from '@anyres/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class AngularHttpClientAdapter implements IHttpAdapter {

  constructor(private http: HttpClient) {
  }
  public get(url: string, options?: IAnyresRequestOptions): Observable<IAnyresResponse> {
    if (!options) {
      options = {
        headers: {},
        params: {},
      };
    }
    return this.http.get(url, {
      headers: options.headers,
      observe: 'response',
      params: options.params,
      responseType: 'json',
    }).pipe(
      map((response: HttpResponse<object>) => {
        return {
          status: response.status,
          headers: response.headers,
          body: response.body,
          json: () => response.body,
        };
      }));
  }

  public post(url: string, options?: IAnyresRequestOptions): Observable<IAnyresResponse> {
    if (!options) {
      options = {
        headers: {},
        params: {},
      };
    }
    return this.http.post(url, options.body, {
      headers: options.headers,
      observe: 'response',
      params: options.params,
      responseType: 'json',
    }).pipe(
      map((response: HttpResponse<object>) => {
        return {
          status: response.status,
          headers: response.headers,
          body: response.body,
          json: () => response.body,
        };
      }));
  }

  public put(url: string, options?: IAnyresRequestOptions): Observable<IAnyresResponse> {
    if (!options) {
      options = {
        headers: {},
        params: {},
      };
    }
    return this.http.put(url, options.body, {
      headers: options.headers,
      observe: 'response',
      params: options.params,
      responseType: 'json',
    }).pipe(
      map((response: HttpResponse<object>) => {
        return {
          status: response.status,
          headers: response.headers,
          body: response.body,
          json: () => response.body,
        };
      }));
  }

  public delete(url: string, options?: IAnyresRequestOptions): Observable<IAnyresResponse> {
    if (!options) {
      options = {
        headers: {},
        params: {},
      };
    }
    return this.http.delete(url, {
      headers: options.headers,
      observe: 'response',
      params: options.params,
      responseType: 'json',
    }).pipe(
      map((response: HttpResponse<object>) => {
        return {
          status: response.status,
          headers: response.headers,
          body: response.body,
          json: () => response.body,
        };
      }));
  }

  public patch(url: string, options?: IAnyresRequestOptions): Observable<IAnyresResponse> {
    if (!options) {
      options = {
        headers: {},
        params: {},
      };
    }
    return this.http.patch(url, options.body, {
      headers: options.headers,
      observe: 'response',
      params: options.params,
      responseType: 'json',
    }).pipe(
      map((response: HttpResponse<object>) => {
        return {
          status: response.status,
          headers: response.headers,
          body: response.body,
          json: () => response.body,
        };
      }));
  }

}

