import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  newReview: any;
  restID: string;
  err: string;
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

    this.newReview = {
        customer:"",
        stars: 5,
        content:"",
        restID: this.restID,
    }

    this.getOneRest();

  }

  getOneRest() {
    let obserable = this._httpService.getOne(this.restID);
    obserable.subscribe(info => {
      console.log(info['info']);
      this.restName = info['info'].restaurant;
    });    
  }

  onSubmit() {
    console.log("newReview obj: ", this.newReview);
    let obserable = this._httpService.addReview(this.newReview);
    obserable.subscribe(postdata => {
    console.log("Got Updated data back", postdata);
    if (postdata['message'] == 'Error'){
      this.err = postdata['error']['message'];
      console.log("Got entry error.", postdata['error']['message']);
      // this.buttonStatus = true;
    } else {
      this._router.navigate(['/restaurants']);
    }       
    })
    // Reset this.newTask to a new, clean object.
  }


}
