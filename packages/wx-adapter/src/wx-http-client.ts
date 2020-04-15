import { IAnyresRequestOptions, IAnyresResponse } from '@anyres/core';
import '@minapp/wx';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

// tslint:disable-next-line: max-classes-per-file
export class WxHttpClientRequestInterceptor {
  constructor(
    public handle: (req: {
      url: string;
      options?: IAnyresRequestOptions;
    }) => Observable<{
      url: string;
      options?: IAnyresRequestOptions;
    }>,
  ) {}
}
// tslint:disable-next-line: max-classes-per-file
export class WxHttpClientResponseInterceptor {
  constructor(public handle: (res: IAnyresResponse) => Observable<IAnyresResponse>) {}
}

function paramsToUrl(url: string, params: { [key: string]: string }): string {
  const paramString = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  const [base, query] = url.split('?');
  if (query === undefined) {
    return `${base}?${paramString}`;
  } else {
    return `${url}&${paramString}`;
  }
}

// tslint:disable-next-line: max-classes-per-file
export class WxHttpClient {
  constructor(
    public interceptor: {
      requestInterceptor?: WxHttpClientRequestInterceptor;
      responseInterceptor?: WxHttpClientResponseInterceptor;
    } = {},
  ) {}
  public get<T>(url: string, options?: IAnyresRequestOptions): Observable<T> {
    options = {
      headers: {},
      params: {},
      ...(options || {}),
    };
    let newReq: Observable<{
      url: string;
      options?: IAnyresRequestOptions;
    }> = Observable.create((observer) => {
      observer.next({
        url,
        options,
      });
    });
    if (this.interceptor.requestInterceptor) {
      newReq = this.interceptor.requestInterceptor.handle({
        url,
        options,
      });
    }
    return newReq.pipe(
      switchMap((req) => {
        return from(
          new Promise<IAnyresResponse>((resolve, reject) => {
            wx.request({
              url: paramsToUrl(req.url, req.options.params),
              header: req.options.headers,
              method: 'GET',
              dataType: 'json',
              success: (response) => {
                resolve({
                  status: response.statusCode,
                  headers: response.header,
                  body: response.data,
                  json: () => response.data,
                });
              },
              fail: (err) => {
                reject(err);
              },
            });
          }),
        );
      }),
      switchMap((response) => {
        let newRes: Observable<IAnyresResponse> = Observable.create((observer) => {
          observer.next(response);
        });
        if (this.interceptor.responseInterceptor) {
          newRes = this.interceptor.responseInterceptor.handle(response);
        }
        return newRes;
      }),
      map((res) => res.body as T),
    );
  }
  public post<T>(url: string, body: any | null, options?: IAnyresRequestOptions): Observable<T> {
    options = {
      headers: {},
      params: {},
      body: body || {},
      ...(options || {}),
    };
    let newReq: Observable<{
      url: string;
      options?: IAnyresRequestOptions;
    }> = Observable.create((observer) => {
      observer.next({
        url,
        options,
      });
    });
    if (this.interceptor.requestInterceptor) {
      newReq = this.interceptor.requestInterceptor.handle({
        url,
        options,
      });
    }
    return newReq.pipe(
      switchMap((req) => {
        return from(
          new Promise<IAnyresResponse>((resolve, reject) => {
            wx.request({
              url: paramsToUrl(req.url, req.options.params),
              header: req.options.headers,
              data: req.options.body,
              method: 'POST',
              dataType: 'json',
              success: (response) => {
                resolve({
                  status: response.statusCode,
                  headers: response.header,
                  body: response.data,
                  json: () => response.data,
                });
              },
              fail: (err) => {
                reject(err);
              },
            });
          }),
        );
      }),
      switchMap((response) => {
        let newRes: Observable<IAnyresResponse> = Observable.create((observer) => {
          observer.next(response);
        });
        if (this.interceptor.responseInterceptor) {
          newRes = this.interceptor.responseInterceptor.handle(response);
        }
        return newRes;
      }),
      map((res) => res.body as T),
    );
  }

