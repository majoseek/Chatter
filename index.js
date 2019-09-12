const express=require('express');
const http=require('http');
const socketio=require("socket.io");
const session=require('express-session');
const mysql=require('mysql');
const nodemailer=require('nodemailer');
const util = require('util');
const ip=require('ip');
var app=express();
const PORT = process.env.PORT || 80;
var server = http.createServer(app);
var io=socketio(server);
var sessionMiddleware=session({
    secret: "HAS1!#fasf2125AF@#Fas!IFAFS",
    resave: true,
    saveUninitialized: true
});
var userip;
var online=[];
var countonline=0;
var dbconfig={
  host: "iryba.pl",
  user: "29647948_mat",
  password: "DBMAT_19692000",
  database: "29647948_mat"
};
var con;
//
function handleDisconnect() {

  con= mysql.createConnection(dbconfig);
con.query = util.promisify(con.query);

  con.connect(function(err) {             
    if(err) {                                     
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    }                                     
  });                                     
                                          
  con.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      handleDisconnect();                        
    } else {                                      
      throw err;                                 
    }
  });
}
handleDisconnect();
//
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'matuslaw.programming@gmail.com',
    pass: 'mateuszxx11'
  }
});


app.use(sessionMiddleware);
app.use(express.static(__dirname+'/public/'));
app.use(express.urlencoded({extended:true}));
con.query("UPDATE `Online` SET Online=0");
app.get('/',function(req,res){
	if(req.session.login){
		res.sendFile(__dirname+"/public/chat.html");
	}
	else{
		res.sendFile(__dirname+'/public/home.html');
		}
});
app.get('/verify',function(req,res){
if((req.protocol+"://"+req.get('host'))==("http://"+host))
{
	if(req.query.id==rand)
	{
		con.query('UPDATE `tabelkatest` SET Active=1 WHERE Email="'+mailOptions.to+'"');
		console.log(mailOptions.to+" CONFIRMED EMAIL");
		con.query('INSERT INTO `Online` (`Login`, `Online`) VALUES ("'+loginonline+'",0)');
		res.sendFile(__dirname+"/public/login.html");
	}
	else
	{
		res.end("<h1>Bad request</h1>");
	}
}
});
app.get('/resetp',function(req,res){
if((req.protocol+"://"+req.get('host'))==("http://"+host))
{
	if(req.query.id==randr)
	{
		con.query('UPDATE `tabelkatest` SET Password="'+newp+'" WHERE Email="'+mailOptionsr.to+'"');
		console.log(mailOptionsr.to+" RESET HIS PASSWORD");
		res.sendFile(__dirname+"/public/login.html");
	}
	else
	{
		res.end("<h1>Bad request</h1>");
	}
}
});
app.get('/home',function(req,res){
	if(req.session.login){
		res.sendFile(__dirname+"/public/account.html");
	}
	else{
res.sendFile(__dirname+"/public/home.html");
		}
});
app.get('/map',function(req,res){
res.sendFile(__dirname+"/public/map.html");
});
app.get('/loginpage',function(req,res){
	if(req.session.login){
		res.sendFile(__dirname+"/public/account.html");
	}
	else{
res.sendFile(__dirname+"/public/login.html");
		}
});
app.get('/registerpage',function(req,res){
	if(req.session.login){
		res.sendFile(__dirname+"/public/account.html");
	}
	else{
res.sendFile(__dirname+"/public/register.html");
	}
});
app.get('/aboutpage',function(req,res){
	if(req.session.login){
		res.sendFile(__dirname+"/public/account.html");
	}
	else{
res.sendFile(__dirname+"/public/about.html");
		}
});
app.get('/forgetpage',function(req,res){
	if(req.session.login){
		res.sendFile(__dirname+"/public/account.html");
	}
	else{
res.sendFile(__dirname+"/public/forget.html");
		}
});
app.get('/friends',function(req,res){
	if(req.session.login){
		res.sendFile(__dirname+"/public/friends.html");
	}
	else{
res.sendFile(__dirname+"/public/home.html");
		}
});
app.get('/chat',function(req,res){
	if(req.session.login){
		res.sendFile(__dirname+"/public/chat.html");
	}
	else{
res.sendFile(__dirname+"/public/home.html");
		}
});
app.get('/cloud',function(req,res){
	if(req.session.login){
		res.sendFile(__dirname+"/public/cloud.html");
	}
});
app.get('/account',function(req,res){
	if(req.session.login){
		res.sendFile(__dirname+"/public/account.html");
	}
});
app.post('/wezdane',async function(req,res){
var sqldane='SELECT Email, Name FROM `tabelkatest` WHERE Login="'+req.session.login+'"';
var resultdane=await con.query(sqldane);
res.send(resultdane);
});
app.post('/resetmail',function(req,res){

});
//
var host1;
var randr1;
var mailOptionsr1;
var newe1;
app.post('/changemail',async function(req,res){
	var sqlgetemail='SELECT Email FROM `tabelkatest` WHERE Login="'+req.session.login+'"';
	var emailstary=await con.query(sqlgetemail);
	host1=req.get('host');
	randr1=Math.floor((Math.random()*19214423)+312613);
	newe1=req.body.emailnew;
	mailOptionsr1 = {
  from: 'matuslaw.programming@gmail.com',
  to: emailstary[0].Email,
  subject: 'CHATTERINO - change your email',
  html: "<label style='text-align:center; display:block; background-color: #404b46; color:white;font-size: 2.2vw; font-weight: bold;'>Email change</label><label style='display:block; font-size:1.6vw; background-color: #404b46; color:white;'>To change your email please click the link below<br></label><a href='"+"http://"+host1+"/resetmail?id="+randr1+"'  style='text-decoration: none; display: block; font-weight: bold;font-size: 2.2vw;color:white; background-color:#007300; text-align:center;'>RESET</a><br><em style='color:red; font-size: 1.5vw; display: block;'>Warning: If it weren't you don't reply to this message!</em><br><br><em>Best regards!</em>"
};

	transporter.sendMail(mailOptionsr1, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email change sent to '+emailstary[0].Email+' : ' + info.response);
  }
});
	res.send();
});
app.get('/resetmail',function(req,res){
if((req.protocol+"://"+req.get('host'))==("http://"+host1))

	if(req.query.id==randr1)
	{
		con.query('UPDATE `tabelkatest` SET Email="'+newe1+'" WHERE Email="'+mailOptionsr1.to+'"');
		console.log(mailOptionsr1.to+" RESET HIS PASSWORD");
		res.end("<h1>Email changed</h1>");
	}
	else
	{
		res.end("<h1>Bad request</h1>");
	}
});
//
/*
var host2;
var randr2;
var mailOptionsr2;
var newl1;
app.post('/changelogin',async function(req,res){
	console.log(req.session.login);
	var sqlgetemail='SELECT Email FROM `tabelkatest` WHERE Login="'+req.session.login+'"';
	var emailstary=await con.query(sqlgetemail);
	host2=req.get('host');
	randr2=Math.floor((Math.random()*19214423)+312613);
	newl1=req.body.loginew;
	mailOptionsr2 = {
  from: 'matuslaw.programming@gmail.com',
  to: emailstary[0].Email,
  subject: 'CHATTERINO - change your login',
  html: "<label style='text-align:center; display:block; background-color: #404b46; color:white;font-size: 2.2vw; font-weight: bold;'>Login change</label><label style='display:block; font-size:1.6vw; background-color: #404b46; color:white;'>To change your login please click the link below<br></label><a href='"+"http://"+host2+"/resetlogin?id="+randr2+"'  style='text-decoration: none; display: block; font-weight: bold;font-size: 2.2vw;color:white; background-color:#007300; text-align:center;'>RESET</a><br><em style='color:red; font-size: 1.5vw; display: block;'>Warning: If it weren't you don't reply to this message!</em><br><br><em>Best regards!</em>"
};

	transporter.sendMail(mailOptionsr2, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Login change sent to '+emailstary[0].Email+' : ' + info.response);
  }
});
	res.send();
});
app.get('/resetlogin',function(req,res){
if((req.protocol+"://"+req.get('host'))==("http://"+host2))

	if(req.query.id==randr2)
	{
		con.query('UPDATE `tabelkatest` SET Login="'+newl1+'" WHERE Email="'+mailOptionsr2.to+'"');
		console.log(mailOptionsr2.to+" RESET HIS LOGIN");
		res.end("<h1>Email changed</h1>");
	}
	else
	{
		res.end("<h1>Bad request</h1>");
	}
});
*/
//
app.post('/login', async function (req,res){

try{
    var querystr ='SELECT Password, Active FROM `tabelkatest` WHERE Login="'+req.body.user.login+'"';
    var result=await con.query(querystr);
    
    if(result.length>0)
    {
    	var active= result[0].Active;
    	var password = result[0].Password;
	if(password==req.body.user.password && active==1)
	{
		req.session.login=req.body.user.login;
		//req.session.cookie.maxAge = 10* 60 * 1000;	//10 minut sesja wygasa
		con.query('UPDATE `Online` SET Online=1 WHERE Login="'+req.body.user.login+'"');
		res.sendFile(__dirname+"/public/chat.html");
		if(!(online.includes(req.body.user.login)))
		{
			countonline++;
			online.push(req.body.user.login);
		}
		console.log(req.body.user.login+" CONNECTED");
	}
	else if(active==0)
	{
		console.log(req.body.user.login+" tried to connect INACTIVE");
		io.emit('login','inactive');
		res.status(204).send();
	}
	else
	{
		console.log(req.body.user.login+" tried to connect WRONG");
		io.emit('login','wrong');
		res.status(204).send();
	}
	}
	else
	{
		console.log(req.body.user.login+" tried to connect NOTEXISTS");
		io.emit('login','notexists');
		res.status(204).send();
	}
	}
	catch(e)
	{
		console.log("blad");
		console.log(e.message);
		res.end("BLADDD");
	}
    
});

