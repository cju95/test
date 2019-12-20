/* eslint-disable react/sort-comp */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/jsx-boolean-value */
import Taro, { Component } from '@tarojs/taro'
import { View,Text, Image ,Canvas, MovableArea, MovableView  } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
//  import NavBar from '../../../components/navbar'
import './index.less'

export default class Simple extends Component {
  config = {
    navigationBarTitleText: '图片裁剪',
    usingComponents: {
      'navbar': '../../../components/navbar/index', // 书写第三方组件的相对路径
},
  }
  constructor(props) {
    super(props);
    this.state = {
      shareImage: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2529639575,3293355254&fm=26&gp=0.jpg',
      width: 0,
      height: 0,
      screenWidth: 0,
      screenHeight: 0,
      curX: 0,
      curY: 0,
      tempFilePath: '',
      canX: 0 ,
      canY: 0,
      canvas: null,
      showCanvas: true ,
      navHeight: 0
  
    }
  }
 

  componentWillMount(){
    let navHeight = Taro.$navBarMarginTop
    console.log(navHeight)
    let that = this
    Taro.getSystemInfo({
      success: function(res) {
        that.setState({
          screenWidth: res.screenWidth,
          screenHeight: res.screenHeight-navHeight - 80*res.screenWidth/750,
          canX: res.screenWidth*0.11,
          canY: res.screenHeight/2-res.screenWidth*0.19,
          navHeight: navHeight + 80*res.screenWidth/750
        })
      }
    })
  }
  componentDidMount(){
    console.log(this.state)
    let {screenWidth,screenHeight,canX,canY,width,height,canvas} = this.state
    console.log('canX','canY')
    console.log(canX,canY)
    width = screenWidth*0.78
    height = width/2
    console.log(width,height)
    canvas = Taro.createCanvasContext('myCanvas',this.$scope)
    // 设置背景黑色透明度0.5，不要使用opacity，会导致后期截出来的图片也是半透明
    canvas.setFillStyle('rgba(0,0,0,0.5)')
    canvas.fillRect(0, 0, screenWidth, screenHeight)
    // 挖出来一个方框，这个方框区域就是全透明了
    canvas.clearRect(canX,canY, width, height)
    // 画方框的外框
    canvas.setStrokeStyle('red')
    // 往外画大一圈，这样在canvas上填充图片的时候框线就不会变细啦
    canvas.strokeRect(canX-1, canY-1, width+2,height+2)
    canvas.draw()
    console.log('canvas',canvas)
    this.setState({
      width: width,
      height: height,
      canvas: canvas
    })

  }

 /**
   * 点击完成的回调
   * 完成截图，回传图片到上一页
   */
  complete() {
    let that = this
    let src = that.state.shareImage
    let {canX,canY,curX,curY, shareImage,width, height, canvas} = this.state
    
     console.log(src)
   let delX = canX -curX
   let delY = canY -curY
   console.log('delX',delX,'delY',delY)
  // canvas = Taro.createCanvasContext('myCanvas',this.$scope)
    // this.context.drawImage(src.path, srcX, srcY, srcWidth, srcHeight, cropBorder.x, cropBorder.y, cropBorder.size, cropBorder.size)
    //canvas.setFillStyle('rgba(0,0,0,1)')
    console.log('shareImage',shareImage)
  //将图片转化为本地资源 再进行canvas画图 
    Taro.getImageInfo({
      src: shareImage,
      success: function (res) {
        console.log('res',res)
        canvas.drawImage(res.path, 0,0,400,300);
        canvas.draw(true, ()=> {
          Taro.canvasToTempFilePath({
            canvasId: 'myCanvas',
            x: delX,
            y: delY,
            width: width,
            height: height,
            destWidth: 400,
            destHeight: 300,
            fileType: 'jpg',
            success: function(data) {
              console.log('data',data)
              console.log(data.tempFilePath)
              that.setState({
                showCanvas: false,
                tempFilePath: data.tempFilePath,
            //  shareImage: data.tempFilePath
              })
          
            },
            fail: function(err) {
              console.log(err)
            
            }
          },that.$scope)

      })
    }
})

    


   console.log('canvas',canvas)
    // 这里绘图一定要有回调，不然图片还没绘制完成就截图那就GG了
  
}
//返回上一页
backUrl(){
  Taro.redirectTo({
    url: '/pages/my/index'
  })
}

  //移动图片
  moveImg(e){
    console.log(e.detail.x,e.detail.y)
    // let that = this;
    this.setState({
      curX: e.detail.x,
      curY: e.detail.y
    })
  }

  render() {
    const style = {
      paddingTop: Taro.$navBarMarginTop + 'px'
    }
  
    let { tempFilePath, screenWidth, screenHeight, shareImage, showCanvas, width, height,navHeight} = this.state
    return (
      <View className='index'>
        {/* <NavBar  title='' isLeft={true} rightText='确定' textUrl='' /> */}
        <View className='navbar' style={style}>
        
            <AtIcon value='chevron-left' size='22' color='#ccc' onClick={this.backUrl.bind(this)}></AtIcon>
 
            <View  onClick={this.complete.bind(this)} className='navbar_title'>剪裁照片</View>
              <Text>确定</Text>
        </View>
        {
          showCanvas == true?
            <View>
               <MovableArea  className='moveContainer' style={'width:'+screenWidth+'px;height:'+ screenHeight+'px;'}>
                <MovableView direction='all' onChange={this.moveImg.bind(this)}>
                  <Image  className='image_item' src={shareImage} ></Image>
                </MovableView>
     
                </MovableArea>

            <Canvas canvasId='myCanvas' style={'width:'+screenWidth+'px;height:'+ screenHeight+'px;pointer-events: none; position: absolute;left: 0; top:'+navHeight+'px;'}></Canvas>
        
            </View>
            :
            <Image  className='image_item_item'  style={'width:'+width+'px;height:'+height+'px;'} src={tempFilePath}></Image>
       
        }
       
      </View>
    )
  }
}