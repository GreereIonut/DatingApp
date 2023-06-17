import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
   // eslint-disable-next-line @angular-eslint/component-selector
   
   

})
export class AppComponent implements OnInit {

  title = 'Dating App';
  users: any;

  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.http.get("https://localhost:7050/api/users").subscribe(
      {
        next: (v) => this.users = v,
        error: (e) => console.log(e)
      })
  }
}
