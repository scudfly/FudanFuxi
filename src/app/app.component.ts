import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'fudanfuxi';

  public currentSubject: string = "";
  public currentMode: string = "";

  public currentData: any;

  constructor(private http: HttpClient) {
    this.http.get('assets/data/english4.json').subscribe(response => {
      this.currentData = response;
    });
  }

  selectSubject(subject: string) {
    this.currentSubject = subject;
  }

  selectMode(mode: string) {
    this.currentMode = mode;
  }
}
