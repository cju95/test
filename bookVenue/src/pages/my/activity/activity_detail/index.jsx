/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-boolean-value */
import Taro, { Component } from '@tarojs/taro'
import {View,Text,Button} from '@tarojs/components'
import {  AtTextarea} from 'taro-ui'
import Navbar  from '../../../../components/navbar/index'
import './index.less'

class Activity extends Component{
    constructor(){
        super(...arguments)
        this.state={
            action:{id: 1,day: '周二',price: 30,date: '9月23号',address:'广纸太空羽毛球馆',sence:'羽毛球3号场',time:'20:00-22:00',img:require('../../assets/images/computer02.png'),count:12,now:5},
            words: [{title: '活动现在已经有多少人了？', response: '3个人了。'},
                    {title: '活动现在已经有多少人了？', response: ''}],
            title: '活动详情',
            instructionContent: '',
            response: ''
        }
    }
    submitClick (value) {
        console.log(value)
        Taro.navigateTo({
            url: '/pages/index/activity/confirm/index?id='+ this.state.action.id
        })
      }
    handleChange(index,event){
        console.log(event.target.value,index)
        this.setState((test) =>{
            // test.words[index].response = event.target.value
            test.response = event.target.value
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
                 'navbar': '../../../../components/navbar/index', // 书写第三方组件的相对路径
          },
      }
    render(){
         let {action,title,instructionContent,words} =this.state;
       
        return (<View className='activity'>
        <Navbar title={title}  isLeft={true} />
         <View className='activity_head'>
            <View className='activity_time activity_common'>
                <Text className='activity_timeStart'>{action.date} (<Text>{action.day}</Text>)</Text>
                <Text className='activity_tag'>{action.time}</Text>
            </View>
            <View className='activity_common'>{action.address}</View>
            <View className='activity_common'>场地: {action.sence}</View>

            <View className='activity_people activity_common'>
             <Text className='activity_people_count'>活动人数:  {action.count}</Text>
             <Text className='activity_people_now activity_people_count'>{action.now}人感兴趣</Text>
            </View>
         </View>

         

         <View className='activity_instruction'>
             <Text className='activity_instruction_title'>活动说明：</Text>
             {/* <Text className='activity_instruction_content'>{instructionContent}</Text> */}
             <AtTextarea  
                className='activity_instruction_content' 
                count={false} 
                value={instructionContent}
                onChange={this.handleChange.bind(this,'instructionContent')}
                placeholder='' 
            />
         </View>

         <View className='activity_words'>
            <Text  className='activity_words_title'>留言板</Text>
            {
                words.map((item,index) =>{
                    return (<View key={index} className='activity_words_item'>
                        <Text className='activity_words_problem'>Q{index+1}: {item.title}</Text>
                        {
                            (item.response ==''
                             ? 
                            <View className='activity_words_textarea'>
                                <AtTextarea  
                                    className='activity_words_content' 
                                    count={false} 
                                    value={item.response}
                                    onChange={this.handleChange.bind(this, index)}
                                    placeholder='请输入你的回复' />
                                <View className='activity_words_footer'>
                                    <Button className='activity_words_button' onClick={this.toWords.bind(this)}>回复</Button>
                                </View>
                            </View>  
                            :
                            <Text className='activity_words_response'>你的回复: {item.response}</Text>)
                            
                            }           
                    </View>

                    )
                })
            }
          
         </View>

        </View>)
    }
}

export default Activity;