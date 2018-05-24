import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newRestaurant: any;
  err: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService,
  ) {}

  ngOnInit() {
    this.newRestaurant = {
      restaurant: "",
      cuisine: "",
      // review:[{
      //   customer:"",
      //   stars: 5,
      //   content:"",
      // }]
    }
  }


  
  onSubmit() {
    let addObserable = this._httpService.addNew(this.newRestaurant);
    addObserable.subscribe(postdata => {
      console.log("Got data from post back", postdata);
      if (postdata['message'] == 'Error'){
        this.err = postdata['error']['message'];
        console.log("Got entry error.", postdata['error']['message']);
      } else {
        this._router.navigate(['/restaurants']);
      }
    })
    // Reset this.newTask to a new, clean object.
  }

}
