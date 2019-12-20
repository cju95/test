export const weekday = () => {
  var new_Date = new Date()
  var timesStamp = new_Date.getTime();
  var dates = [];
  for(let i = 0; i < 7; i++) {
      var SundayTime = timesStamp + i  * ( 24 * 60 * 60 * 1000);  
      SundayTime = new Date(SundayTime);  
      var m = SundayTime.getMonth() + 1;//月 
      var d = SundayTime.getDate();//日  
      var day = SundayTime.getDay()||7;//周
      switch(day){
          case 1:
              day= '一';
              break;
          case 2:
              day= '二';
              break;
          case 3:
              day= '三';
              break;
          case 4:
              day= '四';
              break;
          case 5:
              day= '五';
              break;
          case 6:
              day= '六';
              break;
          default:
              day= '日';
              break;      
      }
      var  val ={mouth: m, date: d, day: day ,apply: 4}
      dates.push(val)

  }
  console.log(dates)
  return dates
}