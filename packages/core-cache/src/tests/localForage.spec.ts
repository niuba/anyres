import {
  Anyres,
  AnyresCRUD,
  HttpMethod,
  IAnyresRequestOptions,
  IAnyresResponse,
  IHttpAdapter,
} from '@anyres/core';
import * as localForage from 'localforage';
import { Observable, of as observableOf } from 'rxjs';
import { CacheStore } from '../cache-store';
import { Cache, CustomCache } from '../decorators';
import { ICache } from '../interfaces';

class MockHttpAdapter implements IHttpAdapter {
  public get(url: string, options?: IAnyresRequestOptions): Observable<IAnyresResponse> {
    return observableOf({
      status: 200,
      headers: {},
      body: {
        id: 1,
        title: 'title',
      },
      json: () => {
        return {
          id: 1,
          title: 'title',
        };
      },
    });
  }
  public post(url: string, options?: IAnyresRequestOptions): Observable<IAnyresResponse> {
    return observableOf({
      status: 201,
      headers: {},
      body: {
        id: 2,
        ...options.body,
      },
      json: () => {
        return {
          id: 2,
          ...options.body,
        };
      },
    });
  }
  public put(url: string, options?: IAnyresRequestOptions): Observable<IAnyresResponse> {
    return observableOf({
      status: 200,
      headers: {},
      body: {
        ...options.body,
      },
      json: () => {
        return {
          ...options.body,
        };
      },
    });
  }
  public delete(url: string, options?: IAnyresRequestOptions): Observable<IAnyresResponse> {
    return observableOf({
      status: 204,
      headers: {},
      body: {},
      json: () => {
        return {};
      },
    });
  }
  public patch(url: string, options?: IAnyresRequestOptions): Observable<IAnyresResponse> {
    return observableOf({
      status: 200,
      headers: {},
      body: {
        ...options.body,
      },
      json: () => {
        return {
          ...options.body,
        };
      },
    });
  }
}


export interface IPostQuery {
}
export interface IPostQueryResult {
}
export interface IPostGet {
  id?: number;
  title?: string;
}
export interface IPostCreate {
}
export interface IPostUpdate {
  id: string | number;
  title?: string;
}

localForage.config({
  driver: [
    localForage.INDEXEDDB,
    localForage.WEBSQL,
    localForage.LOCALSTORAGE,
  ], // Force WebSQL; same as using setDriver()
  name: 'myApp',
  version: 1.0,
  size: 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName: 'keyvaluepairs', // Should be alphanumeric, with underscores.
  description: 'some description',
});
const cacheStore = new CacheStore(localForage);
// tslint:disable-next-line:max-classes-per-file
@Cache({
  store: cacheStore,
})
@Anyres({
  path: 'http://localhost:3000/posts',
  httpAdapterStatic: new MockHttpAdapter(),
  forbiddenMethods: [
    HttpMethod.Query,
  ],
})
class TestRes extends AnyresCRUD<
IPostQuery,
IPostQueryResult,
IPostGet,
IPostCreate,
IPostUpdate
> {
  @CustomCache({
    getKey: (id: number) => `${id}`,
    store: cacheStore,
  })
  public customMethod(id: number) {
    return this.get(id);
  }
  @CustomCache({
    store: cacheStore,
  })
  public customMethodWhithoutGetkey(id: number) {
    return this.get(id);
  }
}

describe('test MockAdapter', () => {
  const testRes = new TestRes();

  test('get', () => {
    return testRes.get(1).toPromise().then((data) => {
      expect(data.id).toBe(1);
      expect(data.title).toBe('title');
      return localForage.getItem<ICache<IPostGet>>('http://localhost:3000/posts/1');
    }).then((keys) => {
      expect(keys.v.id).toBe(1);
    });
  });
  test('customMethod', () => {
    return testRes.customMethod(1).toPromise().then((data) => {
      expect(data.id).toBe(1);
      expect(data.title).toBe('title');
      return localForage.getItem<ICache<IPostGet>>('1');
    }).then((item) => {
      expect(item.v.id).toBe(1);
      return testRes.customMethod(1).toPromise();
    }).then((data) => {
      expect(data.id).toBe(1);
      expect(data.title).toBe('title');
      localForage.iterate((value, key, iterationNumber) => {
        //
      }).then((x) => {
        expect(x).toBe(undefined);
      });
      localForage.iterate((value, key, iterationNumber) => {
        if (iterationNumber === 0) {
          return [key, value];
        }
      }).then((x) => {
        expect(x[0]).toBe('1');
      });
    });
  });
  test('customMethodWhithoutGetkey', () => {
    return testRes.customMethodWhithoutGetkey(1).toPromise().then((data) => {
      expect(data.id).toBe(1);
      expect(data.title).toBe('title');
      return localForage.getItem<ICache<IPostGet>>('1');
    }).then((item) => {
      expect(item.v.id).toBe(1);
      return testRes.customMethodWhithoutGetkey(1).toPromise();
    }).then((data) => {
      expect(data.id).toBe(1);
      expect(data.title).toBe('title');
      localForage.iterate((value, key, iterationNumber) => {
        //
      }).then((x) => {
        expect(x).toBe(undefined);
      });
      localForage.iterate((value, key, iterationNumber) => {
        if (iterationNumber === 0) {
          return [key, value];
        }
      }).then((x) => {
        expect(x[0]).toBe('1');
      });
    });
  });
});
