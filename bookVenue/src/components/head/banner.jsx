import Taro, { Component } from '@tarojs/taro'
import {Swiper, SwiperItem, Image} from '@tarojs/components'


import './banner.less'

class Banner extends Component{
    
    render(){
        // let {store} =this.state;
        const { banner } = this.props;
        return (<Swiper className='swiper-container'
          circular
          indicatorDots
          indicatorColor='#999'
          indicatorActiveColor='#bf708f'
          autoplay
        >
            { banner.map((item, index) => (
              <SwiperItem key={index}>
                <Image className='swiper-img' mode='widthFix' src={item.image_src}></Image>
              </SwiperItem>
            ))}
          </Swiper>)
    }
}

export default Banner;