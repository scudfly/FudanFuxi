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
  public currentList: any[] = [];
  public currentOrder: number[] = [];
  public currentIndex: number = 0;

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

  selectPart(partName: string) {
    let part = this.currentData.Content.find((element: { PartName: string; }) => {
      return element.PartName == partName;
    });

    if (part) {
      this.currentList = part.TopicList;

      this.currentOrder = this.getShuffleArray(this.currentList.length);
      this.currentIndex = 0;
    }
  }

  getShuffleArray(length: number): number[] {
    let newArray = Array.from({ length: length }, (_, index) => index);
    return newArray.sort(() => Math.random() - 0.5);
  }
  

  get currentTopic(): any {
    return this.currentList[this.currentOrder[this.currentIndex]];
  }

  replacePlace(input: string): string {
    return input.replace(/ /g, '&nbsp;');
  }

  nextTopic(): void {
    this.currentIndex++;
    if ((this.currentIndex + 1) >= this.currentList.length ) {
      this.currentIndex = 0;
    }
  }
}
