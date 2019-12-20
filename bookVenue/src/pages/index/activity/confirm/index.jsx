/* eslint-disable react/jsx-boolean-value */
import Taro, { Component } from '@tarojs/taro'
import {View,Text,Image,Button} from '@tarojs/components'
// import { AtIcon , AtTextarea} from 'taro-ui'
import Navbar  from '../../../../components/navbar/index'
import './index.less'

class Confirm extends Component{
    constructor(){
        super(...arguments)
        this.state={
            action:{id: 1,day: '周二',price: 30,date: '9月23号',address:'广纸太空羽毛球馆',sence:'羽毛球3号场',time:'20:00-22:00',img:require('../../assets/images/computer02.png'),phone:13420117978},
            // eslint-disable-next-line react/no-unused-state
            words: 'Q1：活动现在已经有多少人了？',
            title: '确认订单'
        }
    }
    submitClick () {
        Taro.redirectTo({
            url: '/pages/index/activity/pay/index'
        })
      }
    handleChange(event){
        this.setState({
            // eslint-disable-next-line react/no-unused-state
            words: event.target.value
          })
    }

    toWords () {
        console.log(this.state.action.id)
        Taro.redirectTo({
            url: '/pages/index/confirm/words/index?id='+ this.state.action.id
        })
    }
    config = { 
        navigationBarTitleText: '确认订单',
        usingComponents: {
                 'navbar': '../../../../components/navbar/index', // 书写第三方组件的相对路径
          },
      }
    render(){
         let {action,title} =this.state;
       
        return (<View className='confirm'>
        <Navbar title={title} isLeft={true} />
         <View className='confirm_head'>
            <View className='confirm_time confirm_common'>
                <Text className='confirm_timeStart'>{action.date} (<Text>{action.day}</Text>)</Text>
                <Text className='confirm_tag'>{action.time}</Text>
            </View>
            <View className='confirm_common'>{action.address}</View>
            <View className='confirm_common'>场地: {action.sence}</View>
            <View className='confirm_common'>活动费用: <Text  className='confirm_submit_price'>{action.price}元</Text></View>

         </View>
         <View className='confirm_head'>
            <View className='confirm_common'>预定手机号码: {action.phone}</View>

         </View>

         <View className='confirm_submit'> 
             <View className='confirm_submit_top'>
                 <View className='confirm_submit_top_left'>
                     <Image  className='confirm_submit_img' src={require('../../../../assets/images/index/tip.png')}></Image>
                     <Text>仅限一人</Text>
                 </View>
                 <Text>需支付金额:<Text className='confirm_submit_price'>{action.price}元</Text></Text>
            </View>
            <Button className='confirm_submit_button' onClick={this.submitClick.bind(this,action)}>立即支付</Button>
         </View>

        </View>)
    }
}

export default Confirm;