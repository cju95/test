/* eslint-disable react/jsx-indent-props */
import Taro, { Component } from '@tarojs/taro'
import { View,Text, Image, Button, Form} from '@tarojs/components'
import { AtInput, AtCurtain} from 'taro-ui'
import NavBar from '../../../components/navbar/index'
import api from '../../../services/api'
import './index.less'

export default class Index extends Component {
  constructor(){
    super(...arguments)
    this.state={
        isOpened: false,
        message:'注册成功',
        phoneNum: '',
        checkNum: '',
        password:'',
        // eslint-disable-next-line react/no-unused-state
        checkPassword:'',
        nickName: '',
        type: 0,
    }
}
  config = { 
    navigationBarTitleText: '注册',
    usingComponents: {
         'navbar': '../../../components/navbar/index', // 书写第三方组件的相对路径
      },
  }
 //实时修改form表单的值
  handleChange (key, value) {
    console.log('blur')
    this.setState({ [key]: value})
    return value
  }

//获取验证码
getVerifyCode () {
  console.log('getVerifyCode')
  let {phoneNum,type}= this.state;
  let params = { 'account' : phoneNum,
                  'type' : type,
                }
    api.post('Login/getVerifyCode', params).then((res) => {
      let data01 = res.data
      // console.log(res.data)
      console.log(data01)
 })
 
}

 //提交form表单
  onSubmit () {
    let that = this
    let {phoneNum,checkNum,password,checkPassWord,nickName}= this.state;
    let params = { 'phone' : phoneNum,
    'verify' : checkNum,
    'password' : password,
    'password_repeat' : checkPassWord,
    'name' : nickName,
    }
      api.post('Login/register', params).then((res) => {
        let data01 = res.data.message
        console.log(res.data)
        that.setState({message:data01},() =>{
          that.onOpen()
        })  
   })
   console.log('data')
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
    Taro.redirectTo({
      url: '/pages/login/index'
    })
}

  render () {
      let {phoneNum,checkNum,password,checkPassWord,nickName}= this.state;

    return (<View  className='register'>
       <AtCurtain isOpened={this.state.isOpened} onClick={this.onClose.bind(this)}>
        <View className='alert_page'>
            <Text className='alert_top'>{this.state.message}</Text>
            <View className='alert_footer'>
              <Text isOpened={this.state.isOpened} onClick={this.onClose.bind(this)}>确定</Text>
            </View>
        </View>
      </AtCurtain>
      {/* <Loading toOpened={this.state.isOpened} onOff={this.onClose.bind(this)} showMessage={this.state.message}/> */}
     

       <Form  className='register_form'>
        <NavBar  title='注册' />
        <View className='register_input'>
          {/* <AtIcon className='register_input_img' prefixClass='icon' value='phone' size='25' color='#ccc'></AtIcon> */}
          <Image className='register_input_img register_input_phoneimg' src={require('../../../assets/images/register/phone.png')}> </Image>
          <Text className='getCheckNum' onClick={this.getVerifyCode.bind(this)} >获取验证码</Text>
          <AtInput
              className='register_input_item'
              name='phoneNum' 
              type='text'
              value={phoneNum}
              placeholder='手机号' 
              placeholderStyle='color: #929095'
              border={false}
              onBlur={this.handleChange.bind(this,'phoneNum')} 
          />
        </View>

        <View  className='register_input'>
          {/* <AtIcon className='register_input_img' prefixClass='icon' value='zhucedengluyanzhengma' size='25' color='#ccc'></AtIcon> */}
          <Image className='register_input_img' src={require('../../../assets/images/register/check.png')}> </Image>
          <AtInput
              className='register_input_item'
              name='checkNum' 
              value={checkNum}
              type='number'
              placeholder='验证码' 
              placeholderStyle='color: #929095'
              border={false}
              onBlur={this.handleChange.bind(this,'checkNum')} 
          />
        </View>
        <View  className='register_input'>
          {/* <AtIcon className='register_input_img' prefixClass='icon' value='icon-test' size='25' color='#ccc'></AtIcon> */}
          <Image className='register_input_img' src={require('../../../assets/images/register/lock.png')}> </Image>
          <AtInput
              className='register_input_item'
              name='password' 
              type='password'
              value={password}
              placeholder='请输入密码' 
              placeholderStyle='color: #929095'
              border={false}
              onBlur={this.handleChange.bind(this,'password')} 
          />
        </View>
        <View  className='register_input'>
          {/* <AtIcon className='register_input_img' prefixClass='icon' value='icon-test' size='25' color='#ccc'></AtIcon> */}
          <Image className='register_input_img' src={require('../../../assets/images/register/lock.png')}> </Image>
          <AtInput
              className='register_input_item'
              name='checkPassWord' 
              type='password'
              value={checkPassWord}
              placeholder='重复密码' 
              placeholderStyle='color: #929095'
              border={false}
              onBlur={this.handleChange.bind(this,'checkPassWord')} 
          />
        </View>
        <View  className='register_input'>
          {/* <AtIcon  className='register_input_img' prefixClass='icon' value='nickname' size='25' color='#ccc'></AtIcon> */}
          <Image className='register_input_img' src={require('../../../assets/images/register/my.png')}> </Image>
          <AtInput 
              className='register_input_item'
              name='nickName'  
              type='text' 
              placeholder='请输入您的姓名'
              placeholderStyle='color: #929095'
              value={nickName} 
              border={false}
              onBlur={this.handleChange.bind(this,'nickName')} 
          />
        </View>
        
          <View   >
              <Button className='register_submit'  onTouchEnd={this.onSubmit.bind(this)} >注册</Button>
          </View>
        
          <View className='register_text' onClick={this.onClose.bind(this)}>
              <Text>注册登录某某即表示您同意<Text className='register_protocol' >《某某用户协议》</Text></Text>
          </View>
 
        </Form>
    </View>
      
     
    )
  }
}