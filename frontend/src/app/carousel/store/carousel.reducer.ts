import * as CarouselActions from './carousel.actions';

export interface State {
  val: number;
}

const initialState: State = {
  val: 0
};

// Carousel funcion name
export function carouselReducer(
  state: State = initialState,
  action: CarouselActions.CarouselActions
) {
  // console.log('carousel reducer', action.type);
  const PAGES: string[] = [
    'home',
    'overview',
    'availability'
  ];

  switch (action.type) {
    case CarouselActions.SLIDE_TO_PAGE:
      action.router.navigateByUrl(PAGES[action.payload]);
      // console.log('this.state: ', state);
      return {
        ...state,
        val: action.payload,
      };

    default:
      // console.log('[Carousel] Actions default', state, 'action is ', action);
      return state;
  }
}