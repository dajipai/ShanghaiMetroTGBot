/**http://us.js2.yimg.com/us.js.yimg.com/lib/common/utils/2/yahoo_2.0.5.js*/
window.YAHOO=window.YAHOO||{};YAHOO.namespace=function(ns){if(!ns||!ns.length){return null;}var _2=ns.split(".");var _3=YAHOO;for(var i=(_2[0]=="YAHOO")?1:0;i<_2.length;++i){_3[_2[i]]=_3[_2[i]]||{};_3=_3[_2[i]];}return _3;};YAHOO.log=function(_5,_6,_7){var l=YAHOO.widget.Logger;if(l&&l.log){return l.log(_5,_6,_7);}else{return false;}};YAHOO.extend=function(_9,_10){var f=function(){};f.prototype=_10.prototype;_9.prototype=new f();_9.prototype.constructor=_9;_9.superclass=_10.prototype;if(_10.prototype.constructor==Object.prototype.constructor){_10.prototype.constructor=_10;}};YAHOO.namespace("util");YAHOO.namespace("widget");YAHOO.namespace("example");

/**http://us.js2.yimg.com/us.js.yimg.com/lib/common/utils/2/dom_2.0.5.js*/
 YAHOO.util.Dom=function(){var ua=navigator.userAgent.toLowerCase();var isOpera=(ua.indexOf('opera')>-1);var isSafari=(ua.indexOf('safari')>-1);var isIE=(window.ActiveXObject);var id_counter=0;var util=YAHOO.util;var property_cache={};var toCamel=function(property){var convert=function(prop){var test=/(-[a-z])/i.exec(prop);return prop.replace(RegExp.$1,RegExp.$1.substr(1).toUpperCase());};while(property.indexOf('-')>-1){property=convert(property);}return property;};var toHyphen=function(property){if(property.indexOf('-')>-1){return property;}var converted='';for(var i=0,len=property.length;i<len;++i){if(property.charAt(i)==property.charAt(i).toUpperCase()){converted=converted+'-'+property.charAt(i).toLowerCase();}else{converted=converted+property.charAt(i);}}return converted;};var cacheConvertedProperties=function(property){property_cache[property]={camel:toCamel(property),hyphen:toHyphen(property)};};return{get:function(el){if(!el){return null;}if(typeof el!='string'&&!(el instanceof Array)){return el;}if(typeof el=='string'){return document.getElementById(el);}else{var collection=[];for(var i=0,len=el.length;i<len;++i){collection[collection.length]=util.Dom.get(el[i]);}return collection;}return null;},getStyle:function(el,property){var f=function(el){var value=null;var dv=document.defaultView;if(!property_cache[property]){cacheConvertedProperties(property);}var camel=property_cache[property]['camel'];var hyphen=property_cache[property]['hyphen'];if(property=='opacity'&&el.filters){value=1;try{value=el.filters.item('DXImageTransform.Microsoft.Alpha').opacity/100;}catch(e){try{value=el.filters.item('alpha').opacity/100;}catch(e){}}}else if(el.style[camel]){value=el.style[camel];}else if(isIE&&el.currentStyle&&el.currentStyle[camel]){value=el.currentStyle[camel];}else if(dv&&dv.getComputedStyle){var computed=dv.getComputedStyle(el,'');if(computed&&computed.getPropertyValue(hyphen)){value=computed.getPropertyValue(hyphen);}}return value;};return util.Dom.batch(el,f,util.Dom,true);},setStyle:function(el,property,val){if(!property_cache[property]){cacheConvertedProperties(property);}var camel=property_cache[property]['camel'];var f=function(el){switch(property){case'opacity':if(isIE&&typeof el.style.filter=='string'){el.style.filter='alpha(opacity='+val*100+')';if(!el.currentStyle||!el.currentStyle.hasLayout){el.style.zoom=1;}}else{el.style.opacity=val;el.style['-moz-opacity']=val;el.style['-khtml-opacity']=val;}break;default:el.style[camel]=val;}};util.Dom.batch(el,f,util.Dom,true);},getXY:function(el){var f=function(el){if(el.offsetParent===null||this.getStyle(el,'display')=='none'){return false;}var parentNode=null;var pos=[];var box;if(el.getBoundingClientRect){box=el.getBoundingClientRect();var doc=document;if(!this.inDocument(el)&&parent.document!=document){doc=parent.document;if(!this.isAncestor(doc.documentElement,el)){return false;}}var scrollTop=Math.max(doc.documentElement.scrollTop,doc.body.scrollTop);var scrollLeft=Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft);return[box.left+scrollLeft,box.top+scrollTop];}else{pos=[el.offsetLeft,el.offsetTop];parentNode=el.offsetParent;if(parentNode!=el){while(parentNode){pos[0]+=parentNode.offsetLeft;pos[1]+=parentNode.offsetTop;parentNode=parentNode.offsetParent;}}if(isSafari&&this.getStyle(el,'position')=='absolute'){pos[0]-=document.body.offsetLeft;pos[1]-=document.body.offsetTop;}}if(el.parentNode){parentNode=el.parentNode;}else{parentNode=null;}while(parentNode&&parentNode.tagName.toUpperCase()!='BODY'&&parentNode.tagName.toUpperCase()!='HTML'){if(util.Dom.getStyle(parentNode,'display')!='inline'){pos[0]-=parentNode.scrollLeft;pos[1]-=parentNode.scrollTop;}if(parentNode.parentNode){parentNode=parentNode.parentNode;}else{parentNode=null;}}return pos;};return util.Dom.batch(el,f,util.Dom,true);},getX:function(el){var f=function(el){return util.Dom.getXY(el)[0];};return util.Dom.batch(el,f,util.Dom,true);},getY:function(el){var f=function(el){return util.Dom.getXY(el)[1];};return util.Dom.batch(el,f,util.Dom,true);},setXY:function(el,pos,noRetry){var f=function(el){var style_pos=this.getStyle(el,'position');if(style_pos=='static'){this.setStyle(el,'position','relative');style_pos='relative';}var pageXY=this.getXY(el);if(pageXY===false){return false;}var delta=[parseInt(this.getStyle(el,'left'),10),parseInt(this.getStyle(el,'top'),10)];if(isNaN(delta[0])){delta[0]=(style_pos=='relative')?0:el.offsetLeft;}if(isNaN(delta[1])){delta[1]=(style_pos=='relative')?0:el.offsetTop;}if(pos[0]!==null){el.style.left=pos[0]-pageXY[0]+delta[0]+'px';}if(pos[1]!==null){el.style.top=pos[1]-pageXY[1]+delta[1]+'px';}var newXY=this.getXY(el);if(!noRetry&&(newXY[0]!=pos[0]||newXY[1]!=pos[1])){this.setXY(el,pos,true);}};util.Dom.batch(el,f,util.Dom,true);},setX:function(el,x){util.Dom.setXY(el,[x,null]);},setY:function(el,y){util.Dom.setXY(el,[null,y]);},getRegion:function(el){var f=function(el){var region=new YAHOO.util.Region.getRegion(el);return region;};return util.Dom.batch(el,f,util.Dom,true);},getClientWidth:function(){return util.Dom.getViewportWidth();},getClientHeight:function(){return util.Dom.getViewportHeight();},getElementsByClassName:function(className,tag,root){var method=function(el){return util.Dom.hasClass(el,className)};return util.Dom.getElementsBy(method,tag,root);},hasClass:function(el,className){var re=new RegExp('(?:^|\\s+)'+className+'(?:\\s+|$)');var f=function(el){return re.test(el['className']);};return util.Dom.batch(el,f,util.Dom,true);},addClass:function(el,className){var f=function(el){if(this.hasClass(el,className)){return;}el['className']=[el['className'],className].join(' ');};util.Dom.batch(el,f,util.Dom,true);},removeClass:function(el,className){var re=new RegExp('(?:^|\\s+)'+className+'(?:\\s+|$)','g');var f=function(el){if(!this.hasClass(el,className)){return;}var c=el['className'];el['className']=c.replace(re,' ');if(this.hasClass(el,className)){this.removeClass(el,className);}};util.Dom.batch(el,f,util.Dom,true);},replaceClass:function(el,oldClassName,newClassName){if(oldClassName===newClassName){return false;};var re=new RegExp('(?:^|\\s+)'+oldClassName+'(?:\\s+|$)','g');var f=function(el){if(!this.hasClass(el,oldClassName)){this.addClass(el,newClassName);return;}el['className']=el['className'].replace(re,' '+newClassName+' ');if(this.hasClass(el,oldClassName)){this.replaceClass(el,oldClassName,newClassName);}};util.Dom.batch(el,f,util.Dom,true);},generateId:function(el,prefix){prefix=prefix||'yui-gen';el=el||{};var f=function(el){if(el){el=util.Dom.get(el);}else{el={};}if(!el.id){el.id=prefix+id_counter++;}return el.id;};return util.Dom.batch(el,f,util.Dom,true);},isAncestor:function(haystack,needle){haystack=util.Dom.get(haystack);if(!haystack||!needle){return false;}var f=function(needle){if(haystack.contains&&!isSafari){return haystack.contains(needle);}else if(haystack.compareDocumentPosition){return!!(haystack.compareDocumentPosition(needle)&16);}else{var parent=needle.parentNode;while(parent){if(parent==haystack){return true;}else if(!parent.tagName||parent.tagName.toUpperCase()=='HTML'){return false;}parent=parent.parentNode;}return false;}};return util.Dom.batch(needle,f,util.Dom,true);},inDocument:function(el){var f=function(el){return this.isAncestor(document.documentElement,el);};return util.Dom.batch(el,f,util.Dom,true);},getElementsBy:function(method,tag,root){tag=tag||'*';root=util.Dom.get(root)||document;var nodes=[];var elements=root.getElementsByTagName(tag);if(!elements.length&&(tag=='*'&&root.all)){elements=root.all;}for(var i=0,len=elements.length;i<len;++i){if(method(elements[i])){nodes[nodes.length]=elements[i];}}return nodes;},batch:function(el,method,o,override){var id=el;el=util.Dom.get(el);var scope=(override)?o:window;if(!el||el.tagName||!el.length){if(!el){return false;}return method.call(scope,el,o);}var collection=[];for(var i=0,len=el.length;i<len;++i){if(!el[i]){id=id[i];}collection[collection.length]=method.call(scope,el[i],o);}return collection;},getDocumentHeight:function(){var scrollHeight=-1,windowHeight=-1,bodyHeight=-1;var marginTop=parseInt(util.Dom.getStyle(document.body,'marginTop'),10);var marginBottom=parseInt(util.Dom.getStyle(document.body,'marginBottom'),10);var mode=document.compatMode;if((mode||isIE)&&!isOpera){switch(mode){case'CSS1Compat':scrollHeight=((window.innerHeight&&window.scrollMaxY)?window.innerHeight+window.scrollMaxY:-1);windowHeight=[document.documentElement.clientHeight,self.innerHeight||-1].sort(function(a,b){return(a-b);})[1];bodyHeight=document.body.offsetHeight+marginTop+marginBottom;break;default:scrollHeight=document.body.scrollHeight;bodyHeight=document.body.clientHeight;}}else{scrollHeight=document.documentElement.scrollHeight;windowHeight=self.innerHeight;bodyHeight=document.documentElement.clientHeight;}var h=[scrollHeight,windowHeight,bodyHeight].sort(function(a,b){return(a-b);});return h[2];},getDocumentWidth:function(){var docWidth=-1,bodyWidth=-1,winWidth=-1;var marginRight=parseInt(util.Dom.getStyle(document.body,'marginRight'),10);var marginLeft=parseInt(util.Dom.getStyle(document.body,'marginLeft'),10);var mode=document.compatMode;if(mode||isIE){switch(mode){case'CSS1Compat':docWidth=document.documentElement.clientWidth;bodyWidth=document.body.offsetWidth+marginLeft+marginRight;break;default:bodyWidth=document.body.clientWidth;docWidth=document.body.scrollWidth;break;}}else{docWidth=document.documentElement.clientWidth;bodyWidth=document.body.offsetWidth+marginLeft+marginRight;}var w=Math.max(docWidth,bodyWidth);return w;},getViewportHeight:function(){var height=-1;var mode=document.compatMode;if((mode||isIE)&&!isOpera){switch(mode){case'CSS1Compat':height=document.documentElement.clientHeight;break;default:height=document.body.clientHeight;}}else{height=self.innerHeight;}return height;},getViewportWidth:function(){var width=-1;var mode=document.compatMode;if(mode||isIE){switch(mode){case'CSS1Compat':width=document.documentElement.clientWidth;break;default:width=document.body.clientWidth;}}else{width=self.innerWidth;}return width;}};}();YAHOO.util.Region=function(t,r,b,l){this.top=t;this[1]=t;this.right=r;this.bottom=b;this.left=l;this[0]=l;};YAHOO.util.Region.prototype.contains=function(region){return(region.left>=this.left&&region.right<=this.right&&region.top>=this.top&&region.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(region){var t=Math.max(this.top,region.top);var r=Math.min(this.right,region.right);var b=Math.min(this.bottom,region.bottom);var l=Math.max(this.left,region.left);if(b>=t&&r>=l){return new YAHOO.util.Region(t,r,b,l);}else{return null;}};YAHOO.util.Region.prototype.union=function(region){var t=Math.min(this.top,region.top);var r=Math.max(this.right,region.right);var b=Math.max(this.bottom,region.bottom);var l=Math.min(this.left,region.left);return new YAHOO.util.Region(t,r,b,l);};YAHOO.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+"}");};YAHOO.util.Region.getRegion=function(el){var p=YAHOO.util.Dom.getXY(el);var t=p[1];var r=p[0]+el.offsetWidth;var b=p[1]+el.offsetHeight;var l=p[0];return new YAHOO.util.Region(t,r,b,l);};YAHOO.util.Point=function(x,y){if(x instanceof Array){y=x[1];x=x[0];}this.x=this.right=this.left=this[0]=x;this.y=this.top=this.bottom=this[1]=y;};YAHOO.util.Point.prototype=new YAHOO.util.Region();

