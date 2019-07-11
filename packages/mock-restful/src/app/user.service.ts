import { Anyres, AnyresCRUD, HttpMethod } from '@anyres/core';
import { HttpClient } from '@angular/common/http';
import { AngularHttpClientAdapter } from '@anyres/ng-anyres';
import { Injectable, Inject } from '@angular/core';
import { IQuery, IQueryResults } from './interface';
import { throwError } from 'rxjs';

export interface IUser {
  id: number;
  name: string;
}

export interface IUserQuery extends IQuery {
  id?: number;
}

export interface IUserCreate {
  name: string;
}

export interface IUserUpdate {
  id: number;
  name: string;
}

export interface IUserGet {
  id: number;
  name: string;
}

@Injectable()
@Anyres({
  path: `/user`,
  forbiddenMethods: [],
})
export class UserService extends AnyresCRUD<
IUserQuery,
IQueryResults<IUserGet>,
IUserGet,
IUserCreate,
IUserUpdate
> {
  constructor(
    private httpClient: HttpClient,
  ) {
    super(new AngularHttpClientAdapter(httpClient), (e) => throwError(e));
  }

}
