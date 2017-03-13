import {createStore, applyMiddleware } from 'redux';
import { reducer } from './modules/chart-data/reducer';
import { chartDataMiddleware } from './modules/chart-data/middleware';

export const store = createStore(reducer, applyMiddleware(chartDataMiddleware));