/**http://us.js2.yimg.com/us.js.yimg.com/lib/common/utils/2/event_2.0.5.js*/
 YAHOO.util.CustomEvent=function(_1,_2,_3){this.type=_1;this.scope=_2||window;this.silent=_3;this.subscribers=[];if(!this.silent){}};YAHOO.util.CustomEvent.prototype={subscribe:function(fn,_5,_6){this.subscribers.push(new YAHOO.util.Subscriber(fn,_5,_6));},unsubscribe:function(fn,_7){var _8=false;for(var i=0,len=this.subscribers.length;i<len;++i){var s=this.subscribers[i];if(s&&s.contains(fn,_7)){this._delete(i);_8=true;}}return _8;},fire:function(){var len=this.subscribers.length;if(!len&&this.silent){return;}var _12=[];for(var i=0;i<arguments.length;++i){_12.push(arguments[i]);}if(!this.silent){}for(i=0;i<len;++i){var s=this.subscribers[i];if(s){if(!this.silent){}var _13=(s.override)?s.obj:this.scope;s.fn.call(_13,this.type,_12,s.obj);}}},unsubscribeAll:function(){for(var i=0,len=this.subscribers.length;i<len;++i){this._delete(len-1-i);}},_delete:function(_14){var s=this.subscribers[_14];if(s){delete s.fn;delete s.obj;}this.subscribers.splice(_14,1);},toString:function(){return "CustomEvent: "+"'"+this.type+"', "+"scope: "+this.scope;}};YAHOO.util.Subscriber=function(fn,obj,_16){this.fn=fn;this.obj=obj||null;this.override=(_16);};YAHOO.util.Subscriber.prototype.contains=function(fn,obj){return (this.fn==fn&&this.obj==obj);};YAHOO.util.Subscriber.prototype.toString=function(){return "Subscriber { obj: "+(this.obj||"")+", override: "+(this.override||"no")+" }";};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var _17=false;var _18=[];var _19=[];var _20=[];var _21=[];var _22=[];var _23=0;var _24=[];var _25=[];var _26=0;return {POLL_RETRYS:200,POLL_INTERVAL:50,EL:0,TYPE:1,FN:2,WFN:3,SCOPE:3,ADJ_SCOPE:4,isSafari:(/Safari|Konqueror|KHTML/gi).test(navigator.userAgent),isIE:(!this.isSafari&&!navigator.userAgent.match(/opera/gi)&&navigator.userAgent.match(/msie/gi)),addDelayedListener:function(el,_28,fn,_29,_30){_19[_19.length]=[el,_28,fn,_29,_30];if(_17){_23=this.POLL_RETRYS;this.startTimeout(0);}},startTimeout:function(_31){var i=(_31||_31===0)?_31:this.POLL_INTERVAL;var _32=this;var _33=function(){_32._tryPreloadAttach();};this.timeout=setTimeout(_33,i);},onAvailable:function(_34,_35,_36,_37){_24.push({id:_34,fn:_35,obj:_36,override:_37});_23=this.POLL_RETRYS;this.startTimeout(0);},addListener:function(el,_38,fn,_39,_40){if(!fn||!fn.call){return false;}if(this._isValidCollection(el)){var ok=true;for(var i=0,len=el.length;i<len;++i){ok=(this.on(el[i],_38,fn,_39,_40)&&ok);}return ok;}else{if(typeof el=="string"){var oEl=this.getEl(el);if(_17&&oEl){el=oEl;}else{this.addDelayedListener(el,_38,fn,_39,_40);return true;}}}if(!el){return false;}if("unload"==_38&&_39!==this){_20[_20.length]=[el,_38,fn,_39,_40];return true;}var _43=(_40)?_39:el;var _44=function(e){return fn.call(_43,YAHOO.util.Event.getEvent(e),_39);};var li=[el,_38,fn,_44,_43];var _47=_18.length;_18[_47]=li;if(this.useLegacyEvent(el,_38)){var _48=this.getLegacyIndex(el,_38);if(_48==-1||el!=_21[_48][0]){_48=_21.length;_25[el.id+_38]=_48;_21[_48]=[el,_38,el["on"+_38]];_22[_48]=[];el["on"+_38]=function(e){YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(e),_48);};}_22[_48].push(_47);}else{if(el.addEventListener){el.addEventListener(_38,_44,false);}else{if(el.attachEvent){el.attachEvent("on"+_38,_44);}}}return true;},fireLegacyEvent:function(e,_49){var ok=true;var le=_22[_49];for(var i=0,len=le.length;i<len;++i){var _51=le[i];if(_51){var li=_18[_51];if(li&&li[this.WFN]){var _52=li[this.ADJ_SCOPE];var ret=li[this.WFN].call(_52,e);ok=(ok&&ret);}else{delete le[i];}}}return ok;},getLegacyIndex:function(el,_54){var key=this.generateId(el)+_54;if(typeof _25[key]=="undefined"){return -1;}else{return _25[key];}},useLegacyEvent:function(el,_56){if(!el.addEventListener&&!el.attachEvent){return true;}else{if(this.isSafari){if("click"==_56||"dblclick"==_56){return true;}}}return false;},removeListener:function(el,_57,fn,_58){if(!fn||!fn.call){return false;}if(typeof el=="string"){el=this.getEl(el);}else{if(this._isValidCollection(el)){var ok=true;for(var i=0,len=el.length;i<len;++i){ok=(this.removeListener(el[i],_57,fn)&&ok);}return ok;}}if("unload"==_57){for(i=0,len=_20.length;i<len;i++){var li=_20[i];if(li&&li[0]==el&&li[1]==_57&&li[2]==fn){_20.splice(i,1);return true;}}return false;}var _59=null;if("undefined"==typeof _58){_58=this._getCacheIndex(el,_57,fn);}if(_58>=0){_59=_18[_58];}if(!el||!_59){return false;}if(el.removeEventListener){el.removeEventListener(_57,_59[this.WFN],false);}else{if(el.detachEvent){el.detachEvent("on"+_57,_59[this.WFN]);}}delete _18[_58][this.WFN];delete _18[_58][this.FN];_18.splice(_58,1);return true;},getTarget:function(ev,_61){var t=ev.target||ev.srcElement;return this.resolveTextNode(t);},resolveTextNode:function(_63){if(_63&&_63.nodeName&&"#TEXT"==_63.nodeName.toUpperCase()){return _63.parentNode;}else{return _63;}},getPageX:function(ev){var x=ev.pageX;if(!x&&0!==x){x=ev.clientX||0;if(this.isIE){x+=this._getScrollLeft();}}return x;},getPageY:function(ev){var y=ev.pageY;if(!y&&0!==y){y=ev.clientY||0;if(this.isIE){y+=this._getScrollTop();}}return y;},getXY:function(ev){return [this.getPageX(ev),this.getPageY(ev)];},getRelatedTarget:function(ev){var t=ev.relatedTarget;if(!t){if(ev.type=="mouseout"){t=ev.toElement;}else{if(ev.type=="mouseover"){t=ev.fromElement;}}}return this.resolveTextNode(t);},getTime:function(ev){if(!ev.time){var t=new Date().getTime();try{ev.time=t;}catch(e){return t;}}return ev.time;},stopEvent:function(ev){this.stopPropagation(ev);this.preventDefault(ev);},stopPropagation:function(ev){if(ev.stopPropagation){ev.stopPropagation();}else{ev.cancelBubble=true;}},preventDefault:function(ev){if(ev.preventDefault){ev.preventDefault();}else{ev.returnValue=false;}},getEvent:function(e){var ev=e||window.event;if(!ev){var c=this.getEvent.caller;while(c){ev=c.arguments[0];if(ev&&Event==ev.constructor){break;}c=c.caller;}}return ev;},getCharCode:function(ev){return ev.charCode||((ev.type=="keypress")?ev.keyCode:0);},_getCacheIndex:function(el,_67,fn){for(var i=0,len=_18.length;i<len;++i){var li=_18[i];if(li&&li[this.FN]==fn&&li[this.EL]==el&&li[this.TYPE]==_67){return i;}}return -1;},generateId:function(el){var id=el.id;if(!id){id="yuievtautoid-"+_26;++_26;el.id=id;}return id;},_isValidCollection:function(o){return (o&&o.length&&typeof o!="string"&&!o.tagName&&!o.alert&&typeof o[0]!="undefined");},elCache:{},getEl:function(id){return document.getElementById(id);},clearCache:function(){},_load:function(e){_17=true;},_tryPreloadAttach:function(){if(this.locked){return false;}this.locked=true;var _70=!_17;if(!_70){_70=(_23>0);}var _71=[];for(var i=0,len=_19.length;i<len;++i){var d=_19[i];if(d){var el=this.getEl(d[this.EL]);if(el){this.on(el,d[this.TYPE],d[this.FN],d[this.SCOPE],d[this.ADJ_SCOPE]);delete _19[i];}else{_71.push(d);}}}_19=_71;var _73=[];for(i=0,len=_24.length;i<len;++i){var _74=_24[i];if(_74){el=this.getEl(_74.id);if(el){var _75=(_74.override)?_74.obj:el;_74.fn.call(_75,_74.obj);delete _24[i];}else{_73.push(_74);}}}_23=(_71.length===0&&_73.length===0)?0:_23-1;if(_70){this.startTimeout();}this.locked=false;return true;},purgeElement:function(el,_76,_77){var _78=this.getListeners(el,_77);if(_78){for(var i=0,len=_78.length;i<len;++i){var l=_78[i];this.removeListener(el,l.type,l.fn);}}if(_76&&el&&el.childNodes){for(i=0,len=el.childNodes.length;i<len;++i){this.purgeElement(el.childNodes[i],_76,_77);}}},getListeners:function(el,_80){var _81=[];if(_18&&_18.length>0){for(var i=0,len=_18.length;i<len;++i){var l=_18[i];if(l&&l[this.EL]===el&&(!_80||_80===l[this.TYPE])){_81.push({type:l[this.TYPE],fn:l[this.FN],obj:l[this.SCOPE],adjust:l[this.ADJ_SCOPE],index:i});}}}return (_81.length)?_81:null;},_unload:function(e,me){for(var i=0,len=_20.length;i<len;++i){var l=_20[i];if(l){var _83=(l[this.ADJ_SCOPE])?l[this.SCOPE]:window;l[this.FN].call(_83,this.getEvent(e),l[this.SCOPE]);}}if(_18&&_18.length>0){var j=_18.length;while(j){var _85=j-1;l=_18[_85];if(l){this.removeListener(l[this.EL],l[this.TYPE],l[this.FN],_85);}j=j-1;}this.clearCache();}for(i=0,len=_21.length;i<len;++i){delete _21[i][0];delete _21[i];}},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var dd=document.documentElement,db=document.body;if(dd&&dd.scrollTop){return [dd.scrollTop,dd.scrollLeft];}else{if(db){return [db.scrollTop,db.scrollLeft];}else{return [0,0];}}}};}();YAHOO.util.Event.on=YAHOO.util.Event.addListener;if(document&&document.body){YAHOO.util.Event._load();}else{YAHOO.util.Event.on(window,"load",YAHOO.util.Event._load,YAHOO.util.Event,true);}YAHOO.util.Event.on(window,"unload",YAHOO.util.Event._unload,YAHOO.util.Event,true);YAHOO.util.Event._tryPreloadAttach();}

