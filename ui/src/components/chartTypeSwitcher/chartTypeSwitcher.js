import React from 'react';

export class ChartTypeSwitcher extends React.Component{

  render(){
    let { changeChartType } = this.props;
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 status-filter-container no-padding">
        <div className="btn btn-primary" onClick={(evt) => changeChartType('line')} >Line</div>
        <div className="btn btn-primary" onClick={(evt) => changeChartType('bar')} >Bar</div>
        <div className="btn btn-primary" onClick={(evt) => changeChartType('pie')} >Pie</div>
      </div>
    )
  }
}

ChartTypeSwitcher.propTypes = {
  changeChartType: React.PropTypes.func
}
