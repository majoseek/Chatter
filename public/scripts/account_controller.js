var imie="";
var email="";
var wybor="";
$(document).ready(function() {
	$.ajax({
		url: '/wezdane',
		type: 'POST',
		async:false,
	})
	.done(function(data) {
		imie=data[0].Name;
		email=data[0].Email;
	});
});
$("#options div button").click(function(event) {
	$("#options div button").css('background-color', 'transparent');
	if($(this).attr('id')=='delete_btn')
	{
	if(prompt('Type in "DELETE" to permanently remove your account').toUpperCase()=='DELETE')
	{
		usun();
	}
	}
	else
	{
	$(this).css('background-color', 'green');
	}
});
function usun(){
	console.log("usunieto");
}
$("#info div").click(function(event) {
	if(klik_pom==false)
	{
		klik_pom=true;
	if($(this).attr('id')=='logo_div')
	{
		wybor="logo";
		$("#popup label").text("Set your new logo image");
		$("#submit_input").css('display', 'none');
		$(".file-upload").css('display', 'block');
		$("#popup em").html("Note: Image max size is 5MB");
		$("#emailin").css('display', 'none');
		$("#reemail").css('display', 'none');
	}
	if($(this).attr('id')=='user_div')
	{
		wybor="login";
		$("#popup label").text("Set your new login");
		$("#popup em").html("Note: We will send confirmation mail to your e-mail");
		$("#emailin").attr('placeholder', 'Enter new login');
		$("#reemail").attr('placeholder', 'Re-enter login');
		$("#submit_input").css('display', 'block');
		$(".file-upload").css('display', 'none');
		$("#emailin").css('display', 'block');
		$("#reemail").css('display', 'block');
		$("#emailin").focus();
	}
	if($(this).attr('id')=='email_div')
	{
		wybor="email";
		$("#popup label").text("Set your new e-mail");
		$("#popup em").html("Note: We will send confirmation mail to your previous e-mail");
		$("#emailin").attr('placeholder', 'Enter new email');
		$("#reemail").attr('placeholder', 'Re-enter email');
		$(".file-upload").css('display', 'none');
		$("#submit_input").css('display', 'block');
		$("#emailin").css('display', 'block');
		$("#reemail").css('display', 'block');
		$("#emailin").focus();
	}
	$("#popup").attr('class', 'popup_anim');
	$("#menu_holder div").css('visibility', 'hidden');

	setTimeout(function(){klik_pom=false;},1000);
	}
});
$("#popup img").click(function(event) {
	$("#popup").attr('class', 'popup_animrev');
	$("#menu_holder div").css('visibility', 'visible');
});

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
$("#submit_input").click(function(event) {
	if(wybor=="email")
	{
		if($("#emailin").val() && $("#reemail").val()==$("#emailin").val() && validateEmail($("#emailin").val()))
		{
		$.ajax({
			url: '/changemail',
			type: 'POST',
			data: {emailnew: $("#emailin").val()},
			async: false,
		})
		.done(function() {
			$("#popup img").click();
			$("#submit_input").css('border-color', 'white');
			$("#emailin").val('');
			$("#remail").val('');
		});
		}
		else
	{
		$("#submit_input").css('border-color', 'red');
	}
	}
	else if(wybor=="login")
	{
		/*
		if($("#emailin").val() && $("#reemail").val()==$("#emailin").val())
		{
		$.ajax({
			url: '/changelogin',
			type: 'POST',
			data: {loginew: $("#emailin").val()},
			async: false,
		})
		.done(function() {
			$("#popup img").click();
			$("#submit_input").css('border-color', 'white');
			$("#emailin").val('');
			$("#remail").val('');
		});
		}
		else
		{
			$("#submit_input").css('border-color', 'red');
		}
		*/
	}
});