/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-no-undef */
import Taro, { Component } from '@tarojs/taro'
import { View,Text} from '@tarojs/components'
import { AtIcon, AtCurtain , AtInput } from 'taro-ui'
import NavBar from '../../../components/navbar/index'
import api from '../../../services/api'

import './index.less'

export default class Index extends Component {
  constructor(){
    super(...arguments)
    this.state={
      isOpened: false,
      isPhoto: false,
      isSchool: false,
      isUpdate: false,
      editName: false,
      username: '',
      message:'您已经绑定了手机号码，确定要绑定新的手机号码？',
      myData:{photo:'第三方',username:'恍恍惚',sex: '男', age : '',},
      // ageList:['隐藏','95后','90后','85后','80后','75后','70后'],
      ageList: [{value:null,text:'隐藏',sort:'age'},{value:'95后',text:'95后', sort:'age'},{value:'90后',text:'90后', sort:'age'},{value:'85后',text:'85后', sort:'age'},{value:'80后',text:'80后', sort:'age'},{value:'75后',text:'75后', sort:'age'},{value:'70后',text:'70后', sort:'age'}],
      sexList: [{text:'男',value:'0',sort:'sex'},{text:'女', value:'1',sort:'sex'}],
      alerList:[],
      camera: false, //启动拍照
      tempImagePath: '', //照片临时地址
      tempImagePathBase: '', //照片base64
      ctx: {},
    }
}
// eslint-disable-next-line react/sort-comp
config = {
    navigationBarTitleText: '我的资料',
    usingComponents: {
      'navbar': '../../../components/navbar/index', // 书写第三方组件的相对路径
   },
  }
 


  componentWillMount(){
    this.getUserInfo()
    this.setState({
      ctx: Taro.createCameraContext()
    })
  
  }

//修改页面上的信息
updateUserInfo(key,value){
  // let that = this
  console.log(value)
  if (value ==this.state.myData[key]) {
    return
  }
  this.setState((test) => {
    test.myData[key] = value
    test.isUpdate = true
  })
}

  //获取用户信息
  getUserInfo() {
    let that = this
    
    api.post('User/myInfo', {}).then((res) => {
      let userInfo = res.data.data.userInfo
      that.setState({  myData: userInfo ,isUpdate: false},() =>{
        console.log(that.state.myData)
      })
    })
  }


//提交修改信息并更新页面数据
handleChange () {
  let params = this.state.myData
  console.log(params)
  let that = this
  api.post('User/editMyInfo', params).then((res) => {
    let state = res.data
    console.log(state)
    //如果修改数据成功
    if(state.status==200000){
      that.getUserInfo()
    }else{
      console.log(state.message)
    }
})
}

handleUsername (value) {
  this.setState({
    username:value
  })
  // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
  return value
}


    //打开幕帘
    onOpen (value) {
      console.log(value)
      console.log(this.state.isOpened)
      let val = this.state[value]
      console.log(val)
      this.setState({
        isOpened: true,
        alerList: val,
         
     })
   }
     //打开photo幕帘
     onOpenPhoto () {
      console.log('打开头像幕帘')
     this.setState({
     isPhoto: true
     })
   }
    //关闭幕帘
    onClose (key,value) {
     console.log('关闭幕帘')
     console.log(key,value)
    this.updateUserInfo(key,value)
    this.setState({
     isOpened: false,
     isPhoto: false
     })  
 }
 //编辑用户姓名
 editUsername(e) {
  e.stopPropagation()
  this.setState({editName: true})
  console.log()
 }

 //结束编辑用户姓名
 endUsername(e) {
  e.stopPropagation()
  this.setState({editName: false })
  if(this.state.username){
    this.updateUserInfo('username',this.state.username)
  }
  console.log(this.state.username)
 }


  //跳转页面
 toPage (page) {
    console.log(page)
  }

  
// 打开模拟的相机界面
open() {
  console.log("开启相机准备");
  this.setState({
    camera: true,
  })
}
// 关闭模拟的相机界面
close() {
  console.log("关闭相机");
  this.setState({
    camera: false
  })
}
//将照片格式转成base64编码
photoBase(test){
 // let that = this
Taro.request({
  url: test,
  responseType: 'arraybuffer',
  success:res=>{
    //把arraybuffer转成base64
        let base64 = Taro.arrayBufferToBase64(res.data); 
      
        //不加上这串字符，在页面无法显示的哦
        base64　= 'data:image/jpeg;base64,' + base64　
        api.post('User/joinFaceuser',{'imgurl':base64}).then((result) =>{
          console.log(result.data)
        })
        //打印出base64字符串，可复制到网页校验一下是否是你选择的原图片呢
        console.log(base64)　

        this.setState({
          tempImagePathBase: base64,
        })
      }

})
 
}
//拍照
camera() {
  let { ctx } = this.state;
  //let that = this
  // 拍照
    console.log("拍照");
    ctx.takePhoto({
      quality: "normal",
      success: (res) => {
        // console.log(res);
        this.photoBase(res.tempImagePath)
        this.setState({
          tempImagePath: res.tempImagePath,
          camera: false,
          isPhoto: false

        })
        console.log('是否是')
        // wechat.uploadFile("https://xx.xxxxxx.cn/api/upload", res.tempImagePath, "upload")
        //   .then(d => {
        //     console.log(d);
        //   })
        //   .catch(e => {
        //     console.log(e);
        //   })
      },
      fail: (e) => {
        console.log(e);
      }
    })
  }
  //去拍照
  toPage(value){
    let that = this
    if(value=='takephoto'){
      that.setState({
        camera: true, 
      })
    }else{
      Taro.navigateTo({
        url: '/pages/my/photo/index'
      })
  }
    
  }

