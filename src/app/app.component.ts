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
      name: "英语6",
      file: "english6",
      type: "1"
    },
    {
      name: "软件工程",
      file: "softmanager",
      type: "4"
    },
    {
      name: "面向对象分析与设计",
      file: "oo",
      type: "4"
    },
    {
      name: "计算机网络与通信",
      file: "net",
      type: "4"
    },
    {
      name: "Java程序设计",
      file: "java",
      type: "3",
      filename: "933b1fc7-31a4-4d06-a0d1-7e9a615cda66-",
      fileext: "jpg",
      filemax: 33
    },
    {
      name: "数据库技术",
      file: "db",
      type: "4"
    },
    {
      name: "操作系统",
      file: "os",
      type: "4"
    },
    {
      name: "习近平思想",
      file: "xisixiang",
      type: "2"
    },
    {
      name: "英语5",
      file: "english5",
      type: "1"
    },
    {
      name: "英语4",
      file: "english4",
      type: "1"
    },
    // {
    //   name: "离散数学",
    //   file: "",
    //   type: "1"
    // },
    // {
    //   name: "计算机组成与体系结构",
    //   file: "",
    //   type: "1"
    // },
    {
      name: "中国近现代史纲要",
      file: "history",
      type: "2"
    },
    {
      name: "数据结构",
      file: "datastructure",
      type: "3",
      filename: "354181e3b270f8186e0e408a10d8dab8-",
      fileext: "jpg",
      filemax: 118
    },
    {
      name: "计算机组成原理",
      file: "computerstructure",
      type: "3",
      filename: "",
      fileext: "jpg",
      filemax: 1
    },
  ];

  // public currentMode: string = "";

  public currentSubject: any;
  public currentType: number = 0;
  public currentData: any;
  public currentList: any[] = [];
  public currentOrder: number[] = [];
  public currentIndex: number = 0;
  public currentPart: any;

  constructor(private http: HttpClient) {

  }

  selectSubject(subject: any) {

    this.currentSubject = subject;

    if (!subject.file) {
      return;
    }

    this.currentType = subject.type;

    if (subject.type == 3) {
      this.currentData = {};
      return;
    }


    this.http.get(`assets/data/${subject.file}.json`).subscribe((response:any) => {
      this.currentData = response;

      if (subject.type == 2) {
        this.currentList = response.Content;
        this.currentOrder = Array.from({ length: response.Content.length }, (_, index) => index);
        this.currentIndex = 0;
      }
    });
  }

  // selectMode(mode: string) {
  //   this.currentMode = mode;
  // }

  selectPart(partName: string) {

    let part = this.currentData.Content.find((element: { PartName: string; }) => {
      return element.PartName == partName;
    });

    if (part && part.TopicList) {
      this.currentList = part.TopicList;

      this.currentOrder = this.getShuffleArray(this.currentList.length);
      this.currentIndex = 0;
    }
    else {
      this.currentPart = part;
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

    document.documentElement.scrollTop = document.body.scrollTop = 0;
  }

  backhome(): void {

    if (this.currentList.length != 0) {
      this.currentList = [];

      if (this.currentType == 2) {
        this.currentData = null;
        this.currentType = 0;
      }

      return;
    }

    if (this.currentType == 4 && this.currentPart != null) {
      this.currentPart = null;
      return;
    }

    this.currentType = 0;
    this.currentData = null;
    this.currentPart = null;

  }

  getRange(max: number, start: number = 0): number[] {
    let i = Array.from(
      { length: max },
      (_, index) => start + index
    );
    return i;
  }

  // scrollToTop(): void {
  //   const curPosition = document.documentElement.scrollTop || document.body.scrollTop;
  //   if (curPosition > 0) {
  //       window.requestAnimationFrame(this.scrollToTop()); // 调用自己
  //       window.scrollTo(0, curPosition - curPosition / 10);
  //   }
  // }
}