/**http://us.js2.yimg.com/us.js.yimg.com/lib/common/utils/2/animation_2.0.0-b3.js*/
YAHOO.util.Anim=function(el,attributes,duration,method)
{if(el){this.init(el,attributes,duration,method);}};YAHOO.util.Anim.prototype={doMethod:function(attribute,start,end){return this.method(this.currentFrame,start,end-start,this.totalFrames);},setAttribute:function(attribute,val,unit){YAHOO.util.Dom.setStyle(this.getEl(),attribute,val+unit);},getAttribute:function(attribute){return parseFloat(YAHOO.util.Dom.getStyle(this.getEl(),attribute));},defaultUnit:'px',defaultUnits:{opacity:' '},init:function(el,attributes,duration,method){var isAnimated=false;var startTime=null;var endTime=null;var actualFrames=0;var defaultValues={};el=YAHOO.util.Dom.get(el);this.attributes=attributes||{};this.duration=duration||1;this.method=method||YAHOO.util.Easing.easeNone;this.useSeconds=true;this.currentFrame=0;this.totalFrames=YAHOO.util.AnimMgr.fps;this.getEl=function(){return el;};this.setDefault=function(attribute,val){if(val.constructor!=Array&&(val=='auto'||isNaN(val))){switch(attribute){case'width':val=el.clientWidth||el.offsetWidth;break;case'height':val=el.clientHeight||el.offsetHeight;break;case'left':if(YAHOO.util.Dom.getStyle(el,'position')=='absolute'){val=el.offsetLeft;}else{val=0;}
break;case'top':if(YAHOO.util.Dom.getStyle(el,'position')=='absolute'){val=el.offsetTop;}else{val=0;}
break;default:val=0;}}
defaultValues[attribute]=val;};this.getDefault=function(attribute){return defaultValues[attribute];};this.isAnimated=function(){return isAnimated;};this.getStartTime=function(){return startTime;};this.animate=function(){if(this.isAnimated()){return false;}
this.onStart.fire();this._onStart.fire();this.totalFrames=(this.useSeconds)?Math.ceil(YAHOO.util.AnimMgr.fps*this.duration):this.duration;YAHOO.util.AnimMgr.registerElement(this);var attributes=this.attributes;var el=this.getEl();var val;for(var attribute in attributes){val=this.getAttribute(attribute);this.setDefault(attribute,val);}
isAnimated=true;actualFrames=0;startTime=new Date();};this.stop=function(){if(!this.isAnimated()){return false;}
this.currentFrame=0;endTime=new Date();var data={time:endTime,duration:endTime-startTime,frames:actualFrames,fps:actualFrames/this.duration};isAnimated=false;actualFrames=0;this.onComplete.fire(data);};var onTween=function(){var start;var end=null;var val;var unit;var attributes=this['attributes'];for(var attribute in attributes){unit=attributes[attribute]['unit']||this.defaultUnits[attribute]||this.defaultUnit;if(typeof attributes[attribute]['from']!='undefined'){start=attributes[attribute]['from'];}else{start=this.getDefault(attribute);}
if(typeof attributes[attribute]['to']!='undefined'){end=attributes[attribute]['to'];}
else if(typeof attributes[attribute]['by']!='undefined')
{if(typeof start!=='string'){end=[];for(var i=0,len=start.length;i<len;++i)
{end[i]=start[i]+attributes[attribute]['by'][i];}}
else
{end=start+attributes[attribute]['by'];}}
if(end!==null&&typeof end!='undefined'){val=this.doMethod(attribute,start,end);if((attribute=='width'||attribute=='height'||attribute=='opacity')&&val<0){val=0;}
this.setAttribute(attribute,val,unit);}}
actualFrames+=1;};this._onStart=new YAHOO.util.CustomEvent('_onStart',this);this.onStart=new YAHOO.util.CustomEvent('start',this);this.onTween=new YAHOO.util.CustomEvent('tween',this);this._onTween=new YAHOO.util.CustomEvent('_tween',this);this.onComplete=new YAHOO.util.CustomEvent('complete',this);this._onTween.subscribe(onTween);}};YAHOO.util.AnimMgr=new function(){var thread=null;var queue=[];var tweenCount=0;this.fps=200;this.delay=1;this.registerElement=function(tween){if(tween.isAnimated()){return false;}
queue[queue.length]=tween;tweenCount+=1;this.start();};this.start=function(){if(thread===null){thread=setInterval(this.run,this.delay);}};this.stop=function(tween){if(!tween)
{clearInterval(thread);for(var i=0,len=queue.length;i<len;++i){if(queue[i].isAnimated()){queue[i].stop();}}
queue=[];thread=null;tweenCount=0;}
else{tween.stop();tweenCount-=1;if(tweenCount<=0){this.stop();}}};this.run=function(){for(var i=0,len=queue.length;i<len;++i){var tween=queue[i];if(!tween||!tween.isAnimated()){continue;}
if(tween.currentFrame<tween.totalFrames||tween.totalFrames===null)
{tween.currentFrame+=1;if(tween.useSeconds){correctFrame(tween);}
tween.onTween.fire();tween._onTween.fire();}
else{YAHOO.util.AnimMgr.stop(tween);}}};var correctFrame=function(tween){var frames=tween.totalFrames;var frame=tween.currentFrame;var expected=(tween.currentFrame*tween.duration*1000/tween.totalFrames);var elapsed=(new Date()-tween.getStartTime());var tweak=0;if(elapsed<tween.duration*1000){tweak=Math.round((elapsed/expected-1)*tween.currentFrame);}else{tweak=frames-(frame+1);}
if(tweak>0&&isFinite(tweak)){if(tween.currentFrame+tweak>=frames){tweak=frames-(frame+1);}
tween.currentFrame+=tweak;}};}
YAHOO.util.Bezier=new function()
{this.getPosition=function(points,t)
{var n=points.length;var tmp=[];for(var i=0;i<n;++i){tmp[i]=[points[i][0],points[i][1]];}
for(var j=1;j<n;++j){for(i=0;i<n-j;++i){tmp[i][0]=(1-t)*tmp[i][0]+t*tmp[parseInt(i+1,10)][0];tmp[i][1]=(1-t)*tmp[i][1]+t*tmp[parseInt(i+1,10)][1];}}
return[tmp[0][0],tmp[0][1]];};};YAHOO.util.Easing=new function(){this.easeNone=function(t,b,c,d){return b+c*(t/=d);};this.easeIn=function(t,b,c,d){return b+c*((t/=d)*t*t);};this.easeOut=function(t,b,c,d){var ts=(t/=d)*t;var tc=ts*t;return b+c*(tc+-3*ts+3*t);};this.easeBoth=function(t,b,c,d){var ts=(t/=d)*t;var tc=ts*t;return b+c*(-2*tc+3*ts);};this.backIn=function(t,b,c,d){var ts=(t/=d)*t;var tc=ts*t;return b+c*(-3.4005*tc*ts+10.2*ts*ts+-6.2*tc+0.4*ts);};this.backOut=function(t,b,c,d){var ts=(t/=d)*t;var tc=ts*t;return b+c*(8.292*tc*ts+-21.88*ts*ts+22.08*tc+-12.69*ts+5.1975*t);};this.backBoth=function(t,b,c,d){var ts=(t/=d)*t;var tc=ts*t;return b+c*(0.402*tc*ts+-2.1525*ts*ts+-3.2*tc+8*ts+-2.05*t);};};YAHOO.util.Motion=function(el,attributes,duration,method){if(el){this.initMotion(el,attributes,duration,method);}};YAHOO.util.Motion.prototype=new YAHOO.util.Anim();YAHOO.util.Motion.prototype.defaultUnits.points='px';YAHOO.util.Motion.prototype.doMethod=function(attribute,start,end){var val=null;if(attribute=='points'){var translatedPoints=this.getTranslatedPoints();var t=this.method(this.currentFrame,0,100,this.totalFrames)/100;if(translatedPoints){val=YAHOO.util.Bezier.getPosition(translatedPoints,t);}}else{val=this.method(this.currentFrame,start,end-start,this.totalFrames);}
return val;};YAHOO.util.Motion.prototype.getAttribute=function(attribute){var val=null;if(attribute=='points'){val=[this.getAttribute('left'),this.getAttribute('top')];if(isNaN(val[0])){val[0]=0;}
if(isNaN(val[1])){val[1]=0;}}else{val=parseFloat(YAHOO.util.Dom.getStyle(this.getEl(),attribute));}
return val;};YAHOO.util.Motion.prototype.setAttribute=function(attribute,val,unit){if(attribute=='points'){YAHOO.util.Dom.setStyle(this.getEl(),'left',val[0]+unit);YAHOO.util.Dom.setStyle(this.getEl(),'top',val[1]+unit);}else{YAHOO.util.Dom.setStyle(this.getEl(),attribute,val+unit);}};YAHOO.util.Motion.prototype.initMotion=function(el,attributes,duration,method){YAHOO.util.Anim.call(this,el,attributes,duration,method);attributes=attributes||{};attributes.points=attributes.points||{};attributes.points.control=attributes.points.control||[];this.attributes=attributes;var start;var end=null;var translatedPoints=null;this.getTranslatedPoints=function(){return translatedPoints;};var translateValues=function(val,self){var pageXY=YAHOO.util.Dom.getXY(self.getEl());val=[val[0]-pageXY[0]+start[0],val[1]-pageXY[1]+start[1]];return val;};var onStart=function(){start=this.getAttribute('points');var attributes=this.attributes;var control=attributes['points']['control']||[];if(control.length>0&&control[0].constructor!=Array){control=[control];}
if(YAHOO.util.Dom.getStyle(this.getEl(),'position')=='static'){YAHOO.util.Dom.setStyle(this.getEl(),'position','relative');}
if(typeof attributes['points']['from']!='undefined'){YAHOO.util.Dom.setXY(this.getEl(),attributes['points']['from']);start=this.getAttribute('points');}
else if((start[0]===0||start[1]===0)){YAHOO.util.Dom.setXY(this.getEl(),YAHOO.util.Dom.getXY(this.getEl()));start=this.getAttribute('points');}
var i,len;if(typeof attributes['points']['to']!='undefined'){end=translateValues(attributes['points']['to'],this);for(i=0,len=control.length;i<len;++i){control[i]=translateValues(control[i],this);}}else if(typeof attributes['points']['by']!='undefined'){end=[start[0]+attributes['points']['by'][0],start[1]+attributes['points']['by'][1]];for(i=0,len=control.length;i<len;++i){control[i]=[start[0]+control[i][0],start[1]+control[i][1]];}}
if(end){translatedPoints=[start];if(control.length>0){translatedPoints=translatedPoints.concat(control);}
translatedPoints[translatedPoints.length]=end;}};this._onStart.subscribe(onStart);};YAHOO.util.Scroll=function(el,attributes,duration,method){if(el){YAHOO.util.Anim.call(this,el,attributes,duration,method);}};YAHOO.util.Scroll.prototype=new YAHOO.util.Anim();YAHOO.util.Scroll.prototype.defaultUnits.scroll=' ';YAHOO.util.Scroll.prototype.doMethod=function(attribute,start,end){var val=null;if(attribute=='scroll'){val=[this.method(this.currentFrame,start[0],end[0]-start[0],this.totalFrames),this.method(this.currentFrame,start[1],end[1]-start[1],this.totalFrames)];}else{val=this.method(this.currentFrame,start,end-start,this.totalFrames);}
return val;};YAHOO.util.Scroll.prototype.getAttribute=function(attribute){var val=null;var el=this.getEl();if(attribute=='scroll'){val=[el.scrollLeft,el.scrollTop];}else{val=parseFloat(YAHOO.util.Dom.getStyle(el,attribute));}
return val;};YAHOO.util.Scroll.prototype.setAttribute=function(attribute,val,unit){var el=this.getEl();if(attribute=='scroll'){el.scrollLeft=val[0];el.scrollTop=val[1];}else{YAHOO.util.Dom.setStyle(el,attribute,val+unit);}};

