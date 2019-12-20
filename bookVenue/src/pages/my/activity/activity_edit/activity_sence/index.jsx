/* eslint-disable no-shadow */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-boolean-value */
import Taro, { Component } from '@tarojs/taro'
import {View,Text, Button, ScrollView} from '@tarojs/components'
// import { AtRadio , AtIcon ,AtTextarea} from 'taro-ui'
import Navbar  from '../../../../../components/navbar/index';

// import count from '../../../../../utils/count'
import {weekday} from '../../../../../utils/weekday'
import './index.less'

class Activity extends Component{
    constructor(){
        super(...arguments)
        this.state={
            title:'选择场次',
            dates:[],
            nowDay: 0,
            bottom: 0, //time上下移
            left: 60, //场地左右移动
            width: 97,
            oneScroll: true,
            timeList:['10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
            priceList:['100','110','','130','140','500','100','170','100','100','200','210','220','200'],
            senceList:['1号场','2号场','3号场','4号场','5号场','6号场','7号场','8号场','9号场','10号场','10号场','10号场','10号场','10号场',],
            // selectSence:[{time:'21:00-22:00', sence:'2号场'},{time:'21:00-22:00', sence:'3号场'}],
            touchC: [0, 0],
            // eslint-disable-next-line react/no-unused-state
            touchS: [0, 0],
            selectList: [],
            selectSence: [],
            selectShow: false,
            count: 0
        }
    }

    //获取当前一周日期
    componentWillMount () {
       let {width,timeList} = this.state
       let weeks= weekday()
       let nowWidth = width*timeList.length+10*(timeList.length-1)
        this.setState({
            width : nowWidth,
            dates : weeks
        })
   

    }
   
    //选择日期
    handleNowday (value) {
        this.setState({
         nowDay: value
        })
      }

    //导航栏设置
    config = { 
        navigationBarTitleText: '选择场次',
        usingComponents: {
                 'navbar': '../../../../components/navbar/index', // 书写第三方组件的相对路径
          },
      }

      //拖拽事件
      onScroll(event){
        let {bottom,oneScroll,touchC} = this.state
        // console.log(event.detail,event.detail.scrollLeft,event.detail.scrollTop)
        if(oneScroll){
            this.setState({
                oneScroll: false,
                touchC: [event.detail.scrollLeft,event.detail.scrollTop]
            })
            return
        }
        let sx = 60-touchC[0] - event.detail.scrollLeft
        let sy =  event.detail.scrollTop - touchC[1] 

      
        console.log(bottom,sy)
        this.setState({
            bottom : sy,
            left: sx
        })
      }

    //计算场地费用
    countFree(item,num){
        // eslint-disable-next-line no-unused-vars
        var {selectList, count} = this.state
        item -= 0 
        console.log('selectList', selectList, 'count',count)
        if (selectList[num]) {
            count -= item  
            selectList[num] = ''
        }else{
            count += item
            selectList[num] = item -0
        }
        count -= 0
        console.log('selectList', selectList, 'count',count)
        this.setState({
            selectList : selectList,
            count:  count 
        })


    }
    //选择场景
    chooseSence(item,textX,textY){
        //内容存在才能选择
        if (!item)  return false  

        let {senceList,timeList,selectSence} = this.state
        let num = textX*senceList.length + textY
       // console.log(num)
        let nowList = []
        let addItem = true;
       
        // eslint-disable-next-line no-shadow
        selectSence.forEach((item,index)=>{
            console.log(item.sence,item.time)
            console.log(senceList[textY],timeList[textX])
            if(item.sence==senceList[textY] && item.time==timeList[textX]){
                console.log('存在这个元素');
                addItem = false
                delete selectSence[index]
            }else{
                console.log('add元素')
                nowList.push(selectSence[index])
            }
        })
        if(addItem==true){
            nowList.push({price:item,sence:senceList[textY],time:timeList[textX]})
        }
  
      
        //限制只能选择八个
        var length = nowList.length;
        if (length>9) {
            nowList = selectSence
            return
        }
        //计算价格
        this.countFree(item,num)

        //判断是否显示订单
        if(length==0){
            length = false
        }else{
            length = true
        }
        
        // console.log(selectSence)
        // console.log(nowList)

        this.setState({
            selectShow : length,
            selectSence: nowList
        })
    }

    //提交订单
    sumbitOrder(){
        let {selectShow} = this.state
        if(selectShow){
            Taro.navigateTo({
                url: '/pages/my/activity/activity_edit/activity_sence/activity_confirm/index',
            })
        }
    }


    render(){
         let {title,dates, nowDay, timeList, priceList,  senceList, selectShow,bottom,left, width, selectSence, count, selectList} =this.state;
       
        return (<View className='activity_sence'>
        {/* // eslint-disable-next-line react/jsx-boolean-value */}
        <Navbar title={title} isLeft={true}  rightText='订单' textUrl='/pages/my/order/index' />

        {/* 当前一周信息 start */}
        <ScrollView className='scrollview_nowday'
          scrollX
          scrollWithAnimation
          scrollTop='0'
          lowerThreshold='20'
          upperThreshold='20'
        >
        {  
             dates.map((item,index) =>{
            return ( <View  className={'scrollview_item '+ (nowDay==index?'scrollview_item_active':'')} key={index} onClick={this.handleNowday.bind(this,index)}>
                <Text className={'scrollview_item_title scrollview_item_text '+ (nowDay==index?'scrollview_item_activeText':'')}>{(index==0?'今天':'周'+item.day)}</Text>
                <Text className={'scrollview_item_text '+ (nowDay==index?'scrollview_item_activeText':'')}>{item.mouth}月{item.date}日</Text>

            </View>)
        })
        }

        </ScrollView>
         {/* 当前一周信息 end */}

        {/* 场地,时间信息 start */}
        <View className='scrollview_sence_contaier' >
            <View className='scrollview_sence_head_item'></View>
            <View className='scrollview_sence_head' style={'left:'+(left==0? 0:left+'PX') +'; width:'+(width==0? 0:width+'rpx')}>
                {
                    senceList.map((item,index) =>{
                        return <Text className='scrollview_sence_item' key={index}>{item}</Text>
                    })
                }
            </View>
            <View className='scrollview_time_contaier'>
              
                    <View className='scrollview_time_left' style={'bottom:'+(bottom==0? 0:bottom+'PX')}>
                        {
                            timeList.map((item,index) =>{
                                return <View className='scrollview_time_left_item' key={index}>{item}</View>
                            })
                        }
                    </View>
               

                <ScrollView className='scrollview_time_right'
                  scrollY
                  scrollX
                  scrollWithAnimation
                  onScroll={this.onScroll.bind(this)}
                  scrollTop='1220'
                  lowerThreshold='20'
                  upperThreshold='20'
                >
                    {/* <View className='scrollview_time_right_item' style='height:150px;background-color:rgb(26,173,25);'>
                        <View className='scrollview_time_right_title'>SHKU</View>SJFKKLJKU刻录机电力公司 
                    </View>
                    <View className='scrollview_time_right_item' style='height:150px;background-color:rgb(39,130,215);'>B</View>
                    <View className='scrollview_time_right_item' style='height:150px;background-color:rgb(21,55,41);color: #333;'>C</View> */}
                  {
                         senceList.map((item,key) =>{
                            return (
                                <View key={key}  className='scrollview_item' style={'width:'+(width==0? 0:width+'rpx')} >
                            {
                                // eslint-disable-next-line no-shadow
                                priceList.map((item,index) =>{
                                    return ( <View className={'scrollview_right_item '+(item?'scrollview_right_chooseItem ' :'')+(selectList[(key*senceList.length + index)]?'scrollview_right_activeItem':'')} key={index} onClick={this.chooseSence.bind(this,item,key,index)}>
                                            <Text className='scrollview_right_itemText'>{item?item+'元' :''}</Text>
                                    </View>)
                                })
                            }
                          
                    
                 </View>
                            )
                  })
                }
                   
                   
                </ScrollView>

            </View>
            {
                selectShow==false?
                <View className='scrollview_sence_footer'>
                    <View className='scrollview_sence_footer_item'>
                        <View className='scrollview_sence_footer_color'></View>
                        <Text className='scrollview_sence_footer_text'>已出售</Text>
                    </View>
                    <View className='scrollview_sence_footer_item'>
                        <View className='scrollview_sence_footer_color scrollview_sence_footer_green'></View>
                        <Text className='scrollview_sence_footer_text'>可预约</Text>
                    </View>
                    <View className='scrollview_sence_footer_item'>
                        <View className='scrollview_sence_footer_color scrollview_sence_footer_purple'></View>
                        <Text className='scrollview_sence_footer_text'>我的选择</Text>
                    </View>
                </View>
                :
                ''
            }

        </View>
        {/* 场地,时间信息 end */}

        <View className='activity_sence_footer'>
                <View className='activity_sence_select'>
                    {
                       selectShow==true
                        ?
                        selectSence.map((item,index) =>{
                            return (
                                <View className='activity_sence_select_item' key={index}>
                                  <Text className='activity_sence_select_item_time'>{item.time}</Text>
                                  <Text className='activity_sence_select_item_content'>{item.sence}</Text>
                                </View>
                                 )
                        })
                        :
                        null
                    }
                </View>

                <View className='activity_sence_submit'>
                    <View>
                    {
                        selectShow==true
                        ?
                        <View>
                            <Text className='activity_sence_submit_price'>¥{count}</Text>
                            <Text className='activity_sence_submit_text'>含手续费2.0元</Text>
                        </View>
                        
                        :
                        <Text className='activity_sence_submit_price'></Text>
                    }
                        
                    </View>
                    
                    <Button className='activity_sence_button' onClick={this.sumbitOrder.bind(this)}>{selectShow==true?'提交订单' : '请选择场次' }</Button>
                </View>
        </View>


        </View>)
    }
}

export default Activity;