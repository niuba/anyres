import { AnyresCRUD, IAnyresRequestOptions } from '@anyres/core';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

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
> extends AnyresCRUD<
  RequestQueryBuilder,
  INestjsxResQueryResult<TG>,
  TG,
  TC,
  TU
> {
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
        return this.httpAdapter.get(
          `${this.path}/${id}?${query ? query.query() : ''}`,
          {
            headers: {
              ...headers,
              ...options.headers,
            },
          },
        );
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
      headers: {},
    },
  ): Observable<INestjsxResQueryResult<TG>> {
    return this.getHeaders$().pipe(
      switchMap((headers) => {
        return this.httpAdapter.get(
          `${this.path}?${query ? query.query() : ''}`,
          {
            headers: {
              ...headers,
              ...options.headers,
            },
          },
        );
      }),
      map((response) => response.json() as INestjsxResQueryResult<TG>),
      catchError((err: any) => {
        this.errorHandler(err);
        return throwError(err);
      }),
    );
  }
}
