import { ActionReducerMap } from '@ngrx/store';

import * as fromAvailability from '../availability/store/availability.reducer';
import * as fromHomePage from '../home-page/store/home-page.reducer';
import * as fromCarousel from '../carousel/store/carousel.reducer';

export interface AppState {
  availability: fromAvailability.State;
  homePage: fromHomePage.State;
  carousel: fromCarousel.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  availability: fromAvailability.availabilityReducer,
  homePage: fromHomePage.homePageReducer,
  carousel: fromCarousel.carouselReducer
};
