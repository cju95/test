/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-boolean-value */
import Taro, { Component } from '@tarojs/taro'
import {View,Text, Button, Image  } from '@tarojs/components'
import { AtCurtain , AtIcon ,AtTextarea} from 'taro-ui'
import Navbar  from '../../../../../../components/navbar/index';

import count from '../../../../../../utils/count'
import './index.less'

class Activity extends Component{
    constructor(){
        super(...arguments)
        this.state={
            action:[{id: 1, day: '周二',price: 30,sort:'羽毛球', date: '2019-08-18',address:'广纸太空羽毛球馆',sence:'3号场',time:'20:00-22:00',state: true, people: 1,payWay:'士大夫',instruction:''},
            {id: 2, day: '周二',price: 30,sort:'羽毛球', date: '2019-08-18',address:'广纸太空羽毛球馆',sence:'3号场',time:'20:00-22:00',state: true, people: 1,payWay:'',instruction:'说明说明说明说明说明说明说明说明说明说明说明说明说明说明 说明说明说明'}],
            sence:{address: '桦标羽毛球馆', phone: '18188888888'},
            title: '确认订单',
            value: '',
            countPrice: 0,
            num: 1,
            alerList:['AA', '免费'],
            isOpened: false,
            nowWay: 0 
    }
}
    componentDidMount () {
 
    }

  //支付订单
    submitClick (value) {
        console.log(value)
        Taro.redirectTo({
            url: '/pages/index/activity/pay/index',
        })
      }
    //展开活动详情
    changeDetail(index){
        let that = this
        if (this.state.action[index].instruction) {
            return
        }else{
            that.setState((text) =>{ text.action[index].instruction = null})
        }   
    }
    //动态修改活动详情内容
    handleChange(index,event){
     console.log(event.target,index)
        this.setState((text) =>{  text.action[index].instruction = event.target.value })  
    }

    //打开幕帘
    onOpen (key) {
        console.log('打开幕帘')
        this.setState({  isOpened: true, nowWay : key})
     }
    //关闭幕帘
    onClose (value) {
       console.log('关闭幕帘')
       let key = this.state.nowWay
       this.setState((text) =>{ text.isOpened = false, text.action[key].payWay = value})  
   }

    //减少活动人数
    cutActionCount(){
        let that = this
        if(this.state.action.id&&this.state.num>0){
            count.setActionCount(that.state.action[0].id,that.state.num,'cut',() =>{
                that.setState({ num: count.getActionCount(that.state.action[0].id) })
            })
        }else{
            console.error('当前人数少于0')
        }
    }

    //增加活动人数
    addActionCount(){
        let that = this
        console.log('增加活动人数')
        if(this.state.action[0].id){
            console.log(that.state.num)
            count.setActionCount(that.state.action[0].id,that.state.num,'add',()=>{
                that.setState({ num: count.getActionCount(that.state.action[0].id)})
            } )
        }
    }
    //切换发起活动状态
    changeActionState(index,value){
        console.log(index,value)
        let that =this
        this.setState((text) =>{  text.action[index].state = value },()=>{
            console.log(that.state.action[index].state)
        })  

    }

    //计算订单总费用
    chargeCost() {
    }
  


    //转去确认信息页面
    toWords () {
        console.log(this.state.action.id)
        Taro.redirectTo({
            url: '/pages/index/activity/pay/index?id='+ this.state.action.id
        })
    }

