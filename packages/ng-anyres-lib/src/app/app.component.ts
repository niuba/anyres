
import { switchMap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { TestAngularHttpClientAdapter, IPostGet } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private testAngularHttpClientAdapter: TestAngularHttpClientAdapter) {

  }
  request() {
    let post: IPostGet = null;
    this.testAngularHttpClientAdapter.create({
      title: 'demo',
    }).pipe(
      switchMap((res) => {
        console.log(res);
        post = res;
        return this.testAngularHttpClientAdapter.get(post.id);
      }),
      switchMap((res) => {
        console.log(res);
        return this.testAngularHttpClientAdapter.update({
          id: post.id,
          title: 'title changed',
        });
      }),
      switchMap((res) => {
        console.log(res);
        return this.testAngularHttpClientAdapter.remove(post.id);
      }),
      switchMap((res) => {
        console.log(res);
        return this.testAngularHttpClientAdapter.query();
      }), )
      .subscribe((res) => console.log(res));


  }
}
