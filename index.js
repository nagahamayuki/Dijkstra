var nodes = [
  {id:1 ,lat: 33.597277,lng: 130.3949927, check: "false", description: "ボート場"},
  {id:2 ,lat: 33.5902766,lng: 130.4177258, check: "false", description: "アミュプラザ博多"},
  {id:3 ,lat: 33.589749,lng: 130.4084023, check: "false", description: "グランドハイアット福岡"},
  {id:4 ,lat: 33.581969,lng: 130.3867053, check: "false", description: "筑紫女学園高校"},
  {id:5 ,lat: 33.5858155,lng: 130.3676587, check: "false", description: "大濠公園"},
  {id:6 ,lat: 33.594753,lng: 130.3506003, check: "false", description: "ももち浜・マリゾン"},
  {id:7 ,lat:33.5694883,lng:130.3420526, check: "false", description: "ウエストコート姪浜"},
  {id:8 ,lat:33.584948,lng:130.4401343, check: "false", description: "福岡空港国際線"},
  {id:9 ,lat:33.532129,lng:130.390225, check: "false", description: "檜原運動公園"},
  {id:10 ,lat:33.564894,lng:130.360644, check: "false", description: "県立城南高校"},
  {id:11 ,lat:33.551000,lng:130.297451, check: "false", description: "生松台中央公園"},
  {id:12 ,lat:33.572060,lng:130.355022, check: "false", description: "福岡工業高校"}
];

// 1,ボート場
// 2,アミュプラザ博多
// 3,グランドハイアット福岡
// 4,筑紫女学園高校

//console.log("登録されている地点はこちらです");
//console.log(nodes);
console.log("どこをスタート地点にしますか？？(番号で)");
for (var pro = 0; pro < nodes.length; pro++) {
  console.log(nodes[pro].id + "：" + nodes[pro].description);
}

var prompt = require('prompt');
prompt.start();

var schema = {
  properties: {
    number: {
      description: 'どのノードをスタートにしますか？ 1~4',
      message: '数字のみです'
    }
  }
};
prompt.get(schema, function (err, result) {
  collection(Number(nodes.length), Number(result.number));
});


function collection(length, startId){

  var originalSQL = [];

  //スタート地点の検証ループ
  var begins;
  var math = 1;
  function starts(nums){
    if(math >= nodes.length){
      console.log(originalSQL.length+"つのノードを通る最適ルートは");
      for (var f = 0; f < originalSQL.length; f++) {
        console.log(f+1 + "番目   id:" +originalSQL[f].id + "   " + originalSQL[f].description);
      }
      return console.log("終了");
    }
    for (var s = 0; s < nodes.length; s++){
      if(nodes[s].id == nums){
        begins = nodes[s]
        console.log("（"+math+"）");
        console.log("スタート地点を");
        console.log(begins.description);
        console.log("に設定しました");
        if(math==1){
          originalSQL.push(begins);
        }
        math ++;
        return;
      }
    }
  }

  starts(startId);

  var meters = "";
  var nextNumbers;
  for (var i = 1; i < length; i++) {
    //i回目のループです
    for (var box = 0; box < nodes.length; box++) {
      if(!(begins.id == nodes[box].id) && nodes[box].check == "false"){
        console.log("+++" + nodes[box].description + "と比べてみます");
        var one = Math.abs(begins.lat - nodes[box].lat);
        var two = Math.abs(begins.lng - nodes[box].lng);
        // console.log(begins.lat + "が始まりの緯度");
        // console.log(nodes[box].lat + "が比べる緯度");
        // console.log(begins.lng + "が始まりの軽度");
        // console.log(nodes[box].lng + "が比べる軽度");
        distance = one + two;
        //console.log(meters + begins.description + "の位置から"+ nodes[box].description + "まで" + distance);
        if(meters == "" || meters > distance){
          meters = distance;
          nextNumbers = nodes[box].id;
          values = nodes[box];
        }
      } else {
        nodes[box].check = "true";
        //console.log(nodes[box].description + "をtrueにしました");
      }
    }
    console.log("最短経路は、"+values.description + "です");
    originalSQL.push(values);
    //console.log(values);
    // console.log("最短距離は");
    // console.log(values);
    // //console.log(i + "回目のループにて最短距離は、" + nodes[nextNumbers].description + "のようです");
    var meters = "";
    // console.log("+++++++++++++++++++++++++++" +begins.description +"から"+ nodes[nextNumbers].description);
    starts(nextNumbers);
  }

}
