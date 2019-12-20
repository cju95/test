import Taro, { Component } from '@tarojs/taro'
import { View,Text, Image} from '@tarojs/components'
import NavBar from '../../../../components/navbar/index'
import { AtIcon } from 'taro-ui'
import './index.less'

export default class Index extends Component {
  constructor(){
    super(...arguments)
    this.state={
      isOpened: false,
    }
}
config = {
    navigationBarTitleText: '注册',
    usingComponents: {
      'navbar': '../../../../components/navbar/index', // 书写第三方组件的相对路径
   },
  }
 
  handleChange (value) {
    this.setState({
      value
    })
  }
    //打开幕帘
    onOpen () {
      console.log('打开幕帘')
     this.setState({
     isOpened: true
     })
   }
    //关闭幕帘
    onClose () {
     console.log('关闭幕帘')
     this.setState({
     isOpened: false
     })
 }

  render () {
      let {}= this.state;
      const style = {
        marginTop: Taro.$navBarMarginTop + 'px'
      }
    return (
        <View className='about' >
          <NavBar title='关于我们' isLeft={true}/>
    
         <View className='about_content'>
            <Image className='about_img' src={require('../../../../assets/images/my/about.png')} ></Image>
            <Text className='about_version'>某某1.0.0</Text>
            <Text className='about_web'>www.xxxxx.com</Text>
         </View>
        </View>
   
    )
  }
}