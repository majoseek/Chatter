$("#menu_holder div, #menu_phone div").click(function(event) {
	if(klik_pom==false)
	{
	klik_pom=true;
	if($("#menu_phone").attr('class')=='wysun_anim')
	{
		$("#menu_phone").attr('class', 'schowaj_anim');

	}
	else
	{
		$("#menu_phone").attr('class', 'wysun_anim');
	}
	setTimeout(function(){klik_pom=false;},1000);
	}
});