import Taro, { Component } from '@tarojs/taro'

import { AtTabBar } from 'taro-ui'
import './food.less'


class Food extends Component{
    constructor(){
        super(...arguments)
        this.state={
            current:0,
            // eslint-disable-next-line react/no-unused-state
            tabList:null
        }
    }
    componentWillMount () { 
        // eslint-disable-next-line no-undef
        let pages = getCurrentPages();//当前页面
        let prevPage = pages[pages.length-1].route +'';//
        console.log(prevPage)
        if(prevPage.indexOf('my') != -1||prevPage.indexOf('login') != -1){
            this.setState({current: 1})
        }
      }
    handleClick (value) {
        
        let user =   Taro.getStorageSync('UserInfo')
        //console.log()
        console.log('user', user)
      console.log(this.state.current, value)
      if(this.state.current == value) return
        this.setState({
          current: value
        })
        switch (value) {
            case 0:
                Taro.redirectTo({
                    url: `/pages/index/index?current=0`
                })
                break;
            case 1:
                console.log('user',user)
          //  let isUrl = !user?'/pages/login/index':'/pages/my/index?current='+user.identity
               let isUrl = '/pages/my/index'
            //   console.log(user.identity)
            //   console.log(user.identity)
              console.log(isUrl)
                Taro.redirectTo({
                    url: isUrl
                })
                break;         
            default:
                break;
          }    
      }
    changeTab(value){
        this.setState({current:value})
    }
    render(){
        let {current}=this.state;
        return (
            <AtTabBar  fixed className='sticky'
              tabList={[
                        // { title: '首页', dot: true ,image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png'},
                        // { title: '我的',  image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png', text: '100', max: '99'},
                        { title: '首页', iconPrefixClass:'icon', iconType: 'home', color:'#A2A7B2', selectedColor: '#333C4A'},
                        { title: '我的', iconPrefixClass:'icon', iconType: 'myae', color:'#A2A7B2', selectedColor: '#333C4A',iconSize:'70'},
                        // { title: '首页', dot: true ,image: '../../assets/images/food/home.png'},
                        // { title: '我的',  image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png', text: '100', max: '99'},
                      
                    ]}
              onClick={this.handleClick.bind(this)}
              current={current}
            />
    
         )
    }
}

export default Food;