  render () {
    let {isSchool,myData,alerList, editName, camera, tempImagePath,isPhoto,isUpdate} =  this.state

    return (
        <View className='data_page'>
          <NavBar title='我的资料' isLeft={true} />
          <AtCurtain isOpened={this.state.isOpened} onClick={this.onClose.bind(this)}>
            <View className='alert_page'>
               {
                 alerList.map((item,index)=>{
                  return ( <View key={index} onClick={this.onClose.bind(this,item.sort,item.value)} className={'alert_item '+(index==0? '':'alert_line')}> <Text className='alert_text'>{item.text}</Text> </View>)
                 })
               }
               
            </View>
          </AtCurtain>

          {/* 打开相机 */}
          {

            camera==true ?
            // eslint-disable-next-line react/jsx-curly-spacing
            // eslint-disable-next-line jsx-quotes
            <Camera className='photo_camera' devicePosition="front" onStop flash="true">
              {/* // eslint-disable-next-line jsx-quotes */}
              <CoverView className='camera_controls'>
                    <CoverView className='camera_play' onClick={this.camera.bind(this)}>
                    </CoverView>
                </CoverView>
            </Camera>
            :

         <View>
            <View className='data_photo' onClick={this.onOpenPhoto.bind(this)}>
            <Text className='data_title'>头像</Text>
            <Image className='data_img' src={tempImagePath?tempImagePath:require('../../../assets/images/my/myphoto.png')}></Image>
          </View>
       

          <View className='data_item'  >
            <Text className='data_title'>姓名</Text>
            <View onClick={this.editUsername.bind(this)}>
              {/*姓名编辑*/}
             {
               editName===false?
               <View>
                    <Text className='data_content'>{(myData.username? myData.username:'未设置')}</Text>  
                    <AtIcon value='chevron-right' size='20' color='#989898'></AtIcon>
              </View>
                :

              <View className='data_input_item'>
               <AtInput
                 className='data_input'
                 name='username'
                 type='text'
                 border={false}
                 maxLength={10}
                 value={this.state.myData.username}
                 onChange={this.handleUsername.bind(this)}
               />|
                
                <View className='data_input_button' onClick={this.endUsername.bind(this)}> <AtIcon value='check-circle' size='20' color='#989898'></AtIcon></View>
              </View>

             }
              </View>
          </View>
       
          <View className='data_line'></View>

          <View className='data_item' onClick={this.onOpen.bind(this,'sexList')}>
            <Text className='data_title'>性别</Text>
            <View>
               <Text className='data_content'>{(myData.sex? (myData.sex==='0'? '男':'女'):'未设置')}</Text>
               <AtIcon value='chevron-right' size='20' color='#989898'></AtIcon>
            </View>
          </View>
          <View className='data_line'></View>
       
          <View className='data_item' onClick={this.onOpen.bind(this,'ageList')}>
            <Text className='data_title'>年龄</Text>
            <View>
              <Text className='data_content'>{(myData.age? myData.age:'未设置')}</Text>
              <AtIcon value='chevron-right' size='20' color='#989898'></AtIcon>
            </View>
          </View>
          <View className='data_line'></View>

          <View className={'data_item '+ (isSchool===false?'':'data_face')} >
            <Text className='data_title'>人脸认证</Text>
            <View>
              <Text className='data_content'>{(myData.is_faceuser=='1'? '':'未设置')}</Text>
              <AtIcon value='chevron-right' size='20' color='#989898'></AtIcon>
            </View>
          </View>


          {/* // eslint-disable-next-line no-undef */}
          <View className={'isalert '+(isPhoto==true?'alert':'')}>
            <View className={'alert_content '+(isPhoto==true?'':'isalert_content')}>
                <View className='isalert_content_top'>
                  <Button className='alert_button' onClick={this.toPage.bind(this,'takephoto')}>拍照上传</Button>
                  <Button className='alert_button' onClick={this.toPage.bind(this)}>选择相册</Button>
                </View>
                <Button className='alert_button alert_cancel' onClick={this.onClose.bind(this)}>取消</Button>
            </View>
        </View>

       <View className={'data_footer '+(isUpdate===true&&editName==false?'data_footer_show':'')} onClick={this.handleChange.bind(this)}>
           <Button className='data_footer_button'>提交修改信息</Button>
        </View>
         </View>
          }
        </View>
   
    )
  }
}