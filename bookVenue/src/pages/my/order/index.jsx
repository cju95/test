/* eslint-disable react/sort-comp */
/* eslint-disable import/first */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-boolean-value */
import Taro, { Component } from '@tarojs/taro'
import { View,Text, Button, Image} from '@tarojs/components'
import NavBar from '../../../components/navbar/index'
 import { AtToast, AtCurtain  } from 'taro-ui'
import './index.less'
import api from '../../../services/api'

export default class Index extends Component {
  constructor(){
    super(...arguments)
    this.state={
      current: 0,
      isOpened: false,
      isOpenedAlert: false,
      tipText: '',
      message: '是否删除订单？',
      undoneList: [{date:'2019-09-23', day: '今天',time: '12:00-14:00', address: 'L2羽毛球馆', sence: '羽毛球3号厂', price: '20.0', sort:'羽毛球 ', state: false, orderNum:'9626 8065', code: '../../../assets/images/my/order/code.png' },
                  {date:'2019-09-23', day: '明天',time: '12:00-14:00', address: 'L2羽毛球馆', sence: '羽毛球3号厂', price: '20.0', sort:'羽毛球 ',  state: false, orderNum:'9626 8885', code: '../../../assets/images/my/order/code.png'}],
      finishedList: [{date:'2019-09-18', day: '今天',time: '12:00-14:00', address: 'L2羽毛球馆', sence: '羽毛球3号厂', price: '20.0', sort:'羽毛球 '},
                  {date:'2019-09-23', day: '明天',time: '12:00-14:00', address: 'L2羽毛球馆', sence: '羽毛球3号厂',  price: '20.0', sort:'羽毛球 '}],
      allList: [{date:'2019-09-23', day: '今天',time: '12:00-14:00', address: 'L2羽毛球馆', sence: '羽毛球3号厂', price: '20.0', sort:'羽毛球 ', state: true},
                {date:'2019-09-23', day: '明天',time: '12:00-14:00', address: 'L2羽毛球馆', sence: '羽毛球3号厂', price: '20.0', sort:'羽毛球 ',  state: false}],
      tabList: [{ title: '待开始' , val: 0}, 
                { title: '已完成' , val: 1}, 
                { title: '已取消' , val: 2}, 
                { title: '全部', val: 3 }],
    }
}
  config = {
      navigationBarTitleText: '活动管理',
      usingComponents: {
        'navbar': '../../../components/navbar/index', // 书写第三方组件的相对路径
    },
    }

  componentWillMount(){
    this.getOrderList('2')
  }

//获取当前订单集
 getOrderList(value){
  let parmas = {'type': value}
  api.post('Order/orderList',parmas).then((res) =>{
    console.log('orderList',res.data.data)
  })
 }


  handleClick (value) {
    console.log(value)
    this.setState({
      current: value,
      isOpened: false,
    })
  }


  toActivityDetail () {
    Taro.navigateTo({
      url: '/pages/my/activity/order_edit/index'
    })
  }


    //打开幕帘
    onOpen () {
      console.log('打开幕帘')
     this.setState({
     isOpenedAlert: true,
     isOpened: false,
     })
   }
    //关闭幕帘
    onClose () {
     console.log('关闭幕帘')
     this.setState({
      isOpenedAlert: false,
      isOpened: false,
     })
 }
  //打开提示弹窗
  isOpenedTip(value) {
    // eslint-disable-next-line no-unused-vars
    let message = '';
    if(value=='cancel'){
      message = '订单已取消'
    }else{
      message = '已成功支付'
    }
    this.setState({
    isOpened: true,
    tipText: message
    })
  }


