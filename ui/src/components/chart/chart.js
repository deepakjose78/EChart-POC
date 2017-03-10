import React from 'react';
import ReactEcharts from 'echarts-for-react';

export class Chart extends React.Component{

  constructor(props){
    super(props);
    console.log('Graph type', this.props.chartType)
  }

  get options(){
    var self = this;
    if(this.props.chartType === "line"){
      return {
          title: {
              text: 'Line chart'
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
          },
          xAxis : [
              {
                  type : 'category',
                  boundaryGap : false,
                  data : ['Analytical Balance', 'AFS', 'other', 'Bioreactor']
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
                  data:[2400, 4567, 800, 2000]
              }
          ]
      };
    }
    else if(this.props.chartType === "pie"){
      return {
          title: {
              text: `${this.props.chartType} chart`
          },
          tooltip : {
              trigger: 'axis'
          },
          legend: {
              data:['Analytical Balance', 'AFS', 'other', 'Bioreactor']
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
          },
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
                  data:[{name: "Analytical Balance", value: 2400, itemStyle: {normal: {color: '#ffc732'}}}, {name: "AFS", value: 4567, itemStyle: {normal: {color: '#2dbdcc'}}}, { name: "other", value: 800, itemStyle: {normal: {color: '#a5cd50'}}}, { name: "Bioreactor", value: 2000, itemStyle: {normal: {color: '#ea3c95'}}}]
              }
          ]
      };
    }
    else if(this.props.chartType === "bar"){
      return {
          title: {
              text: 'Line chart'
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
              left: '0%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis : [
              {
                  type : 'category',
                  boundaryGap : false,
                  data : ['Analytical Balance', 'AFS', 'other', 'Bioreactor']
              }
          ],
          yAxis : [
              {
                  type : 'value'
              }
          ],
          barWidth: '10px',
          barGap: '0%',
          series : [
              {
                  name:'Equipment Usage Comparison',
                  type: this.props.chartType,
                  stack: 'Total Amout',
                  areaStyle: {'color':'transparent'},
                  lineStyle: {'width': '2px', 'color': '#ee3897'},
                  nodeStyle: {'color': '#ee3897', 'borderColor': 'blue'},
                  data:[2400, 4567, 800, 2000]
              }
          ]
      };
    }
  }

  onChartReadyCallback(){
    console.log('Chart ready');
  }

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
            notMerge={true}
            lazyUpdate={true}
            theme={"theme_name"}
            onChartReady={this.onChartReadyCallback}
            onEvents={this.eventsDict} />
        </div>

      </div>
    )
  }
}

Chart.propTypes = {
  data: React.PropTypes.array,
  chartType: React.PropTypes.string
}
