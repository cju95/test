/* eslint-disable react/jsx-indent-props */
/* eslint-disable import/first */
/* eslint-disable react/jsx-boolean-value */
import Taro, { Component } from '@tarojs/taro'
import { View,Button, Text} from '@tarojs/components'
import NavBar from '../../../components/navbar/index'
import { AtTextarea, AtCurtain } from 'taro-ui'
import api from '../../../services/api'
import './index.less'

export default class Index extends Component {
  constructor(){
    super(...arguments)
    this.state={
      words: '',
      contactWay: '',
      isOpened: false,
      message: '您的反馈已提交'

    }
}
config = {
    navigationBarTitleText: '意见反馈',
    usingComponents: {
      'navbar': '../../../components/navbar/index', // 书写第三方组件的相对路径
   },
  }

 //更新内容
  handleChange (key,event) {
    this.setState({
      [key] :event.target.value
    })
  }

   //提交意见反馈
   handleSubmit () {
    let {words, contactWay } = this.state
    let params = {'context':words,'contactWay' :contactWay}
    api.post('User/feedBack',params).then((res) => {
        if (res.data.status==200000) {
          console.log(res.data.message)
        }
    })
    
  }
    //打开幕帘
    onOpen () {

      console.log('打开幕帘')
      api.post('')
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

    return (
        <View className='opinnion' >
          <NavBar title='意见反馈' isLeft={true} />
          <AtCurtain isOpened={this.state.isOpened} onClick={this.onClose.bind(this)}>
            <View className='alert_page'>
                <Text className='alert_top'>{this.state.message}</Text>
                <View className='alert_footer'>
                  <Text isOpened={this.state.isOpened} onClick={this.onClose.bind(this)}>确定</Text>
                </View>
            </View>
          </AtCurtain>
          <View className='opinnion_body'>
            <View  className='opinnion_words opinnion_item' >
              <AtTextarea 
                  className='opinnion_content'
                  value={this.state.words}
                  onChange={this.handleChange.bind(this,'words')}
                  maxLength={200}
                  count={false}
                  placeholder='请输入200字以内的意见或建议'
              />
              </View>
            <View className='contact_way opinnion_item'>
              <AtTextarea 
                  count={false}
                  className='opinnion_content'
                  value={this.state.contactWay}
                  maxLength={20}
                  height={40}
                  onChange={this.handleChange.bind(this,'contactWay')}
                  placeholder='留下您的联系方式方便与您沟通'
              />
            </View>
            <View className='opinnion_footer'>
                <View className='opinnion_footer_item'>
                     <Button className='opinnion_button'  onClick={this.handleSubmit.bind(this)}>提交</Button>
                </View>
            </View>
         </View>
        </View>
   
    )
  }
}