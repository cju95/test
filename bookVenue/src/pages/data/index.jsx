/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/no-unused-state */
import Taro, { Component } from '@tarojs/taro'
import { View,Text} from '@tarojs/components'
import { AtInput,AtIcon } from 'taro-ui'
import NavBar from '../../components/navbar/index'

import './index.less'

export default class Index extends Component {
  constructor(){
    super(...arguments)
    this.state = {
      value: '',
      nameList: ['本人名','小众', '欧阳洋洋','某某', '断肠人']
    }
}
config = {
    navigationBarTitleText: '数据分析',
    usingComponents: {
      'navbar': '../../components/navbar/index', // 书写第三方组件的相对路径
   },
  }
 
  handleChange (value) {
    this.setState({
      value
    })
    return value
  }
 

  render () {
      let {nameList}= this.state;
      // const style = {
      //   marginTop: Taro.$navBarMarginTop + 'px'
      // }
    return (
        <View className='data'>
          <NavBar title='数据分析' />
          <View>

          </View>
          <View className='search_box'>
          <AtInput
            name='value'
            type='text'
            placeholder='项目名称'
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
          />
          <AtIcon prefixClass='fa' value='search' size='30' color='#F00'></AtIcon>
          </View> 

          <View>
        {
            nameList.map((item,key)=>{
              
            })
        }
          <View>

          </View>
          </View>
          
          </View>
   
    )
  }
}