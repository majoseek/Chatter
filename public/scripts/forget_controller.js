var socket=io();
tippy('#emailf', {
  content: 'Check this email to<br>set new password',
  arrow: true,
  placement: "right",
  animation: "shift-away",
  hideOnClick: false,
})
function check(){
if($("#emailf").val() && $("#passf").val()  && $("#repassf").val()  && $("#passf").val()==$("#repassf").val())
{
	return true;
}
else
{
	return false;
}
}