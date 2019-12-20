/* eslint-disable import/first */
import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import 'taro-ui/dist/style/index.scss'
import 'taro-ui/dist/style/components/icon.scss';
import 'taro-ui/dist/style/components/tab-bar.scss'
import 'taro-ui/dist/style/components/badge.scss'
import 'taro-ui/dist/style/components/toast.scss'
import './app.less'

//引入阿里图标库
import './assets/css/iconfont.less'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  // eslint-disable-next-line react/sort-comp
  config = {
    pages: [
      'pages/index/index',
      'pages/index/venue/index',
      'pages/index/activity/index',
      'pages/index/activity/pay/index',
      'pages/index/activity/words/index',
      'pages/index/activity/confirm/index',
      'pages/my/index',
      'pages/my/data/index',
      'pages/my/photo/index',
      'pages/my/photo_cut/index',
      'pages/my/activity/index',
      'pages/my/activity/activity_detail/index',
      'pages/my/activity/activity_edit/index',
      'pages/my/activity/activity_edit/activity_sence/index',
      'pages/my/activity/activity_edit/activity_sence/activity_confirm/index',
      'pages/my/card/index',
      'pages/my/order/index',
      'pages/my/opinion/index',
      'pages/my/setting/index',
      'pages/my/setting/phone/index',
      'pages/my/setting/password/index',
      'pages/my/setting/about/index',
      'pages/login/index',
      'pages/login/face/index',
      'pages/login/register/index',
      'pages/login/password/index',

    ],
    window: {
      //   backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      // navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      navigationStyle: 'custom',
    }
  }

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Index />
    )
  }
}

Taro.getSystemInfo({})
  .then(res => {
    Taro.$navBarMarginTop = res.statusBarHeight || 0
  })


// 将状态栏高度挂载全局
Taro.render(<App />, document.getElementById('app'))