/**http://us.js2.yimg.com/us.js.yimg.com/lib/common/utils/2/connection_2.0.1-b4.js*/
/*
Copyright (c) 2006, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
*/
YAHOO.util.Connect={_msxml_progid:['MSXML2.XMLHTTP.5.0','MSXML2.XMLHTTP.4.0','MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP','Microsoft.XMLHTTP'],_http_header:{},_has_http_headers:false,_isFormSubmit:false,_sFormData:null,_poll:[],_polling_interval:50,_transaction_id:0,setProgId:function(id)
{this.msxml_progid.unshift(id);},setPollingInterval:function(i)
{if(typeof i=='number'&&isFinite(i)){this._polling_interval=i;}},createXhrObject:function(transactionId)
{var obj,http;try
{http=new XMLHttpRequest();obj={conn:http,tId:transactionId};}
catch(e)
{for(var i=0;i<this._msxml_progid.length;++i){try
{http=new ActiveXObject(this._msxml_progid[i]);if(http){obj={conn:http,tId:transactionId};break;}}
catch(e){}}}
finally
{return obj;}},getConnectionObject:function()
{var o;var tId=this._transaction_id;try
{o=this.createXhrObject(tId);if(o){this._transaction_id++;}}
catch(e){}
finally
{return o;}},asyncRequest:function(method,uri,callback,postData)
{var o=this.getConnectionObject();if(!o){return null;}
else{if(this._isFormSubmit){if(method=='GET'){uri+="?"+this._sFormData;}
else if(method=='POST'){postData=this._sFormData;}
this._sFormData='';this._isFormSubmit=false;}
o.conn.open(method,uri,true);if(postData){this.initHeader('Content-Type','application/x-www-form-urlencoded');}
if(this._has_http_headers){this.setHeader(o);}
this.handleReadyState(o,callback);postData?o.conn.send(postData):o.conn.send(null);return o;}},handleReadyState:function(o,callback)
{var oConn=this;try
{this._poll[o.tId]=window.setInterval(function(){if(o.conn&&o.conn.readyState==4){window.clearInterval(oConn._poll[o.tId]);oConn._poll.splice(o.tId);oConn.handleTransactionResponse(o,callback);}},this._polling_interval);}
catch(e)
{window.clearInterval(oConn._poll[o.tId]);oConn._poll.splice(o.tId);oConn.handleTransactionResponse(o,callback);}},handleTransactionResponse:function(o,callback)
{if(!callback){this.releaseObject(o);return;}
var httpStatus;var responseObject;try
{httpStatus=o.conn.status;}
catch(e){httpStatus=13030;}
if(httpStatus>=200&&httpStatus<300){responseObject=this.createResponseObject(o,callback.argument);if(callback.success){if(!callback.scope){callback.success(responseObject);}
else{callback.success.apply(callback.scope,[responseObject]);}}}
else{switch(httpStatus){case 12002:case 12029:case 12030:case 12031:case 12152:case 13030:responseObject=this.createExceptionObject(o,callback.argument);if(callback.failure){if(!callback.scope){callback.failure(responseObject);}
else{callback.failure.apply(callback.scope,[responseObject]);}}
break;default:responseObject=this.createResponseObject(o,callback.argument);if(callback.failure){if(!callback.scope){callback.failure(responseObject);}
else{callback.failure.apply(callback.scope,[responseObject]);}}}}
this.releaseObject(o);},createResponseObject:function(o,callbackArg)
{var obj={};var headerObj={};try
{var headerStr=o.conn.getAllResponseHeaders();var header=headerStr.split("\n");for(var i=0;i<header.length;i++){var delimitPos=header[i].indexOf(':');if(delimitPos!=-1){headerObj[header[i].substring(0,delimitPos)]=header[i].substring(delimitPos+1);}}
obj.tId=o.tId;obj.status=o.conn.status;obj.statusText=o.conn.statusText;obj.getResponseHeader=headerObj;obj.getAllResponseHeaders=headerStr;obj.responseText=o.conn.responseText;obj.responseXML=o.conn.responseXML;if(typeof callbackArg!==undefined){obj.argument=callbackArg;}}
catch(e){}
finally
{return obj;}},createExceptionObject:function(tId,callbackArg)
{var COMM_CODE=0;var COMM_ERROR='communication failure';var obj={};obj.tId=tId;obj.status=COMM_CODE;obj.statusText=COMM_ERROR;if(callbackArg){obj.argument=callbackArg;}
return obj;},initHeader:function(label,value)
{if(this._http_header[label]===undefined){this._http_header[label]=value;}
else{this._http_header[label]=value+","+this._http_header[label];}
this._has_http_headers=true;},setHeader:function(o)
{for(var prop in this._http_header){o.conn.setRequestHeader(prop,this._http_header[prop]);}
delete this._http_header;this._http_header={};this._has_http_headers=false;},setForm:function(formId)
{this._sFormData='';if(typeof formId=='string'){var oForm=(document.getElementById(formId)||document.forms[formId]);}
else if(typeof formId=='object'){var oForm=formId;}
else{return;}
var oElement,oName,oValue,oDisabled;var hasSubmit=false;for(var i=0;i<oForm.elements.length;i++){oDisabled=oForm.elements[i].disabled;oElement=oForm.elements[i];oName=oForm.elements[i].name;oValue=oForm.elements[i].value;if(!oDisabled)
{switch(oElement.type)
{case'select-one':case'select-multiple':for(var j=0;j<oElement.options.length;j++){if(oElement.options[j].selected){this._sFormData+=encodeURIComponent(oName)+'='+encodeURIComponent(oElement.options[j].value||oElement.options[j].text)+'&';}}
break;case'radio':case'checkbox':if(oElement.checked){this._sFormData+=encodeURIComponent(oName)+'='+encodeURIComponent(oValue)+'&';}
break;case'file':case undefined:case'reset':case'button':break;case'submit':if(hasSubmit==false){this._sFormData+=encodeURIComponent(oName)+'='+encodeURIComponent(oValue)+'&';hasSubmit=true;}
break;default:this._sFormData+=encodeURIComponent(oName)+'='+encodeURIComponent(oValue)+'&';break;}}}
this._isFormSubmit=true;this._sFormData=this._sFormData.substr(0,this._sFormData.length-1);},abort:function(o)
{if(this.isCallInProgress(o)){window.clearInterval(this._poll[o.tId]);this._poll.splice(o.tId);o.conn.abort();this.releaseObject(o);return true;}
else{return false;}},isCallInProgress:function(o)
{if(o.conn){return o.conn.readyState!=4&&o.conn.readyState!=0;}
else{return false;}},releaseObject:function(o)
{o.conn=null;o=null;}};




/**
 * Create namespace
 */
YAHOO.namespace("Media.Dtk.GlobalSearch");


/**
 * Tabs Manager Class
 */
YAHOO.Media.Dtk.GlobalSearch.TabsMgr = {
   oProcessed : {} , 
   set : function(sKey,bValue){
      this.oProcessed[sKey] = bValue;
   } , 
   get : function(sKey){
      return (typeof(this.oProcessed[sKey])!='undefined' && this.oProcessed[sKey]==1);
   }
};


/**
 * Tabs Class
 */
YAHOO.Media.Dtk.GlobalSearch.Tabs = function(sModuleName){
   this.sModuleName=sModuleName;
   this.dCurTab="";
   this.dCurTabNum=1;
   this.aTabs=[];
   this.sTrigger="click";
   this.fAction=null;
   this.oActionVars=null;
   this.sTabTag="li";
   this.sClickTag="a";
   this.sOnName="on";
   this.sOffName="off";
   this.sHiLiteName="sparkle";
   this.bRoundCorners=false;
   this.aDataProcessed=[];
   this.bDropShadow=true;
};

YAHOO.Media.Dtk.GlobalSearch.Tabs.prototype.dropShadowOff=function(){this.bDropShadow=false;}
YAHOO.Media.Dtk.GlobalSearch.Tabs.prototype.dropShadowOn=function(){this.bDropShadow=true;}

YAHOO.Media.Dtk.GlobalSearch.Tabs.prototype.changeAction=function(action,vars){this.fAction=action;this.oActionVars=vars;};

YAHOO.Media.Dtk.GlobalSearch.Tabs.prototype.setupTabs=function(){
   var dTab = document.getElementById(this.sModuleName).getElementsByTagName(this.sTabTag);
   var nTabLength = dTab.length,i,j;
   
   for( i=0 ; i<nTabLength ; i++ ){
      if( this.bDropShadow ){
         // dynamically add dropshadow nodes
         var txtNode = document.createTextNode(dTab[i].firstChild.innerHTML);
         var dShad = document.createElement("span");
         dShad.appendChild(txtNode);
         dTab[i].insertBefore(dShad, dTab[i].firstChild);
      }
      
      if( YAHOO.util.Dom.hasClass(dTab[i],this.sOnName) ){
         this.dCurTab = dTab[i];
      }
      var dClickTag = dTab[i].getElementsByTagName(this.sClickTag) || 0;
      var nClickTagLength = dClickTag.length;
      for( j=0 ; j<nClickTagLength ; j++ ){
         if( dClickTag[j].href.indexOf('schedule.cgi')<0 ){
            var self=this;
            dClickTag[j].order = (i+1);
            this.aTabs[(i+1)]=dClickTag[j];
            var oSelf= this;
            var fAction = function(e){
               if(e){YAHOO.util.Event.stopEvent(e);}
               self.tabAction(e, oSelf, self);
               return false;
            }
            YAHOO.util.Event.addListener(dClickTag[j], this.sTrigger, fAction);
            if(this.sTrigger!="click"){
               dClickTag[j].onclick=function(){return false;};
            }
         }
      }
   }
};

YAHOO.Media.Dtk.GlobalSearch.Tabs.prototype.tabAction=function(e, dNode,oSelf){
   if (typeof(dNode.href)=='undefined') { dNode = e.srcElement || e.target; }
   if(dNode.tagName=='IMG'){dNode=dNode.parentNode;}
  
   if((oSelf.dCurTabNum-1)>0){
      YAHOO.util.Dom.removeClass(oSelf.aTabs[(oSelf.dCurTabNum-1)].parentNode.parentNode , oSelf.sOffName);
   }
   YAHOO.util.Dom.removeClass( oSelf.dCurTab , oSelf.sOnName );
   oSelf.dCurTab = (oSelf.oActionVars.type=='tab' ? dNode.parentNode.parentNode : dNode.parentNode);
   YAHOO.util.Dom.removeClass( oSelf.dCurTab , oSelf.sHiLiteName );
   oSelf.dCurTabNum = dNode.order;
   YAHOO.util.Dom.addClass( oSelf.dCurTab , oSelf.sOnName );

   if((oSelf.dCurTabNum-1)>0){
      YAHOO.util.Dom.addClass(oSelf.aTabs[(oSelf.dCurTabNum-1)].parentNode.parentNode , oSelf.sOffName);
   }
  
   if(oSelf.fAction){ oSelf.fAction(oSelf.oActionVars,dNode,this); }
   return false;
};


/**
 * Global Search Box
 */
YAHOO.Media.Dtk.GlobalSearch.ChangeVert = function(args,self){
   var obj=args.obj,tab=self;
   YAHOO.util.Dom.addClass(obj.dCurTab, 'on');
   YAHOO.util.Dom.addClass(tab.parentNode, 'on');
   obj.dCurTab=tab.parentNode;
   document.sf1.action=tab.href;
   var text=tab.innerHTML;
   document.getElementById('dtk-search').className='tab-'+text.toLowerCase();
   
   if (typeof(this.first)=="undefined") this.searchbox = document.getElementById("dtk-searchbox").innerHTML;
   this.first = true;
   var searchbox = document.getElementById("dtk-searchbox");
   var leftfooter = document.getElementById("dtk-sboxfooter");
   var rightfooter = document.getElementById("dtk-sboxlinks");
   if(typeof(YAHOO.Media.Dtk.nSearchBoxWidth)=='undefined'){
      YAHOO.Media.Dtk.nSearchBoxWidth=YAHOO.util.Dom.getStyle("dtk-searchbox","width");
   }
   if (searchbox.innerHTML != this.searchbox) {
      var value = document.sf1.p.value;
      searchbox.innerHTML = this.searchbox;
      if(YAHOO.Media.Dtk.nPageSize==1){searchbox.style.marginLeft="auto";}
      else{searchbox.style.width=YAHOO.Media.Dtk.nSearchBoxWidth;}
      document.sf1.p.value = value;
   }
   if (leftfooter){ leftfooter.style.display = "block"; }
   if (rightfooter){ rightfooter.style.display = "block"; }
   frPrefix = "Dtk-tab-";
   _ver = (typeof(ver)!="undefined"?ver:"");
   if(typeof(YAHOO.Media.Dtk.GlobalSearch.oSearch)=='object'){
      
      document.sf1.fr.value = frPrefix + YAHOO.Media.Dtk.GlobalSearch.oSearch[text].frcode + "-t" + _ver;
   }
   if(document.getElementById("searchlabel")){
      document.getElementById("dtk-searchlabel").title = text + " search: enter a search term and press Enter";
   }
   document.getElementById("p").title = text + " search: enter a search term and press Enter";
   setTimeout("document.sf1.p.focus()",1);
};

YAHOO.Media.Dtk.GlobalSearch.bProcKeyDown=1;

