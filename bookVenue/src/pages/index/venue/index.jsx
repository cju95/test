/* eslint-disable react/jsx-boolean-value */

import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import Select from '../../../components/select/select'
import Navbar  from '../../../components/navbar/index'
import './index.less'

export default class Index extends Component {
  constructor(){
    super(...arguments)
    this.state={
        scene:'所有区域',
        action:'羽毛球',
        time: '所有时间',
        price: '价格最低',
        items:[{name:'专场',id:1},
        {name:'热销',id:2},
        {name:'折扣',id:3},
        {name:'主食',id:4},
        {name:'热菜',id:5},
        {name:'凉菜',id:6},
        {name:'特色菜',id:7}],
        activtys:[{title:'L1羽毛球馆',price:'20.0'},
        {title:'L1羽毛球馆',price:'20.0'}]
    
    }
}
componentWillMount(){

}


config = {
    navigationBarTitleText: '场馆列表',
    usingComponents: {
      'navbar': '../../components/navbar/index', // 书写第三方组件的相对路径
  },
}
  getScene (val){
    console.log(val.name)
    this.setState({
        scene : val.name
    })
  }
  getActivity (val){
    console.log(val.name)
    this.setState({
      action : val.name
    })
  }
  getTime (val){
    this.setState({
        time : val.name
    })
  }
  getPrice (val){
    this.setState({
        price : val.name
    })
  }
  render () {
      let {scene,action,time,price,items,activtys}=this.state
    return (
      <View className='venue'>
         <Navbar title='场馆列表' isLeft={true} />
         <View className='venue_select' >
            <Select my-class='select_text' other-class='select_right' name={scene} list={items} onChangeName={this.getScene.bind(this)} />
            <Select my-class='select_text' other-class='select_right' name={action} list={items} onChangeName={this.getActivity.bind(this)} />
            <Select my-class='select_text' other-class='select_right' name={time} list={items} onChangeName={this.getTime.bind(this)} />
            <Select my-class='select_text' other-class='select_right' name={price} list={items} onChangeName={this.getPrice.bind(this)} />
        </View>
        <View className='activtys'>
            {activtys.map((item,index) => {
                return(<View className='activityItem' key={index}><Text className='activityText'>{item.title}</Text><Text className='activityText'>¥{item.price}</Text> </View>)
            })
            }
        
        </View>
      
         
      </View>
    )
  }
}
