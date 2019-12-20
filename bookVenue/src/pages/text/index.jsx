import Taro, { Component } from '@tarojs/taro'
import { View,Text} from '@tarojs/components'
import NavBar from '../../components/navbar/index'
import { AtIcon } from 'taro-ui'
import './index.less'

export default class Index extends Component {
  constructor(){
    super(...arguments)
    this.state={
    }
}
config = {
    navigationBarTitleText: '注册',
    usingComponents: {
      'navbar': '../../components/navbar/index', // 书写第三方组件的相对路径
   },
  }
 
  handleChange (value) {
    this.setState({
      value
    })
  }
 

  render () {
      let {}= this.state;
      // const style = {
      //   marginTop: Taro.$navBarMarginTop + 'px'
      // }
    return (
        <View className='phone'>
          <NavBar title='注册'/>
          <Text>注册登录某某即表示您同意<Text>《某某用户协议》</Text></Text>
        </View>
   
    )
  }
}