YAHOO.Media.Dtk.GlobalSearch.fKeyDown = function(e,oVerts){
   var src = e.srcElement || e.target;
   var code=e.keyCode,id=e.id,gk,_ffs=0;
   if(typeof(YAHOO.Media.Dtk.GlobalSearch.bKeyDown)=='undefined'){YAHOO.Media.Dtk.GlobalSearch.bKeyDown=1;}
   //document.sf1.p.value=code;
   if(code==13){return;}
   else if((code==191||code==222)&&id!='p'&&YAHOO.Media.Dtk.GlobalSearch._ff){_ffs=1;gk=0;} // the user is trying to use FF keyboard shortcuts for FF search
   else if((code<31||code>41)&&(code<16||code>18)&&code!=9&&code!=8){gk=1;} // user is not pressing a navigation key
   else{gk=0;}
   var sFormClassName = document.getElementById('dtk-search').className;
   if (src.id=='p' || src.id=='scsz' || src.id=='dtk-searchsubmit') {
      if (code==9 && !e.shiftKey && YAHOO.Media.Dtk.GlobalSearch.bProcKeyDown==0) {
         YAHOO.Media.Dtk.GlobalSearch.bProcKeyDown=1;
      } else if ( 
         (code==9 && src.id=='p') || 
         (code==9 && !e.shiftKey && src.id=='dtk-searchsubmit' && YAHOO.Media.Dtk.GlobalSearch.bProcKeyDown==1)
      ) {
         var nTab = oVerts.dCurTabNum, nTabLength = (oVerts.aTabs.length-1);
         nTab = (e.shiftKey && nTab>0) ? nTab-1 : (nTab <= nTabLength ? nTab+1 : nTab); // get next tab
         if (nTab>0&&nTab<=nTabLength&&!e.ctrlKey&&!e.altKey) { // focus on next tab
            YAHOO.util.Event.stopEvent(e);
            oVerts.tabAction(e, oVerts.aTabs[nTab], oVerts);
            document.sf1.p.focus();
            return false;
         }
      } else if (gk==1) {
         YAHOO.Media.Dtk.GlobalSearch.bProcKeyDown=0;
      }
   }
   else if (!_ffs&&gk==1&&src.type!='text'&&!e.ctrlKey&&!e.altKey) {
      //document.sf1.p.value='';
      //document.sf1.p.focus();
   }
}

/*
 * end Global Search Box
 */






        /// searchbox fr codes
        YAHOO.Media.Dtk.GlobalSearch.oSearch = {
           Movies : {'frcode':'ush-movies'},      // may need to be modified by individual property
           Web : {'frcode':'web-t'},
            Pictures : {'frcode':'img-t'},
           Video : {'frcode':'vid-t'},
           Audio : {'frcode':'aud-t'}
        };
        
        /// instantiate tabs
        var createTabs = function() {
	    	 document.sf1.p.focus();
         document.sf1.fr.value = "Dtk-tab-web-t"+(typeof(ver)!='undefined'?ver:"");
          var id = YAHOO.util.Dom.generateId(this);
          YAHOO.Media.Dtk.searchtabs = new YAHOO.Media.Dtk.GlobalSearch.Tabs(id);
          YAHOO.Media.Dtk.searchtabs.changeAction(YAHOO.Media.Dtk.GlobalSearch.ChangeVert,{"obj":YAHOO.Media.Dtk.searchtabs});
          YAHOO.Media.Dtk.searchtabs.setupTabs();
          YAHOO.util.Event.addListener(document, "keydown", YAHOO.Media.Dtk.GlobalSearch.fKeyDown, YAHOO.Media.Dtk.searchtabs);
        }
        YAHOO.util.Event.onAvailable("dtk-searchtabs",createTabs);
        
/**
 * DTK Carousel Component.
 * @description http://twiki.corp.yahoo.com/view/Media/DTKDaemonManager
 **/

(function(){

var $U = YAHOO.util;
var $D = $U.Dom;
var $C = $U.CustomEvent;
var DTK = YAHOO.namespace('Media.Dtk');
YAHOO.namespace('Media.Dtk.util');

/**
 * spawn {function}
 * This function creates an object of type "cls", constructed with arguments in the "args" array.
 * spawn : new :: apply : call
 * Note: even though this function is private, you can still arbitrarily spawn unmanaged daemons using the public spawnDaemon method.
 * @private
 * @param cls {Class} The function constructor to use.
 * @param args {Array} The arguments to pass to the constructor.
 **/
var spawn = function(cls,args) {
	if(!args) args = [];
	else if(!args instanceof Array) args = [args];
	var f=function(){};
	f.prototype=cls.prototype;
	f.prototype.constructor = cls;
	var obj = new f();
	cls.apply(obj,args);
	return obj;
};

/**
 * YAHOO.Media.Dtk.util.Manager
 * Daemon Manager Constructor
 * @public
 * @param daemonClass {Class} The constructor that will be used to create daemons.
 * If this daemonClass does not implement the getId or toString functions, or an "id" property, then generic versions will be added.
 **/
DTK.util.Manager = function(daemonClass) {

	/**
	 * daemons {object}
	 * A collection of all the managed daemons.  manager.daemons[daemon.getId()] == daemon
	 * @public
	 **/
	this.daemons={};
	
	/**
	 * stack {Array}
	 * An array of all the managed daemons.  (Refers to the same objects as the daemons collection.)
	 * @public
	 **/
	this.stack=[];
	
	
	var idCounter = [0];
	var p=daemonClass.prototype;
	
	if(typeof p.getId !== 'function') {
		p.getId = function(){
			if(this.id) {
				return this.id;
			}
			return (this.id = 'daemon_'+(idCounter[0]++));
		};
	}
	if(typeof p.toString !== 'function') {
		p.toString = function() {
			return 'Daemon ' + this.getId();
		};
	}
	/**
	 * onCreate {CustomEvent}
	 * Event that fires whenever a daemon is spawned.
	 * @privileged
	 **/
	this.onCreate = new $C('create',this);
	/**
	 * onDaemonEvent {CustomEvent}
	 * Event that fires whenever any daemon's custom event of any sort fires.
	 * As far as the listener is concerned, it will be just as if it was listening to the actual event that fired.
	 * @privileged
	 **/
	this.onDaemonEvent = new $C('daemonEvent'); // actual event time at firing time will likely be different.
	/**
	 * daemonClass
	 * The class that's used for daemons.
	 * @public
	 **/
	this.daemonClass = daemonClass;
	
	/**
	 * unload {function}
	 * A function to help with memory management in IE; called on window.unload.
	 * If daemonClass implements an unload method, then all managed daemons will be unloaded.
	 * Then the references to the daemons are nulled.
	 * @private
	 **/
	var unload = function(e){
		var s=this.stack;
		for(var i=s.length-1; i>-1; i--) {
			if(s[i]) {
				s[i].manager = null;
				if(typeof(s[i].unload) == 'function') {
					s[i].unload();
				}
				this.daemons[s[i].getId()] = null;
				s[i] = null;
			}
		}
	};
	$U.Event.addListener(window,'unload',unload,this,true);
};
DTK.util.Manager.prototype={
	/**
	 * daemonEvents {Object}
	 * If any daemon implements any CustomEvents, then a correllary CustomEvent is created as a pass-through.
	 * As a result, assigning a listener to manager.daemonEvents.onFoo is the same as assigning a listener to all of the managed daemons' onFoo event.
	 * @public
	 **/
	daemonEvents:{},
	
	/**
	 * spawnDaemon {Function}
	 * method to create a daemon object.  Fires the onCreate event.
	 * manager.spawnDaemon('a','b') is equivalent to new manager.daemonClass('a','b'), except that the onCreate event will be fired.
	 * @params {Optional} Any parameters passed to this function will be sent to the daemon constructor.
	 * @public
	 **/
	spawnDaemon:function() {
		var obj = spawn(this.daemonClass,arguments)
		this.onCreate.fire(obj);
		return obj;
	},
	/**
	 * idString {String}
	 * String that identifies what kind of manager this object is.  Designed to be overwritten by the classes that extend the Manager class.
	 * @public
	 **/
	idString:'Generic Daemon Manager', // designed to be overwritten in classes that extend the Manager class.
	/**
	 * toString {function}
	 * Method to identify this object.  Uses the idString property.
	 * @public
	 **/
	toString:function(){
		var s=[this.idString,'{\n'];
		for(var c in this.daemons) {
			if(this.daemons[c] instanceof this.daemonClass) {
				s.push('\t',c,' : (',this.daemons[c].toString(),')\n');
			}
		}
		s.push('}');
		return s.join('');
	},
	/**
	 * init {Function}
	 * Create a single daemon and manage it.
	 * @params {Optional} Any parameters sent to this function will be passed to the daemon constructor.
	 * @return A reference to the created daemon object.
	 **/
	init:function() {
		var d=this.spawnDaemon.apply(this,arguments);
		
		if(d && d.manager != this) {
			var onDaemonEvent = this.onDaemonEvent;
			d.manager = this;
			this.daemons[d.getId()] = d;
			this.stack.push(d);
			for(var e in d){
				// walk through all the daemon's properties looking for customevents to watch for.
				// this implements a "bubbling" sort of functionality.
				if(d[e] instanceof $C) {
					if(!this.daemonEvents[e]) {
						this.daemonEvents[e]=new $C(d[e].type);
					}
					var evMgr = this.daemonEvents[e];
					var fn=function(type,data){
						// fire the manager's version of the child event, and the onDaemonEvent, as if they were the ones that happened in the first place -- same scope, same type, same everything.
						evMgr.scope=this;
						evMgr.fire.apply(evMgr,data);
						onDaemonEvent.scope=this;
						onDaemonEvent.type=type;
						onDaemonEvent.fire.apply(onDaemonEvent,data);
					};
					d[e].subscribe(fn);
				}
			}
		}
		return d;
	},
	/**
	 * initAll {Function}
	 * Run init() a bunch of times.
	 * Note: often overridden or extended in classes that extend the Manager class.
	 * @param finder {Function} Function that returns an array of objects that can be sent as the first argument to the daemon constructor.  For example, it could be a function that returns an array of DOM nodes.
	 * @params {Optional} Additional parameters are passes as additional arguments to the daemon constructor function.
	 * @return An array of references to the created daemon objects.
	 **/
	initAll:function(finder) {
		if(typeof(finder) != 'function') return [];
		var things = finder();
		var ret = [];
		var len = things.length;
		var args = [null];
		var arglen=arguments.length;
		for(var i=1;i<arglen;i++) {
			args.push(arguments[i]);
		}
		for(var i = 0; i < len; i++) {
			args[0] = things[i];
			var d=this.init.apply(this, args);
			if(d) {
				ret.push(d);
			}
		}
		return ret;
	},
	/**
	 * getDaemonById {Function}
	 * Get a reference to a certain daemon by its ID.
	 * @param id {string || HTMLElement} The ID of the daemon, or an HTML element with an id that is the id of the daemon.
	 * @return A reference to the daemon, or null if not found.
	 **/
	getDaemonById:function(id) {
		if(id.id) return this.getDaemonById(id.id);
		return this.daemons[id] || null;
	}
};

})();



/**
 * DTK Carousel Component.
 * @description http://twiki.corp.yahoo.com/view/Media/DTKCarousel
 * @requires DTK Manager Utility
 **/

