import * as availabilityActions from './availability.actions';
import { Hub } from '../model/Hub';

export interface State {
  hubs: Hub[];
  selecthubIndex: number;
  selectedHub: Hub;
}

const initialState: State = {
  hubs: [
    {
      id: 1,
      hub: 'scihub',
      title: 'Copernicus Open Access Hub',
      url: '../../assets/api/subpage_availability_per_day_scihub_91_days.json'
    },
    {
      id: 2,
      hub: 'colhub',
      title: 'Collaborative Hub',
      url: '../../assets/api/subpage_availability_per_day_colhub_91_days.json'
    },
    {
      id: 3,
      hub: 'inthub',
      title: 'International Hub',
      url: '../../assets/api/subpage_availability_per_day_inthub_91_days.json'
    },
    {
      id: 4,
      hub: 'cophub',
      title: 'Copernicus Services Hub',
      url: '../../assets/api/subpage_availability_per_day_cophub_91_days.json'
    }
  ],
  selecthubIndex: 1,
  selectedHub: null
};

export function availabilityReducer(
  state: State = initialState,
  action: availabilityActions.availabilityActions
) { 
  switch (action.type) {
    case availabilityActions.SELECT_HUB:
      return {
        ...state,
        selecthubIndex: action.payload,
        selectedHub: { ...state.hubs[action.payload - 1] }
      };

    case availabilityActions.RESIZE_AVAILABILITY:
      return {
        ...state
      };

    default:
      return state;
  }
}