  render () {
      let {undoneList, finishedList, current, tabList,allList, isOpened, tipText}= this.state;
      // const style = {
      //   marginTop: Taro.$navBarMarginTop + 'px'
      // }
    return (

        <View className='order'>
          <AtToast className='order_toast' isOpened={isOpened} duration={1000} text={tipText} ></AtToast>

          <AtCurtain isOpened={this.state.isOpenedAlert} onClick={this.onClose.bind(this)}>
            <View className='alert_page'>
                <Text className='alert_top'>{this.state.message}</Text>
                <View className='alert_footer'>
                  <Text isOpened={this.state.isOpenedAlert} onClick={this.onClose.bind(this)}>确定</Text>
                </View>
            </View>
          </AtCurtain>
          <NavBar title='活动管理' isLeft={true} />
          <View current={this.state.current} tabList={tabList}  className='order_tabs'>
            <View className='order_tabs_item'>
                {/* <View className={'order_tabs_text '+(current===0?'order_tabs_active':'')}
                      onClick={this.handleClick.bind(this, 0)}>
                        待开始
                        <View className='order_tabs_line'></View>
                </View>
                <View className={'order_tabs_text '+(current===1?'order_tabs_active':'')}
                      onClick={this.handleClick.bind(this, 1)}>
                        已完成
                        <View className='order_tabs_line'></View>
                </View> */}
              {
                  tabList.map((item, index) =>{
                  return ( <View value={item.val} 
                                // eslint-disable-next-line react/jsx-indent-props
                                className={'order_tabs_text '+(current===index?'order_tabs_active':'')}
                                onClick={this.handleClick.bind(this, item.val)}
                                key={index}
                  >
                          {item.title}
                          <View className='order_tabs_line'></View>
                      </View>)
                  })
              }

            </View>
            <View current={this.state.current} index={0} className={'order_pane '+(current===0?'order_pane_active':'')}>

                {
                    undoneList.map((item, index) =>{
                      return (<View className='finished_item' key={index} > 
                       <Text className='finished_item_title' onClick={this.onOpen.bind(this)}>{item.address} </Text>
                      <View className='finished_item_common'>
                         <Text className='finished_item_text'>{item.sort}    
                            <Text className='finished_item_data'> { item.date} </Text>
                            ({item.day})
                         </Text>
                         <Text className='finished_item_price'>¥{item.price}</Text>
                      </View>
                      <Text className='finished_item_text'>时间场地: {item.sence}  {item.time}</Text>
                      <View className='finished_item_infor'>
                          <Text className='finished_item_orderNum'>订单号: {item.orderNum}</Text>
                          <Image className='finished_item_code' src={require('../../../assets/images/my/order/code.png')}></Image>
                      </View>
                      </View>)
                    })
                }

            </View>


            <View current={this.state.current} index={1} className={'order_pane '+(current===1?'order_pane_active':'')}>
               {
                    finishedList.map((item, index) =>{
                      return (<View className='finished_item' key={index} > 
                      <Text className='finished_item_title'>{item.address}</Text>
                      <View className='finished_item_common'>
                         <Text className='finished_item_text'>{item.sort}    
                            <Text className='finished_item_data'> { item.date} </Text>
                            ({item.day})
                         </Text>
                         <Text className='finished_item_price'>¥{item.price}</Text>
                      </View>
                      <Text className='finished_item_text'>时间场地: {item.sence}  {item.time}</Text>
                    
                      </View>)
                    })
                }
            </View>
            <View current={this.state.current} index={2} className={'order_pane '+(current===2?'order_pane_active':'')}>
               {
                    finishedList.map((item, index) =>{
                      return (<View className='finished_item' key={index} > 
                      <Text className='finished_item_title'>{item.address}</Text>
                      <View className='finished_item_common'>
                         <Text className='finished_item_text'>{item.sort}    
                            <Text className='finished_item_data'> { item.date} </Text>
                            ({item.day})
                         </Text>
                         <Text className='finished_item_price'>¥{item.price}</Text>
                      </View>
                      <Text className='finished_item_text'>时间场地: {item.sence}  {item.time}</Text>
                    
                      </View>)
                    })
                }
            </View>


            <View current={this.state.current} index={3} className={'order_pane '+(current===3?'order_pane_active':'')}>
               {
                    allList.map((item, index) =>{
                      return (<View className='finished_item' key={index} > 
                      <View className='finished_item_common'>
                        <Text className='finished_item_title'>{item.address}</Text>
                        {
                          item.state===false
                          ?
                          <Text className='finished_item_state'>未支付</Text>
                          :
                          ''
                        }
                      </View>
                      <View className='finished_item_common'>
                         <Text className='finished_item_text'>{item.sort}    
                            <Text className='finished_item_data'> { item.date} </Text>
                            ({item.day})
                         </Text>
                         <Text className='finished_item_price'>¥{item.price}</Text>
                      </View>
                      <Text className='finished_item_text'>时间场地: {item.sence}  {item.time}</Text>
                      {
                        item.state===false
                        ?
                        <View className='finished_item_footer'>
                          <Button className='cansole_button' onClick={this.isOpenedTip.bind(this,'cancel')}>取消订单</Button>
                          <Button className='pay_button' onClick={this.isOpenedTip.bind(this,'')}>立即支付</Button>
                      </View>
                      :
                      ''
                      }
                      </View>)
                    })
                }
            </View>
          </View>
        
        </View>
   
    )
  }
}