// keep out of global scope.
(function() {

// shorthand
var $U=YAHOO.util;
var $D=$U.Dom;
var $E=$U.Event;
var $S=$U.Scroll;
var DTK=YAHOO.namespace('Media.Dtk');

var Carousel; // varred here, but defined inside its own scope.  This is the line in.
(function(){

// private static methods used by DTK.Carousel
/**
 * addPageIndicators Method
 * @description Adds the links to individual pages
 * @private
 * @param C {Carousel Object} Reference to the carousel that is getting set up.
 **/
var addPageIndicators=function() {
	
	// check to see if there's already one there.  If so, we're going to enslave its babies.
	var n=$D.getElementsByClassName('scrollnav','div',this.getElement());
	n=n[0] || document.createElement('div');
	n.className='scrollnav';
	
	removeNavLinks.call(this);


//aaa
	var o = this;
	var container = this.getElement();
	var indic = container.getElementsByTagName("h2")[0].getElementsByTagName("span")[0];
	var linkwds = indic.getElementsByTagName("a");
var clear = function(){
	var lnks = indic.getElementsByTagName("a");
	for(var i=0,j=lnks.length; i<j; i++){
		lnks[i].style.color = "";
	}
};

	for(var i=0,j=linkwds.length; i<j; i++){
		linkwds[i].href = "#pg:" + (i+1);
		linkwds[i].carousel = this;
		linkwds[i].onmousedown = linkwds[i].onclick = function(){
			clear();
			var n = this.href.split("#pg:")[1] - 1;
			o.scrollTo(n);
			this.style.color = "red";
		};
	}




	var p=this.pages.length;

	for(var x=0;x<p;x++){
		var a=this.navLinks[x] || document.createElement('a');
		a.href='#pg:'+(x+1);
		a.index=x;
		a.carousel=this;
		a.onmousedown=a.onclick=function(e){
			clear();
			indic.getElementsByTagName("a")[this.href.split("#pg:")[1] - 1].style.color = "red";
			o.scrollTo_click(e);
		}

		if(x==this.current) {
			a.className='current';
		}

		n.appendChild(a);
		this.navLinks[x]=a;
	}
	
	var s=this.scrollBody;
	s.parentNode.insertBefore(n,s);
	return;
};

/**
 * removeNavLinks Method
 * @description Clears out the navLinks array.  Called by unload, and also by addPageIndicators if pages were removed by an ajax call.
 * @private
 * @param C {Carousel Object} Reference to the carousel whose navLinks are getting yanked out.
 **/
var removeNavLinks=function() {
	if(this.navLinks) {
		for(var j=this.navLinks.length-1;j>-1;j--) {
			var a=this.navLinks[j];
			if(a) {
				a.onclick=null;
				a.onmousedown=null;
				a.onmouseup=null;
				a.carousel=null;
			}
			a=null;
			this.navLinks[j]=null;
	//		delete this.navLinks[j];
		}
	}
	this.navLinks=[];
};
	
/**
 * addNavButtons Method
 * @description Adds the next/prev page indicators.
 * @private
 * @param C {Carousel Object} Reference to the carousel that is getting set up.
 **/
var addNavButtons=function() {
	// create prev/next links, if they haven't already been done.
	if(this.prev || this.next) return;
	var p=document.createElement('a'), n=p.cloneNode(true);
	
	var i=this.getElement().id;
	
	n.href=p.href="#"+i;
	
	// add appropriate classes to each
	p.className="prev";
	n.className="next";
	
	// insert nodes into dom before <div class="scrollbody">
	var s=this.scrollBody;
	s.parentNode.insertBefore(p, s);
	s.parentNode.insertBefore(n, s);
	
	// add handlers
	p.onmousedown=p.onclick=this.scrollPrev_click;
	n.onmousedown=n.onclick=this.scrollNext_click;
	
	this.prev=p;
	this.next=n;
	n.carousel=p.carousel=this;
	s=null;
};
/**
 * updateNavState Method
 * @description Update the state of the page/prev/next links.
 * @private
 * @param C {Carousel Object} Reference to the carousel that is getting updated.
 **/
var updateNavState=function() {
	// get # of pages
	var l = this.navLinks.length;
	
	// update page indicator styles
	for (var x=0; x<l; x++) {
		if(x == this.current) {
			this.navLinks[x].className='current';
		} else {
			this.navLinks[x].className='';
		}
	}
	// update button styles
	if(this.current == 0 && !this.roundRobin){
		// first page (left inactive)
		$D.addClass(this.prev,'off');
		//$D.setStyle(this.prev,'opacity',0.6);
		$D.removeClass(this.next,'off');
		//$D.setStyle(this.next,'opacity',1);
		$D.setStyle(this.next,'cursor','')
		$D.setStyle(this.prev,'cursor','default')
	}else if(this.current == (l-1) && !this.roundRobin){
		// last page (right inactive)
		$D.removeClass(this.prev,'off');
		//$D.setStyle(this.prev,'opacity',1);
		$D.addClass(this.next,'off');
		//$D.setStyle(this.next,'opacity',0.6);
		$D.setStyle(this.prev,'cursor','')
		$D.setStyle(this.next,'cursor','default')
	} else {
		// all other pages (all active)
		$D.removeClass(this.prev,'off');
		//$D.setStyle(this.prev,'opacity',1);
		$D.removeClass(this.next,'off');
		//$D.setStyle(this.next,'opacity',1);
		$D.setStyle(this.next,'cursor','')
		$D.setStyle(this.prev,'cursor','')
	}
};
/**
 * clickHandler method
 * @description Creates an event handler which can be assigned to a carousel A tag.  Used to create the scrollNext_click, scrollPrev_click, and scrollTo_click methods.
 * @private
 * @param whichFn {String} The name of the member function of the Carousel object to call, if appropriate.  Note: Not a function--send in the NAME of a function as a string.
 * @param fnFailure {Function} In addition to !a and !a.carousel, additional failure cases can be specified.  This function is called with the A tag passed as an arg.  If it returns True, then the carousel operation is aborted and normal behavior is used.
 * @param fnArgs {Function} This function can be specified to send additional arguments to the carousel function.  The A tag is passed as an argument, and the return value is sent to fnWhich.
 **/
var clickHandler=function(whichFn,fnFailure,fnArgs) {
	return function(e) {
		e=e||window.event;
		fnFailure=fnFailure || function(){return false;};
		fnArgs=fnArgs || function(){};
		var a=$E.getTarget(e);
		if(!a || !a.carousel || fnFailure(a)) {
			return true;
		}
		if(!a.didMouseDown) {
			// do the stuff, only the first time.
			a.carousel.autoPlay=false;
			a.carousel[whichFn](fnArgs(a));
		} else {
			// if we got a mousedown, then this is click, and it's time to blur.
			// flag will be reset on the next line.
			a.blur();
		}
		// record or reset.
		a.didMouseDown=(e.type=='mousedown');
		// break reference to prevent the leak.
		a=null;
		$E.stopEvent(e);
		return false;
	};
};

Carousel = function(el,args) {
	
	/**
	 * self-reference.
	 * @private
	 **/
	var me=this;
	/**
	 * currentScroll property
	 * Stores the current position of the scroller.
	 * @private
	 **/
	var currentScroll=0;
	/**
	 * getCurrentScroll method
	 * @return {Number} the current position of the scroller.
	 * @privileged
	 **/
	this.getCurrentScroll=function() {
		return currentScroll;
	};
	/**
	 * ontween Animation onTween handler.
	 * Used to keep track of the scrollLeft property of the scrollBody.
	 * @private
	 **/
	var ontween=function(e,data){
		// this is faster than just looking it up from the DOM.
		currentScroll=this.anim.doMethod('scroll', this.animAttrs.scroll.from, this.animAttrs.scroll.to)[0];
	};
	
	/**
	 * oncomplete Animation onComplete handler.
	 * Fires the onPageChange event.
	 * @private
	 **/
	var oncomplete=function(e,data){
		// only fire if it actually finished.
		if(data[0].duration >= this.animDur) {
			data=data[0];
			data.carousel=this;
			var _toString=data.toString;
			data.toString = function(){ return _toString() + ', current page:' + this.carousel.current; };
			//data.toString=function(){return this.time.getTime()+' duration:'+this.duration+', frames:'+this.frames+', fps:'+this.fps+', carousel:'+this.carousel.toString();};
			


				this.onPageChange.fire(data);
		}
	};
	/**
	 * onclick Method
	 * Attached to click event of scrollBody
	 * Through event bubbling, fires whenever an element in the scrolling body is clicked, unless event is caught and killed before bubbling up.
	 * fires the onClick event.
	 * @private
	 **/
	var onclick=function(e) {
		this.onClick.fire(e);
	};
	/**
	 * element Object
	 * Reference to the root of the Carousel element.
	 * Accessible via the privileged getElement() method.
	 * @private
	 **/
	var _element=null;
	
	/**
	 * getElement prototype method
	 * @privileged
	 * @return {HTMLElement | null} The root element of the Carousel.
	 * @description Note: The element is not set until init is called.
	 **/
	this.getElement=function() {
		return _element;
	};
	/**
	 * init Method
	 * @param el { String | HTMLElement } ID of or reference to the root element of the carousel
	 * @param args { Object } Name-value pair of any public member items that should be replaced.  For example, you send it {easeMethod:YAHOO.util.easeNone,animDur:2} to overwrite the default easing method and animation duration.
	 *  With great power comes great responsibility!
	 * @description Typically called by CarouselMgr.init or CarouselMgr.initAll.
	 * @privileged
	 **/
	this.init=function(el,args) {
		el=$D.get(el);
		if(el) {
			_element=el;
		}
		$D.generateId(el,'carousel_');
		s = $D.getElementsByClassName('scrollbody','div',el)[0];
		
		if(typeof(args) == 'object') {
			for(var i in args) {
				this[i]=args[i];
			}
		}
		
		
		var me=this;
		var list = this.pages = $D.getElementsBy(function(el) { return me.pageFinder(el); },this.pageTagName,el);
		var len = list.length;
		
		if(!el || !s || !len) {
			return false;
		}
		
		// set up the exposed variables that don't exist pre-init.
		this.onScrollStart=new $U.CustomEvent('scrollstart',this);
		this.onPageChange=new $U.CustomEvent('scrollcomplete',this);
		this.onClick=new $U.CustomEvent('click',this);
		this.onAutoPlayStart=new $U.CustomEvent('autoplaystart',this);
		this.onAutoPlayStop=new $U.CustomEvent('autoplaystop',this);
		
		var r = $D.getRegion(list[0]);		// get region of first item, as all "page" items should be same width
		this.scrollDistance = r.right - r.left;			// width of first "page" item
		
		this.scrollBody = s;
		$E.addListener(s,'click',onclick,this,true);
		
		// set some styles here to make carousels less rude to the myBar
		var h=$D.getRegion(s.parentNode);
		h=(h.bottom-h.top)+'px';
		s.parentNode.style.height=h;
		s.style.height=h;
		s.style.position='absolute';
		//s.style.overflow='auto';
		var p=$D.getElementsByClassName('scrollpages','div',s)[0];
		p.style.width=(len * this.scrollDistance * 1.0)+'px';
		p.style.position='absolute';
		
		// http://bug.corp.yahoo.com/show_bug.cgi?id=832779
		// figure out what page we're REALLY on (which will usually be 0), and then go there.
		// this needs to be down here, because the browser won't get the right values unless the styles and heights above are set.
		// This is the ONLY time that we manually read the scrollLeft property, since this tends to be very sluggish to read in Mozilla.
		var sl = Math.round(s.scrollLeft / this.scrollDistance);
		if(sl < 0) sl = 0;
		else if(sl >= this.pages.length) sl = this.pages.length-1;
		this.current = sl;
		
		
		this.scrollBody.scrollLeft = currentScroll = sl * this.scrollDistance;
		
		this.anim=new $S(this.scrollBody , this.animAttrs, this.animDur, this.easeMethod);
		this.anim.onTween.subscribe(ontween,this,true);
		this.anim.onComplete.subscribe(oncomplete,this,true);
		
		if( len > 1 ){
			// only add nav buttons and page indicators if more than one page
			addNavButtons.call(this);
			addPageIndicators.call(this);
			updateNavState.call(this);
		} else this.navLinks=[];
		list=s=null;
		return true;
	};
	
	
	/**
	 * autoPlayTimeOut
	 * @private
	 * Recording the timeout ID so that it can be cleared when autoplay is stopped.
	 **/
	var autoPlayTimeOut=0;
	/**
	 * autoPlayFn {null | Function}
	 * @private
	 * @description Function that actually switches the card.  Set as a timeout by autoPlayer.
	 **/
	var autoPlayFn=function(){
		me.autoPlay= (me.autoPlayDirection>0)?me.scrollNext():me.scrollPrev();
	};
	/**
	 * autoPlaySubscribed {Boolean}
	 * True if autoPlayer has subscribed to the onPageChange event.
	 * @private
	 **/
	var autoPlaySubscribed=false;
	/**
	 * autoPlayer {Function}
	 * @private
	 * @description The autoPlay workhorse.  Sets up the proper things based on the value of this.autoPlay.
	 **/
	var autoPlayer=function() {
		clearTimeout(autoPlayTimeOut);
		
		// check to see if it's going to fail before it does.
		// this ends autoplay as soon as it's known that it will stop.
		if(me.autoPlay && !me.roundRobin && (me.current == me.pages.length-1 && me.autoPlayDirection > 0 || me.autoPlayDirection <= 0 && me.current == 0) ) {
			me.autoPlay = false;
		}
		
		if(!me.autoPlay) {
			// stop if running.  Unsubscribe.
			me.onPageChange.unsubscribe(autoPlayer);
			autoPlaySubscribed=false;
			me.onAutoPlayStop.fire(me.current);
		} else {
			/*
			1. In me.autoPlayDur seconds, call autoPlayFn
			2. This scrolls next or prev.
			3. When the scrolling is done, it triggers the onPageChange event.
			4. This calls autoPlayer.  (Goto step 1.)
			*/
			if(!autoPlaySubscribed) {
				autoPlaySubscribed=true;
				me.onPageChange.subscribe(autoPlayer);
				autoPlayFn();
			} else {
				autoPlayTimeOut=window.setTimeout(autoPlayFn,me.autoPlayDur*1000);
			}
		}
	};
	/**
	 * autoPlayStart method
	 * @description Starts the autoPlay
	 * @privileged
	 **/
	this.autoPlayStart=function() {
		if(!this.autoPlay) {
			this.onAutoPlayStart.fire(this.current);
		}
		this.autoPlay=true;
		autoPlayer();
	};
	/**
	 * autoPlayStop method
	 * @description Stops the autoPlay
	 * @privileged
	 **/
	this.autoPlayStop=function() {
		this.autoPlay=false;
		autoPlayer();
	};
	
	/**
	 * getData method
	 * @description Called to make an ajax call for the rest of a collection.  It expects that the data to be found at url will be a JSON string of the form [{pgIdx:<page number>, pgHtml:<html of the page>},{...},...]
	 * @param url {String} url to request
	 * @param postExecute {Function} function to call after elements have been loaded 
	 * @privileged
	 **/
	this.getData = function(url,postExecute) {
		var id=this.getId();
		var me=this;
		var s = function() { me.getDataSuccess.apply(me,arguments); };
		var f = function() { me.getDataFailure.apply(me,arguments); };
		var callback = {
			success: s,
			failure: f,
			argument: {
				postExecute:postExecute
			}
		};
		var oConObj = $U.Connect.asyncRequest('GET',url,callback,null);
	};
	
    /**
	 * getDataSuccess method
	 * @description Called upon successful execution of ajax call
	 * @privileged
	 **/
	this.getDataSuccess = function(o) {
		if(o.responseText){
			var sText = o.responseText;
			/*
			* remove any comments that might have been added, 
			* yapache shouldn't send them if the header is application/x-json,
			* but you never know 
			*/
			sText = sText.replace(/<\!--.+-->/gim,'');
			// instantiate json
			var oArr = eval('(' + sText + ')');
			// loop through end of array
			var createdPages = false, removedPages=false;
			if( oArr ){
				var numPages = this.pages.length;
				var len=oArr.length;
				for(var i=0;i<len;i++){
					var pg = oArr[i].pgIdx;
					var html = oArr[i].pgHtml;
					var page;
					if(pg < numPages && pg >= 0){
						page=this.pages[pg];
					} else {
						// page is out of bounds.
						// make a new one.
						var p=this.pages[numPages-1];
						page = p.cloneNode(false);
						p.parentNode.appendChild(page);
						this.pages[numPages++]=page;
						createdPages=true;
					}
					page.innerHTML=html;
					if(oArr[i].attributes) {
						for(var a in oArr[i].attributes) {
							page.setAttribute(a,oArr[i].attributes[a]);
						}
					}
				}
				// trim the pages that didn't get data, if there are any.
				while(i < numPages) {
					this.pages[i].parentNode.removeChild(this.pages[i]);
					delete this.pages[i];
					removedPages = true;
					i++;
				}
				
				// now we might need to re-do the navLinks.
				if(createdPages || removedPages) {
					addPageIndicators.call(this);
				}
			}
			
			//if a "postExecute" function is passed in, execute it.
			if (o.argument.postExecute) {
				o.argument.postExecute();
			}
		}
	};
	
	/**
	 * getDataFailure method
	 * @description Called when getData call returns an error
	 * @privileged
	 **/
	this.getDataFailure = function(o) {
		// stub func
	};
	
	/**
	 * An unload handler that releases all elements and breaks any circular links caused by this object.
	 * Called by the CarouselMgr on page unload.
	 * @privileged
	 **/
	this.unload = function() {
		if(!this.navLinks){this.navLinks = [];}
		this.navLinks.push(_element, this.prev, this.next, this.scrollBody, this.anim);
		removeNavLinks.call(this);
		for(var j=this.pages.length-1;j>-1;j--) {
			this.pages[j]=null;
		}
	};
	
	/**
	 * animAttrs
	 * @public
	 * Attributes passed to the animation object.
	 **/
	this.animAttrs={
		scroll:{
			from:[0,0],
			to:[0,0]
		}
	};
	
	// initialize this carousel.
	if(el)this.init(el,args);
};

Carousel.prototype = {
	/**
	 * pageFinder { Function }
	 * Passed to Dom.getElementsBy to define what a "page" is.
	 * Defaults to getting by className of this.pageClassName
	 * @public
	 **/
	pageFinder:function(el) {
		return $D.hasClass(el,this.pageClassName);
	},
	/**
	 * pageTagName { String }
	 * Passed to Dom.getElementsBy to define what a "page" is.  This speeds up the grabbing of pages.
	 * @default 'div'
	 * @public
	 **/
	pageTagName:'div',
	/**
	 * pageClassName {String}
	 * Passed to dom.getElementsBy to define what a "page" is.  This is the className that is searched for by default.
	 * Note that if pageFinder is overwritten, then this might not have any effect.
	 * @public
	 * @default scrollpage
	 **/
	pageClassName:'scrollpage',
	
	/**
	 * easeMethod
	 * Easing method to be used by animation.
	 * @default YAHOO.util.Easing.easeOut
	 * @public
	 **/
	easeMethod:$U.Easing.easeOut,
	/**
	 * roundRobin
	 * Whether or not this carousel can go around in circles.
	 * @public
	 **/
	roundRobin:false,
	/**
	 * animDur
	 * duration of the animation, in seconds.
	 * @public
	 * @default 1.5 seconds
	 **/
	animDur:1.5,
	/**
	 * autoPlayDur
	 * @public
	 * The duration in seconds that autoplay should switch the card.
	 **/
	autoPlayDur:5,
	/**
	 * onScrollStart
	 * {Object CustomEvent} Event that occurs when the scrolling starts.
	 * @public
	 **/
	 onScrollStart:null,
	 /**
	  * onPageChange
	 * {Object CustomEvent} Event that occurs when the scrolling completes.
	 * @public
	 **/
	onPageChange:null,
	 /**
	  * onClick
	 * {Object CustomEvent} Event that occurs when the contents of the carousel are clicked.
	 * @public
	 **/
	onClick:null,
	
	/**
	 * autoPlayDirection
	 * {Number} The direction that autoPlay should cycle.  Positive for "next," negative for "prev"
	 * @public
	 * @default 1
	 **/
	autoPlayDirection:1, // set to negative for previous scrolling.
	/**
	 * onAutoPlayStart
	 * {CustomEvent} Event that fires when the autoplay starts.
	 * @public
	 **/
	onAutoPlayStart:null,
	/**
	 * onAutoPlayStop
	 * {CustomEvent} Event that fires when autoplay stops.
	 * @public
	 **/
	onAutoPlayStop:null,
	
	/**
	 * scrollTo Method
	 * @param index {Integer} The index of the page to scroll to.
	 * @public
	 * @description Scrolls to a given "index" (page numbers, starting with 0)  Called by scrollNext and scrollPrev.
	 **/
	scrollTo:function(index) {
//		console.log('scrollto(' +index+') in ',this);
//		this.anim.fps=10;
		//console.log(this.anim);
		// this is an exposed function, so deal with bad arg.
		// do nothing if:
			// index is null or undefined
			// index is too big or too small (and not roundRobin)
			// index refers to the current page
		if(this.roundRobin) {
			if(index < 0) {
				index=this.pages.length-1;
			} else if(index >= this.pages.length) {
				index=0;
			}
		}
		if((!index && index !== 0) || index >= this.pages.length || index < 0 || index == this.current) {
			return false;
		}
		
		if(this.anim.isAnimated()) {
			this.anim.stop();
		}
		
		this.onScrollStart.fire({to:index,from:this.current,toString:function(){return 'from:'+this.from+', to:'+this.to;}});
		
		// set the destination.
		var end=index * this.scrollDistance;
		this.animAttrs.scroll.from=[this.getCurrentScroll(),0];
		this.animAttrs.scroll.to=[end,0];
		this.current=index;
		updateNavState.call(this);
		
		// set the attributes each time so that we can take into consideration changes that may occur to the exposed object.
		this.anim.attributes=this.animAttrs;
		this.anim.duration = this.animDur;
		
		// this setTimeout makes it work properly in Firefox, by making it asynchronous.
		var a=this.anim;
		window.setTimeout(function(){a.animate();},0);
		//a.animate();
		return true;
	},
	/**
	 * scrollNext Method
	 * @public
	 * @description Scrolls to the next page.
	 **/
	scrollNext : function() {
		var n = this.current+1;
		var ret=this.scrollTo(n);
		var p = this.getElement().getElementsByTagName("h2")[0].getElementsByTagName("span")[0];
		var lnks = p.getElementsByTagName("a");
		if(!!!lnks[n]){
			return;
		}
		for(var i=0,j=lnks.length; i<j; i++){
			lnks[i].style.color = "";
		}
		lnks[n].style.color = "red";
		return ret;
	},
	/**
	 * scrollNext_click Method
	 * @public
	 * @description Scrolls to the next page.  If attached to the click and mousedown events, it will handle keyboard and mouse events properly and accessibly.
	 * <p>Usage: var a=YAHOO.util.Dom.get('nextpagelink'); a.carousel=YAHOO.Media.Dtk.CarouselMgr.init('dtk-car-0'); a.onclick=a.carousel.scrollNext_click; </p>
	 **/
	scrollNext_click : clickHandler('scrollNext'),
	/**
	 * scrollNext Method
	 * @public
	 * @description Scrolls to the previous page.
	 **/
	scrollPrev : function() {
		var n = this.current - 1;
		var ret= this.scrollTo(n);
		var p = this.getElement().getElementsByTagName("h2")[0].getElementsByTagName("span")[0];
		var lnks = p.getElementsByTagName("a");
		if(!!!lnks[n]){
			return;
		}
		for(var i=0,j=lnks.length; i<j; i++){
			lnks[i].style.color = "";
		}
		lnks[n].style.color = "red";
		return ret;
	},
	/**
	 * scrollPrev_click Method
	 * @public
	 * @description Scrolls to the prev page.  If attached to the click and mousedown events, it will handle keyboard and mouse events properly and accessibly.
	 * <p>Usage: var a=YAHOO.util.Dom.get('prevpagelink'); a.carousel=YAHOO.Media.Dtk.CarouselMgr.init('dtk-car-0'); a.onclick=a.carousel.scrollPrev_click; </p>
	 **/
	scrollPrev_click:clickHandler('scrollPrev'),
	/**
	 * scrollTo_click Method
	 * @public
	 * @description Scrolls to a given next page.  If attached to the click and mousedown events, it will handle keyboard and mouse events properly and accessibly.
	 * <p>Usage: var a=YAHOO.util.Dom.get('page2link'); a.index=2; a.carousel=YAHOO.Media.Dtk.CarouselMgr.init('dtk-car-0'); a.mousedown=a.onclick=a.carousel.scrollTo_click; </p>
	 **/
	scrollTo_click:clickHandler('scrollTo',function(el){return (!el.index && el.index!==0);},function(el){return el.index;}),
	/**
	* toString method
	* @return {String} string represenation of carousel obj
	*/
	toString:function(){
		var el=this.getElement();
		if(el) {
			return 'Carousel #'+el.id+' .'+el.className;
		} else {
			return 'Carousel [Not Initiated]';
		}
		el=null;
	},
	/**
	 * getId methods
	 * @public
	 * @description Returns the ID of the carousel's root element.
	 * Used by the CarouselMgr to identify individual Carousel daemons.
	 **/
	getId:function(){
		return this.getElement().id;
	}
}

})(); // end of the Carousel scope.


(function(){ // begin scope for CarouselMgr.
/**
 * CarouselMgr
 * @class Singleton for managing Carousel Widgets
 * <p>Usage: YAHOO.Media.Dtk.CarouselMgr.init("myDtkElement");</p>
 * @requires YAHOO.util.Scroll
 * @requires YAHOO.util.Dom
 * @requires YAHOO.util.Event
 * @requires Carousel
 **/
var CarouselMgr = function(){
	CarouselMgr.superclass.constructor.call(this,Carousel);
};
YAHOO.extend(CarouselMgr,DTK.util.Manager);
/**
 * Method to init all carousels that have a certain className
 * @privileged
 * @param cls { String } The className that designates a carousel element. Defaults to "dtk-carousel"
 * @param args { Object } Optional.  Arguments passed to Carousel.init()
 * @return Collection of all carousels created by this method.
 **/
CarouselMgr.prototype.initAll = function(cls,args){
	return CarouselMgr.superclass.initAll.call(this, function(){ return $D.getElementsByClassName(cls||'dtk-carousel','div',document);}, args);
};
CarouselMgr.prototype.getCarousel = CarouselMgr.prototype.getDaemonById;
CarouselMgr.prototype.idString='Carousel Manager';

DTK.CarouselMgr = new CarouselMgr();

})(); // end of the CarouselMgr scope



})();








