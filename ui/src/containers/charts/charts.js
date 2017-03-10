import React from 'react';
import './charts.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions } from '../../redux/modules/chart-data/actions';

import { Chart } from '../../components/chart/chart';
import { ChartTypeSwitcher } from '../../components/chartTypeSwitcher/chartTypeSwitcher';

class ChartsContainer extends React.Component{

  componentDidMount(){
    this.props.fetchChartData();
  }

  render(){
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding charts-wrapper">
        <ChartTypeSwitcher changeChartType={this.props.switchChartType} />
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 no-padding charts-wrapper">
          <Chart
            data={this.props.data}
            chartType={this.props.chartType} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.chartData,
    chartType: state.chartType
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      fetchChartData: () => actions.fetchChartData(),
      switchChartType: (type) => actions.switchChartType(type)
    }, dispatch);
}

export const Charts = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartsContainer);
