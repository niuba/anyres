import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Anyres, AnyresCRUD } from '@anyres/core';
import { AngularHttpClientAdapter } from '../lib';

// tslint:disable-next-line:no-empty-interface
interface IPostQuery {
}
// tslint:disable-next-line:no-empty-interface
interface IPostQueryResult {
}
interface IPostGet {
  id?: number;
  title?: string;
}
// tslint:disable-next-line:no-empty-interface
interface IPostCreate {
}
interface IPostUpdate {
  id: string | number;
  title?: string;
}

@Injectable()
@Anyres({
  path: 'http://localhost:3000/posts',
})
class TestAngularHttpClientAdapter extends AnyresCRUD<
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

describe('HttpClient testing', () => {
  let testAngularHttpClientAdapter: TestAngularHttpClientAdapter;
  let post: IPostGet;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        TestAngularHttpClientAdapter
      ]
    });
    testAngularHttpClientAdapter = TestBed.get(TestAngularHttpClientAdapter);
  });

  it('query posts', () => {
    return testAngularHttpClientAdapter.query().toPromise().then((res) => {
      expect(res[0].id).toBe(1);
    });
  });
  it('create post', () => {
    return testAngularHttpClientAdapter.create({
      title: 'demo',
    }).toPromise().then((res) => {
      post = res;
      expect(res.id).toBe(2);
    });
  });
  it('get post', () => {
    return testAngularHttpClientAdapter.get(post.id).toPromise().then((res) => {
      expect(res.id).toBe(post.id);
    });
  });
  it('update post', () => {
    return testAngularHttpClientAdapter.update({
      id: post.id,
      title: 'title changed',
    }).toPromise().then((res) => {
      expect(res.title).toBe('title changed');
    });
  });
  it('delete post', () => {
    return testAngularHttpClientAdapter.remove(post.id).toPromise().then((res) => {
      expect(true).toBe(true);
    });
  });
});
