import React from 'react';
import ReactEcharts from 'echarts-for-react';

export class Chart extends React.Component{

  getXAxisData(array){
    return array.map((item) => {
      return item.name;
    })
  }

  get chartBaseConfig(){
    let { chartType } = this.props.chartType;
    return {
      title: {
          text: `${chartType} Chart`
      },
      legend: {
          data:['Equipment Usage Comparison']
      },
      toolbox: {
          feature: {
              saveAsImage: {}
          }
      }
    }
  }

  get lineChartConfig(){
    let { data, chartType } = this.props;
    return {
        xAxis : [
            {
              offset: 0,
              type : 'category',
              boundaryGap : false,
              data : this.getXAxisData(data || [])
            }
        ],
        tooltip : {
            trigger: 'axis'
        },
        yAxis : [
            {
                type : 'value',
                offset: 0,
            }
        ],
        grid: {
          show: true,
          left: '10%',
          right: '10%',
          bottom: '10%',
        },
        series : [
          {
              name:'Equipment Usage Comparison',
              type: chartType,
              areaStyle: {'color':'transparent'},
              lineStyle: {normal: {'width': 2, 'type': 'dotted', 'color': '#2e6da4'}},
              nodeStyle: {'color': '#ee3897', 'borderColor': 'blue'},
              data: data || [],
              smooth: true
          },
          {
              name:'Equipment Usage Comparison',
              type: chartType,
              areaStyle: {'color':'transparent'},
              lineStyle: { normal: {'width': '2', 'color': 'red', 'type': 'dashed'}},
              nodeStyle: {'color': '#ee3897', 'borderColor': 'blue'},
              data: (data && [data[3], data[2], data[1], data[0]]) || [],
              smooth: true
          },
        ]
    };
  }

  get barChartConfig(){
    let { data, chartType } = this.props;
    return {
        toolbox: {
            feature: {
                saveAsImage: {title: "Save as Image"}
            }
        },
        tooltip : {
            trigger: 'axis'
        },
        grid: {
          show: true,
          z: 45,
          left: '3%',
          right: '4%',
          bottom: '10%',
        },
        xAxis : [
            {
              offset: 0,
              type : 'category',
              boundaryGap : false,
              data : this.getXAxisData(data || [])
            }
        ],
        yAxis : [
            {
              offset: 0,
              type : 'value'
            }
        ],
        barWidth: '10px',
        series : [
            {
                name:'Equipment Usage Comparison',
                type: chartType,
                barGap: '30%', // Make series be overlap
                areaStyle: {'color':'transparent'},
                lineStyle: {'width': '2px', 'color': '#ee3897'},
                nodeStyle: {'color': '#ee3897', 'borderColor': 'blue'},
                data: data || []
            },
            {
                name:'Equipment Usage Comparison',
                type: 'line',
                areaStyle: {'color':'transparent'},
                lineStyle: {'width': '2px', 'color': 'blue'},
                nodeStyle: {'color': 'blue', 'borderColor': 'blue'},
                data: (data && [data[3], data[2], data[1], data[0]]) || [],
            }
        ]
    };
  }

  get pieChartConfig(){
    let { data, chartType } = this.props;
    return {
      legend: {
          data:this.getXAxisData(data || [])
      },
      series : [
          {
              name: 'Equipment Usage Comparison',
              type: chartType,
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: { normal: { show: true, formatter: '{b}'}, emphasis: { show: true, position: 'center', textStyle: { fontSize: '30', fontWeight: 'bold'}}},
              labelLine: { normal: { show: true, position: 'center', }},
              data: data || []
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
      default://default is bar chart
        return {...this.chartBaseConfig, ...this.barChartConfig};
    }

  }

  // onChartReadyCallback(){}

  eventsDict = {
    click: function(){
      console.log('Clicked');
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.props.data && (this.props.data !== nextProps.data || this.props.chartType !== nextProps.chartType)){
      let echartsInstance = this.refs.echartsReactRef.getEchartsInstance();
      this.props.chartType !== nextProps.chartType && echartsInstance.clear();
      setTimeout(() => {
        echartsInstance.setOption(this.options);
      }, 0);
      return false;
    }
    // if(this.props.chartType !== nextProps.chartType){
    //   let echartsInstance = this.refs.echartsReactRef.getEchartsInstance();
    //   echartsInstance.clear();
    // }
    return true;
  }

  render(){
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 status-filter-container">
          <ReactEcharts
            ref='echartsReactRef'
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
