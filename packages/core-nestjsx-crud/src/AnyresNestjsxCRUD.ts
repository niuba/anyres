import { AnyresCRUD, IAnyresRequestOptions } from '@anyres/core';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
function buildParams(params: { [key: string]: string }) {
  const paramsArray = [];
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = encodeURIComponent(params[key]);
      paramsArray.push(key + '=' + value);
    }
  }
  return paramsArray.join('&');
}
function buildParamsToUrl(url: string, params: { [key: string]: string }) {
  const paramString = buildParams(params);
  return -1 === url.indexOf('?') ? url + '?' + paramString : url + '&' + paramString;
}
export interface INestjsxResQueryResult<T> {
  count: number;
  data: T[];
  page: number;
  pageCount: number;
  total: number;
}

export interface INestjsxResGet {}

export interface INestjsxResCreate {}

export interface INestjsxResUpdate {}

export class AnyresNestjsxCRUD<
  TG extends INestjsxResGet,
  TC extends INestjsxResCreate,
  TU extends INestjsxResUpdate
> extends AnyresCRUD<RequestQueryBuilder, INestjsxResQueryResult<TG>, TG, TC, TU> {
  public createMany(
    res: TC[],
    options: IAnyresRequestOptions = {
      headers: {},
    },
  ): Observable<TG[]> {
    return this.getHeaders$().pipe(
      switchMap((headers) => {
        return this.httpAdapter.post(`${this.path}/bulk`, {
          body: {
            bulk: res,
          },
          headers: {
            ...headers,
            ...options.headers,
          },
        });
      }),
      map((response) => response.json() as TG[]),
      catchError((err: any) => {
        this.errorHandler(err);
        return throwError(err);
      }),
    );
  }

  public get(
    id: string | number,
    query?: RequestQueryBuilder,
    options: IAnyresRequestOptions = {
      headers: {},
    },
  ): Observable<TG> {
    return this.getHeaders$().pipe(
      switchMap((headers) => {
        return this.httpAdapter.get(`${this.path}/${id}?${query ? query.query() : ''}`, {
          headers: {
            ...headers,
            ...options.headers,
          },
        });
      }),
      map((response) => response.json() as TG),
      catchError((err: any) => {
        this.errorHandler(err);
        return throwError(err);
      }),
    );
  }

  public query(
    query?: RequestQueryBuilder,
    options: IAnyresRequestOptions = {
      body: {},
      headers: {},
      params: {},
    },
  ): Observable<INestjsxResQueryResult<TG>> {
    options.body = options.body || {};
    options.headers = options.headers || {};
    options.params = options.params || {};
    return this.getHeaders$().pipe(
      switchMap((headers) => {
        let url = `${this.path}?${query ? query.query() : ''}`;
        url = buildParamsToUrl(url, options.params);
        return this.httpAdapter.get(url, {
          headers: {
            ...headers,
            ...options.headers,
          },
        });
      }),
      map((response) => response.json() as INestjsxResQueryResult<TG>),
      catchError((err: any) => {
        this.errorHandler(err);
        return throwError(err);
      }),
    );
  }
}
