import types from './types';

export const actions = {
  switchChartType: (typeStr) => ({
    type: types.CHANGE_CHART_TYPE,
    meta: {
      typeStr: typeStr
    }
  }),
  fetchChartData: () =>
    ({
      type: types.FETCH_REQUESTS,
      meta: {
        type: `socket`
      }
    }
  )
}
