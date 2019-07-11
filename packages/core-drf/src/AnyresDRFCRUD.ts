import { AnyresCRUD } from '@anyres/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

export interface IDRFResQuery<T> {
  fields?: Array<keyof T>;
  limit?: number;
  offset?: number;
  ordering?: string;
}

export interface IDRFResQueryResult<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface IDRFResGet {}

export interface IDRFResCreate {}

export interface IDRFResUpdate {}

export class AnyresDRFCRUD<
  TQ extends IDRFResQuery<TG>,
  TG extends IDRFResGet,
  TC extends IDRFResCreate,
  TU extends IDRFResUpdate
> extends AnyresCRUD<TQ, IDRFResQueryResult<TG>, TG, TC, TU> {
  public get(
    id: string | number,
    fields: Array<keyof TG> = [],
  ): Observable<TG> {
    return this.getHeaders$().pipe(
      switchMap((headers) => {
        return this.httpAdapter.get(`${this.path}/${id}`, {
          params: {
            fields: fields ? fields.join(',') : '',
          },
          headers,
        });
      }),
      map((response) => response.json() as TG),
      catchError((err: any) => {
        this.errorHandler(err);
        return throwError(err);
      }),
    );
  }

  public query(query?: TQ): Observable<IDRFResQueryResult<TG>> {
    return this.getHeaders$().pipe(
      switchMap((headers) => {
        return this.httpAdapter.get(`${this.path}`, {
          params: Object.assign({}, query, {
            fields: query.fields ? query.fields.join(',') : '',
          }),
          headers,
        });
      }),
      map((response) => response.json() as IDRFResQueryResult<TG>),
      catchError((err: any) => {
        this.errorHandler(err);
        return throwError(err);
      }),
    );
  }
}
