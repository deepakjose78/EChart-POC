import types from './types';
import { Map } from "immutable";

const initialState = Map({
  chartType: 'pie'
})

export const reducer = (state = initialState, action) => {
  switch(action.type){
    case types.DATA_RECEIVED:
      return state.set('chartData', action.payload || []);
    case types.CHANGE_CHART_TYPE:
      return state.set('chartType', action.meta.typeStr);
    default:
      return state;
  }
}
