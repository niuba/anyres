import {
  Anyres,
  AnyresCRUD,
  IResCreate,
  IResGet,
  IResQuery,
  IResQueryResult,
  IResUpdate,
} from '@anyres/core';
import { AngularHttpClientAdapter } from '../../projects/anyres/ng-anyres/src/public_api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// tslint:disable-next-line:no-empty-interface
export interface IPostQuery {
}
// tslint:disable-next-line:no-empty-interface
export interface IPostQueryResult {
}
export interface IPostGet {
  id?: number;
  title?: string;
}
// tslint:disable-next-line:no-empty-interface
export interface IPostCreate {
}
export interface IPostUpdate {
  id: string | number;
  title?: string;
}

@Injectable()
@Anyres({
  path: '/post',
})
export class TestAngularHttpClientAdapter extends AnyresCRUD<
IPostQuery,
IPostQueryResult,
IPostGet,
IPostCreate,
IPostUpdate
> {
  constructor(private http: HttpClient) {
    super(new AngularHttpClientAdapter(http));
  }
}

