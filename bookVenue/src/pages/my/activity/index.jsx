/* eslint-disable react/jsx-boolean-value */
import Taro, { Component } from '@tarojs/taro'
import { View,Text} from '@tarojs/components'
import NavBar from '../../../components/navbar/index'
// import { AtTabs, AtTabsPane } from 'taro-ui'
import './index.less'

export default class Index extends Component {
  constructor(){
    super(...arguments)
    this.state={
      current: 0,
      issueList: [{date:'2019-09-23', time: '12:00-14:00', address: 'L2羽毛球馆', sence: '羽毛球3号厂', count: 4, now: 3, state: true},
                  {date:'2019-09-23', time: '12:00-14:00', address: 'L2羽毛球馆', sence: '羽毛球4号厂', count: 4, now: 3, state: false}],
      joinList: [{date:'2019-09-11', time: '12:00-14:00', address: 'L2羽毛球馆', sence: '羽毛球3号厂', count: 4, now: 3, state: false},
                  {date:'2019-11-23', time: '13:00-14:00', address: 'L9羽毛球馆', sence: '羽毛球3号厂', count: 4, now: 3, state: false}]
    }
}
config = {
    navigationBarTitleText: '活动管理',
    usingComponents: {
      'navbar': '../../../components/navbar/index', // 书写第三方组件的相对路径
   },
  }
 
  handleClick (value) {
    console.log(value)
    this.setState({
      current: value
    })
  }
  toActivityDetail (page) {
    Taro.navigateTo({
      url: `/pages/my/activity/${page}/index`
    })
  }
 

  render () {
      let {issueList, joinList, current}= this.state;
      const tabList = [{ title: '我发布的' }, { title: '我参与的' }]
      // const style = {
      //   marginTop: Taro.$navBarMarginTop + 'px'
      // }
    return (

        <View className='activity'>
          <NavBar title='活动管理' isLeft={true} />
          <View current={this.state.current} tabList={tabList}  className='activity_tabs'>
            <View className='activity_tabs_item'>
                <View className={'activity_tabs_text '+(current===0?'activity_tabs_active':'')}
                  onClick={this.handleClick.bind(this, 0)}
                >
                        我发布的
                        <View className='activity_tabs_line'></View>
                </View>
                <View className={'activity_tabs_text '+(current===1?'activity_tabs_active':'')}
                  onClick={this.handleClick.bind(this, 1)}
                >
                        我参与的
                        <View className='activity_tabs_line'></View>
                </View>
            </View>
            <View current={this.state.current} index={0} className={'activity_pane '+(current===0?'activity_pane_active':'')}>

                {
                    issueList.map((item, index) =>{
                      return (<View className='issue_item ' key={index} onClick={this.toActivityDetail.bind(this, 'activity_edit')}> 
                      <View className={'issue_item_top '+(item.state===true? 'issue_item_top_active' : '')}> 
                          <Text className='issue_item_date'>{item.date}</Text>
                          <Text className='issue_item_date'>{item.time}</Text>
                      </View>
                      <View className='issue_item_body'> 
                          <Text className='issue_item_text'>{item.address}</Text>
                          <View className='issue_item_sence'>
                             <Text className='issue_item_text'>场地: {item.sence}</Text>
                             <Text className={'issue_item_state '+(item.state===true? 'issue_item_state_active' : '')}> {item.state===true? '报名中' : '已结束'}</Text>
                          </View>
                          <Text className='issue_item_text'>{item.now}/{item.count}人</Text>
                      </View>
                      </View>)
                    })
                }

            </View>
            <View current={this.state.current} index={1} className={'activity_pane '+(current===1?'activity_pane_active':'')}>
               {
                    joinList.map((item, index) =>{
                      return (<View className='issue_item ' key={index} onClick={this.toActivityDetail.bind(this, 'activity_detail')}> 
                      <View className={'issue_item_top '+(item.state===true? 'issue_item_top_active' : '')}> 
                          <Text className='issue_item_date'>{item.date}</Text>
                          <Text className='issue_item_date'>{item.time}</Text>
                      </View>
                      <View className='issue_item_body'> 
                          <Text className='issue_item_text'>{item.address}</Text>
                          <View className='issue_item_sence'>
                             <Text className='issue_item_text'>场地: {item.sence}</Text>
                             <Text className={'issue_item_state '+(item.state===true? 'issue_item_state_active' : '')}> {item.state===true? '报名中' : '已结束'}</Text>
                          </View>
                          <Text className='issue_item_text'>{item.now}/{item.count}人</Text>
                      </View>
                      </View>)
                    })
                }
            </View>
          </View>
        
        </View>
   
    )
  }
}