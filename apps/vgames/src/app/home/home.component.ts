import { Component, OnInit } from '@angular/core';
import { VideoTitle } from '../model/model';
import { GameService } from '../service/game-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'casc8-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: string;
  desc: string;
  titles: VideoTitle;
  titles$: Observable<any>

  constructor(private gs: GameService) {
    this.title = "Batman";
    this.desc = "Adventure Movie";

    //this.titles = <VideoTitle>[];
  }

  ngOnInit(): void {
    //Fetch all the mock Video Game titles.
    //this.titles = this.gs.fetchTitles1();

    //Do a FS title fetch
    this.titles$ = this.gs.fetchTitles();
    this.titles$.subscribe(data => {
      this.titles = data;
    })
  }

  trackByIdx(i: number) {
    return i;
  }    

  async doUpdate(index: number) {
    let title = {
      id: "",
      title: this.title,
      desc: this.desc,
      by: ""
    };

    if (index != -1) {
      title = this.titles[index];
    }

    try {
      await this.gs.updateTitle(title);
      this.title = "";
      this.desc = "";
    } catch (err) {
      console.log(err);
    }
  }

  doDel(index: number) {
    const title = this.titles[index];
    this.gs.deleteTitle(title);
  }

}
