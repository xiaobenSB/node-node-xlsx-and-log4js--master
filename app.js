var xlsx = require('node-xlsx');
var log4js = require('./log4.js');
var fs = require('fs');

const logger = log4js.getLogger()//根据需要获取logger,如在getLogger里加err或oth,就会在设置的文件里添加信息，这里取默认default

const errlogger = log4js.getLogger('err')
const othlogger = log4js.getLogger('oth')
 var express = require('express');
//结合express使用，记录请求日志
var app = express()
app.use(function(req,res,next){
 console.log(1)
 next()
})
log4js.useLogger(app,logger)//这样会自动记录每次请求信息，放在其他use上面*/
//手动记录，可以代替console.log

app.use(function (req,res,next){
	console.log(req.url);
   if (req.url === '/') {  
	  res.write('hello world!');
	  res.end();
   }else if(req.url === '/favicon.ico'){ // /favicon.ico是http创建服务器后自动发送的请求，是node自己发送的，所以不会影响你请求的页面
	   return;
	   
   }else if(req.url === '/write') {
	   write('./1.xlsx');
	   res.write('write execl');
	   res.end();
	   
   }else if(req.url === '/read') {
	  read('./1.xlsx');
	  res.write('read execl');
      res.end();	
	  
   }else{
	   next();
   }	 
     return ;	  //return是因为配合上面的next,因为res.end并没有结束代码解析，所以这里不能放next();
  
});

function write(b) {
	 var data = [[1,2,3],[true, false, null, 'sheetjs'],['foo','bar',new Date(), '0.3'], ['hjy', null, '我爱你']];
	 var buffer = xlsx.build([{name: "mySheetName", data: data}]);
	 fs.writeFileSync(b, buffer);
	 othlogger.info('写入1.xlsx')  //写入日记
}

function read(a) {
	var obj = xlsx.parse(a);
    console.log(JSON.stringify(obj));
	 othlogger.info('读取1.execl');
}
app.use(function(req,res){
	errlogger.error('No found page');
	res.send('没有该页面')
	
})


app.listen(3000)



