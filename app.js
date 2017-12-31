const express = require('express')
var cookieParser = require('cookie-parser');
const app = express()
const request= require('request');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(cookieParser());

app.get('/', function(req, res){
	res.send('Hello World!-Vaishnav');
})
app.get('/authors', function(req, res){
	request('https://jsonplaceholder.typicode.com/users',function (error, response, body) {
 	 if (!error && response.statusCode === 200) {
    		var data1=JSON.parse(body);
	}
		request('https://jsonplaceholder.typicode.com/posts',function (error, response, body) {
 			if (!error && response.statusCode === 200) {
    				var data2=JSON.parse(body);
			}
			str="";
			var count=0;
			for(var j=0,length1=data1.length;j<length1;j++){
			count=0;
			for(var i=0,length2=data2.length;i<length2;i++){
				if(data2[i].userId==data1[j].id){
					count++;
				}
			}
			str=str+`${data1[j].name} has posted ${count} times<br>`
			}
			res.send(str);
		})
	})
		
})
app.get('/setcookie',function(req, res){
	res.cookie('name','Vaishnav');
	res.cookie('age',18).send('Cookie is set');
});
app.get('/getcookies', function(req, res) {	
  	res.send("cookies :"+JSON.stringify(req.cookies));
});

app.get('/robots.txt', function(req, res) {	
  	res.status(403).send('<title>ACCESS DENIDED</title><h2>NO ACCESS</h2>');
});
app.get('/image', function(req, res){
res.sendFile(__dirname + "/public/image.jpg");
})

app.get('/html', function(req, res){
res.sendFile(__dirname + "/public/sample.html");
})

app.get('/input', function (req, res) {
   res.sendFile( __dirname + "/public/index.html" );
})

app.post('/posted', urlencodedParser, function (req, res) {
   var response = req.body.data;
   console.log(response);
   res.send(`the entered data is ${response}`);
})

	
app.listen(8080, function(){ 
	console.log('app listening on port 8080!');
})