/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-state */
import Taro, { Component } from  '@tarojs/taro'
import { View ,Camera, CoverView} from '@tarojs/components'
import { AtIcon} from 'taro-ui'
// import api from '../../../services/api'
// import NavBar from '../../../components/navbar/index'
import './index.less'

export default class Index extends Component {
  constructor(){
    super(...arguments)
    this.state={
    device: false,
    tempImagePath: "", // 拍照的临时图片地址
    tempThumbPath: "", // 录制视频的临时缩略图地址
    tempVideoPath: "", // 录制视频的临时视频地址
    camera: true,
    ctx: {},
    type: "takePhoto",
    startRecord: false,
    time: 0,
    timeLoop: "",
    }
}

config = { 
  navigationBarTitleText: '注册',
  usingComponents: {
           'navbar': '../../../components/navbar/index', // 书写第三方组件的相对路径
    },
}

componentWillMount(){
  console.log(this.state)
  this.setState({
    ctx: Taro.createCameraContext()
  })
}
 
  // 切换相机前后置摄像头
  devicePosition() {
    this.setState({
      device: !this.state.device,
    })
    console.log("当前相机摄像头为:", this.state.device ? "后置" : "前置");
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

camera() {
  let { ctx, } = this.state;
  // 拍照
    console.log("拍照");
    ctx.takePhoto({
      quality: "normal",
      success: (res) => {
        // console.log(res);
        this.setState({
          tempImagePath: res.tempImagePath,
          camera: false,
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



//返回登录
comeBack(){
 Taro.redirectTo({
  url: `/pages/login/index`
 })
}

  render () {
    let {camera, device}= this.state;
    const style = {
      paddingTop: Taro.$navBarMarginTop + 'px'
    }
    return (
        <View className='face_login' style={style}>
          {/* 返回按钮 */}
          <View onClick={this.comeBack.bind(this)}>
             <AtIcon className='face_login_bace' style={style} value='close' size='22' color='#fff' ></AtIcon>
          </View>

          <View className='face_tip'>拿起手机，眨眨眼</View>

           <View className='face_container'>
                <View className='face_container_tip'>把脸移入圈内</View>
                {
                  camera==true
                  ?
                  <Camera className='face_container_camera' device-position={device==false?'front':'back'} flash='true'>
                     <CoverView className='camera_play' onClick={this.camera.bind(this)}>
                    </CoverView>
                  </Camera>
                  :
                  null
                }
               
           </View>
        </View>
   
    )
  }
}