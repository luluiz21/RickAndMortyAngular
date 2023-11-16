import { NgModule } from "@angular/core";
import { EpisodesDetailsComponent } from "./components/episodes-details/episodes-details.component";
import { EpisodesListComponent } from "./components/episodes-list/episodes-list.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: '', component: EpisodesListComponent },
  { path: ':id', component: EpisodesDetailsComponent }
];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class EpisodesRoutingModule { }