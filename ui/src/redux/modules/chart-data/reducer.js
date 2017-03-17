import types from './types';
import { Map } from "immutable";

const initialState = Map({
  chartType: 'line'
})

export const reducer = (state = initialState, action) => {
  switch(action.type){
    case types.DATA_RECEIVED:
      let { payload } = action;
      return state.set('chartData', payload || []);
    case types.CHANGE_CHART_TYPE:
      let {meta: {typeStr: type}} = action;
      return state.set('chartType', type);
    default:
      return state;
  }
}
