var socket=io();
$(document).ready(function() {
	$("#loginf").focus();
});
socket.on('login',function(data){
	if(data=='wrong')
	{
		$("#message_holder").css('padding', '20px 0');
		$("#message_label").css('visibility', 'visible');
		$("#passf").val('');
		$("#loginf").val('');
		$("#loginf").focus();
		$("#message_label").html("Incorrect login or password!");
	}
	else if(data=="notexists")
	{
		$("#message_holder").css('padding', '20px 0');
		$("#message_label").css('visibility', 'visible');
		$("#passf").val('');
		$("#loginf").val('');
		$("#loginf").focus();
		$("#message_label").html("User with this login doesn't exist!");
	}
	else if(data=="inactive")
	{
		$("#message_holder").css('padding', '20px 0');
		$("#message_label").css('visibility', 'visible');
		$("#passf").val('');
		$("#loginf").val('');
		$("#loginf").focus();
		$("#message_label").html("Account is inactive! Please check your e-mail");
	}
});
function check(){
	if($("#loginf").val() && $("#passf").val())
	{
	return true;
	}
	else
	{
		return false;
	}
}

