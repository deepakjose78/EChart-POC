import React from 'react';
import ReactEcharts from 'echarts-for-react';

export class Chart extends React.Component{

  getXAxisData(array){
    return array.map((item) => {
      return item.name;
    })
  }

  get chartBaseConfig(){
    return {
      title: {
          text: `${this.props.chartType} Chart`
      },
      tooltip : {
          trigger: 'axis'
      },
      legend: {
          data:['Equipment Usage Comparison']
      },
      toolbox: {
          feature: {
              saveAsImage: {}
          }
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      }
    }
  }

  get lineChartConfig(){
    return {
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : this.getXAxisData(this.props.data)
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'Equipment Usage Comparison',
                type: this.props.chartType,
                stack: 'Total Amout',
                areaStyle: {'color':'transparent'},
                lineStyle: {'width': '2px', 'color': '#ee3897'},
                nodeStyle: {'color': '#ee3897', 'borderColor': 'blue'},
                data:this.props.data || []
            }
        ]
    };
  }

  get barChartConfig(){
    return {
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : this.getXAxisData(this.props.data || [])
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        barWidth: '10px',
        barGap: '1%',
        series : [
            {
                name:'Equipment Usage Comparison',
                type: this.props.chartType,
                stack: 'Total Amout',
                areaStyle: {'color':'transparent'},
                lineStyle: {'width': '2px', 'color': '#ee3897'},
                nodeStyle: {'color': '#ee3897', 'borderColor': 'blue'},
                data:this.props.data || []
            }
        ]
    };
  }

  get pieChartConfig(){
    return {
        series : [
            {
                name:'Equipment Usage Comparison',
                type: this.props.chartType,
                radius : ['50%', '70%'],
                label: {normal: {show: true, formatter: '{b}', textStyle: {color: 'black'}}},
                stack: 'Total Amout',
                areaStyle: {'color':'transparent'},
                lineStyle: {'width': '2px', 'color': '#ee3897'},
                nodeStyle: {'color': '#ee3897', 'borderColor': 'blue'},
                data:this.props.data || []
            }
        ]
    };
  }

  get options(){

    switch (this.props.chartType){
      case "line":
        return {...this.chartBaseConfig, ...this.lineChartConfig};
      case "bar":
        return {...this.chartBaseConfig, ...this.barChartConfig};
      case "pie":
        return {...this.chartBaseConfig, ...this.pieChartConfig};
      default:
        return {...this.chartBaseConfig, ...this.barChartConfig};
    }

  }

  // onChartReadyCallback(){}

  eventsDict = {
    click: function(){
      console.log('Clicked');
    }
  }

  render(){
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 status-filter-container">
          <ReactEcharts
            option={this.options}
            onChartReady={this.onChartReadyCallback}
            onEvents={this.eventsDict} />
        </div>

      </div>
    )
  }
}

Chart.propTypes = {
  data: React.PropTypes.array,
  chartType: React.PropTypes.string,
  fetchChartData: React.PropTypes.func
}
