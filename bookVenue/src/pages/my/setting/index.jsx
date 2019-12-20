/* eslint-disable react/sort-comp */
/* eslint-disable react/jsx-boolean-value */
import Taro, { Component } from '@tarojs/taro'
import { View,Text} from '@tarojs/components'
import { AtIcon, AtCurtain } from 'taro-ui'
import NavBar from '../../../components/navbar/index'
import api from '../../../services/api'
import './index.less'

export default class Index extends Component {
  constructor(){
    super(...arguments)
    this.state={
      isOpened: false,
      message: ' ',
      phone: '', 
      nowChoose: ''
    }
}
config = {
    navigationBarTitleText: '设置',
    usingComponents: {
      'navbar': '../../../components/navbar/index', // 书写第三方组件的相对路径
   },
  }
 
  
componentWillMount(){
    this.getUserInfo()
  
  }

//获取用户信息
getUserInfo() {
  let that = this
  api.post('User/Setting', {}).then((res) => {
    let userInfo = res.data.data.userInfo
    console.log(userInfo)
    that.setState({  phone: userInfo.phone},() =>{
      console.log(that.state)
    })
  })
}

    //打开幕帘
    onOpen (vaule) {
      console.log('打开幕帘')
      let {message} = this.state
      console.log(vaule)

      if (vaule=='password') {
        message = '您确定要修改密码吗？'
      }else{
        message = '您已经绑定了手机号码，确定要绑定新的手机号码？'
      }
     this.setState({
     isOpened: true,
     message: message,
     nowChoose: vaule
     })
   }
    //关闭幕帘
    onClose () {
     console.log('关闭幕帘')
     let {nowChoose} = this.state
     this.setState({
     isOpened: false
     })
     Taro.navigateTo({
      url: `/pages/my/setting/${nowChoose}/index`
  })

 }

   //跳转页面
   toPage (page) {
    console.log(page)
    Taro.navigateTo({
      url: `/pages/my/setting/${page}/index`
  })
    
  }


  render () {


    return (
        <View className='setting'>
          <NavBar title='设置' isLeft={true} />
          <AtCurtain isOpened={this.state.isOpened} onClick={this.onClose.bind(this)}>
            <View className='alert_page'>
                <Text className='alert_top'>{this.state.message}</Text>
                <View className='alert_footer'>
                  <Text isOpened={this.state.isOpened} onClick={this.onClose.bind(this)}>确定</Text>
                </View>
            </View>
          </AtCurtain>

          <View className='set_phone set_item'  onClick={this.onOpen.bind(this,'phone')}>
            <Text className='set_title'>绑定手机</Text>
            <View >
              <Text className='set_content'>{this.state.phone}</Text>
              <AtIcon value='chevron-right' size='20' color='#989898' ></AtIcon>
            </View>
          </View>

          <View className='set_item' onClick={this.onOpen.bind(this,'password')}>
            <Text className='set_title'>登录密码</Text>
            <View >
              <Text className='set_content'>修改</Text>
              <AtIcon value='chevron-right' size='20' color='#989898'  ></AtIcon>
            </View>
          </View>

          <View className='set_about set_item' onClick={this.toPage.bind(this,'about')} >
            <Text className='set_title' >关于某某</Text>
            <AtIcon value='chevron-right' size='20' color='#989898'  ></AtIcon> 
          </View>

        </View>
   
    )
  }
}