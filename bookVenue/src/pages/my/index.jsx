/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-state */

import Taro, { Component } from '@tarojs/taro'
import { View,Text,Button, Image} from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import NavBar from '../../components/navbar/index'
import Food from '../../components/food/food'
import api from '../../services/api'
import './index.less'

export default class Index extends Component {
  constructor(){
    super(...arguments)
    this.state={
      name:'用户名',
      // eslint-disable-next-line react/no-unused-state
      isOpened: false,
      // eslint-disable-next-line react/no-unused-state
      backUrl: '',
      current: 0,
      myInformation:[{title:'运动次数',count:6},
      {title:'运动时长',count:10},
      {title:'运动类型',count:2},],
      touchC: [0, 0],
      touchS: [0, 0],
      
    }
  }
  config = {
      navigationBarTitleText: '我的',
      usingComponents: {
        'navbar': '../../components/navbar/index', // 书写第三方组件的相对路径
  },
    }
    // handleChange () {
    //   console.log(this.state.isOpened)
    //   this.setState({
    //     isOpened: true
    //   })
    // }


    componentWillMount(){
     
     let iuser =  Taro.getStorageSync('UserInfo')
     this.setState({
      current: iuser.identity
    })

      api.post('User/index', {}).then((res) => {
        console.log('User/index')
        if(res.data.status==200000){
          let userData = res.data.userInfo
          console.log(res.data)
          console.log(userData)
        }
        // else{
        //   Taro.redirectTo({
        //     url: `/pages/login/index`
        // })
        // } 
   })
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
  //跳转页面
  toPage (page,type) {
    console.log(page,type)
    Taro.navigateTo({
      url: `/pages/my/${page}/index`
  })  
  }

//   touchStart (e) {
//     let sx = e.touches[0].pageX
//     let sy = e.touches[0].pageY
//     this.setState({
//       touchC: [sx, sy],
//       touchS: [sx, sy]
//     })
// }
  // touchMove(e) {
  //     let touchF = this.state.touchS
  //     let sx =Math.abs( e.touches[0].pageX-touchF[0])
  //     let sy = Math.abs( e.touches[0].pageY-touchF[1])
  //     if(sx>5||sy>5){
  //       console.log(sx,sy)
  //       this.setState({
  //         touchS: [e.touches[0].pageX, e.touches[0].pageY]
  //       })
  //     }
  // }
  // touchEnd (e) {
  //     let start = this.state.touchC
  //     let end = this.state.touchS
  //     console.log(start)
  //     console.log(end)
  //     if (start[0] < end[0] ) {
  //         console.log('右滑')
  //     } else if (start[0] > end[0]) {
  //         console.log('左滑')
  //     } else {
  //         console.log('静止')
  //     }
  //     if (start[1] < end[1] ) {
  //       console.log('下移')
  //   } else if (start[1] > end[1]) {
  //       console.log('上移')
  //   } else {
  //       console.log('静止')
  //   } 
  // }

  render () {
    let {name, myInformation, current, isOpened}=this.state
    return (
      <View className='index'>
         <NavBar  title='我的'  />
         <View className='head'>
           <View className='head_back' onTouchStart={this.touchStart.bind(this)} onTouchMove={this.touchMove.bind(this)} onTouchEnd={this.touchEnd.bind(this)}>
            <Image className='head_back_img' src={require('../../assets/images/my/myBanner.jpg')} ></Image>
          
           </View>
          <View className='head_right' onClick={this.toPage.bind(this,'data')} >
            <AtIcon value='chevron-right' size='20' color='#fff' className='test'></AtIcon>
          </View>
          <View  className='my_img'  onClick={this.onOpen.bind(this)}>
             <Image  className='my_img_box' src={require('../../assets/images/my/photo.jpg')} ></Image>
          </View> 
          <View  className='my_name' >
          <Text >{name}</Text>
          </View> 
          
          <View className='head_footer'>
            {myInformation.map((item,index) =>{
              return (<View className='head_footer_item' key={index}><Text className='head_footer_count'>{item.count}</Text><Text className='head_footer-title'>{item.title}</Text></View>)
            })
            }
          </View>
         </View>


        <View className='body'>

            <View className='my'>
              <View className='my_item'  onClick={this.toPage.bind(this,'order')}>
                <View >
                  <Image  className='my_item_img' src={require('../../assets/images/my/order.png')} ></Image>
                  <Text>我的订单</Text>
                </View>
                <AtIcon value='chevron-right' size='20' color='#CCC'></AtIcon>
              </View>

              <View className='my_item'  onClick={this.toPage.bind(this,'activity')}>
                <View>
                <Image  className='my_item_img' src={require('../../assets/images/my/activity.png')} ></Image>
                  <Text>我的活动</Text>
                </View>
               <View>
                 <Text className='my_item_activity'>发起活动, 认识新朋友</Text>
                 <AtIcon value='chevron-right' size='20' color='#CCC'></AtIcon>
               </View>
               </View>
              {
                current==0?
              <View className='my_item'  onClick={this.toPage.bind(this,'card')}>
                <View >
                  <Image  className='my_item_img' src={require('../../assets/images/my/card.png')} ></Image>
                  <Text>我的会员卡</Text>
                </View>
                <AtIcon value='chevron-right' size='20' color='#CCC' ></AtIcon>
              </View>
              :
              null
              }
               
             

            </View>
     
            <View className='config'>
              <View className='my_item' onClick={this.toPage.bind(this,'opinion')}>
                <View>
                <Image  className='my_item_img' src={require('../../assets/images/my/idea.png')} ></Image>
                  <Text>意见反馈</Text>
                </View>
                <AtIcon value='chevron-right' size='20' color='#CCC' ></AtIcon>
              </View>
              <View className='my_item' onClick={this.toPage.bind(this,'setting')}>
                <View>
                <Image  className='my_item_img' src={require('../../assets/images/my/setting.png')}  ></Image>
                <Text>设置</Text>
                </View>
                <AtIcon value='chevron-right' size='20' color='#CCC' ></AtIcon>
              </View>
              <View className='my_other'>
               
              </View>

            </View>
        </View>

        <View className={'isalert '+(isOpened==true?'alert':'')}>
            <View className={'alert_content '+(isOpened==true?'':'isalert_content')}>
                <View className='isalert_content_top'>
                  <Button className='alert_button' onClick={this.toPage.bind(this,'photo_cut')}>拍照上传</Button>
                  <Button className='alert_button' onClick={this.toPage.bind(this,'photo')}>选择相册</Button>
                </View>
                <Button className='alert_button alert_cancel' onClick={this.onClose.bind(this)}>取消</Button>
            </View>
        </View>

        {/* <AtCurtain isOpened={this.state.isOpened} onClick={this.onClose.bind(this)}>
        <View className='alert_page'>
            <Text className='alert_top'>{this.state.message}</Text>
            <View className='alert_footer'>
              <Text isOpened={this.state.isOpened} onClick={this.onClose.bind(this)}>确定</Text>
            </View>
        </View>
      </AtCurtain> */}

        <Food />
      </View>
    )
  }
}
