import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  restID : string;
  reviewList = [];
  restName: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService,
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id']);
      this.restID = params['id'] });
    
    this.getReviews(this.restID);
  }

  getReviews(restID){
    let obserable = this._httpService.getReviews(this.restID);
    obserable.subscribe(info => {
    this.reviewList = info['info']['review'];
    // let myArr = [];
    // let min = 1;
    // for (const s of this.reviewList) {
    //   console.log(s.stars);
    //   if (s.stars < min || s.stars == min){
    //     myArr.unshift(s)
    //   } else {
    //     myArr.push(s)
    //   }
    // }
    // console.log("myArr", myArr);
    this.restName = info['info']['restaurant'];
    console.log("Got our Reviews!", info['info']['review']);
    });    
  }
}
