import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private userService: UserService,
    private httpClient: HttpClient,
  ) { }
  ngOnInit() {
    this.userService
      .create({
        name: '11'
      })
      .pipe(
        switchMap((user) => {
          return this.userService.update({
            id: user.id,
            name: '22'
          });
        }),
        switchMap((user) => {
          return this.userService.get(user.id);
        }),
      )
      .subscribe(res => {
        console.log(res);
      }, (e) => {
        console.log(e);
      });
  }
}