//for flash

/*	Unobtrusive Flash Objects (UFO) v3.20 <http://www.bobbyvandersluis.com/ufo/>
	Copyright 2005, 2006 Bobby van der Sluis
	This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
*/

var UFO = {
	req: ["movie", "width", "height", "majorversion", "build"],
	opt: ["play", "loop", "menu", "quality", "scale", "salign", "wmode", "bgcolor", "base", "flashvars", "devicefont", "allowscriptaccess", "seamlesstabbing"],
	optAtt: ["id", "name", "align"],
	optExc: ["swliveconnect"],
	ximovie: "ufo.swf",
	xiwidth: "215",
	xiheight: "138",
	ua: navigator.userAgent.toLowerCase(),
	pluginType: "",
	fv: [0,0],
	foList: [],
		
	create: function(FO, id) {
		if (!UFO.uaHas("w3cdom") || UFO.uaHas("ieMac")) return;
		UFO.getFlashVersion();
		UFO.foList[id] = UFO.updateFO(FO);
		UFO.createCSS("#" + id, "visibility:hidden;");
		UFO.domLoad(id);
	},

	updateFO: function(FO) {
		if (typeof FO.xi != "undefined" && FO.xi == "true") {
			if (typeof FO.ximovie == "undefined") FO.ximovie = UFO.ximovie;
			if (typeof FO.xiwidth == "undefined") FO.xiwidth = UFO.xiwidth;
			if (typeof FO.xiheight == "undefined") FO.xiheight = UFO.xiheight;
		}
		FO.mainCalled = false;
		return FO;
	},

	domLoad: function(id) {
		var _t = setInterval(function() {
			if ((document.getElementsByTagName("body")[0] != null || document.body != null) && document.getElementById(id) != null) {
				UFO.main(id);
				clearInterval(_t);
			}
		}, 250);
		if (typeof document.addEventListener != "undefined") {
			document.addEventListener("DOMContentLoaded", function() { UFO.main(id); clearInterval(_t); } , null); // Gecko, Opera 9+
		}
	},

	main: function(id) {
		var _fo = UFO.foList[id];
		if (_fo.mainCalled) return;
		UFO.foList[id].mainCalled = true;
		document.getElementById(id).style.visibility = "hidden";
		if (UFO.hasRequired(id)) {
			if (UFO.hasFlashVersion(parseInt(_fo.majorversion, 10), parseInt(_fo.build, 10))) {
				if (typeof _fo.setcontainercss != "undefined" && _fo.setcontainercss == "true") UFO.setContainerCSS(id);
				UFO.writeSWF(id);
			}
			else if (_fo.xi == "true" && UFO.hasFlashVersion(6, 65)) {
				UFO.createDialog(id);
			}
		}
		document.getElementById(id).style.visibility = "visible";
	},
	
	createCSS: function(selector, declaration) {
		var _h = document.getElementsByTagName("head")[0]; 
		var _s = UFO.createElement("style");
		if (!UFO.uaHas("ieWin")) _s.appendChild(document.createTextNode(selector + " {" + declaration + "}")); // bugs in IE/Win
		_s.setAttribute("type", "text/css");
		_s.setAttribute("media", "screen"); 
		_h.appendChild(_s);
		if (UFO.uaHas("ieWin") && document.styleSheets && document.styleSheets.length > 0) {
			var _ls = document.styleSheets[document.styleSheets.length - 1];
			if (typeof _ls.addRule == "object") _ls.addRule(selector, declaration);
		}
	},
	
	setContainerCSS: function(id) {
		var _fo = UFO.foList[id];
		var _w = /%/.test(_fo.width) ? "" : "px";
		var _h = /%/.test(_fo.height) ? "" : "px";
		UFO.createCSS("#" + id, "width:" + _fo.width + _w +"; height:" + _fo.height + _h +";");
		if (_fo.width == "100%") {
			UFO.createCSS("body", "margin-left:0; margin-right:0; padding-left:0; padding-right:0;");
		}
		if (_fo.height == "100%") {
			UFO.createCSS("html", "height:100%; overflow:hidden;");
			UFO.createCSS("body", "margin-top:0; margin-bottom:0; padding-top:0; padding-bottom:0; height:100%;");
		}
	},

	createElement: function(el) {
		return (UFO.uaHas("xml") && typeof document.createElementNS != "undefined") ?  document.createElementNS("http://www.w3.org/1999/xhtml", el) : document.createElement(el);
	},

	createObjParam: function(el, aName, aValue) {
		var _p = UFO.createElement("param");
		_p.setAttribute("name", aName);	
		_p.setAttribute("value", aValue);
		el.appendChild(_p);
	},

	uaHas: function(ft) {
		var _u = UFO.ua;
		switch(ft) {
			case "w3cdom":
				return (typeof document.getElementById != "undefined" && typeof document.getElementsByTagName != "undefined" && (typeof document.createElement != "undefined" || typeof document.createElementNS != "undefined"));
			case "xml":
				var _m = document.getElementsByTagName("meta");
				var _l = _m.length;
				for (var i = 0; i < _l; i++) {
					if (/content-type/i.test(_m[i].getAttribute("http-equiv")) && /xml/i.test(_m[i].getAttribute("content"))) return true;
				}
				return false;
			case "ieMac":
				return /msie/.test(_u) && !/opera/.test(_u) && /mac/.test(_u);
			case "ieWin":
				return /msie/.test(_u) && !/opera/.test(_u) && /win/.test(_u);
			case "gecko":
				return /gecko/.test(_u) && !/applewebkit/.test(_u);
			case "opera":
				return /opera/.test(_u);
			case "safari":
				return /applewebkit/.test(_u);
			default:
				return false;
		}
	},
	
	getFlashVersion: function() {
		if (UFO.fv[0] != 0) return;  
		if (navigator.plugins && typeof navigator.plugins["Shockwave Flash"] == "object") {
			UFO.pluginType = "npapi";
			var _d = navigator.plugins["Shockwave Flash"].description;
			if (typeof _d != "undefined") {
				_d = _d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
				var _m = parseInt(_d.replace(/^(.*)\..*$/, "$1"), 10);
				var _r = /r/.test(_d) ? parseInt(_d.replace(/^.*r(.*)$/, "$1"), 10) : 0;
				UFO.fv = [_m, _r];
			}
		}
		else if (window.ActiveXObject) {
			UFO.pluginType = "ax";
			try { // avoid fp 6 crashes
				var _a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
			}
			catch(e) {
				try { 
					var _a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
					UFO.fv = [6, 0];
					_a.AllowScriptAccess = "always"; // throws if fp < 6.47 
				}
				catch(e) {
					if (UFO.fv[0] == 6) return;
				}
				try {
					var _a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				}
				catch(e) {}
			}
			if (typeof _a == "object") {
				var _d = _a.GetVariable("$version"); // bugs in fp 6.21/6.23
				if (typeof _d != "undefined") {
					_d = _d.replace(/^\S+\s+(.*)$/, "$1").split(",");
					UFO.fv = [parseInt(_d[0], 10), parseInt(_d[2], 10)];
				}
			}
		}
	},

	hasRequired: function(id) {
		var _l = UFO.req.length;
		for (var i = 0; i < _l; i++) {
			if (typeof UFO.foList[id][UFO.req[i]] == "undefined") return false;
		}
		return true;
	},
	
	hasFlashVersion: function(major, release) {
		return (UFO.fv[0] > major || (UFO.fv[0] == major && UFO.fv[1] >= release)) ? true : false;
	},

	writeSWF: function(id) {
		var _fo = UFO.foList[id];
		var _e = document.getElementById(id);
		if (UFO.pluginType == "npapi") {
			if (UFO.uaHas("gecko") || UFO.uaHas("xml")) {
				while(_e.hasChildNodes()) {
					_e.removeChild(_e.firstChild);
				}
				var _obj = UFO.createElement("object");
				_obj.setAttribute("type", "application/x-shockwave-flash");
				_obj.setAttribute("data", _fo.movie);
				_obj.setAttribute("width", _fo.width);
				_obj.setAttribute("height", _fo.height);
				var _l = UFO.optAtt.length;
				for (var i = 0; i < _l; i++) {
					if (typeof _fo[UFO.optAtt[i]] != "undefined") _obj.setAttribute(UFO.optAtt[i], _fo[UFO.optAtt[i]]);
				}
				var _o = UFO.opt.concat(UFO.optExc);
				var _l = _o.length;
				for (var i = 0; i < _l; i++) {
					if (typeof _fo[_o[i]] != "undefined") UFO.createObjParam(_obj, _o[i], _fo[_o[i]]);
				}
				_e.appendChild(_obj);
			}
			else {
				var _emb = "";
				var _o = UFO.opt.concat(UFO.optAtt).concat(UFO.optExc);
				var _l = _o.length;
				for (var i = 0; i < _l; i++) {
					if (typeof _fo[_o[i]] != "undefined") _emb += ' ' + _o[i] + '="' + _fo[_o[i]] + '"';
				}
				_e.innerHTML = '<embed type="application/x-shockwave-flash" src="' + _fo.movie + '" width="' + _fo.width + '" height="' + _fo.height + '" pluginspage="http://www.macromedia.com/go/getflashplayer"' + _emb + '></embed>';
			}
		}
		else if (UFO.pluginType == "ax") {
			var _objAtt = "";
			var _l = UFO.optAtt.length;
			for (var i = 0; i < _l; i++) {
				if (typeof _fo[UFO.optAtt[i]] != "undefined") _objAtt += ' ' + UFO.optAtt[i] + '="' + _fo[UFO.optAtt[i]] + '"';
			}
			var _objPar = "";
			var _l = UFO.opt.length;
			for (var i = 0; i < _l; i++) {
				if (typeof _fo[UFO.opt[i]] != "undefined") _objPar += '<param name="' + UFO.opt[i] + '" value="' + _fo[UFO.opt[i]] + '" />';
			}
			var _p = window.location.protocol == "https:" ? "https:" : "http:";
			_e.innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + _objAtt + ' width="' + _fo.width + '" height="' + _fo.height + '" codebase="' + _p + '//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=' + _fo.majorversion + ',0,' + _fo.build + ',0"><param name="movie" value="' + _fo.movie + '" />' + _objPar + '</object>';
		}
	},
		
	createDialog: function(id) {
		var _fo = UFO.foList[id];
		UFO.createCSS("html", "height:100%; overflow:hidden;");
		UFO.createCSS("body", "height:100%; overflow:hidden;");
		UFO.createCSS("#xi-con", "position:absolute; left:0; top:0; z-index:1000; width:100%; height:100%; background-color:#fff; filter:alpha(opacity:75); opacity:0.75;");
		UFO.createCSS("#xi-dia", "position:absolute; left:50%; top:50%; margin-left: -" + Math.round(parseInt(_fo.xiwidth, 10) / 2) + "px; margin-top: -" + Math.round(parseInt(_fo.xiheight, 10) / 2) + "px; width:" + _fo.xiwidth + "px; height:" + _fo.xiheight + "px;");
		var _b = document.getElementsByTagName("body")[0];
		var _c = UFO.createElement("div");
		_c.setAttribute("id", "xi-con");
		var _d = UFO.createElement("div");
		_d.setAttribute("id", "xi-dia");
		_c.appendChild(_d);
		_b.appendChild(_c);
		var _mmu = window.location;
		if (UFO.uaHas("xml") && UFO.uaHas("safari")) {
			var _mmd = document.getElementsByTagName("title")[0].firstChild.nodeValue = document.getElementsByTagName("title")[0].firstChild.nodeValue.slice(0, 47) + " - Flash Player Installation";
		}
		else {
			var _mmd = document.title = document.title.slice(0, 47) + " - Flash Player Installation";
		}
		var _mmp = UFO.pluginType == "ax" ? "ActiveX" : "PlugIn";
		var _uc = typeof _fo.xiurlcancel != "undefined" ? "&xiUrlCancel=" + _fo.xiurlcancel : "";
		var _uf = typeof _fo.xiurlfailed != "undefined" ? "&xiUrlFailed=" + _fo.xiurlfailed : "";
		UFO.foList["xi-dia"] = { movie:_fo.ximovie, width:_fo.xiwidth, height:_fo.xiheight, majorversion:"6", build:"65", flashvars:"MMredirectURL=" + _mmu + "&MMplayerType=" + _mmp + "&MMdoctitle=" + _mmd + _uc + _uf };
		UFO.writeSWF("xi-dia");
	},

	expressInstallCallback: function() {
		var _b = document.getElementsByTagName("body")[0];
		var _c = document.getElementById("xi-con");
		_b.removeChild(_c);
		UFO.createCSS("body", "height:auto; overflow:auto;");
		UFO.createCSS("html", "height:auto; overflow:auto;");
	},

	cleanupIELeaks: function() {
		var _o = document.getElementsByTagName("object");
		var _l = _o.length
		for (var i = 0; i < _l; i++) {
			_o[i].style.display = "none";
			for (var x in _o[i]) {
				if (typeof _o[i][x] == "function") {
					_o[i][x] = null;
				}
			}
		}
	}

};

if (typeof window.attachEvent != "undefined" && UFO.uaHas("ieWin")) {
	window.attachEvent("onunload", UFO.cleanupIELeaks);
}


var remote = null;
function rs(n,u,w,h) {
remote = window.open(u, n, 'width=' + w + ',height=' + h
+',resizable=yes,scrollbars=no');
if (remote != null) {
if (remote.opener == null)
remote.opener = self;
window.name = 'yilff';
remote.location.href = u;
}
}




