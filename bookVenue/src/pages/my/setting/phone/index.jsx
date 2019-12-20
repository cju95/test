/* eslint-disable react/jsx-boolean-value */
import Taro, { Component } from '@tarojs/taro'
import { View,Text, Button, Form} from '@tarojs/components'
import NavBar from '../../../../components/navbar/index'
// eslint-disable-next-line import/first
import {  AtInput } from 'taro-ui'
import api from '../../../../services/api'
import './index.less'

export default class Index extends Component {
  constructor(){
    super(...arguments)
    this.state={
      phoneNum: '',
      checkNum: '',
      password: ''
    }
}
config = {
    navigationBarTitleText: '绑定手机',
    usingComponents: {
      'navbar': '../../../../components/navbar/index', // 书写第三方组件的相对路径
   },
  }
 
//实时修改form表单的值
handleChange (key, value) {
  this.setState({ [key]: value},() => {
    console.log( this.state)
   
  })
  return value
}
//提交form表单
onSubmit () {
  console.log(this.state)
  let params  ={phone:this.state.phoneNum,verify:this.state }
  console.log(params)
  api.post('Login/bindingPhone', params).then((res) => {
   if(res.data.status===200000){
     Taro.redirectTo({
       url: '/pages/my/setting/index',
     })
   }else{
    console.log('绑定失败')
   }
  
  })

}

  render () {
      let {phoneNum,checkNum,password}= this.state;
    return (
        <View className='phone'>
           {/* // eslint-disable-next-line react/jsx-boolean-value */}
           <NavBar title='绑定手机' isLeft={true} />
          <Form  className='phone_form'>
            <View className='phone_input'>
              <AtInput
                className='phone_input_item'
                name='phoneNum' 
                type='text'
                value={phoneNum}
                placeholder='请输入您的手机号' 
                placeholderStyle='color: #D2D2D2'
                border={false}
                onChange={this.handleChange.bind(this,'phoneNum')} 
              />
            </View>

          <View  className='phone_input phone_check'>
            <AtInput
              className='phone_input_item'
              name='checkNum' 
              value={checkNum}
              type='number'
              placeholder='请输入验证码' 
              placeholderStyle='color: #D2D2D2'
              border={false}
              onChange={this.handleChange.bind(this,'checkNum')} 
            />
            <Text className='getCheckNum' >获取验证码</Text>
          </View>
          <View  className='phone_input phone_password'>
            <AtInput
              className='phone_input_item'
              name='password' 
              type='password'
              value={password}
              placeholder='请输入密码' 
              placeholderStyle='color: #D2D2D2'
              border={false}
              onChange={this.handleChange.bind(this,'password')} 
            />
          </View>
        
          <View  className='phone_submit' >
              <Button onClick={this.onSubmit.bind(this)} className='phone_submit_button'>提交</Button>
          </View>

 
        </Form>
        </View>
   
    )
  }
}