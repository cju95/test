/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-state */
/* eslint-disable import/first */

import Taro, { Component } from '@tarojs/taro'
import { View,Camera, Text, Image, CoverView} from '@tarojs/components'
import NavBar from '../../../components/navbar/index'
//  import { CoverView } from 'taro-ui'
import './index.less'

export default class Index extends Component {
  constructor(){
    super(...arguments)
    this.state={
      imgUrls:[],
      device: false,
      // eslint-disable-next-line react/no-unused-state
      tempImagePath: "", // 拍照的临时图片地址
      tempThumbPath: "", // 录制视频的临时缩略图地址
      tempVideoPath: "", // 录制视频的临时视频地址
      camera: false,
      ctx: {},
      type: "takePhoto",
      startRecord: false,
      time: 0,
      timeLoop: "",
      imgUrlse:['df','df','df','df','df','df','df','df','df','df','df','df','df','df','df','df','df','df','df','df','df','df','df','df','df','df','df',]
    }
}
config = {
    navigationBarTitleText: '图片',
    usingComponents: {
      'navbar': '../../../components/navbar/index', // 书写第三方组件的相对路径
   },
  }

  //页面加载时初始化数据
componentWillMount(){
  console.log('是否有更好的就')
  this.uploadCard()
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

//获取手机相机照片
uploadCard(){
    let _this = this;
    Taro.chooseImage({
        count: 15,// 默认9
        sizeType: ['original', 'compressed'],// 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album','camera'],// 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
            console.log(res)
            console.log(res.tempFilePaths)
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            _this.setState({
              imgUrls: res.tempFilePaths
             })

        }
    })
};

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

//拍照
camera() {
  let { ctx, imgUrls } = this.state;
  // 拍照
    console.log("拍照");
    ctx.takePhoto({
      quality: "normal",
      success: (res) => {
        // console.log(res);
        this.setState({
          tempImagePath: res.tempImagePath,
          imgUrls: [res.tempImagePath,...imgUrls],
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



  render () {
      let {imgUrls, camera, device}= this.state;

    return (
        <View className='photo' >
          <NavBar title='图片' isLeft={true} />
          {
            camera==true ?
            <Camera className='photo_camera' devicePosition={device?'back':'front'} onStop flash='true'>
              <CoverView className='camera_controls'>
                    <CoverView className='camera_play' onClick={this.camera.bind(this)}>
                    </CoverView>
                </CoverView>
            </Camera>
            :
            <View>
              <View  className='photo_body' >
                <View className='photo_item photo_first_item' onClick={this.open.bind(this)}>
                    <Image className='photo_item_firstImg' src={require('../../../assets/images/my/camera.png')}></Image>
                    <Text className='photo_item_text' >拍摄照片</Text>
                </View>
                {
                  imgUrls.map((item,index) =>{
                    return (<View key={index} className='photo_item'>
                            <Image  className='photo_item_img' src={item} >{item}</Image>
                    </View>)

                  })
                }
              </View>
              <View className='photo_footer'>
                  <Text className='photo_footer_text'>所有图片</Text>
                  <Image  className='photo_footer_img'  src={require('../../../assets/images/my/up.png')}></Image>
              </View>
            </View>
         
          }

        
        </View>
   
    )
  }
}