import * as hash from 'object-hash';
import { Observable } from 'rxjs';
import { ICacheParams } from '../interfaces';

export function CustomCache<TI extends any[]>({
  getKey,
  store,
  expire = 0,
}: {
  getKey?: (...args: TI) => string;
} & ICacheParams) {
  return <TO>(
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<(...args: TI) => Observable<TO>>,
  ) => {
    return {
      value(...args: TI): Observable<TO> {
        let key: string;
        if (getKey) {
          key = getKey(...args);
        } else {
          key = hash(args);
        }
        return store.get<TO>(
          key,
          descriptor.value.apply(this, args) as Observable<TO>,
          expire,
        );
      },
    };
  };
}
