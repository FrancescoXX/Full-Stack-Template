import * as HomePageActions from './home-page.actions';
import { HomePage } from '../model/HomePage';

export interface State {
  testa: string;
}

const initialState: State = {
  testa: 'testaa'
};

export function homePageReducer(
  state: State = initialState,
  action: HomePageActions.HomePageActions
) {
  switch (action.type) {
    case HomePageActions.GET_HOME_PAGE:
      // console.log('GET HOE PAGE', action.payload);
      return {
        ...state,
        testa: action.payload,
      };

    default:
      // console.log('home page Actions default', state, 'action is ', action);
      return state;
  }
}