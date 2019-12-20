let touchDotX = 0;//X按下时坐标
let touchDotY = 0;//y按下时坐标
let interval;//计时器
let time = 0;//从按下到松开共多少时间*100
// 触摸开始事件
export default {
  touchStart (e) {
    touchDotX = e.touches[0].pageX; // 获取触摸时的原点
    touchDotY = e.touches[0].pageY;
    // 使用js计时器记录时间    
    interval = setInterval(function() {
      time++;
    }, 100);
  },


  //手指在屏幕上移动
scroll (e) {
  console.log('SCROOL')
  let touchMoveX = e.changedTouches[0].pageX;
  let touchMoveY = e.changedTouches[0].pageY;
  let tmX = touchMoveX - touchDotX;
  let tmY = touchMoveY - touchDotY;
  let absX = Math.abs(tmX);
  let absY = Math.abs(tmY);
  console.log(absX,absY)

},
  // 触摸结束事件
  touchEnd (e) {
    let touchMoveX = e.changedTouches[0].pageX;
    let touchMoveY = e.changedTouches[0].pageY;
    let tmX = touchMoveX - touchDotX;
    let tmY = touchMoveY - touchDotY;
    if (time < 20) {
      let absX = Math.abs(tmX);
      let absY = Math.abs(tmY);
      if (absX > 2 * absY) {
        if (tmX<0){
          console.log("左滑=====")
        }else{
          console.log("右滑=====")
        }
      }
      if (absY > absX * 2 && tmY<0) {
        console.log("上滑动=====")
      }
    }
    clearInterval(interval); // 清除setInterval
    time = 0;
  }
}
