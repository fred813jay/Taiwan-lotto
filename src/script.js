var picker= []
var result= []
var CompareArray = []
var winning= []
var money = 1000
var vm = new Vue({
  el: "#app1",
  data: {
    picker: picker,
    result: result,
    CompareArray: CompareArray,
    winning: winning,
    money: money
  },
  methods:{
    PickNumber: function(n,i){
      var ticket = n
      var num = i
      var id = '#'+'ticket_'+n+'_num_'+i
      var result1 = picker.find(function(item, index, array){
         return item.ticket == n && item.num == i;   
      });
      //---------判斷此票券&此號碼是否已存在陣列中
      if (result1 == undefined){
        if (picker.length == 0){
           this.picker.push({ticket:n,num:i});
           $(id).css('background-color','red')
           $(id).css('color','white')
           $(id).removeClass('addhover')
           $(id).unbind('mouseenter mouseleave')
        }
        else { 
          var count = 0 ;
          picker.forEach(function(item, index, array){
             if (item.ticket == ticket){
               count ++
               if (count > 5){
                 alert('此票券'+ticket+'已選滿6碼')
               }
             }        
          })
          if (count < 6 ) {
             this.picker.push({ticket:n,num:i});
             $(id).css('background-color','red')
             $(id).css('color','white')
             $(id).removeClass('addhover')
             $(id).unbind('mouseenter mouseleave')
          }
        }        
      }
    },
    PickRandom: function(n){
      var ticket = n
      var arr =[]
      var check = 0
      // 檢查此票券已存在幾個號碼
      picker.forEach(function(item, index, array){
        if (item.ticket == ticket){
          check ++
        }        
      })
      if (check >= 6){
        alert('此票券'+ticket+'已選滿6碼')
      }
      else {
        // 產生49個號碼
        for (i=0; i<49; i++){ 
          arr[i]=i+1;
        }
        // 要產生幾個號碼
        for (var k = 1; k <=(6-check); k++) {
          var ran = Math.floor(Math.random() * arr.length);
          // 檢查是否存在同樣號碼
          var result1 = picker.find(function(item, index, array){
              return item.ticket == n && item.num == ran;   
          });
          // 若不存在則新增
          if (result1 == undefined){
            var Number = arr[ran];
            this.picker.push({ticket:n,num:arr.splice(ran,1)[0]});
            var id = '#'+'ticket_'+n+'_num_'+Number
            $(id).css('background-color','red')
            $(id).css('color','white')
            $(id).removeClass('addhover')
            $(id).unbind('mouseenter mouseleave')
          }
          // 若存在則再次執行
          else {
            k--
          }
        }
      }
    },
    clear: function(n){
      for (i=0; i<picker.length; i++){
        if (picker[i].ticket === n) {
            picker.splice(i,1)
            i--
        }
      }
      this.winning[n-1]= {name:'',price:0}
      for (j=1; j<=49; j++){
        var id = '#'+'ticket_'+n+'_num_'+j
        $(id).css('background-color','#fff7b2')
        $(id).css('color','#e50000')
        $(id).addClass('addhover')
        $(id).mouseenter(function(){
            $(this).css('background-color','#e50000')
            $(this).css('color','white')
        })
        $(id).mouseleave(function(){
            $(this).css('background-color','#fff7b2')
            $(this).css('color','#e50000')
        })        
      }
    },
    StartRandom: function(money){
      GetLotteryNum(money);
      if (picker.length < 30){
        return
      }
      if (this.money <= 250){
        alert('Wow!血本無歸，十賭九輸，請按F5')
        this.money = 0
        return
      }
      this.money = this.money - 250
      CompareArray.length = 0
      // 排序票劵 由小至大 避免比對錯誤
      picker = picker.sort(function (a, b) {
         return a.ticket > b.ticket ? 1 : -1; 
      });
      //開始比對
      for ( i=1; i<6; i++){
        var count = 0;
        var ticket = i;
        var result1 = picker.filter(function(item, index, array){
          if (item.ticket == ticket){
            CompareArray.push(item.num);
            if (CompareArray.length == 6*i){
              for(var k=(i-1)*6; k<6*i; k++){
                for(var j=0; j<6; j++){
                  if(CompareArray[k] == result[j]){
                    count ++;
                    switch (count){
                      case 1:
                        winning[i-1]= {name:'陸獎 50',price:50}
                        break;
                      case 2:
                        winning[i-1]= {name:'伍獎 200',price:200}
                        break;  
                      case 3:
                        winning[i-1]= {name:'肆獎 400',price:400}
                        break;    
                      case 4:
                        winning[i-1]= {name:'參獎 2000',price:2000}
                        break;       
                      case 5:
                        winning[i-1]= {name:'貳獎 400000',price:400000}
                        break;       
                      case 6:
                        winning[i-1]= {name:'頭獎 8000000',price:8000000}
                        break;                           
                    }
                  }
                  else if(count == 0){
                    winning[i-1]= {name:'未中獎',price:0}
                  }
                }
              }  
            }
          }
        })  
      }
      // 結算金額
      for (var i=0 ; i<winning.length; i++){
        var WinMoney = parseInt(winning[i].price)
        this.money = this.money + WinMoney
      }
    },
  }
})

function GetLotteryNum(money){
  // 檢查此票券已存在幾個號碼
  for(var z=1; z<6; z++){
    var check = 0
    var ticket = z
    // 檢查此票券已存在幾個號碼
    picker.forEach(function(item, index, array){
      if (item.ticket == ticket){
        check ++
      }        
    })
    if (check < 6){
      alert('此票券'+ticket+'尚未滿6碼')
      return
    }
  }
  result.length = 0;
  var arr =[]
  // 產生49個號碼
  for (i=0; i<49; i++){ 
    arr[i]=i+1;
  }
  // 選出6個號碼
  for (var k = 1; k <=6; k++) {
    var ran = Math.floor(Math.random() * arr.length);
    // 檢查是否存在同樣號碼
    var result1 = result.find(function(item, index, array){
        return item == ran;   
    });
      // 若不存在則新增
    if (result1 == undefined){
      var Number = arr[ran];
      this.result.push(arr.splice(ran,1)[0]);
    }
    // 若存在則再次執行
    else {
      k--
    }
  } 
  // 排序抽出獎號 由小至大
  result.sort(function (a, b) {
  return a - b
  });
}
  
        