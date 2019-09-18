import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './auth/admin/admin.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { Page3Component } from './page3/page3.component';
import { AuthGuard } from './auth/auth-guard.guard';
import { RxjsComponent } from './rxjs/rxjs.component';
import { CollgsLoginComponent } from './auth/collgs-login/collgs-login.component';
import { Error404Component } from './errors/error404/error404.component';
import { Error401Component } from './errors/error401/error401.component';
import { CollgsComponent } from './auth/collgs/collgs.component';
import { GenericErrorComponent } from './errors/generic-error/generic-error.component';
import { OverviewPageComponent } from './overview/overview.component';
import { AvailabilityComponent } from './availability/availability.component';
import { TestHighlightComponent } from './shared/test-highlight/test-highlight.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UsersByContinentComponent } from './users-by-continent/users-by-continent.component';
import { UsersInEuEsaStatesComponent } from './users-in-eu-esa-states/users-in-eu-esa-states.component';
import { UsersTrendsComponent } from './users-trends/users-trends.component';
import { MissionFactsComponent } from './mission-facts/mission-facts.component';
import { DisseminationTrendsComponent } from './dissemination-trends/dissemination-trends.component';
import { ProductAvailabilityComponent } from './product-availability/product-availability.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'adminlogin', component: AdminLoginComponent },
  { path: 'collgs', component: CollgsComponent, canActivate: [AuthGuard] },
  { path: 'collgslogin', component: CollgsLoginComponent },
  { path: 'page1', component: Page1Component },
  { path: 'page2', component: Page2Component },
  { path: 'page3', component: Page3Component },
  { path: 'home', component: HomePageComponent },
  { path: 'overview', component: OverviewPageComponent },
  { path: 'availability', component: AvailabilityComponent },
  { path: 'rxjs', component: RxjsComponent },
  { path: 'errorRole', component: Error401Component },
  { path: 'error404', component: Error404Component },
  { path: 'error', component: GenericErrorComponent },
  { path: 'users-by-continent', component: UsersByContinentComponent },
  { path: 'users-in-eu-esa-states', component: UsersInEuEsaStatesComponent },
  { path: 'users-trends', component: UsersTrendsComponent },
  { path: 'mission-facts', component: MissionFactsComponent },
  { path: 'dissemination-trends', component: DisseminationTrendsComponent },
  { path: 'product-availability', component: ProductAvailabilityComponent },
  { path: 'highlight', component: TestHighlightComponent },
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