var host;
var randr;
var mailOptionsr;
var newp;
app.post('/resetpassword',function(req,res){
	host=req.get('host');
	randr=Math.floor((Math.random()*19084423)+35613);
	newp=req.body.change.password;
	mailOptionsr = {
  from: 'matuslaw.programming@gmail.com',
  to: req.body.change.email,
  subject: 'CHATTERINO - reset your password',
  html: "<label style='text-align:center; display:block; background-color: #404b46; color:white;font-size: 2.2vw; font-weight: bold;'>Password reset</label><label style='display:block; font-size:1.6vw; background-color: #404b46; color:white;'>To reset your password please click the link below<br></label><a href='"+"http://"+host+"/resetp?id="+randr+"'  style='text-decoration: none; display: block; font-weight: bold;font-size: 2.2vw;color:white; background-color:#007300; text-align:center;'>RESET</a><br><em style='color:red; font-size: 1.5vw; display: block;'>Warning: If it weren't you don't reply to this message!</em><br><br><em>Thanks for joining our team!</em>"
};

	transporter.sendMail(mailOptionsr, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Password reset email sent to '+req.body.change.email+' : ' + info.response);
  }
});
	res.sendFile(__dirname+"/public/home.html");

});

var rand;
var mailOptions;
var loginonline;
app.post('/register', async function(req,res){
	host=req.get('host');
	rand=Math.floor((Math.random()*1908024423)+355713);
	loginonline=req.body.user.login;
	mailOptions = {
  from: 'matuslaw.programming@gmail.com',
  to: req.body.user.email,
  subject: 'CHATTERINO - confirm your e-mail',
  html: "<label style='text-align:center; display:block; background-color: #404b46; color:white;font-size: 2.2vw; font-weight: bold;'>E-mail confirmation</label><label style='display:block; font-size:1.6vw; background-color: #404b46; color:white;'>Hello <b>"+req.body.user.name+"</b>!<br>To start using our app please click the link below to confirm your e-mail adress<br><br></label><a href='"+"http://"+host+"/verify?id="+rand+"'  style='text-decoration: none; display: block; font-weight: bold;font-size: 2.2vw;color:white; background-color:#007300; text-align:center;'>CONFIRM</a><br><em style='color:red; font-size: 1.5vw; display: block;'>Warning: If it weren't you don't reply to this message!</em><br><br><em>Thanks for joining our team!</em>"
};

con.query('INSERT INTO `tabelkatest`(`Login`, `Password`, `Name`, `Email`, `Active`, `Latitude`, `Longitude`) VALUES ("'+req.body.user.login+'", "'+req.body.user.password+'", "'+req.body.user.name+'", "'+req.body.user.email+'", "0", '+req.body.user.lat+', '+req.body.user.long+')',
function()
{
	transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Confirmation email sent to '+req.body.user.email+' : ' + info.response);
  }
});
	res.sendFile(__dirname+"/public/login.html");
});
});
app.post('/addfriend',async function(req,res){
	var sql_addfriend='INSERT INTO `relacje` (Login1, Login2, Status) SELECT * FROM (SELECT "'+req.session.login+'", "'+req.body.login_dodaj+'" , 0) AS tmp WHERE NOT EXISTS ( SELECT Login1, Login2 FROM `relacje` WHERE Login1 = "'+req.session.login+'" AND Login2="'+req.body.login_dodaj+'") LIMIT 1;';
try{
	con.query(sql_addfriend,function(){
	res.redirect('back');
	});
}
catch(e)
{
	console.log(e.message);
}
});
app.post('/setfriend',async function(req,res){
var sql_setfriend='UPDATE `relacje` SET Status=1 WHERE ( Login1="'+req.body.login_dodaj+'" AND Login2="'+req.session.login+'" ) OR ( Login1="'+req.session.login+'" AND Login2="'+req.body.login_dodaj+'" )';
con.query(sql_setfriend);
var sql_setfriendadd='INSERT INTO `relacje` (Login1, Login2, Status) SELECT * FROM (SELECT "'+req.session.login+'", "'+req.body.login_dodaj+'" , 1) AS tmp WHERE NOT EXISTS ( SELECT Login1, Login2 FROM `relacje` WHERE Login1 = "'+req.session.login+'" AND Login2="'+req.body.login_dodaj+'") LIMIT 1;';
con.query(sql_setfriendadd);
res.redirect('back');
});
app.post('/nowawiadomosc',async function(req,res){
	var sqldodajw='INSERT INTO `wiadomosci` (`Login1`, `Login2`, `Wiadomosc`, `Czas`, `Odczytana`, `Nadawca` ) VALUES ("'+req.session.login+'", "'+req.body.dokogo+'", "'+req.body.wiadomosc+'", "'+req.body.czas+'", 0, "'+req.session.login+'")';
	con.query(sqldodajw);
	var sqldodajw2='INSERT INTO `wiadomosci` (`Login1`, `Login2`, `Wiadomosc`, `Czas`, `Odczytana`, `Nadawca` ) VALUES ("'+req.body.dokogo+'", "'+req.session.login+'", "'+req.body.wiadomosc+'", "'+req.body.czas+'", 0, "'+req.session.login+'")';
	con.query(sqldodajw2);
	res.send();
});
app.post('/getdialog',async function(req,res){
	var sqlgetd='SELECT Login2 FROM `wiadomosci` WHERE Login1="'+req.session.login+'" ORDER BY id DESC LIMIT 1';
	var dialog=await con.query(sqlgetd);
	if(dialog.length>0)
	{
	var sqlpobierzw='SELECT Login1 , Login2, Wiadomosc, Czas, Nadawca FROM `wiadomosci` WHERE Login1="'+req.session.login+'" AND Login2="'+dialog[0].Login2+'"';
	var wiadomosci=await con.query(sqlpobierzw);
	var updateodczyt='UPDATE `wiadomosci` SET Odczytana=1 WHERE Login1="'+req.session.login+'" AND Login2="'+dialog[0].Login2+'"';
	con.query(updateodczyt);
	res.send({mes:wiadomosci,cosjest:1,dokogo:dialog[0].Login2,kto:req.session.login});
	}
	else
	{
		res.send({cosjest:0});
	}
});
app.post('/pobierzwiadomosci',async function(req,res){
	var sqlpobierzw='SELECT Login1 , Login2, Wiadomosc, Czas, Nadawca FROM `wiadomosci` WHERE ( Login1="'+req.session.login+'" AND Login2="'+req.body.dokogo+'" AND Odczytana=1) OR ( Login1="'+req.body.dokogo+'" AND Login2="'+req.session.login+'" AND Odczytana=1)';
	var wiadomosci=await con.query(sqlpobierzw);
	var updateodczytana='UPDATE `wiadomosci` SET Odczytana=1 WHERE Login1="'+req.session.login+'" AND Login2="'+req.body.dokogo+'"';
	con.query(updateodczytana);
	res.send({mes:wiadomosci,kto:req.session.login});
});
app.post('/pobierzwiadomoscinieod',async function(req,res){
	var sqlpobierzw='SELECT Login1 , Login2, Wiadomosc, Czas, Nadawca FROM `wiadomosci` WHERE Login1="'+req.session.login+'" AND Login2="'+req.body.dokogo+'" AND Odczytana=0';
	var wiadomosci=await con.query(sqlpobierzw);
	var updateodczytana='UPDATE `wiadomosci` SET Odczytana=1 WHERE Login1="'+req.session.login+'" AND Login2="'+req.body.dokogo+'"';
	con.query(updateodczytana);
	res.send({mes:wiadomosci,kto:req.session.login});
});
app.post('/checknewmessages', async function(req,res){
	var sqlsprawdz='SELECT Nadawca FROM `wiadomosci` WHERE Login1="'+req.session.login+'" AND Odczytana=0';
	var wiad=await con.query(sqlsprawdz);
	res.send(wiad);
});
app.get('/logout',async function(req,res){
	var index=online.indexOf(req.session.login);
	if(index>-1)
	{
		con.query('UPDATE `Online` SET Online=0 WHERE Login="'+req.session.login+'"');
		console.log(req.session.login+' DISCONNECTED');
		online.splice(index,1);
		countonline--;
		req.session.destroy();
	}
	res.sendFile(__dirname+"/public/home.html");
});
io.on('connection',function(socket){
	socket.on('checkmail',async function(data)
	{
		try{
			var queryem='SELECT Email FROM `tabelkatest` WHERE Email="'+data+'"';
			var resultem=await con.query(queryem);
			if(resultem.length>0)//EMAIL ISTNIEJE
			{
				socket.emit('emailchecked','zle');
			}
			else
			{
				socket.emit('emailchecked','dobry');
			}
		}
		catch(e)
		{
			console.log("blad checkmail");
			console.log(e.message);
		}
	});
	socket.on('checklogin',async function(data)
	{
		try{
			var querylog='SELECT Login FROM `tabelkatest` WHERE Login="'+data+'"';
			var resultlog=await con.query(querylog);
			if(resultlog.length>0)//LOGIN ISTNIEJE
			{
				socket.emit('loginchecked','zle');
			}
			else
			{
				socket.emit('loginchecked','dobry');
			}
		}
		catch(e)
		{
			console.log("blad checklogin");
			console.log(e.message);
		}
	});
	socket.on('nowa_wiadomosc',function(){
		io.emit('dodaj_wiadomosc');
	});
});
	app.post('/removefriend', function(req,res){
		var usunl='DELETE FROM `relacje` WHERE ( Login1="'+req.session.login+'" AND Login2="'+req.body.login_usun+'" ) OR ( Login1="'+req.body.login_usun+'" AND Login2="'+req.session.login+'" )';
		con.query(usunl);
		res.send();
	});
	app.post('/pobierzznajomych',async function(req,res){
		var querymoi='SELECT Login2 FROM `relacje` WHERE Login1="'+req.session.login+'" AND Status=1';
			var resultmoi=await con.query(querymoi);
			res.send(resultmoi);
	});
	app.post('/pobierzonline',async function(req,res){
		var ludzieon=await con.query('SELECT Login FROM `Online` WHERE Online=1 AND Login!="'+req.session.login+'"');
		res.send(ludzieon);
	});
	app.post('/getfriends',async function(req,res){
		try{

			var querylog='SELECT Login, Latitude, Longitude FROM   tabelkatest WHERE  Login NOT IN (SELECT Login2 FROM relacje WHERE Login1="'+req.session.login+'") AND Login!="'+req.session.login+'"';
			var resultlog=await con.query(querylog);
			var queryl='SELECT Latitude, Longitude FROM `tabelkatest` WHERE Login="'+req.session.login+'"';
			var resultl=await con.query(queryl);
			var querymoi='SELECT Login2 FROM `relacje` WHERE Login1="'+req.session.login+'" AND Status=1';
			var resultmoi=await con.query(querymoi);
			var queryzap='SELECT Login1 FROM `relacje` WHERE Login2="'+req.session.login+'" AND Status=0';
			var resultzap=await con.query(queryzap);
			if(resultl.length>0)
			{
				io.emit('send_friends',{moi:resultmoi, znajomi:resultlog, ty:resultl, zaproszenia: resultzap});
			}
			else
			{
				console.log("pobieranie znajomych blad");
			}
		}
		catch(e)
		{
			console.log("blad w pobieraniu listy znajomych");
			console.log(e.message);
		}
		res.send();
	});


server.listen(PORT,()=>{
console.log("Server listening on adress "+ip.address()+":"+PORT);
});

setInterval(function(){
	if(online.length>0)
	{
console.log(countonline+" people are online");
console.log(online);
	}
	else
	{
		console.log("No people online");
	}
},30000);