import Taro from '@tarojs/taro'
const actionCount = 'taro_booking'

export default {
    getActionCount(ation) {
        let store = Taro.getStorageSync(actionCount)
        if(store){
            if(store[ation]){
                return store[ation].Num
            }
        }else{
            return 0
        }
        Taro.setStorageSync(actionCount, store)
        callBack&&callBack()
    
    },
    setActionCount(ation,count,type,callBack) {
        if(ation){
            let store = Taro.getStorageSync(actionCount)
            if(!store){store={}}
            console.log(ation,store,count)
            if(type =='cut'){
                if(count==1&&store[ation]){ 
                     delete store[ation]
                 
                }else{
                    if(store[ation]){
                        store[ation].Num = count -1
                    }  
                }
                Taro.setStorageSync(actionCount, store)
                callBack&&callBack()
            }
    
            if(type =='add'){
                 if(store[ation]){
                    store[ation].Num = count + 1
                }else{
                    store[ation] = {Num: 1}
                      
                }
                Taro.setStorageSync(actionCount, store)
                callBack&&callBack()
            }
            
        }
    
    
    }
}
