/* eslint-disable react/jsx-boolean-value */
import Taro, { Component } from '@tarojs/taro'
import {View,Text,Image,Radio, RadioGroup, Button} from '@tarojs/components'
import Navbar  from '../../../../components/navbar/index'
import './index.less'

class Confirm extends Component{
    constructor(){
        super(...arguments)
        this.state={
            action:{id: 1,day: '周二',price: 30,date: '9月23号',address:'广纸太空羽毛球馆',sence:'羽毛球3号场',time:'20:00-22:00',img:require('../../assets/images/computer02.png'),phone:13420117978},
            // eslint-disable-next-line react/no-unused-state
            words: 'Q1：活动现在已经有多少人了？',
            title: '支付',
           // payWay: 1, //1 是微信 , 2 是支付宝
            minutes: 9,
            seconds: 59, //称数初始化
            liked: '', //获取验证码文案,
            list: [
                {
                    value: '1',
                    text: '微信',
                    checked: true
                },
                {
                    value: '2',
                    text: '支付宝',
                    checked: false
                },]
            
        }
    }
    componentDidMount(){
        this.timeTransition(598000);//根据接口返回的时间
    }
    timeTransition = (ms) => {
        let maxtime = ms / 1000; //按秒计算
        let timer = null;
        let _this = this;
        setTimeout(function f(){
            if (maxtime >= 0) {
                let minutes = Math.floor(maxtime / 60);
                let seconds = Math.floor(maxtime % 60);
                // minutes < 10 ? minutes = '0' + minutes : minutes = minutes;
                seconds < 10 ? seconds = '0' + seconds : seconds = seconds;
                _this.setState({
                    minutes: minutes,
                    seconds: seconds
                });
                --maxtime;
            } else{
                _this.setState({
                    liked: '订单已过期，请重新下单',
                    // eslint-disable-next-line no-undef
                    minutes: minutes,
                    // eslint-disable-next-line no-undef
                    seconds: seconds
                });
                clearTimeout(timer);
                return;
            }
            timer = setTimeout(f,1000);
        },1000);
    }

    submitClick (value) {
        console.log(value)
      }
    handleChange(event){
        this.setState({
            // eslint-disable-next-line react/no-unused-state
            words: event.target.value
          })
    }
    //获取支付方式 
    singlechange (e){
        console.log('所选值='+e.detail.value)
        this.setState({
           // payWay: e.detail.value
          })
      }

    toWords () {
        console.log(this.state.action.id)
        Taro.navigateTo({
            url: '/pages/index/confirm/words/index?id='+ this.state.action.id
        })
    }
    config = { 
        navigationBarTitleText: '支付',
        usingComponents: {
                 'navbar': '../../../../components/navbar/index', // 书写第三方组件的相对路径
          },
      }
    render(){
         let { title, action, list,minutes,seconds,liked} =this.state;
       
        return (<View className='pay_page'>
            <Navbar title={title} isLeft={true} rightText='帮助' textUrl='' />
            <View className='pay_head'>
                <View className='pay_item pay_other'>
                    <Text className='pay_title pay_left'>订单名称：</Text>
                    <Text className='pay_address pay_right'>羽荃羽毛球俱乐部</Text>
                </View>
                <View className='pay_item'>
                    <Text className='pay_title pay_left'>支付金额：</Text>
                    <Text className='pay_price pay_right'>¥{action.price}</Text>
                </View>
            </View>

            <View className='pay_head'>
                {/* // eslint-disable-next-line react/jsx-no-undef */}
                <RadioGroup onChange={this.singlechange.bind(this)}>
                    <View className='pay_item pay_other'>
                        <Image className='pay_img_wei pay_left' src={require('../../../../assets/images/index/pay/weixin.png')}></Image>
                        <Radio style={{transform:'scale(0.8)'}} className='pay__radio pay_right' value={list[0].value} checked={list[0].checked}></Radio>
                    </View>
                    <View className='pay_item'>
                        <Image className='pay_img_zhi pay_left'  src={require('../../../../assets/images/index/pay/zhi.png')}></Image>
                        <Radio style={{transform:'scale(0.8)'}}  className='pay__radio pay_right' value={list[1].value} checked={list[1].checked}></Radio>
                    </View>
                </RadioGroup>
            </View>

            <Text className='pay_tip'>
                {
                    liked ==''
                    ?
                    <Text> 请在
                        <Text className='pay_tip_time'>{minutes}</Text>分
                        <Text className='pay_tip_time'>{seconds}</Text>秒内完成付款，否则订单自动消失。
                    </Text>
                    :
                    liked
                }
            </Text>

            <View className='pad_footer'>
                <Button className='pay_button'>确认支付</Button>
            </View>
            
            </View>)
    }
}

export default Confirm;