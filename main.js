var express = require('express')
var fs = require('fs')

var Mapfiles = fs.readdirSync(__dirname+"/maps");
console.log(Mapfiles)

// express 는 함수이므로, 반환값을 변수에 저장한다.
var app = express()

// 3000 포트로 서버 오픈
app.listen(4444, function() {
    console.log("start! express server on port 4444")
})

// request 와 response 라는 인자를 줘서 콜백 함수를 만든다.
// localhost:3000 브라우저에 res.send() 내부의 문자열이 띄워진다.

app.get('/', function(req,res) {
  res.send("<h1>hi friend!</h1>");
})

app.get('/beatmap', function(req,res) {
  res.send("<h1>This is Beatmap Page</h1>");
})

app.get('/beatmap/:id', (req, res) => {

  const mapid = Mapfiles.find(map => Number(map) === Number(req.params.id));

  if (!mapid) {
    return next(err);
  }

  res.send("<h1>This is Beatmap Page MapID : "+mapid+"</h1>");
  console.log(mapid);
});

app.get('/beatmap/:id/download', (req, res) => {

  const mapid = Mapfiles.find(map => Number(map) === Number(req.params.id));

  if (!mapid) {                                  
    return next(err);
  }
  res.download(__dirname+'/maps/'+mapid+'/map.bm');
  
  history.back();
});

app.get('*', (req,res)=>{
	return next(err);
}); 

app.use(function(err, req, res, next) {
   //console.error(err.stack);
   res.status(404).send("해당페이지를 찾을 수 없습니다")
   res.status(500).send('Something broke!'); 
});