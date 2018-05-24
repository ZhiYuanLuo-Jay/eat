import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  restaurantList = [];
  buttonStatus: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService,
  ) {}


  ngOnInit() {
    this.getRestaurants();   // Best practice is to invoke function in ngOnInit() not in the constructor.
  }

  getRestaurants(){
    let obserable = this._httpService.getRests();
    obserable.subscribe(info => {
    this.restaurantList = info['data'];
    console.log("Got our Restaurants!", info['data']);
    this.buttonStatus = false;
    setTimeout(()=>{   
      this.buttonStatus = true;
      },30000);
    });    
  }

  
  onRemove(restID): void { 
    if (this.buttonStatus == false) {
      let obserable = this._httpService.delOne(restID);
      obserable.subscribe(info => {
        console.log(info);
        this.getRestaurants(); 
      });  
      }
  }
  

}
