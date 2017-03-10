import types from './types';

const host = 'http://localhost:8081/chartData';

//Common header
const headers = new Headers();
headers.append("Content-Type", "application/json");


const api = (data) => {
  return function(dispatch) {
    return fetch(data.meta.url, data.meta)
      .then(resp => resp.json())
      .then(json => {
        delete data.meta;
        dispatch({...data, payload: json});
     });
  }
}


export const actions = {
  switchChartType: (typeStr) => ({
    type: types.CHANGE_CHART_TYPE,
    meta: {
      typeStr: typeStr
    }
  }),
  fetchChartData: () =>
    api({
      type: types.FETCH_REQUESTS,
      meta: {
        type: `api`,
        url: `${host}`,
        headers: headers,
        method: `GET`
      }
    }
  )
}
