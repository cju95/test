import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtCurtain} from 'taro-ui'
import './loading.less'

class Loading extends Component {
    constructor(){
        super(...arguments)
        this.state={
            isOpened: this.props.toOpened,
            // message:'此手机号码已注册,请返回登录'
        }  
    }

      handleChange () {
        this.setState({
          isOpened: true
        })
      }
      onClose () {
        this.setState({
          isOpened: false
        })
      }
 
    render () {
        return (

         <View className='loading'>
              <AtCurtain >
                <View className='alert_page'>
                    <Text className='alert_top'>{this.props.showMessage}</Text>
                    <View className='alert_footer'>
                        <Text   toOpened={this.state.isOpened} onClose={this.onClose.bind(this)}>确定</Text>
                    </View>
                </View>
            </AtCurtain>
         </View>
        )
    }
}

export default  Loading