var status = 0;
$(function(){
			$('#buttonBox').click(function(){
		if(status == 0){
			$('#dashArrow').attr('src','/public/img/left.png');
			status = 1;
		}else{
			$('#dashArrow').attr('src','/public/img/right.png');
			status = 0;
		}
	});
});