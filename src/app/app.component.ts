import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'fudanfuxi';

  public subjectList: any[] = [
    {
      name: "英语4",
      file: "english4"
    },
    {
      name: "离散数学",
      file: ""
    },
    {
      name: "计算机组成与体系结构",
      file: ""
    },
    {
      name: "中国近现代史纲要",
      file: ""
    },
    {
      name: "数据结构",
      file: ""
    }
  ];

  // public currentMode: string = "";

  public currentData: any;
  public currentList: any[] = [];
  public currentOrder: number[] = [];
  public currentIndex: number = 0;

  constructor(private http: HttpClient) {

  }

  selectSubject(file: string) {

    if (!file) {
      return;
    }

    this.http.get(`assets/data/${file}.json`).subscribe(response => {
      this.currentData = response;
    });
  }

  // selectMode(mode: string) {
  //   this.currentMode = mode;
  // }

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

  nextTopic(): void {
    this.currentIndex++;
    if ((this.currentIndex + 1) > this.currentList.length ) {
      this.currentIndex = 0;
    }
  }

  backhome(): void {

    if (this.currentList.length != 0) {
      this.currentList = [];
      return;
    }

    this.currentData = null;

  }
}
