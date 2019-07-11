import {
  IAnyresRequestOptions,
  IAnyresResponse,
  IHttpAdapter,
} from "@anyres/core";
import "@minapp/wx";
import { Observable } from "rxjs";

export interface IWepyResponse {
  data: {
    [key: string]: any;
  };
  statusCode: number;
  header: {
    [key: string]: any;
  };
}

function paramsToUrl(url: string, params: { [key: string]: string }): string {
  const paramString = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  const [base, query] = url.split("?");
  if (query === undefined) {
    return `${base}?${paramString}`;
  } else {
    return `${url}&${paramString}`;
  }
}

export class WxAdapter implements IHttpAdapter {
  public get(
    url: string,
    options?: IAnyresRequestOptions,
  ): Observable<IAnyresResponse> {
    options = {
      headers: {},
      params: {},
      body: {},
      ...(options || {}),
    };
    return Observable.create((observer) => {
      wx.request({
        url: paramsToUrl(url, options.params),
        header: options.headers,
        method: "GET",
        dataType: "json",
        success: (response) => {
          observer.next({
            status: response.statusCode,
            headers: response.header,
            body: response.data,
            json: () => response.data,
          });
        },
      });
    });
  }

  public post(
    url: string,
    options?: IAnyresRequestOptions,
  ): Observable<IAnyresResponse> {
    options = {
      headers: {},
      params: {},
      body: {},
      ...(options || {}),
    };
    return Observable.create((observer) => {
      wx.request({
        url,
        data: options.body,
        header: options.headers,
        method: "POST",
        dataType: "json",
        success: (response) => {
          observer.next({
            status: response.statusCode,
            headers: response.header,
            body: response.data,
            json: () => response.data,
          });
        },
      });
    });
  }

  public put(
    url: string,
    options?: IAnyresRequestOptions,
  ): Observable<IAnyresResponse> {
    options = {
      headers: {},
      params: {},
      body: {},
      ...(options || {}),
    };
    return Observable.create((observer) => {
      wx.request({
        url,
        data: options.body,
        header: options.headers,
        method: "PUT",
        dataType: "json",
        success: (response) => {
          observer.next({
            status: response.statusCode,
            headers: response.header,
            body: response.data,
            json: () => response.data,
          });
        },
      });
    });
  }

  public delete(
    url: string,
    options?: IAnyresRequestOptions,
  ): Observable<IAnyresResponse> {
    options = {
      headers: {},
      params: {},
      body: {},
      ...(options || {}),
    };
    return Observable.create((observer) => {
      wx.request({
        url,
        header: options.headers,
        method: "DELETE",
        dataType: "json",
        success: (response) => {
          observer.next({
            status: response.statusCode,
            headers: response.header,
            body: response.data,
            json: () => response.data,
          });
        },
      });
    });
  }

  public patch(
    url: string,
    options?: IAnyresRequestOptions,
  ): Observable<IAnyresResponse> {
    options = {
      headers: {},
      params: {},
      body: {},
      ...(options || {}),
    };
    return Observable.create((observer) => {
      wx.request({
        url,
        data: options.body,
        header: options.headers,
        method: "PUT",
        dataType: "json",
        success: (response) => {
          observer.next({
            status: response.statusCode,
            headers: response.header,
            body: response.data,
            json: () => response.data,
          });
        },
      });
    });
  }
}
