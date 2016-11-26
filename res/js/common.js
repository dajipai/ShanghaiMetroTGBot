$(function(){
  $("#header .search .search_from input.search_text").Default_Values({focus_class:"on_foucs",def_val:""}); 
  $(".nav_list li").each(function(){
	$(this).append("<div class='cur_bg'></div>");  
  });
  $(".nav_list li:last").css("background-image","none");
  $(".nav_list li.cur").find("div.cur_bg").css("display","block");
  $(".nav_list li a").hover(
    function(){
	 if(!$(this).parent("li").hasClass("cur")){
	   $(this).find("span").addClass("hover");
	   $(this).parent("li").find("div.cur_bg").css("display","block");
	 }	
	},
	function(){
	  if(!$(this).parent("li").hasClass("cur")){
	   $(this).find("span").removeClass("hover");
	   $(this).parent("li").find("div.cur_bg").css("display","none");
	 }
	}
  );
  




/**/
/*$(".select_item select.line_select,.form_item select.line_select").change(function(){
  var _line_self = $(this);
  var line_name = $(this).val();
  var _none = '<option value="none">请选择</option>';
  var _html = ''; 
  if(line_name!=='none'){
	/*ajax*/
	/*$.ajax({
	  url:'http://test06.w186.mc-test.com/shanghaiditie/skin/xml/station_name.xml',
	  type:'GET',
	  dataType:'xml',
	  timeout:5000,
	  cache:false,
	  error: function(xml){ alert ('站点名称xml加载出错');},
	  success:function(xml){
		  var _count =  $(xml).find(line_name).length;
		if(_count==1){
			$(xml).find(line_name).find("station_name").each(function(){
		       var item = "<option"+" "+"value= "+"\""+$(this).attr('value')+"\""+">"+$(this).text()+"</option>"
		      _html+=item ;
		    });
		  _html=_none+_html;
		  _line_self.siblings("select.station_name").html(_html);
		}else{
		  alert ("找不到该线路数据...");	
		} 
	  }
	});  
	/*ajax*/
/*  }
  
})

/**/


 $(".run_link a").Hover();
  
  $(".schedule .schedule_top span.first_time").click(function(){
	$(this).addClass("cur").siblings("span").removeClass("cur"); 
	$(".schedule .schedule_con .first_time_area").css("display","block").siblings("div").css("display","none")
  });
  
  $(".schedule .schedule_top span.area_map").click(function(){
	$(this).addClass("cur").siblings("span").removeClass("cur"); 
	$(".schedule .schedule_con .area_map_area").css("display","block").siblings("div").css("display","none")
  });
  $(".schedule .schedule_top span.first_time").trigger("click");
  
  $(".other_link tr").each(function(){
	$(this).find("td:last").find("a").css("float","right");  
  });



  
})

/*******************************************以下为自定义函数************************************************/
$(function(){
	$("#favorites").click(function () {
		var url = "http://114.80.218.33",name="上海申通地铁集团有限公司";
		if(document.all) { 
		  window.external.addFavorite(url, name);
		} else if (window.sidebar) { 
		  window.sidebar.addPanel(name, url, "");
		} else {
		  var ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL';
		  alert('添加失败\n您可以尝试通过快捷键' + ctrl + ' + D 加入到收藏夹!');
		} 
	});

	$("#share,#sharediv").bind({
		mouseover:function(){$("#sharediv").stop(true,true).show();},  
		mouseout:function(){$("#sharediv").fadeOut(1000);}  
	});

	// share
	// http://open.weibo.com/sharebutton
	var shareurl = "http://114.80.218.33",sharecontent="我发现一个不错的网页，它叫上海地铁运营服务专页，里面信息是由上海地铁官方发布的，有地铁新闻、地铁实况、路径查询、票卡介绍、地铁官方指南及其他资料下载等等信息。来自官方，值得信赖哦~赶紧去瞧瞧吧~";
	$("#sharexl").click(function () {
		window.open("http://service.weibo.com/share/share.php?url="+encodeURIComponent(shareurl)+"&title="+encodeURIComponent(sharecontent),"");
	});
	// http://open.t.qq.com/apps/share/explain.php
	$("#sharetx").click(function () {
		window.open("http://share.v.t.qq.com/index.php?c=share&a=index&url="+encodeURIComponent(shareurl)+"&title="+encodeURIComponent(sharecontent),"");
	});
	$("#shareqq").click(function () {
		window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+encodeURIComponent(shareurl)+"&title="+encodeURIComponent(sharecontent),"");
	});
    // weixin
    $("#sharewx,#shareconwx,#weixin,#weixin_app").click(function () {
        $("#share_weixin").show();
    });
    $("#share_weixin_close").click(function () {
        $("#share_weixin").hide();
    });
});



