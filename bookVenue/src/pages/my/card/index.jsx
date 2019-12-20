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
        phone: 18188888888,
        cardNum: 18188888888,
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


  render () {
      let {cardNum,phone}= this.state;

    return (<View  className='card'>
      <NavBar  title='我的会员卡' isLeft={true}/>
      <View className='card_data'>
        <View className='card_data_item'>
            <Text className='card_data_text'>会员卡号</Text>
            <Text className='card_data_text'>{cardNum}</Text>
        </View>
        <View className='card_data_line'></View>

        <View className='card_data_item'>
            <Text className='card_data_text'>密码</Text>
            <Text className='card_data_text'>****</Text>
        </View>
        <View className='card_data_line'></View>

        <View className='card_data_item'>
            <Text className='card_data_text'>手机号码</Text>
            <Text className='card_data_text'>{phone}</Text>
        </View>
      </View>

    
    </View>
      
     
    )
  }
}