import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Form, AtCurtain } from '@tarojs/components'
import Food from '../../components/food/food'
// eslint-disable-next-line import/first
import {  AtTabs, AtTabsPane,  AtInput } from 'taro-ui'
import NavBar from '../../components/navbar/index'
import api from '../../services/api'
import './index.less'

export default class Index extends Component {
  constructor(){
    super(...arguments)
    this.state={
      current: 0,
      userId: '',
      phoneNum: '',
      isPassword: '',
      isOpened: false,
      message: '',
      notPassword: '',
      login: '登录'
    }
}
// eslint-disable-next-line react/sort-comp
config = {
    navigationBarTitleText: '登陆',
    usingComponents: {
      'navbar': '../../components/navbar/index', // 书写第三方组件的相对路径
},
  }
 //切换本校师生或非本校师生
  handleClick (value) {
    console.log('登录')
    this.setState({
      current: value,
    })
  }
  //一般登录
  onSubmit () {
    console.log('登录')
    let that = this
    let {phoneNum, current, userId, isPassword, notPassword }= this.state;
    let params = { 'identity' : (current==0 ? 1 : 0 ),
                    'phone' : phoneNum,
                    'number_id' : userId,
                    'password' : (current==0? isPassword : notPassword ),
                     'device' : 1
                  }
     console.log(params)
    // let that = this
      api.post('Login/login', params).then((res) => {
       if (res.data.status==200000) {
          let cookies = res.header['Set-Cookie'].replace(/,/g, ';')
          console.log('=======', cookies)
          Taro.setStorageSync('Cookies', cookies)
          Taro.setStorageSync('UserInfo', params)
          let user =   Taro.getStorageSync('UserInfo')
          console.log(user)
         // let cookoes = Taro.getStorageSync('Cookies')

          Taro.navigateTo({
            url: '/pages/my/index?current='+params.identity
          })
          console.log('cookoes')
       }else{
         let message = res.data.message;
         that.setState({
          message: message,
          isOpened: true
         })
       }
   })
  }

componentDidMount(){
  let cookoes = Taro.getStorageSync('Cookies')
  console.log(cookoes)
  Taro.setStorageSync('Cookies', '')
  cookoes = Taro.getStorageSync('Cookies')
  console.log(cookoes)
}

  //获取验证码
getVerifyCode () {
  console.log('getVerifyCode')
  let {phoneNum,type}= this.state;
  let params = { 'account' : phoneNum,
                  'type' : type,
                }
    api.post('Login/login', params).then((res) => {
      let data01 = res.data
      // console.log(res.data)
      console.log(data01)
 })
 
}
  //刷脸登录
  onFacesubmit () {
    Taro.navigateTo({
      url: `/pages/login/face/index`
  })
  }
  //实时修改form表单的值
  handleChange (key, value) {
    this.setState({ [key]: value},() => {
      console.log( this.state)
    })
    return value
  }

//注册
 toRegister () {
   console.log('注册')
   Taro.navigateTo({
    url: `/pages/login/register/index`
})
 }

 //忘记密码
 resetPassword () {
  console.log('忘记密码')
  Taro.navigateTo({
    url: `/pages/login/password/index`
})
}

  render () {
      let {login}= this.state;
      const tabList = [{ title: '本校师生' }, { title: '非本校师生' }]
      return (
          <View className='login'>
            <NavBar  title='登陆' />
            <AtCurtain isOpened={this.state.isOpened} onClick={this.onClose.bind(this)}>
            <View className='alert_page'>
                <Text className='alert_top'>{this.state.message}</Text>
                <View className='alert_footer'>
                  <Text isOpened={this.state.isOpened} onClick={this.onClose.bind(this)}>确定</Text>
                </View>
            </View>
          </AtCurtain>
            <View className='login_body'>
              <View className='line'></View>
              <AtTabs  current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
                <AtTabsPane current={this.state.current} index={0}  className='atTab atTab01 '>
                <Form >
                    <View className='input_item'>
                      <AtInput 
                        name='userId' 
                        type='text' 
                        placeholder='输入您的学号或工号' 
                        border={false}
                        value={this.state.userId} 
                        onChange={this.handleChange.bind(this, 'userId')}
                      />
                    </View>
                    <View className='input_item'>
                      <AtInput 
                        name='isPassword' 
                        type='password' 
                        placeholder='输入您的密码' 
                        value={this.state.isPassword} 
                        border={false}
                        onChange={this.handleChange.bind(this, 'isPassword')} 
                      />
                    </View>   
                    <View className='input_detail input_detail_school'>
                      <Text className='input_detail_item' onClick={this.resetPassword}>忘记密码</Text>
                    </View>
                    <View className='input_submit'>
                      <Button className='input_submit_item' onClick={this.onSubmit.bind(this)} >登录</Button>
                      <Button className='input_submit_fase input_submit_item' onClick={this.onFacesubmit} >刷脸登录</Button>
                    </View>
                </Form >

                </AtTabsPane>


                <AtTabsPane current={this.state.current} index={1} className='atTab'>
                <Form  onSubmit={this.onSubmit.bind(this)} >
                    <View className='input_item'>
                      <AtInput 
                        name='phoneNum' 
                        type='text' 
                        placeholder='输入您的手机号码' 
                        border={false}
                        value={this.state.phoneNum} 
                        onChange={this.handleChange.bind(this, 'phoneNum')} 
                      />
                    </View>
                    <View className='input_item'>
                      <AtInput 
                        name='notPassword' 
                        type='password' 
                        placeholder='输入您的密码' 
                        value={this.state.notPassword} 
                        border={false}
                        onChange={this.handleChange.bind(this, 'notPassword')} 
                      />
                    </View>   
                    <View className='input_detail'>
                      <Text className='input_detail_item' onTouchEnd={this.toRegister.bind(this)}>注册</Text>
                      <Text className='input_detail_item' onTouchEnd={this.resetPassword}>忘记密码</Text>
                    </View>
                    <View className='input_submit'>
                      <Button className='input_submit_item' onTouchEnd={this.onSubmit.bind(this)} >{login}</Button>
                      <Button className='input_submit_fase input_submit_item' onTouchEnd={this.onFacesubmit.bind(this)} >刷脸登录</Button>
                    </View>
                </Form >
                </AtTabsPane>
              </AtTabs>
            </View>
            <Food />
          </View>
    
      )
  }
}