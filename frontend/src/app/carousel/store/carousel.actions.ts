import { Action } from '@ngrx/store';
import { Router } from '@angular/router';

export const SLIDE_TO_PAGE = '[Carousel] Slide to Page';

/**
 * @Action
 * Slide to Page
 */
export class SlideToPage implements Action {
  readonly type = SLIDE_TO_PAGE;
  constructor(public payload: number, public router: Router) {
  }
}

export type CarouselActions =
  | SlideToPage
  ;
