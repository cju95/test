/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-boolean-value */
import Taro, { Component } from '@tarojs/taro'
import {View,Text, Button } from '@tarojs/components'
import {  AtIcon ,AtTextarea} from 'taro-ui'
import Navbar  from '../../../../components/navbar/index';
// import {getActionCount, setActionCount} from '../../../../utils/count';

import count from '../../../../utils/count'
import './index.less'

class Activity extends Component{
    constructor(){
        super(...arguments)
        this.state={
            action:{id: 1, day: '周二',price: 30,date: '9月23号',address:'广纸太空羽毛球馆',sence:'羽毛球3号场',time:'20:00-22:00',img:require('../../assets/images/computer02.png'),count:12,now:5},
            words: [{title: '活动现在已经有多少人了？', response: '3个人了。'},
                    {title: '活动现在已经有多少人了？', response: ''}],
            title: '编辑活动',
            instructionContent: '',
            value: '',
            num: 0,
            checked: 1,
            list: [
                {
                    value: '1',
                    text: '羽毛球',
                
                },
                {
                    value: '2',
                    text: '篮球',
               
                },
                {
                    value: '3',
                    text: '足球',
                  
                },]
        }
    }
    componentDidMount () {
        var pages =  Taro.getCurrentPages()
        let prevPage = pages[0].__displayReporter.showReferpagepath;//上一页面
        prevPage= '/'+prevPage
        console.log(prevPage)
        console.log(pages)
        console.log(pages[0].route)
       let that = this
       console.log(that.state.num)
        this.setState({
            num: count.getActionCount(that.state.action.id)
        }, ()=>{
            console.log(that.state.num) 
        })
    }
    submitClick (value) {
        console.log(value)
        Taro.navigateTo({
            url: '/pages/index/activity/confirm/index?id='+ this.state.action.id
        })
      }
    handleChange(event,value){
        this.setState({
            [value]: event.target.value
          })
       
    }
    //减少活动人数
    cutActionCount(){
        let that = this
        if(this.state.action.id&&this.state.num>0){

            count.setActionCount(that.state.action.id,that.state.num,'cut',() =>{
                that.setState({
                    num: count.getActionCount(that.state.action.id)
                })
            })
        }else{
            console.error('当前人数少于0')
        }
    }

    //增加活动人数
    addActionCount(){
        let that = this
        if(this.state.action.id){
            console.log(that.state.num)
            count.setActionCount(that.state.action.id,that.state.num,'add',()=>{
                that.setState({
                    num: count.getActionCount(that.state.action.id)
                })
            } )
        }
    }
    changeRadio (value) {
        //if(this.state.checked==value){value=0}
        this.setState({
            checked: value
        })
      }

    selectSence () {
        Taro.navigateTo({
            url: '/pages/my/activity/activity_edit/activity_sence/index',
        })
    }
    config = { 
        navigationBarTitleText: '编辑活动',
        usingComponents: {
                 'navbar': '../../../../components/navbar/index', // 书写第三方组件的相对路径
          },
      }
    render(){
         let {list,title,instructionContent, num, checked} =this.state;
       
        return (<View className='activity'>
        {/* // eslint-disable-next-line react/jsx-boolean-value */}
        <Navbar title={title} isLeft={true} />

         <View className='activity_infor'>
            <View className='activity_head '>
                <Text className='activity_title'>活动信息</Text>
            </View>
            <View className='activity_project activity_common'>
                <Text className='activity_other_title'>活动项目</Text>
                {
                    list.map((item, index) =>{
                        return (<View className='activity_project_radio' key={index} onTouchEnd={this.changeRadio.bind(this,item.value)}>
                                    <View className={'activity_project_radio_out '+(checked==item.value? 'activity_project_radio_active':'')}>
                                        <View className='activity_project_radio_in'></View>
                                    </View>
                                    <Text className='activity_project_radio_text'>{item.text}</Text>
                                    
                            </View>)
                    })
                }
                
            </View>

            <View className='activity_sence activity_common'>
                <Text className='activity_other_title'>选择场次</Text>
                <View onClick={this.selectSence.bind(this)}>
                    <Text className='activity_sence_text'>请选择</Text>
                    <AtIcon value='chevron-right' size='25' color='#A2A7B2' ></AtIcon>
                </View>
            </View>

         </View>

         <View className='activity_infor'>
            <View className='activity_head'>
                <Text className='activity_title'>活动情况</Text>
            </View>
            <View className='activity_sence activity_common'>
                <Text className='activity_other_title'>活动人数</Text>
               <View className='activity_count'>
                   <View className='activity_count_atIcon'> 
                     <AtIcon  className={'activity_count_icon '+(num>0?'activity_count_icon_active':'')} value='subtract' size='22' color='#ccc' onClick={this.cutActionCount.bind(this)}></AtIcon>
                   </View>

                   <Text className='activity_count_text'> {num}</Text>

                   <View className='activity_count_atIcon'> 
                     <AtIcon className='activity_count_icon activity_count_icon_active' value='add' size='22' color='#ccc' onClick={this.addActionCount.bind(this)}></AtIcon>
                   </View>

               </View>
            </View>
           
            <View className='activity_detail activity_common'>
            <Text className='activity_other_title'>活动详情</Text>
                <View className='activity_detail_item'>
                    <AtTextarea  
                      className='activity_instruction_content' 
                      count={false} 
                      maxLength={100}
                      value={instructionContent}
                      onChange={this.handleChange.bind(this,'instructionContent')}
                      placeholder='请输入100字以内的备注' 
                      placeholderStyle='color: #D2D2D2'
                    />
                </View>
            </View>
         </View>



         <View className='activity_footer'>
                <Button className='activity_footer_button'>保存修改</Button>
        </View>
         

        </View>)
    }
}

export default Activity;