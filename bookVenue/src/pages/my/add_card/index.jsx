import Taro, { Component } from '@tarojs/taro'
import { View,Text,Button} from '@tarojs/components'
import { AtInput,AtForm, AtCurtain, AtButton} from 'taro-ui'
import NavBar from '../../../components/navbar/index'
import api from '../../../services/api'
import './index.less'

export default class Index extends Component {
  constructor(){
    super(...arguments)
    this.state={
        isOpened: false,
        message:'',
        phone: '',
        cardNum: '',
        password:'',
        type: 0,
    }
}
  config = { 
    navigationBarTitleText: '我的会员卡',
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


 //提交form表单
  onSubmit (event) {
    let that = this
    let {phone,checkNum,password}= this.state;
    let params = { 'phone' : phone,
    'verify' : checkNum,
    'password' : password,
    }   
    console.log(params)
    return 

      api.post('Login/card', params).then((res) => {
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
}

  render () {
      let {cardNum,phone,password}= this.state;

    return (<View  className='card'>
       <AtCurtain isOpened={this.state.isOpened} onClick={this.onClose.bind(this)}>
        <View className='alert_page'>
            <Text className='alert_top'>{this.state.message}</Text>
            <View className='alert_footer'>
              <Text isOpened={this.state.isOpened} onClick={this.onClose.bind(this)}>确定</Text>
            </View>
        </View>
      </AtCurtain>
      {/* <Loading toOpened={this.state.isOpened} onOff={this.onClose.bind(this)} showMessage={this.state.message}/> */}
      <NavBar  title='我的会员卡' isLeft={true}/>
      <View className='card_form'>
        <AtForm onSubmit={this.onSubmit.bind(this)} >
  
            <View className='card_input'>
              <AtInput
                  className='card_input_item'
                  name='cardNum' 
                  type='number'
                  value={cardNum}
                  placeholder='输入您的会员卡号' 
                  placeholderClass='test_class'
                  border={false}
                  onBlur={this.handleChange.bind(this,'cardNum')} 
                  />
            </View>
            <View className='card_line'></View>
            <View  className='card_input'>
              <AtInput
                  className='card_input_item'
                  name='password' 
                  type='password'
                  value={password}
                  placeholder='输入您的密码' 
                  border={false}
                  onBlur={this.handleChange.bind(this,'password')} 
                  />
            </View>
            <View className='card_line'></View>
            <View  className='card_input'>
              <AtInput
                  className='card_input_item'
                  name='phone' 
                  type='number'
                  value={phone}
                  placeholder='输入您的手机号' 
                  border={false}
                  onBlur={this.handleChange.bind(this,'phone')} 
                  />
            </View>
          
            
              <View  className='card_submit' >
                  <AtButton formType='submit' className='card_submit_item' >添加会员卡</AtButton>
              </View>
            
            
          </AtForm>
      </View>

    
    </View>
      
     
    )
  }
}