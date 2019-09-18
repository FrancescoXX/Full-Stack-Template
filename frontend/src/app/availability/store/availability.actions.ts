import { Action } from '@ngrx/store';

export const SELECT_HUB = '[Availability] Select Hub';
export const RESIZE_AVAILABILITY = '[Availability] Resize';

/**
 * @Action
 * Select Hub
 */
export class SelectHub implements Action {
  readonly type = SELECT_HUB;
  constructor(public payload: number) { }
}

/**
 * @Action
 * Resize window
 */
export class ResizeAvailability implements Action {
  readonly type = RESIZE_AVAILABILITY;
  constructor(public payload: number[]) { }
}

// Export all possible ations
export type availabilityActions =
  | SelectHub
  | ResizeAvailability
;
