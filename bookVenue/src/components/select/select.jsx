
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtInput } from 'taro-ui'

import './select.less'

class Select extends Component {
  static externalClasses = ['other-class']

    constructor(){
        super(...arguments)
        this.state={
            selectOne: false,
            cata:[{name:'专场',id:1},
            {name:'热销',id:2},
            {name:'折扣',id:3},
            {name:'主食',id:4},
            {name:'热菜',id:5},
            {name:'凉菜',id:6},
            {name:'特色菜',id:7}
        ]
        }
    }
  

    handleChange (value,e) {
      e.stopPropagation() // 阻止事件冒泡
      console.log('handleChange')
      let that = this
      console.log(this.state.selectOne)
        this.setState({selectOne: false},()=>{
          console.log(that.state.selectOne)
          that.props.onChangeName(value)
        })
      
      }
      clickImg(){
        let that = this
        console.log('clickImg')
        console.log(this.state.selectOne)
        this.setState({selectOne: true},()=>{
          console.log(that.state.selectOne)
        })
      }


  render () {
     const {list} = this.props
    let {selectOne} =this.state
    return (
      <View className='select other-class' >
      <View  className ='selectInput' onClick={this.clickImg.bind(this)}>
        <Text className ='selectAtInput'>{this.props.name}</Text>
        <Image className ='selectImg' src={require('../../assets/images/index/up.png')}  />
        <View  className='optionBox'>
            { 
            list.map((item) =>{
                return (<Text className={'option '+(selectOne===true?'selectOption':'')} key={item.id} onClick={this.handleChange.bind(this,item)}>{item.name}</Text>)
            })
            }
        </View>
      </View>
     
      
       
      </View>
    )
  }
}
// 给子组件一个默认值
Select.defaultProps = {
    name: ''
}
export default Select;