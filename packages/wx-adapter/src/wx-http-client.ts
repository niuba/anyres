import '@minapp/wx';
import { from, Observable } from 'rxjs';

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

export class WxHttpClient {
  public get<T>(
    url: string,
    options?: {
      headers?: {
        [header: string]: string;
      };
      params?: {
        [param: string]: string;
      };
    },
  ): Observable<T> {
    return from(
      new Promise<T>((resolve, reject) => {
        wx.request({
          url: paramsToUrl(url, options.params),
          header: options.headers,
          method: 'GET',
          dataType: 'json',
          success: (response) => {
            resolve(response.data);
          },
          fail: (err) => {
            reject(err);
          },
        });
      }),
    );
  }
  public post<T>(
    url: string,
    body: any | null,
    options?: {
      headers?: {
        [header: string]: string;
      };
      params?: {
        [param: string]: string;
      };
    },
  ): Observable<T> {
    return from(
      new Promise<T>((resolve, reject) => {
        wx.request({
          url,
          data: body,
          header: options.headers,
          method: 'POST',
          dataType: 'json',
          success: (response) => {
            resolve(response.data);
          },
          fail: (err) => {
            reject(err);
          },
        });
      }),
    );
  }
}
