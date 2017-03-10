import types from './types';

const initialState = {
  chartType: 'bar'
}

export const reducer = (state = initialState, action) => {
  switch(action.type){
    case types.FETCH_REQUESTS:
      return {...state, chartData: action.payload || []};
    case types.CHANGE_CHART_TYPE:
      return Object.assign({}, state, {chartType: action.meta.typeStr});
    default:
      return state;
  }
}
