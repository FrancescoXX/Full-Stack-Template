import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

/* Core Components*/
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

/*  Ngrx */
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';

/* App Components */
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from './auth/admin/admin.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { Page3Component } from './page3/page3.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MapComponent } from './map/map.component';

/*Presentation Components*/
import { RowTitleValueComponent } from './shared/row-title-value/row-title-value.component';
import { RowTitleComponent } from './shared/row-title/row-title.component';
import { SubTitleComponent } from './shared/sub-title/sub-title.component';
import { RowDoughnutComponent } from './shared/row-doughnut/row-doughnut.component';

/*DEv components*/
import { MidGraphComponent } from './mid-graph/mid-graph.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { FooterComponent } from './footer/footer.component';
import { CollgsLoginComponent } from './auth/collgs-login/collgs-login.component';
import { Error404Component } from './errors/error404/error404.component';
import { Error401Component } from './errors/error401/error401.component';
import { CollgsComponent } from './auth/collgs/collgs.component';
import { CollGSCardComponent } from './auth/admin/collGS/coll-gs-card/coll-gs-card.component';
import { CollGSContComponent } from './auth/admin/collGS/coll-gs-cont/coll-gs-cont.component';
import { GenericErrorComponent } from './errors/generic-error/generic-error.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { OverviewPageComponent } from './overview/overview.component';
import { AvailabilityComponent } from './availability/availability.component';
import { ModalComponent } from './shared/modal/modal.component';
import { HighlightDirective } from './shared/highlight.directive';
import { TestHighlightComponent } from './shared/test-highlight/test-highlight.component';
import { ResizerDirective } from './availability/resizer.directive';
import { CarouselComponent } from './carousel/carousel.component';
import { UsersByContinentComponent } from './users-by-continent/users-by-continent.component';
import { UsersInEuEsaStatesComponent } from './users-in-eu-esa-states/users-in-eu-esa-states.component';
import { UsersTrendsComponent } from './users-trends/users-trends.component';
import { MissionFactsComponent } from './mission-facts/mission-facts.component';
import { DisseminationTrendsComponent } from './dissemination-trends/dissemination-trends.component';
import { ProductAvailabilityComponent } from './product-availability/product-availability.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminComponent,
    AdminLoginComponent,
    Page1Component,
    Page2Component,
    Page3Component,
    HomePageComponent,
    RowTitleValueComponent,
    MapComponent,
    RowTitleComponent,
    SubTitleComponent,
    RowDoughnutComponent,
    MidGraphComponent,
    RxjsComponent,
    FooterComponent,
    CollgsLoginComponent,
    Error404Component,
    Error401Component,
    CollgsComponent,
    CollGSCardComponent,
    CollGSContComponent,
    GenericErrorComponent,
    SpinnerComponent,
    OverviewPageComponent,
    AvailabilityComponent,
    ModalComponent,
    HighlightDirective,
    TestHighlightComponent,
    ResizerDirective,
    CarouselComponent,
    UsersByContinentComponent,
    UsersInEuEsaStatesComponent,
    UsersTrendsComponent,
    MissionFactsComponent,
    DisseminationTrendsComponent,
    ProductAvailabilityComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(fromApp.appReducer),
  ],
  exports: [],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
