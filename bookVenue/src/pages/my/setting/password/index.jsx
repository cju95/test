/* eslint-disable react/jsx-boolean-value */
import Taro, { Component } from '@tarojs/taro'
import { View,Text, Button, Form} from '@tarojs/components'
import NavBar from '../../../../components/navbar/index'
// eslint-disable-next-line import/first
import { AtInput } from 'taro-ui'
import api from '../../../../services/api'
import './index.less'

export default class Index extends Component {
  constructor(){
    super(...arguments)
    this.state={
      oldPassword: '',
      newPasssword: '',
      surePassword: ''
    }
}
config = {
    navigationBarTitleText: '登录密码',
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
  let {oldPassword, newPasssword, surePassword}= this.state;
  if(oldPassword&&newPasssword&&surePassword){
    let params  ={oldPassword: oldPassword, password: newPasssword, password_repeat:surePassword }
    console.log(params)
    api.post('User/editPassword', params).then((res) => {
     if(res.data.status===200000){
       Taro.redirectTo({
         url: '/pages/my/setting/index',
       })
     }else{
      console.log('密码修改失败')
     }
    
    })
  }else{
    console.log('信息填写不完整')
  }
  
}

  render () {
      let {oldPassword, newPasssword, surePassword}= this.state;
    return (
        // eslint-disable-next-line react/jsx-no-comment-textnodes
        <View className='password'>
          {/* // eslint-disable-next-line react/jsx-equals-spacing */}
          <NavBar title='登录密码' isLeft={true} />
          <Form onSubmit={this.onSubmit.bind(this)} className='password_form'>
            <View className='password_input password_old'>
              <Text className='password_input_text'>旧密码</Text>
              <AtInput
                className='password_input_item'
                name='oldPassword' 
                type='password'
                value={oldPassword}
                placeholder='请输入旧密码' 
                placeholderStyle='color: #D2D2D2'
                border={false}
                onChange={this.handleChange.bind(this,'oldPassword')} 
              />
            </View>

          <View  className='password_input password_check'>
          <Text className='password_input_text'>新密码</Text>
            <AtInput
              className='password_input_item'
              name='newPasssword' 
              value={newPasssword}
              type='password'
              placeholder='请输入新密码' 
              placeholderStyle='color: #D2D2D2'
              border={false}
              onChange={this.handleChange.bind(this,'newPasssword')}
            />
          </View>
          <View  className='password_input password_password'>
          <Text className='password_input_text'>确认密码</Text>
            <AtInput
              className='password_input_item'
              name='surePassword' 
              type='password'
              value={surePassword}
              placeholder='请再次输入密码' 
              placeholderStyle='color: #D2D2D2'
    
              border={false}
              onChange={this.handleChange.bind(this,'surePassword')}
            />
          </View>
        
          <Button  className='password_submit' >
              <Text  className='password_submit_button' >提交</Text>
          </Button>

 
        </Form>
        </View>
   
    )
  }
}