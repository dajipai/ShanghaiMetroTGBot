/*PowerBy ydw0117 QQ:59978934*/
;(function($){
$.fn.extend({
/*tabs*/
"Tabs":function(options){
  options=$.extend({
    mode:"click",
    index:"1"
  },options);
  options.index = parseInt(options.index);
  var caption_li = "#"+$(this).attr("id")+">.tabs_caption>ul>li";
  var tabs_item = "#"+$(this).attr("id")+">.tabs_content>.tabs_item";
  var tabs_caption_span = "#"+$(this).attr("id")+">.tabs_caption>ul>li>span";
  var select_class = "#"+$(this).attr("id")+">.tabs_caption>ul>li.select";
  if($(caption_li).hasClass("select")){
	var select_index = $(select_class).index(caption_li);
	$(caption_li).eq(select_index).addClass("select").siblings().removeClass("select");
	$(tabs_item).eq(select_index).show().siblings().hide();  
  }else{
	$(caption_li).eq(options.index - 1).addClass("select").siblings().removeClass("select");
    $(tabs_item).eq(options.index - 1).show().siblings().hide();  
  }
  if (options.mode == "click") {
    $(caption_li).click(function() {
      options.index = $(this).index(caption_li);
      $(this).addClass("select").siblings().removeClass("select");
      $(tabs_item).eq(options.index).show().siblings().hide();
      return false;
    });
  }
  if (options.mode == "mouseover") {
    $(caption_li).hover(
	  function(){
        options.index = $(this).index(caption_li);
        $(this).addClass("select").siblings().removeClass("select");
        $(tabs_item).eq(options.index).show().siblings().hide();
	  },function(){}
	);
  }
},
/*值隔行变色*/
"Interlaced_Color":function(options){
  options=$.extend({
    even:"",
	odd:""
  },options);
  if(options.odd){
    $(this).children(":odd").addClass(options.odd);
  }
  if(options.even){
    $(this).children(":even").addClass(options.even);
  }
  return this;
},
/*input:text,input:password,textarea默认值,焦点样式变换*/
"Default_Values":function(options){
  options=$.extend({
    focus_class:"",
	def_val:""
  },options);
  if($(this).is("input")){
    if(options.def_val){
      $(this).val(options.def_val);
    }
    $(this).focus(function(){
	  if(options.focus_class){
	    $(this).addClass(options.focus_class);
	  }
	  if(options.def_val){
	    var txt_val = $(this).val();
        if(txt_val == options.def_val){
          $(this).val("");
        }
	  }
    }).blur(function(){
      if(options.focus_class){
	    $(this).removeClass(options.focus_class);
	  }
	  if(options.def_val){
	    var txt_val = $(this).val();
        if(txt_val == ""){
          $(this).val(options.def_val);
        }
	  }
    });
    return this;
  }
  
  if($(this).is("textarea")){
    if(options.def_val){
      $(this).text(options.def_val);
    }
    $(this).focus(function(){
	  if(options.focus_class){
	    $(this).addClass(options.focus_class);
	  }
	  if(options.def_val){
	    var txt_val = $(this).text();
        if(txt_val == options.def_val){
          $(this).text("");
        }
	  }
    }).blur(function(){
      if(options.focus_class){
	    $(this).removeClass(options.focus_class);
	  }
	  if(options.def_val){
	    var txt_val = $(this).text();
        if(txt_val == ""){
          $(this).text(options.def_val);
        }
	  }
    });
    return this;
  }
},
/*******************************************/
/*hover模仿*/
"Hover":function(options){
  options=$.extend({
	css_name:"hover"
  },options);
  $(this).hover(
	function(){
	  $(this).addClass(options.css_name);		
	},
	function(){
	  $(this).removeClass(options.css_name);			
	}
  );
  return this;
},
/*******************************************/
/*弹出层*/
"My_box":function(options){
  options=$.extend({
	bg_color:"#000000",
	opacity:"0.4",
	cb:function(){}
  },options);
$(this).click(function(){
  $("body .body_div").remove();	
  var window_height = $(window).height();
  var scroll_top = $("html").scrollTop();
  var body_width = $("body").css("width");
  var body_height = $("body").outerHeight(true);
  var scroll_top = $("html").scrollTop();//for:IE,firefox,Opera
  var scroll_top_1 = $("body").scrollTop();//for:Safari,Chrome
  var top_num =0;
  var height=0;
  var ajax_add = $(this).attr("href");
  var con_height;
  $("body").append("<div class='body_div'><div class='bg'></div><div class='div_content'></div>");
  $("body .body_div .bg").css({width:body_width,height:body_height,"background-color":options.bg_color,opacity:options.opacity});
  $("body .div_content").css({width:body_width});
  var app_dom = $(ajax_add).clone(true);
  $("body .div_content").append(app_dom.html());
  con_height = $("body .div_content").height();
  var top = Math.ceil((window_height-parseInt(con_height))/2);  
  
  if ($.browser.msie && ($.browser.version == '6.0') && !$.support.style) {
    $("body>.body_div>.bg").bgiframe();
  }
  if ($.browser.webkit) {  
    top_num = top+scroll_top_1;
    $("body .div_content").css({height:body_height,top:top_num});
  }else{
	top_num = top+scroll_top;
    $("body .div_content").css({height:body_height,top:top_num});  
  } 
   
  $("body .close").live("click",function(){
	$("body .body_div").remove();
  });

  options.cb($(this));
  return false;
});
}
/*******************************************/


});
})(jQuery)
