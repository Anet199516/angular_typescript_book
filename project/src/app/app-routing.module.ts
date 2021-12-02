import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductDetailsComponent} from "./components/product-details/product-details.component";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {ApplicationComponent} from "./components/application/application.component";

const routes: Routes = [
  {path: '', component: ApplicationComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule { }
