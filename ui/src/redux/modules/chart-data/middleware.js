import types from './types';
import io from 'socket.io-client';

const socket = io.connect("localhost:8081");

export const chartDataMiddleware = (store) => (next) => (action) => {
  switch(action.type){
    case types.FETCH_REQUESTS:
      socket.on('chartData', data => {
        let newAction = Object.assign({}, action, {payload: data}, {type: types.DATA_RECEIVED});
        store.dispatch(newAction);
        next(action);
      });
      break;
    default:
      next(action);
  }
}
