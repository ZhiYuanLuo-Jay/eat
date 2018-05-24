import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  constructor(private _http: HttpClient){}
  
 
  addNew(newRestaurant){
    console.log("Services",newRestaurant);
    return this._http.post(`/restaurant/`, newRestaurant)  // function call with function value returned
  }

  addReview(newReview){
    console.log("Services", newReview);
    return this._http.put(`/review/`, newReview)  // function call with function value returned
  }

  getRests(){
    return this._http.get('/restaurants/');
  }

  getOne(restID){
    return this._http.get(`/restaurant/${restID}` )
  }

  upRest(curRest){
    console.log("Updating Restaurant", curRest);
    return this._http.put(`/restaurant/`, curRest)  // function call with function value returned
  }

  getReviews(restID){
    console.log("Services -->", restID);
    return this._http.get(`/reviews/${restID}`);
  }

  delOne(restID){
    return this._http.delete(`/restaurant/${restID}`);
  }
 
}
