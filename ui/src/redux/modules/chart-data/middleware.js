import types from './types';
import io from 'socket.io-client';

const socket = io.connect("localhost:8081");

export const chartDataMiddleware = (store) => (next) => (action) => {
  next(action);
  switch(action.type){
    case types.FETCH_REQUESTS:
      socket.on('chartData', data => {
        let newAction = Object.assign({}, action, {payload: data});
        store.dispatch(newAction);
      });
      break;
    default:
      next(action);
  }
}
