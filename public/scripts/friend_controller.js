var socket=io();//NAPRAWIC BLAD W LOGOWANIU PRZESKAKUJACE FIELDY
$("#yourfriends_btn").click(function(event) {
	if($("#yourfriends_div").css('display')!='flex')
	{
	$("#makefriends_div").css('display', 'none');
	$("#friendrequests_div").css('display', 'none');
	$("#yourfriends_div").css('display', 'flex');
	$("#yourfriends_btn").css('background-color', 'green');
	$("#makefriends_btn").css('background-color', 'rgba(23, 23, 23, 0.9);');
	$("#friendrequests_btn").css('background-color', 'rgba(23, 23, 23, 0.9);');
	}
	else
	{
	$("#yourfriends_btn").css('background-color', 'rgba(23, 23, 23, 0.9);');
	}
});
$("#makefriends_btn").click(function(event) {
	if($("#makefriends_div").css('display')!='flex')
	{
	$("#yourfriends_div").css('display', 'none');
	$("#friendrequests_div").css('display', 'none');
	$("#makefriends_div").css('display', 'flex');
	$("#makefriends_btn").css('background-color', 'green');
	$("#yourfriends_btn").css('background-color', 'rgba(23, 23, 23, 0.9);');
	$("#friendrequests_btn").css('background-color', 'rgba(23, 23, 23, 0.9);');
	}
	else
	{
		$("#makefriends_btn").css('background-color', 'rgba(23, 23, 23, 0.9);');
	}
});
$("#friendrequests_btn").click(function(event) {
	if($("#friendrequests_div").css('display')!='flex')
	{
	$("#makefriends_div").css('display', 'none');
	$("#yourfriends_div").css('display', 'none');
	$("#friendrequests_div").css('display', 'flex');
	$("#friendrequests_btn").css('background-color', 'green');
	$("#yourfriends_btn").css('background-color', 'rgba(23, 23, 23, 0.9);');
	$("#makefriends_btn").css('background-color', 'rgba(23, 23, 23, 0.9);');
	}
	else
	{
		$("#friendrequests_btn").css('background-color', 'rgba(23, 23, 23, 0.9);');
	}
});

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
function getDistance(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}
$(document).ready(function() {
	$.ajax({
		url: '/getfriends',
		type: 'POST',
		async:false,
	});
	
});
socket.on('send_friends',async function(data){
	var dlugosc_moi=data.moi.length;
	var dlugosc_zap=data.zaproszenia.length;
	var dlugosc=data.znajomi.length;
	var dystans;
	var ludzie={"login":[], "dystans":[]};

for(var i=0;i<dlugosc;i++)
{
	ludzie.login.push(data.znajomi[i].Login);
	dystans=await getDistance(data.znajomi[i].Latitude,data.znajomi[i].Longitude,data.ty[0].Latitude,data.ty[0].Longitude);
	ludzie.dystans.push(dystans);
}
for(var i=0;i<dlugosc_moi;i++)
{
	var yourfriends=document.createElement('div');
	yourfriends.className="yourfriends";
	$("#yourfriends_div").append(yourfriends);
	var yourfriends_img=document.createElement('img');
	yourfriends_img.src="images/klodka.png";
	var yourfriends_label=document.createElement('label');
	yourfriends_label.innerHTML=data.moi[i].Login2;
	//
var yourfriends_btn=document.createElement('button');
	yourfriends_btn.innerHTML="REMOVE";
	yourfriends_btn.id=data.moi[i].Login2;
	yourfriends_btn.addEventListener('click',function(){
		$.ajax({
			url: '/removefriend',
			type: 'POST',
			async: false,
			data: {login_usun: $(this).attr('id')},
		});
		$(this).css('background-color', 'green');
		$(this).html('REMOVED');
		$(this).css('disabled', 'true');
	});
	yourfriends.appendChild(yourfriends_img);
	yourfriends.appendChild(yourfriends_label);
	yourfriends.appendChild(yourfriends_btn);
}
for(var i=0;i<dlugosc_zap;i++)
{
	var friendrequests=document.createElement('div');
	friendrequests.className="friendrequests";
	$("#friendrequests_div").append(friendrequests);
	var friendrequests_img=document.createElement('img');
	friendrequests_img.src="images/klodka.png";
	var friendrequests_label=document.createElement('label');
	friendrequests_label.innerHTML=data.zaproszenia[i].Login1;
	var friendrequests_btn=document.createElement('button');
	friendrequests_btn.innerHTML="ACCEPT";
	friendrequests_btn.id=data.zaproszenia[i].Login1;

	friendrequests_btn.addEventListener('click',function(){
		$.ajax({
			url: '/setfriend',
			type: 'POST',
			async: false,
			data: {login_dodaj: $(this).attr('id')},
		});
		$(this).css('background-color', 'green');
		$(this).html('ADDED');
		$(this).css('disabled', 'true');
		const yourfriends_delete = document.getElementById("yourfriends_div");
  while (yourfriends_delete.firstChild) {
    yourfriends_delete.removeChild(yourfriends_delete.firstChild);
  }
  		const myfriends_delete = document.getElementById("makefriends_div");
  while (myfriends_delete.firstChild) {
    myfriends_delete.removeChild(myfriends_delete.firstChild);
  }
  	const friendrequests_delete = document.getElementById("friendrequests_div");
  while (friendrequests_delete.firstChild) {
    friendrequests_delete.removeChild(friendrequests_delete.firstChild);
  }

  $.ajax({
		url: '/getfriends',
		type: 'POST',
		async:false,
	});
	});
	friendrequests.appendChild(friendrequests_img);
	friendrequests.appendChild(friendrequests_label);
	friendrequests.appendChild(friendrequests_btn);
}
for(var i=0;i<dlugosc;i++)
{
	var tekst=ludzie.login[i];
	var makefriends=document.createElement('div');
	makefriends.className="makefriends";
	$("#makefriends_div").append(makefriends);
	var makefriends_img=document.createElement('img');
	makefriends_img.src="images/email.png";
	var makefriends_btn=document.createElement('button');
	makefriends_btn.innerHTML="SEND REQUEST";
	makefriends_btn.id=tekst;
	var makefriends_label=document.createElement('label');
	makefriends_label.innerHTML=ludzie.login[i]+"<br>"+Math.round(ludzie.dystans[i]*1000)/1000+"km away";
	makefriends_btn.addEventListener('click',function(){
		$.ajax({
			url: '/addfriend',
			type: 'POST',
			async: false,
			data: {login_dodaj: $(this).attr('id')},
		});
		$(this).css('background-color', 'green');
		$(this).html('ADDED');
		$(this).css('disabled', 'true');
		const yourfriends_delete = document.getElementById("yourfriends_div");
  while (yourfriends_delete.firstChild) {
    yourfriends_delete.removeChild(yourfriends_delete.firstChild);
  }
  	const friendrequests_delete = document.getElementById("friendrequests_div");
  while (friendrequests_delete.firstChild) {
    friendrequests_delete.removeChild(friendrequests_delete.firstChild);
  }

  $.ajax({
		url: '/getfriends',
		type: 'POST',
		async:false,
	});
	});

	makefriends.appendChild(makefriends_img);
	makefriends.appendChild(makefriends_btn);
	makefriends.appendChild(makefriends_label);
		
}
});