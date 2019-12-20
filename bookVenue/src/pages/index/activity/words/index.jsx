/* eslint-disable react/sort-comp */
/* eslint-disable import/first */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-boolean-value */
import Taro, { Component } from '@tarojs/taro'
import { View,Button} from '@tarojs/components'
import NavBar from '../../../../components/navbar/index'
import { AtTextarea } from 'taro-ui'
import './index.less'

export default class Index extends Component {
  constructor(){
    super(...arguments)
    this.state={
      words: ''
    }
}
config = {
    navigationBarTitleText: '留言',
    usingComponents: {
      'navbar': '../../../../components/navbar/index', // 书写第三方组件的相对路径
   },
  }
 
  handleChange (event) {
    this.setState({
      words :event.target.value
    })
  }
  componentDidMount(){
   
}

  render () {
      let {words}= this.state;

    return (
        <View className='words' >
          <NavBar title='留言' isLeft={true} />
          <View className='words_body'>
            <AtTextarea 
                className='words_content'
                value={words}
                onChange={this.handleChange.bind(this)}
                maxLength={140}
                height={250}
                placeholder='跟发起者说点什么'
                placeholderStyle='color:#D2D2D2'
            />
            <View className='words_footer'>
                <View>
                     <Button className='words_button'>发送</Button>
                </View>
            </View>
         </View>
        </View>
   
    )
  }
}