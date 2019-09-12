var socket=io();
var namec=false;
var loginc=false;
var emailc=false;
var reemailc=false;
var passc=false;
var lat=0;
var long=0;
$(document).ready(function() {
	$("#namef").focus();
});
tippy('#namef', {
  content: 'Who are you?',
  arrow: true,
  placement: "right",
  animation: "shift-away",
  hideOnClick: false,
})
tippy('#emailf', {
  content: 'We will send confirmation<br>email to you',
  arrow: true,
  placement: "right",
  animation: "shift-away",
  hideOnClick: false,
})
tippy('#emailconfirmf', {
  content: 'Re-type your email',
  arrow: true,
  placement: "right",
  animation: "shift-away",
  hideOnClick: false,
})
tippy('#loginf', {
  content: 'Must contain at least<br>5 characters',
  arrow: true,
  placement: "right",
  animation: "shift-away",
  hideOnClick: false,
})	
tippy('#passf', {
  content: '<label>Must contain at least</label><ul><li>One upper case</li><li>One digit</li><li>6 characters</li></ul>',
  arrow: true,
  placement: "right",
  animation: "shift-away",
  hideOnClick: false,
})
$("#namef").on('keyup', function(event) {
	event.preventDefault();
	if($("#namef").val().length>=2 && $("#namef").val().charAt(0)>='A' && $("#namef").val().charAt(0)<='Z')
	{
		namec=true;
	}
	else
	{
		namec=false;
	}
	if($("#namef").val().length==0)
	{
		namec=false;
		$("#namef").css('background-image', 'url("../images/name.png")');
	}
	else if(namec)
	{
		$("#namef").css('background-image', 'url("../images/name_correct.png")');
	}
	else
	{
		$("#namef").css('background-image', 'url("../images/name_wrong.png")');
	}
});
$("#loginf").on('keyup', function(event) {
	event.preventDefault();
	if($("#loginf").val().length>=5)
	{
		socket.emit("checklogin",$("#loginf").val());
		loginc=true;
	}
	else
	{
		loginc=false;
	}
	if($("#loginf").val().length==0)
	{
		loginc=false;
		$("#loginf").css('background-image', 'url("../images/user.png")');
	}
	else if(loginc)
	{
		$("#loginf").css('background-image', 'url("../images/user_correct.png")');
	}
	else
	{
		$("#loginf").css('background-image', 'url("../images/user_wrong.png")');
	}
});	
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
$("#emailf").on('keyup', function(event) {
	event.preventDefault();
	if(validateEmail($("#emailf").val()))
		{
			socket.emit("checkmail",$("#emailf").val());
			emailc=true;
		}
	else
	{
		emailc=false;
	}
	if($("#emailf").val().length==0)
	{
		$("#emailf").css('background-image', 'url("../images/email.png")');
	}
	else if(emailc)
	{
		$("#emailf").css('background-image', 'url("../images/email_correct.png")');
	}
	else
	{
		$("#emailf").css('background-image', 'url("../images/email_wrong.png")');
	}
});
$("#emailconfirmf").on('keyup', function(event) {
	event.preventDefault();
	if($("#emailconfirmf").val()==$("#emailf").val())
	{
		reemailc=true;	
	}
	else
	{
		reemailc=false;
	}
	if($("#emailconfirmf").val().length==0)
	{
		$("#emailconfirmf").css('background-image', 'url("../images/email.png")');
	}
	else if(reemailc)
	{
		$("#emailconfirmf").css('background-image', 'url("../images/email_correct.png")');
	}
	else
	{
		$("#emailconfirmf").css('background-image', 'url("../images/email_wrong.png")');
	}
});
$("#passf").on('keyup', function(event) {
	event.preventDefault();
//1 cyfra 1 duza litera 6 znakow
  var upperCaseLetters = /[A-Z]/g;
  var numbers = /[0-9]/g;
  if($("#passf").val().match(upperCaseLetters) && $("#passf").val().length >= 6 && $("#passf").val().match(numbers)) {  
    passc=true;
  } else {
    passc=false;
  }
  if($("#passf").val().length==0)
  {
  	$("#passf").css('background-image', 'url("../images/klodka.png")');
  }
  else if(passc)
  {
  	$("#passf").css('background-image', 'url("../images/klodka_correct.png")');
  }
  else
  {
  	$("#passf").css('background-image', 'url("../images/klodka_wrong.png")');
  }
});

socket.on('loginchecked',function(data)
{
	if(data=="dobry")
	{
		loginc=true;
		$("#loginf").css('background-image', 'url("../images/user_correct.png")');
		$("#loginf").css('color', 'white');
	}
	else
	{
		loginc=false;
		$("#loginf").css('background-image', 'url("../images/user_wrong.png")');
		$("#loginf").css('color', 'orange');
	}
});
socket.on('emailchecked',function(data)
{
	if(data=="dobry")
	{
		emailc=true;
		$("#emailf").css('background-image', 'url("../images/email_correct.png")');
		$("#emailf").css('color', 'white');
	}
	else
	{
		emailc=false;
		$("#emailf").css('background-image', 'url("../images/email_wrong.png")');
		$("#emailf").css('color', 'orange');
	}
});

function check(){
	$("#latf").val(lat);
	$("#longf").val(long);
	if(loginc && emailc && reemailc && passc)
	{
		return true;
	}
	else
	{
		return false;
	}
}
  if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
  lat=position.coords.latitude;
  long=position.coords.longitude;
});
} else {
  console.log("Localization not avaible");
}
