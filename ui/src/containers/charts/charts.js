import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions } from '../../redux/modules/chart-data/actions';

import { Chart } from '../../components/chart/chart';
import { ChartTypeSwitcher } from '../../components/chartTypeSwitcher/chartTypeSwitcher';

class ChartsContainer extends React.Component{

  componentDidMount(){
    let { fetchChartData } = this.props;
    fetchChartData();
  }

  render(){
    let { data, fetchChartData, chartType, switchChartType} = this.props;
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding charts-wrapper">
        <ChartTypeSwitcher changeChartType={switchChartType} />
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 no-padding charts-wrapper">
          <Chart
            data={data}
            fetchChartData={fetchChartData}
            chartType={chartType} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  state = state.toJS();
  let { chartData, chartType} = state;
  return {
    data: chartData,
    chartType: chartType
  }
}

const mapDispatchToProps = (dispatch) => {
  let { fetchChartData, switchChartType} = actions;
  return bindActionCreators({
      fetchChartData: () => fetchChartData(),
      switchChartType: (type) => switchChartType(type)
    }, dispatch);
}

export const Charts = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartsContainer);
