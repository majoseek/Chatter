var socket=io();
var wybrany="";
var klikniety=false;
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
document.addEventListener('keyup',function(e){
var keycode=e.keyCode || e.which;
if(keycode==13 && $("#messagef").is(':focus') && $("#messagef").val() && wybrany!="")
{
	var today = new Date();
	var time = days[today.getDay()] + "<br>" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
$.ajax({
	url: '/nowawiadomosc',
	type: 'POST',
	data: {wiadomosc: $("#messagef").val(), dokogo: wybrany, czas:time},
	async: false,
});
	$("#messagef").val('');
	ustaw_chat();
	var objDiv = document.getElementById("chat_holder");
	objDiv.scrollTop = objDiv.scrollHeight;
}
});


$("#strzalka_img, #strzalka").click(function(event) {
	$("#welcome_btn").css('display', 'none');
	if(!klikniety)
	{
		klikniety=true;
	if(document.getElementById("friends_menu").className=="pokazane")
	{
		document.getElementById("friends_menu").className="ukryte";
		document.getElementById("strzalka").className="dol";
		document.getElementById("strzalka_img").className="ukryj_img";
		$("#strzalka").css('background-color', 'rgb(23, 23, 23)');
		$("#strzalka_img").css('background-color', 'rgb(23, 23, 23)');
		setTimeout(function(){klikniety=false;$("#strzalka_img").css('border-top-right-radius', '25px');$("#strzalka_img").css('border-bottom-left-radius', '0');$("#strzalka_img").css('transform', 'rotateZ(0deg)');},690);
	}
	else
	{
		document.getElementById("friends_menu").className="pokazane";
		document.getElementById("strzalka").className="gora";
		document.getElementById("strzalka_img").className="pokaz_img";
		$("#strzalka").css('background-color', 'green');
		$("#strzalka_img").css('background-color', 'green');
		setTimeout(function(){klikniety=false;$("#strzalka_img").css('border-top-right-radius', '0');$("#strzalka_img").css('border-bottom-left-radius', '25px');$("#strzalka_img").css('transform', 'rotateZ(180deg)');},690);
	}
	}
});
$(document).ready(function() {
	var znajomi;
	$.ajax({
		url: '/pobierzznajomych',
		type: 'POST',
		async:false,
	})
	.done(function(data) {
		znajomi=data;
	});
	for(var i=0;i<znajomi.length;i++)
	{
	var znajomy=document.createElement('div');
	znajomy.className="znajomy";
	znajomy.id=znajomi[i].Login2;
	znajomy.addEventListener('click',async function(){
		if($(this).attr('id')!=wybrany)
		{
		$('.znajomy').css('background-color', 'transparent');
		$(this).css('background-color', 'green');
		wybrany=$(this).attr('id');
		$("#who_holder").html("Messaging with "+$(this).attr('id'));
		$("#message_holder").css('display', 'flex');
		$("#chat_holder").css('display', 'block');
		$("#who_holder").css('display', 'flex');
		$("#chat_holder").empty();
		$(this).find('img').remove();
		ustaw_chat_odczytane();
		var objDiv = document.getElementById("chat_holder");
		objDiv.scrollTop = objDiv.scrollHeight;
		$("#message_holder input").focus();
		}
	});
	var znajomy_btn=document.createElement('button');
	znajomy_btn.innerHTML=znajomi[i].Login2;
	var znajomy_span=document.createElement('span');
	$("#friends_menu").append(znajomy);
	znajomy.appendChild(znajomy_btn);
	znajomy.appendChild(znajomy_span);
	}
	pobierz_online();
	pobierz_rozmowe();
	var objDiv = document.getElementById("chat_holder");
		objDiv.scrollTop = objDiv.scrollHeight;
	setInterval(function(){pobierz_online();if($("#chat_holder").css('display')=='block'){ustaw_chat();}},2000);
});
function pobierz_online(){
	var ludzie=[]; 
$.ajax({
	url: '/pobierzonline',
	type: 'POST',
	async:false,
})
.done(async function(data) {
	if(data.length==0)
	{
		$("#online").html("No friends online");
	}
	else if(data.length==1)
	{
	$("#online").html("1 friend online");
	}
	else
	{
		$("#online").html(data.length+" friends online");
	}	
	for(var i=0;i<data.length;i++)
	{
		ludzie.push(data[i].Login);
	}
	$("#friends_menu").children().each(function(index, el) {
		if(ludzie.includes($(el).attr('id')))
		{
			$("#"+$(el).attr('id')+" span").css('background-color', 'green');
		}
		else
		{
			$("#"+$(el).attr('id')+" span").css('background-color', 'red');
		}
	});
});
}
function ustaw_chat(){
	$.ajax({
		url: '/pobierzwiadomoscinieod',
		type: 'POST',
		async:false,
		data:{dokogo:wybrany},
	})
	.done(function(data) {
		for(var i=0;i<data.mes.length;i++){
		var cont_darker=document.createElement('div');

$("#chat_holder").append(cont_darker);
var cont_darkerimg=document.createElement('img');
if(data.kto==data.mes[i].Nadawca)
{
	cont_darker.className="container";
	cont_darkerimg.src="images/boy1.png";
}
else
{
	cont_darker.className="container lighter";
	cont_darkerimg.src="images/boy2.png";
}
var cont_darkerp=document.createElement('p');
cont_darkerp.innerHTML=data.mes[i].Wiadomosc;
var cont_darkerspan=document.createElement('span');
cont_darkerspan.className="time-right";
var time=data.mes[i].Czas;
cont_darkerspan.innerHTML="<b>"+data.mes[i].Nadawca+"</b><br>"+time;
cont_darker.appendChild(cont_darkerimg);
cont_darker.appendChild(cont_darkerp);
cont_darker.appendChild(cont_darkerspan);
var objDiv = document.getElementById("chat_holder");
		objDiv.scrollTop = objDiv.scrollHeight;
	}
	});
}
function ustaw_chat_odczytane(){
	$.ajax({
		url: '/pobierzwiadomosci',
		type: 'POST',
		async:false,
		data:{dokogo:wybrany},
	})
	.done(function(data) {
		for(var i=0;i<data.mes.length;i++){
		var cont_darker=document.createElement('div');

$("#chat_holder").append(cont_darker);
var cont_darkerimg=document.createElement('img');
if(data.kto==data.mes[i].Nadawca)
{
	cont_darker.className="container";
	cont_darkerimg.src="images/boy1.png";
}
else
{
	cont_darker.className="container lighter";
	cont_darkerimg.src="images/boy2.png";
}
var cont_darkerp=document.createElement('p');
cont_darkerp.innerHTML=data.mes[i].Wiadomosc;
var cont_darkerspan=document.createElement('span');
cont_darkerspan.className="time-right";
var time=data.mes[i].Czas;
cont_darkerspan.innerHTML="<b>"+data.mes[i].Nadawca+"</b><br>"+time;
cont_darker.appendChild(cont_darkerimg);
cont_darker.appendChild(cont_darkerp);
cont_darker.appendChild(cont_darkerspan);
	}
	});
}
function pobierz_rozmowe(){
	$.ajax({
		url: '/getdialog',
		type: 'POST',
		async:false,
	})
	.done(function(data) {
		if(data.cosjest==1)
		{
		for(var i=0;i<data.mes.length;i++){
		var cont_darker=document.createElement('div');

$("#chat_holder").append(cont_darker);
var cont_darkerimg=document.createElement('img');
if(data.kto==data.mes[i].Nadawca)
{
	cont_darker.className="container";
	cont_darkerimg.src="images/boy1.png";
}
else
{
	cont_darker.className="container lighter";
	cont_darkerimg.src="images/boy2.png";
}
var cont_darkerp=document.createElement('p');
cont_darkerp.innerHTML=data.mes[i].Wiadomosc;
var cont_darkerspan=document.createElement('span');
cont_darkerspan.className="time-right";
var time=data.mes[i].Czas;
cont_darkerspan.innerHTML="<b>"+data.mes[i].Nadawca+"</b><br>"+time;
cont_darker.appendChild(cont_darkerimg);
cont_darker.appendChild(cont_darkerp);
cont_darker.appendChild(cont_darkerspan);
wybrany=data.dokogo;
$("#"+data.dokogo).css('background-color', 'green');
$("#who_holder").html("Messaging with "+data.dokogo);
	}
		$("#welcome_btn").css('display', 'none');
		$("#message_holder").css('display', 'flex');
		$("#chat_holder").css('display', 'block');
		$("#who_holder").css('display', 'flex');
	}
	else
	{
		$("#message_holder").css('display', 'none');
		$("#chat_holder").css('display', 'none');
		$("#who_holder").css('display', 'none');
	}
	});
}
$("#welcome_btn").click(function(event) {
	$(this).css('display', 'none');
	$("#strzalka_img").click();
});
function checkmessages(){
$.ajax({
	url: '/checknewmessages',
	type: 'POST',
	async:false,
})
.done(async function(data) {
	var zdjecia=[];
	if(data.length>0)
	{
		for(var i=0;i<data.length;i++)
		{
			if(!(zdjecia.includes(data[i].Nadawca)))
			{
				zdjecia.push(data[i].Nadawca);
			}
		}
		$("#friends_menu").children().each(function(index, el) {
			if($(this).attr('id')!='online')
			{
			if(zdjecia.includes($(this).attr('id')) && $(this).find("img").length==0)
			{
				var img=document.createElement('img');
				img.src="images/message_unread.png";
				$(img).insertAfter($(this).find('button'));
			}	
			}
		});
	}
	else
	{
		$(".znajomy img").remove();
	}
});
}
setInterval(function(){checkmessages();},2500);
setInterval(function(){
if($(".znajomy img"))
{
if($(".znajomy img").attr('src')=='images/message_unread1.png')
	{$(".znajomy img").attr('src', 'images/message_unread.png');}
	else{$(".znajomy img").attr('src', 'images/message_unread1.png');}
}
},1000);