    config = { 
        navigationBarTitleText: '确认订单',
        usingComponents: {
                 'navbar': '../../../../components/navbar/index', // 书写第三方组件的相对路径
          },
      }

      
    render(){
         let {title,num,sence,action, countPrice, alerList } =this.state;
       
        return (<View className='activity activity_column'>
        {/* // eslint-disable-next-line react/jsx-boolean-value */}
        <Navbar title={title} isLeft={true} />
        <AtCurtain isOpened={this.state.isOpened} onClick={this.onClose.bind(this)}>
            <View className='alert_page'>
               {
                 alerList.map((item,index)=>{
                  return ( <View key={index} onClick={this.onClose.bind(this,item)} className={'alert_item '+(index==0? '':'alert_line')}> <Text className='alert_text'>{item}</Text> </View>)
                 })
               }
               
            </View>
          </AtCurtain>


        <View className='activity_adressInfo activity_column'>  
            <Text className='activity_title'>{sence.address}</Text>
            <View className='activity_adressInfo_item activity_between'>
                <Text className='activity_text'>手机号码:</Text>
                <View>
                    <Text  className='activity_text'>{sence.phone}</Text>
                    <AtIcon className='activity_adressInfo_icon' value='chevron-right' size='20' color='#ccc' onClick={this.addActionCount.bind(this)}></AtIcon>
                </View>
            </View>
        </View>

        <View  className='activity_body'> 
            {
                action.map((item,index) =>{
                    return (
                        <View className='activity_body_item ' key={index}> 
                            {/* 事件头部内容 */}
                            <View className='activity_item_head activity_column'>
                                <Text  className='activity_text'>{item.sort}<Text>{item.date}</Text>({item.day})</Text>
                                <Text  className='activity_text'>时间场地: <Text>{item.sence}</Text>{item.time}</Text>
                            </View>
                              {/* 事件选择内容 */}

                            <View className='activity_item_do activity_between activity_item_common'>
                                <Text className='activity_other_title' >是否发起活动</Text>
                                <View className='activity_item_toDone'>
                                    <View className={'activity_item_isDone '+(item.state==true?'activity_item_Done':'')} onClick={this.changeActionState.bind(this,index,true)}>是</View>
                                    <View className='activity_item_isDone_line'></View>
                                    <View className={'activity_item_isDone '+(item.state==false?'activity_item_Done':'')} onClick={this.changeActionState.bind(this,index,false)}>否</View>
                                </View>
                            </View>

                            <View className='activity_sence_count activity_common activity_item_common  activity_between'>
                                <Text className='activity_other_title'>活动人数</Text>
                                <View className='activity_count'>
                                    <View className='activity_count_atIcon'> 
                                        <AtIcon  className={'activity_count_icon '+(num>1?'activity_count_icon_active':'')} value='subtract' size='20' color='#E2E2E2' onClick={this.cutActionCount.bind(this)}></AtIcon>
                                    </View>
                                    <Text className='activity_count_text'> {num}</Text>
                                    <View className='activity_count_atIcon'> 
                                         <AtIcon className='activity_count_icon activity_count_icon_active' value='add' size='20' color='#E2E2E2' onClick={this.addActionCount.bind(this)}></AtIcon>
                                    </View>
                                 </View>
                            </View>

                            <View className='activity_item_do activity_between activity_item_common'>
                                <Text  className='activity_other_title'>费用</Text>
                                <View className='activity_other_count'  onClick={this.onOpen.bind(this,index)}>
                                    <Text className='activity_text'>{item.payWay}</Text>
                                    <AtIcon className='activity_count_icon' value='chevron-right' size='20' color='#ccc' ></AtIcon>
                                </View>
                            </View>
                            

                            <View className={'activity_detail activity_item_common ' +( item.instruction||item.instruction==null?'':'activity_detail_height')}>
                                <View className='activity_between'>
                                    <Text  className='activity_other_title'>活动详情</Text>
                                    <AtIcon className='activity_count_icon' value='chevron-right' size='20' color='#ccc' onClick={this.changeDetail.bind(this,index)}></AtIcon>
                                </View>
                             {
                                 item.instruction||item.instruction==null?
                                 <View className='activity_detail_item'>
                                 <AtTextarea  
                                   className='activity_instruction_content' 
                                   count={false} 
                                   maxLength={100}
                                   value={(item.instruction?item.instruction:'')}
                                   onChange={this.handleChange.bind(this,index)}
                                   placeholder='请输入100字以内的备注' 
                                   placeholderStyle='color: #D2D2D2'
                                 />
                                 </View>
                                 :
                                 null
                             }



                                </View>


                        </View>
                    )
                })
            }
        </View>

        
         
        <View className='activity_footer'> 
             <View className='confirm_submit_top activity_between'>
                 <View>
                     <Image  className='confirm_submit_img' src={require('../../../../../../assets/images/my/order/danger.png')}></Image>
                     <Text className='footer_text'>提前24小时可退款</Text>
                 </View>
                 <Text  className='footer_text'>需支付金额:<Text className='confirm_submit_price'>{countPrice}元</Text></Text>
            </View>
            <Button className='confirm_submit_button' onClick={this.submitClick.bind(this,action)}>立即支付</Button>
         </View>

        </View>)
    }
}

export default Activity;