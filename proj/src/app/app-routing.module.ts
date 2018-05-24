import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { EditComponent } from './edit/edit.component';
import { ReviewComponent } from './review/review.component';


const routes: Routes = [
  {path: 'restaurants', component: RestaurantsComponent},
  {path: 'restaurants/new', component: NewComponent},
  {path: 'restaurants/:id', component: ShowComponent},
  { path: 'restaurants', component: RestaurantsComponent, children: [
    { path: ':id/edit', component: EditComponent }]
  },
  {path: 'restaurants/:id/edit', component: EditComponent},
  {path: 'restaurants/:id/review', component: ReviewComponent},

  {path: '', pathMatch: 'full', redirectTo: '/restaurants' },
  // {path: '**', component: SanjoseComponent }
  // the ** will catch anything that did not match any of the above routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
