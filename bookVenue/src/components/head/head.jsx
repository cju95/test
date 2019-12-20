import Taro, { Component } from '@tarojs/taro'
import {View,Text,Image} from '@tarojs/components'
import Banner from './banner'
import './head.less'

class Head extends Component{
    constructor(){
        super(...arguments)
        this.state={
            banner:[{image_src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571889833&di=1897e372bd382d8be1497122e2d7b443&imgtype=jpg&er=1&src=http%3A%2F%2Fpic26.nipic.com%2F20121215%2F2531170_141949733000_2.jpg'},
            {image_src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571295162809&di=20d6f1d66a2d352d8292d2c66c36fa07&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201801%2F11%2F20180111153213_W5Yyd.jpeg'},
            {image_src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571889894&di=c3feaf33f9868d0cabc530a645500562&imgtype=jpg&er=1&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201310%2F16%2F224046ups8zp1jg31uz82g.jpg'}],
            actions:[{id: 0,img:require('../../assets/images/index/badminton.png'),name:'羽毛球'},
                        {id: 1,img:require('../../assets/images/index/football.png'),name:'足球'},
                        {id: 2,img:require('../../assets/images/index/basketball.png'),name:'篮球'},
                        {id: 3,img:require('../../assets/images/index/table_tennis.png'),name:'兵乓球'},
                        {id: 4,img:require('../../assets/images/index/tennis.png'),name:'网球'},
                        {id: 5,img:require('../../assets/images/index/swimming.png'),name:'游泳'}],
            }
        }
    toSport(value) {
        console.log(value)
        Taro.redirectTo({
            url: '/pages/index/venue/index?name'+value
        })
    }

    render(){
         let {banner,actions} =this.state;
       
        return (<View className='head'>
            <Banner banner={banner} />
            <View className='head-actions'>
                {actions.map((item,index) =>{
                    return (<View className='head-action-item' key={index} onClick={this.toSport.bind(this,item.name)}>
                        <Image className='head-action-img' src={item.img}> </Image>
                        <Text >{item.name}</Text>
                    </View>)
                }
                )}
            </View>
        </View>)
    }
}

export default Head;