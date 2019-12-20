/* eslint-disable react/jsx-no-undef */
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Head from '../../components/head/head'
import Food from '../../components/food/food'
import api from '../../services/api'

// import { AtIcon } from 'taro-ui'
import './index.less'


export default class Index extends Component {
  constructor(){
    super(...arguments)
    this.state={
      activitys:[{id:1,day:'今天',timeStart:'20:00',tag:'羽',address:'广纸太空羽毛球馆',sence:'3号场',time:'20:00-22:00',img:require('../../assets/images/computer02.png'),count:12,now:0,activityState:'报名中'},
      {id:2,day:'明天',timeStart:'20:00',tag:'羽',address:'广纸太空羽毛球馆',sence:'3号场',time:'20:00-22:00',img:require('../../assets/images/computer02.png'),count:12,now:0,activityState:'报名中'}]
    }
}
  // eslint-disable-next-line react/sort-comp
  config = { 
    usingComponents: {
             'navbar': '../../components/navbar/index', // 书写第三方组件的相对路径
      },
  }

  componentWillUnmount () { 
   
  
  }
  componentDidMount () { 
    Taro.hideShareMenu();
 
    //Taro.clearStorageSync()
    //Taro.removeStorage({ key: 'UserInfo' })
    console.log('的事故发生')
    api.post('Place/placeList','').then((res) => {
      let data01 = res.data.data.placeTypeList
      console.log(data01)
    })
 
  }




  componentDidShow () { }

  componentDidHide () { }

  handleClick (value) {
    console.log(value.id)
    Taro.navigateTo({
        url: '/pages/index/activity/index?id='+value.id
    })
   
  }
//退出登录l
  loginOut (){
      api.post('Login/loginOut', '').then((res) => {
        let data01 = res.data
        // console.log(res.data)
        console.log(data01)
        if(res.data.status==200000){
          Taro.clearStorageSync()
         var user = Taro.getStorageSync('UserInfo')
         console.log(user)
        }
   })
}
 //跳转到登陆页面
  toLogin () {
  Taro.navigateTo({
    url: '/pages/login/index'
})
}
  render () {
    let {activitys} = this.state
    const style = {
      // paddingTop: Taro.$navBarMarginTop + 'px',
      height: Taro.$navBarMarginTop + 'px',
    }
    const stylePadding = {
      paddingTop: Taro.$navBarMarginTop + 'px',
     
    }
    return (
      <View className='index' style={stylePadding} >
        <View className='nav_test' style={style}></View>
        {/* <ScrollView  scrollY> */}
        <Head  />
         <Text  onClick={this.loginOut.bind(this)}>loginOut</Text>
         <View className='activitys'  >
            {
              activitys.map((item,index) =>{
                return (
                  <View className='activity_item' key={index}   onClick={this.handleClick.bind(this,item)}>
                       <View className='activity_day'>- {item.day} -</View>
                      <View className='activity_item_common'>
                        <Text className='activity_timeStart' >{item.timeStart}</Text>
                        <Text className='activity_tag'>{item.tag}</Text>
                        <Text className='activity_address'>{item.address}</Text>
                      </View>
                      <View className='activity_detial'>
                        <Text className='activity_sence'>{item.sence}</Text>
                        <Text className='activity_time'>{item.time}</Text>
                      </View>
                      <View className='activity_item_common'>
                        <Text className='activity_order'>组织者</Text>
                        <Image className='activity_img' src={item.img} ></Image>
                      </View>
                      <View className='activity_item_footer'>
                        {/* // eslint-disable-next-line react/jsx-no-undef */}
                        <Image className='activity_item_footer_img' src={require('../../assets/images/index/people.png')}></Image>
                        <View  >
                          <Text>{item.now}/{item.count}人</Text>
                          <Text className='activity_activityState'>{item.activityState}</Text>
                        </View>
                      </View>
                  </View>
                )
              })
            }
         </View>
         {/* </ScrollView> */}
         <Food />
      </View>
    )
  }
}
