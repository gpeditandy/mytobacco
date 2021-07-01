import * as echarts from '../../ec-canvas/echarts';

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '烘烤时长130-160个小时的拟合曲线',
  },
  tooltip: {
      trigger: 'axis',
      axisPointer: {
          type: 'cross'
      }
  },
  toolbox: {
      show: true,
      feature: {
          saveAsImage: {}
      }
  },
  xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['5','25','55','65','95','105','115','125','135','155']
  },
  yAxis: {
      type: 'value',
      axisLabel: {
          formatter: '{value} ℃'
      },
      axisPointer: {
          snap: true
      }
  },
  visualMap: {
      show: false,
      dimension: 0,
      pieces: [{
          lte: 6,
          color: 'green'
      }, {
          gt: 6,
          lte: 8,
          color: 'red'
      }, {
          gt: 8,
          lte: 14,
          color: 'green'
      }, {
          gt: 14,
          lte: 17,
          color: 'red'
      }, {
          gt: 17,
          color: 'green'
      }]
  },
  series: [
      {
          name: '用电量 ℃',
          type: 'line',
          smooth: true,
          data: [10,20,30,40,50,60,70,80,90,100],
          markArea: {
              // itemStyle: {
              //     color: 'rgba(255, 173, 177, 0.4)'
              // },
              data: [
                  [{
                  name: '变黄期',
                  xAxis: '5',
                  itemStyle:{
                      color:'#4CB050'
                  }
              }, {
                  xAxis: '55'
              }], 
               [{
                  name: '定色期',
                  xAxis: '55',
                  itemStyle:{
                      color:'#FFEA3C'
                  }
                  
              }, {
                  xAxis: '95'
              }], 
              [{
                  name: '香气',
                  xAxis: '95',
                  itemStyle:{
                      color:'#FEC107'
                  }
              }, {
                  xAxis: '125'
              }], 
              [{
                  name: '干筯期',
                  xAxis: '125',
                  itemStyle:{
                      color:'#FF9700'
                  }
              }, {
                  xAxis: '155'
              }] 
          ]
          }
      }
  ]
  };
  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart
    }
  }
});
