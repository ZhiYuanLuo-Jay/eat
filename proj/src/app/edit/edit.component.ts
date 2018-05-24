import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  restID: string;
  curRest: any;
  err: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService,
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id']);
      this.restID = params['id'] });

    this.curRest = {
      restaurant: "",
      cuisine: "",
    }

    this.getOneRest();
  }

  getOneRest() {
    let obserable = this._httpService.getOne(this.restID);
    obserable.subscribe(info => {
      console.log(info['info']);
      this.curRest = {
        restaurant: info['info'].restaurant,
        cuisine: info['info'].cuisine,
        id: this.restID,
      }
    });    
  }

  onSubmit() {
    console.log(this.curRest);  //capture the udpated info
    let obserable = this._httpService.upRest(this.curRest);
      obserable.subscribe(postdata => {
      console.log("Got Updated data back", postdata);
      if (postdata['message'] == 'Error'){
        this.err = postdata['error']['message'];
        console.log("Got entry error.", postdata['error']['message']);
      } else {
        this._router.navigate(['/restaurants']);
      }       
    })

  }

}