  public put<T>(url: string, body: any | null, options?: IAnyresRequestOptions): Observable<T> {
    options = {
      headers: {},
      params: {},
      body: body || {},
      ...(options || {}),
    };
    let newReq: Observable<{
      url: string;
      options?: IAnyresRequestOptions;
    }> = Observable.create((observer) => {
      observer.next({
        url,
        options,
      });
    });
    if (this.interceptor.requestInterceptor) {
      newReq = this.interceptor.requestInterceptor.handle({
        url,
        options,
      });
    }
    return newReq.pipe(
      switchMap((req) => {
        return from(
          new Promise<IAnyresResponse>((resolve, reject) => {
            wx.request({
              url: paramsToUrl(req.url, req.options.params),
              header: req.options.headers,
              data: req.options.body,
              method: 'PUT',
              dataType: 'json',
              success: (response) => {
                resolve({
                  status: response.statusCode,
                  headers: response.header,
                  body: response.data,
                  json: () => response.data,
                });
              },
              fail: (err) => {
                reject(err);
              },
            });
          }),
        );
      }),
      switchMap((response) => {
        let newRes: Observable<IAnyresResponse> = Observable.create((observer) => {
          observer.next(response);
        });
        if (this.interceptor.responseInterceptor) {
          newRes = this.interceptor.responseInterceptor.handle(response);
        }
        return newRes;
      }),
      map((res) => res.body as T),
    );
  }
  public patch<T>(url: string, body: any | null, options?: IAnyresRequestOptions): Observable<T> {
    options = {
      headers: {},
      params: {},
      body: body || {},
      ...(options || {}),
    };
    let newReq: Observable<{
      url: string;
      options?: IAnyresRequestOptions;
    }> = Observable.create((observer) => {
      observer.next({
        url,
        options,
      });
    });
    if (this.interceptor.requestInterceptor) {
      newReq = this.interceptor.requestInterceptor.handle({
        url,
        options,
      });
    }
    return newReq.pipe(
      switchMap((req) => {
        return from(
          new Promise<IAnyresResponse>((resolve, reject) => {
            wx.request({
              url: paramsToUrl(req.url, req.options.params),
              header: req.options.headers,
              data: req.options.body,
              method: 'PUT',
              dataType: 'json',
              success: (response) => {
                resolve({
                  status: response.statusCode,
                  headers: response.header,
                  body: response.data,
                  json: () => response.data,
                });
              },
              fail: (err) => {
                reject(err);
              },
            });
          }),
        );
      }),
      switchMap((response) => {
        let newRes: Observable<IAnyresResponse> = Observable.create((observer) => {
          observer.next(response);
        });
        if (this.interceptor.responseInterceptor) {
          newRes = this.interceptor.responseInterceptor.handle(response);
        }
        return newRes;
      }),
      map((res) => res.body as T),
    );
  }
  public delete<T>(url: string, options?: IAnyresRequestOptions): Observable<T> {
    options = {
      headers: {},
      params: {},
      body: {},
      ...(options || {}),
    };
    let newReq: Observable<{
      url: string;
      options?: IAnyresRequestOptions;
    }> = Observable.create((observer) => {
      observer.next({
        url,
        options,
      });
    });
    if (this.interceptor.requestInterceptor) {
      newReq = this.interceptor.requestInterceptor.handle({
        url,
        options,
      });
    }
    return newReq.pipe(
      switchMap((req) => {
        return from(
          new Promise<IAnyresResponse>((resolve, reject) => {
            wx.request({
              url: paramsToUrl(req.url, req.options.params),
              header: req.options.headers,
              method: 'DELETE',
              dataType: 'json',
              success: (response) => {
                resolve({
                  status: response.statusCode,
                  headers: response.header,
                  body: response.data,
                  json: () => response.data,
                });
              },
              fail: (err) => {
                reject(err);
              },
            });
          }),
        );
      }),
      switchMap((response) => {
        let newRes: Observable<IAnyresResponse> = Observable.create((observer) => {
          observer.next(response);
        });
        if (this.interceptor.responseInterceptor) {
          newRes = this.interceptor.responseInterceptor.handle(response);
        }
        return newRes;
      }),
      map((res) => res.body as T),
    );
  }
}
