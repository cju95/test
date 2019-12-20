/* eslint-disable react/jsx-boolean-value */
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Form, Button } from '@tarojs/components'
import { AtInput,} from 'taro-ui'
import NavBar from '../../../components/navbar/index'
import api from '../../../services/api'
import './index.less'

export default class Index extends Component {
  constructor(){
    super(...arguments)
    this.state={
      phoneNum: '',
      checkNum: '',
      password:'',
      checkPassword:'',
      type: 1,
    }
}
config = {
    navigationBarTitleText: '忘记密码',
    usingComponents: {
      'navbar': '../../../components/navbar/index', // 书写第三方组件的相对路径
},
  }
 
 //实时修改form表单的值
 handleChange (key, value) {
  console.log('blur')
  this.setState({ [key]: value},()=>{
    console.log(this.state)
  })
  return value
}


//提交form表单
onSubmit () {
  console.log('修改密码')
  let {phoneNum,checkNum,password,checkPassword}= this.state;
  let params = {  'phone' : phoneNum,
                  'verify' : checkNum,
                  'password' : password,
                  'password_repeat' : checkPassword,
                  }
    console.log(params)
    api.post('Login/forgetPassword', params).then((res) => {
      let data01 = res.data.message
      console.log(res.data)
      console.log(data01)
 })

}

//获取验证码
getVerifyCode () {
  console.log('getVerifyCode')
  let {phoneNum,type}= this.state;
  let params = { 'account' : phoneNum,
                  'type' : type,
                }
    api.post('Login/getVerifyCode', params).then((res) => {
      let data01 = res
      // console.log(res.data)
      console.log(data01)
 })
 
}

  render () {
    let {phoneNum,checkNum,password,checkPassword}= this.state;
    return (
        <View className='password_page'>

           <NavBar  title='忘记密码' isLeft={true} />
           <Form className='password_form'>
            <View className='password_input'>
              {/* <AtIcon className='password_input_img' prefixClass='icon' value='phone' size='25' color='#ccc'></AtIcon> */}
              <Image className='password_input_img password_input_phoneimg' src={require('../../../assets/images/register/phone.png')}> </Image>
              <Text className='getCheckNum' onClick={this.getVerifyCode.bind(this)} >获取验证码</Text>
              <AtInput
                className='password_input_item'
                name='phoneNum' 
                type='text'
                value={phoneNum}
                placeholder='手机号' 
                placeholderStyle='color: #929095'
                border={false}
                onChange={this.handleChange.bind(this,'phoneNum')} 
              />
            </View>

            <View  className='password_input'>
              {/* <AtIcon className='password_input_img' prefixClass='icon' value='zhucedengluyanzhengma' size='25' color='#ccc'></AtIcon> */}
              <Image className='password_input_img' src={require('../../../assets/images/register/check.png')}> </Image>
              <AtInput
                className='password_input_item'
                name='checkNum' 
                value={checkNum}
                type='number'
                placeholder='验证码' 
                placeholderStyle='color: #929095'
                border={false}
                onChange={this.handleChange.bind(this,'checkNum')} 
              />
            </View>
            <View  className='password_input'>
              {/* <AtIcon className='password_input_img' prefixClass='icon' value='icon-test' size='25' color='#ccc'></AtIcon> */}
              <Image className='password_input_img' src={require('../../../assets/images/register/lock.png')}> </Image>
              <AtInput
                className='password_input_item'
                name='password' 
                type='password'
                value={password}
                placeholder='请输入密码' 
                placeholderStyle='color: #929095'
                border={false}
                onChange={this.handleChange.bind(this,'password')} 
              />
            </View>
            <View  className='password_input'>
              {/* <AtIcon className='password_input_img' prefixClass='icon' value='icon-test' size='25' color='#ccc'></AtIcon> */}
              <Image className='password_input_img' src={require('../../../assets/images/register/lock.png')}> </Image>
              <AtInput
                className='password_input_item'
                name='checkPassword' 
                type='password'
                value={checkPassword}
                placeholder='重复密码' 
                placeholderStyle='color: #929095'
                border={false}
                onChange={this.handleChange.bind(this,'checkPassword')} 
              />
            </View>
            
            
              <View   >
                  <Button className='password_submit' onTouchEnd={this.onSubmit.bind(this)} >提交</Button>
              </View>
            
              <View className='password_text'>
                  <Text>注册登录某某即表示您同意<Text className='password_protocol' >《某某用户协议》</Text></Text>
              </View>
    
        </Form>
        </View>
   
    )
  }
}