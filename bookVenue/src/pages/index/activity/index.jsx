/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-indent-props */
import Taro, { Component } from '@tarojs/taro'
import {View,Text,Image,Button} from '@tarojs/components'
import { AtIcon , AtTextarea} from 'taro-ui'
import Navbar  from '../../../components/navbar/index'
import './index.less'

class Activity extends Component{
    constructor(){
        super(...arguments)
        this.state={
            action:{id: 1,day: '周二',price: 30,date: '9月23号',address:'广纸太空羽毛球馆',sence:'羽毛球3号场',time:'20:00-22:00',img:require('../../../assets/images/my/myphoto.png'),count:12,now:0},
            words: '',
            instruction:'',
            title: '活动详情'
        }
    }
    componentDidMount(){
        // var pages =  Taro.getCurrentPages()
        // let prevPage = pages[pages.length - 2];//上一页面
        // console.log(pages)
        // console.log(pages[0].route)
    }
    submitClick (value) {
        console.log(value)
        Taro.navigateTo({
            url: '/pages/index/activity/confirm/index?id='+ this.state.action.id
        })
      }
    handleChange(value,event){
        //console.log(value,event)
        this.setState({
            [value]: event.target.value
          })
    }

    toWords () {
        console.log(this.state.action.id)
        Taro.navigateTo({
            url: '/pages/index/activity/words/index?id='+ this.state.action.id
        })
    }
    config = { 
        navigationBarTitleText: '活动详情',
        usingComponents: {
                 'navbar': '../../../components/navbar/index', // 书写第三方组件的相对路径
          },
      }
    render(){
         let {action,title} =this.state;
       
        return (<View className='activity'>
      
        <Navbar title={title} isLeft={true} isRight={true} />
         <View className='activity_head'>
            <View className='activity_time activity_common'>
                <Text className='activity_timeStart'>{action.date} (<Text>{action.day}</Text>)</Text>
                <Text className='activity_tag'>{action.time}</Text>
            </View>
            <View className='activity_common'>{action.address}</View>
            <View className='activity_common'>场地: {action.sence}</View>
            <View className='activity_common'>报名用户: {action.now}/{action.count}</View>
            
            <View className='activity_head_footer activity_common'>
                <View className='activity_item_footer_left'>
                    <Text className='activity_order'>组织者: </Text>
                    <Image className='activity_img' src={action.img}></Image>
                </View>
                <Image className='activity_phoneimg' src={require('../../../assets/images/index/phone.png')}></Image>
            </View>

         </View>

         <View className='activity_instruction'>
             <Text className='activity_instruction_title'>活动说明：</Text>
             <AtTextarea 
                className='activity_instruction_content'
                count={false}
                value={this.state.instruction}
                onChange={this.handleChange.bind(this,'instruction')}
                maxLength={200}
                placeholder='说明说明说明说明说明说明说明说明说明说明说明说明说明 说明说明 说明说明说明说明说明说明说'
                placeholderStyle='color:#D2D2D2;fontSize: 26rpx;lineHeight: 36rpx'
             />
 {/* <Text className='activity_instruction_content'>说明说明说明说明说明说明说明说明说明说明说明说明说明 说明说明 说明说明说明说明说明说明说明说明说 说明说明说明说明说</Text> */}
         </View>

         <View className='activity_words'>
            <Text  className='activity_words_title'>留言板</Text>
            <AtTextarea 
                className='activity_words_content'
                count={false}
                value={this.state.words}
                onChange={this.handleChange.bind(this,'words')}
                maxLength={200}
                placeholder='你可以在这里发表任何对该活动的疑问，例如：活动到现在已经有多少人了？'
                placeholderStyle='color:#D2D2D2;fontSize: 26rpx;lineHeight: 36rpx'
            />
            <View className='activity_words_footer'>
                <View>
                     <Button className='activity_words_button' onClick={this.toWords.bind(this)}>留言</Button>
                </View>
            </View>
         </View>

         <View className='activity_submit'> 
             <View className='activity_submit_top'>
             <AtIcon value='phone' size='22' color='#ccc'><Text>仅限一人</Text></AtIcon>
                 <Text>需支付金额:<Text className='activity_submit_price'>{action.price}元</Text></Text>
            </View>
            <Button className='activity_submit_button' onClick={this.submitClick.bind(this,action)}>报名参加</Button>
         </View>

        </View>)
    }
}

export default Activity;