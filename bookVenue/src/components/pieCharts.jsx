/* eslint-disable jsx-quotes */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-unused-vars */

/* eslint-disable react/no-unused-state */
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import NavBar from '../../components/navbar/index'
import * as echarts from "./ec-canvas/echarts";

import './index.less'

export default class Index extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            value: ''
        }
    }
    config = {
        usingComponents: {
            "ec-canvas": "./ec-canvas/ec-canvas"
        }

    }

    handleChange(value) {
        this.setState({
            value
        })
    }
    
setChartData(chart, data) {
    let option = {
      series : [
        {
          name: '访问来源',
          type: 'pie',
          center: ['50%', '50%'],
          radius: [0, '60%'],
          data: data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    chart.setOption(option);
  }

    refresh(data) {
        this.Chart.init((canvas, width, height) => {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          setChartData(chart, data);
          return chart;
        });
      }
     
      refChart = node => (this.Chart = node);

    render() {
        let { } = this.state;
        // const style = {
        //   marginTop: Taro.$navBarMarginTop + 'px'
        // }
        return (
            <View className='data'>
                <NavBar title='数据分析' />
                <ec-canvas
                    ref={this.refChart}
                    canvas-id="mychart-area"
                    ec={this.state.ec}
                />

            </View>

        )
    }
}