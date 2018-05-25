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
    this.restName = info['info']['restaurant'];
    
    for(var i=0; i<this.reviewList.length-1; i++){
      for(var k=0; k<this.reviewList.length-1-i; k++){
        // console.log(this.reviewList[k]['stars']);
        // console.log(this.reviewList[k+1]['stars']);
        let temp = this.reviewList[k+1];
        if(this.reviewList[k]['stars']<this.reviewList[k+1]['stars']){
          this.reviewList[k+1] = this.reviewList[k];
          this.reviewList[k] = temp;
        }
      }
      console.log("==========")
    }
    console.log("test", this.reviewList);
    console.log("Got our Reviews!", info['info']['review']);
    });    
  }
}
