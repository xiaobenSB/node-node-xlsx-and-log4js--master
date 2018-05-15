var http = require('http');
var fs = require('fs');
var xlsx = require('node-xlsx');
var log4js = require('log4js');


log4js.configure({    //日志配置
 appenders: {
  cheese: {
   type: 'dateFile',
   filename: 'cheese.log',
   pattern: '-yyyy-MM-dd.log',
   // 包含模型
   alwaysIncludePattern: true,
 
   maxLogSize: 1024,
   backups: 3 }
 },
 categories: { default: { appenders: ['cheese'], level: 'info' } }
});
 
const logger = log4js.getLogger('cheese');
logger.level = 'INFO';
 






var server = http.createServer(function (req,res){
	console.log(req.url);
   if (req.url === '/' || req.url === '/favicon.ico') {  // /favicon.ico是http创建服务器后自动发送的请求，由于node不可以在一个请求里获取另一个不是在当前请求里的请求的数据，所以无法显示/favicon.ico的返回数据
	  res.write('hello world!');
	  res.end();
   }else if(req.url === '/write') {
	   write('./1.xlsx');
	   res.write('write execl');
	   res.end();
   }else {
	  if(req.url === '/read') {
	  read('./1.xlsx');
	  res.write('read execl');
      res.end();
	 }	  
   }
}).listen(3000,"127.0.0.1");
console.log('Server running at http://127.0.0.1:3000/');

function write(b) {
	 var data = [[1,2,3],[true, false, null, 'sheetjs'],['foo','bar',new Date(), '0.3'], ['hjy', null, '我爱你']];
	 var buffer = xlsx.build([{name: "mySheetName", data: data}]);
	 fs.writeFileSync(b, buffer);
	 logger.info('写入execl');  //写入日记
}

function read(a) {
	var obj = xlsx.parse(a);
    console.log(JSON.stringify(obj));
	 logger.info('读取execl');
}