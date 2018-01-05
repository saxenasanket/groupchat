var status = 0;
$(function(){
			$('#buttonBox').click(function(){
		if(status == 0){
			$('#dashArrow').attr('src','/public/img/left.png');
			$('#sideBar').removeClass('col-sm-2').addClass('col-sm-3');
			$('#mainContent').removeClass('col-sm-10').addClass('col-sm-9');
			status = 1;
		}else{
			$('#dashArrow').attr('src','/public/img/right.png');
			$('#sideBar').removeClass('col-sm-3').addClass('col-sm-2');
			$('#mainContent').removeClass('col-sm-9').addClass('col-sm-10');
			status = 0;
		}
	});
});