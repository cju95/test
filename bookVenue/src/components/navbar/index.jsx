import Taro from '@tarojs/taro'
import { View , Image, Text} from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.less'

class Navbar extends Taro.Component {
  // eslint-disable-next-line react/sort-comp
  constructor(){
    super(...arguments)
    this.state = {
    // eslint-disable-next-line react/no-unused-state
    back: '',
    // eslint-disable-next-line react/no-unused-state
    share: ''
    
    } 
}
static defaultProps = {
  isLeft: false,
  isRight: false,
  rightText: '',
  textUrl: '',
  title: ''
}

componentDidMount () { 
  // eslint-disable-next-line no-undef
  // let pages = getCurrentPages();//当前页面
  // let prevPage = pages[pages.length-1].route +'';//
  // console.log(prevPage)
  // prevPage = prevPage.split('/'); //字符分割 
  // let len = prevPage.length-2
  // pages = '/'
  // for (let i = 0; i < len; i++) {
  //   pages += prevPage[i] + '/'
  // }
  var pages =  Taro.getCurrentPages()
  console.log(pages.length-1)
  console.log(pages[pages.length-1].route)
 var prevPage = pages[pages.length-1].__displayReporter.showReferpagepath
// prevPage += '' 
  prevPage = prevPage.replace(/.html/,'')
 // console.log('prevPage', prevPage)
  pages = '/'+prevPage
  console.log('pages', pages)
  this.setState({
    // eslint-disable-next-line react/no-unused-state
    back: pages
  })

}
 
  backUrl () {
   let {back} = this.state
    console.log(back)
   if(back=='/pages/index/index'||back=='/pages/my/index'){
      Taro.redirectTo({
          url: back 
        })
    }else{
      Taro.navigateBack({
        delta: 1
    })
 }
}

  //备注url
  toRightUrl(){
    let url = this.props.textUrl
    Taro.navigateTo({
      url: url 
  })
  }
  //分享
  share(){
    console.log('当时')
  }




    render() {
      const style = {
        paddingTop: Taro.$navBarMarginTop + 'px'
      }
      // 将状态栏的区域空余出来
      return (
        <View className='navbar' style={style}>
         <View className='navbar_container'>
         {
            !this.props.isLeft
            ?
            <Text></Text>
            :
            <AtIcon value='chevron-left' size='22' color='#2D333E' onClick={this.backUrl.bind(this)}></AtIcon>
          }
           
            <View className='navbar_title'>{this.props.title}</View>
            {
              !this.props.isRight
              ?
              <Text onClick={this.toRightUrl.bind(this)}>{this.props.rightText}</Text>
              :
              <View className='navbar_right' onClick={this.share.bind(this)}>
                <AtIcon value='add' size='22' color='#ccc'></AtIcon>
                <View className='navbar_right_share'>
                  <Image className='navbar_right_share_img' src={require('../../assets/images/index/shareText.png')}></Image>
                  <Text className='navbar_right_share_text'>分享</Text>
                </View>
              </View>
            }
         </View>
           
        </View>
  
   
      );
    }
  }
export default Navbar
