import { Action } from '@ngrx/store';

export const GET_HOME_PAGE = '[HomePage] Get HomePage';

/**
 * @Action
 * Select Hub
 */
export class GetHomePageData implements Action {
  readonly type = GET_HOME_PAGE;
  constructor(public payload: string) {  // string is the url?
  }
}

// Export all possible ations
export type HomePageActions =
  | GetHomePageData
  ;
