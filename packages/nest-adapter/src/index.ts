import {
  IAnyresRequestOptions,
  IAnyresResponse,
  IHttpAdapter
} from "@anyres/core";
import { HttpService } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AxiosResponse } from "axios";

export class NestAdapter implements IHttpAdapter {
  constructor(private http: HttpService) {}
  public get(
    url: string,
    options?: IAnyresRequestOptions
  ): Observable<IAnyresResponse> {
    if (!options) {
      options = {
        headers: {},
        params: {}
      };
    }
    return this.http
      .get(url, {
        headers: options.headers,
        params: options.params,
        responseType: "json"
      })
      .pipe(
        map((response: AxiosResponse<any>) => {
          return {
            status: response.status,
            headers: response.headers,
            body: response.data,
            json: () => response.data
          };
        })
      );
  }

  public post(
    url: string,
    options?: IAnyresRequestOptions
  ): Observable<IAnyresResponse> {
    if (!options) {
      options = {
        headers: {},
        params: {}
      };
    }
    return this.http
      .post(url, options.body, {
        headers: options.headers,
        params: options.params,
        responseType: "json"
      })
      .pipe(
        map((response: AxiosResponse<any>) => {
          return {
            status: response.status,
            headers: response.headers,
            body: response.data,
            json: () => response.data
          };
        })
      );
  }

  public put(
    url: string,
    options?: IAnyresRequestOptions
  ): Observable<IAnyresResponse> {
    if (!options) {
      options = {
        headers: {},
        params: {}
      };
    }
    return this.http
      .put(url, options.body, {
        headers: options.headers,
        params: options.params,
        responseType: "json"
      })
      .pipe(
        map((response: AxiosResponse<any>) => {
          return {
            status: response.status,
            headers: response.headers,
            body: response.data,
            json: () => response.data
          };
        })
      );
  }

  public delete(
    url: string,
    options?: IAnyresRequestOptions
  ): Observable<IAnyresResponse> {
    if (!options) {
      options = {
        headers: {},
        params: {}
      };
    }
    return this.http
      .delete(url, {
        headers: options.headers,
        params: options.params,
        responseType: "json"
      })
      .pipe(
        map((response: AxiosResponse<any>) => {
          return {
            status: response.status,
            headers: response.headers,
            body: response.data,
            json: () => response.data
          };
        })
      );
  }

  public patch(
    url: string,
    options?: IAnyresRequestOptions
  ): Observable<IAnyresResponse> {
    if (!options) {
      options = {
        headers: {},
        params: {}
      };
    }
    return this.http
      .patch(url, options.body, {
        headers: options.headers,
        params: options.params,
        responseType: "json"
      })
      .pipe(
        map((response: AxiosResponse<any>) => {
          return {
            status: response.status,
            headers: response.headers,
            body: response.data,
            json: () => response.data
          };
        })
      );
  }
}
