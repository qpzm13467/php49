/*
ͨ������ˮƽ�㼶ѡ��ؼ�
���ߣ��̶���
�汾��v0.70
�޸�ʱ�䣺2010��11��22��
Ҫ�����ݸ�ʽ�����ı���������֮����","�ָ�����������ֵ�������ı�֮����":"�ָ��������ڲ������Զ���ָ�����
*/
;(function($){
//������
$.openLayer = function(p){
	var param = $.extend({
		maxItems : 5,					//���ѡȡ����������
		showLevel : 5,					//��ʾ����
		oneLevel : true,				//�Ƿ�����ѡ����ͬ��������ݣ����Բ�Ϊͬһ�����ڵ㣬
										//falseΪ�����ƣ�����ͬʱѡ��ͬ��������ݣ�trueΪ���ơ�
		onePLevel : false,				//�Ƿ�����ѡ����ͬ����,������ͬһ�����ڵ�����ݣ�
										//falseΪ�����ƣ�����ͬʱѡ��ͬ��������ݣ�trueΪ���ơ�
										//�˲���ֻ����oneLevel:trueʱ����Ч
		splitChar : ",:",				//���ݷָ�������һ���ַ�Ϊ����֮��ķָ������ڶ���Ϊÿ����id����ʾ�ַ����ķָ�����
		returnValue : "",				//�ԣ��ָ���ѡȡ���id��ŵ�λ��id��Ĭ��Ϊһ��input��
		returnText : "",				//�ԣ��ָ���ѡȡ������ִ�ŵ�λ��id������Ϊspan��div��������
		title : "ѡ����ĳ��ӵ�",				//�������ڱ���
		width : 650,					//�������ڿ��
		span_width : {d1:70,d3:150},	//�����Զ���ÿһ�㼶��������ʾ��ȣ����������Ű档
		url : "",						//ajax����url
		pid : "0",						//��id
		shared : true,					//���ҳ�����ж���1���ĵ���ѡ��,�Ƿ���������
		index : 1,						//���ҳ�����ж���1���ĵ���ѡ��,���������֮ǰ�Ĳ���������������ò�ͬ��indexֵ������ͬ�ĵ���ѡ������ͬ�Ĳ������档
		cacheEnable : true,				//�Ƿ�������
		dragEnable : true,				//�Ƿ���������϶�
		pText : ""
	},p||{});

	var fs = {
		init_Container : function(){	//��ʼ��ͷ������������
			//����
			var TITLE = param.title ;
			var CLOSE = "<span id='_cancel' style='cursor:pointer;'>[ȡ��]</span>&nbsp;&nbsp;<span id='_ok' style='cursor:pointer;'>[ȷ��]</span>";
			//ͷ��
			var htmlDiv = "<div id='heads'><div id='headdiv'><span id='title'>" + TITLE + "</span><span id='close'>" + CLOSE + "</span></div>";
			//����������������
			htmlDiv += "<div id='container'></div></div>";
			return htmlDiv;
		},
		init_area : function(){			//��ʼ����������
			var _container = $("#container");
			//��ѡ��������
			var selArea = $("<div id='selArea'><div>��ѡ����Ŀ��</div></div>");
			_container.append(selArea); 
			if (param.maxItems == 1){ selArea.hide(); }

			//��ʼ����һ�㼶�����������Ժ����������clone������
			var d1 = $("<div id='d1'></div>");
			var dc = $("<div id='dc'></div>");

			_container.append(dc).append(d1);//��������������
			dc.hide();
			fs.add_data(d1);//�������
		},
		add_data : function(targetid){					//������ݵ�����������¼�����ʼ����һ�������
			targetid.nextAll().remove();				//ɾ��Ŀ������֮�������ͬ��������

			var pid = param.pid;						//��ѯ���ݵĲ�������id
			var url = param.url;						//ajax��ѯurl
			var data = "";								//�������ݱ���

			if(param.cacheEnable){ data = _cache[pid];}	//���cache���������ȴ�cache��ȡ������
			
			//���cache��û�����ݲ���url��pid��������,����ajax����
			if ((data == null || data == "") &&  url != ""){
				$.ajax({
					type : "post",						//post��ʽ
					url : url,							//ajax��ѯurl
					data : {pid:pid},					//����
					async : false,						//ͬ����ʽ�������õ�����������ͳһ����
					beforeSend : function (){ },		//ajax��ѯ����֮ǰ������������ʾ��Ϣ����
					success : function (d) {			//ajax����ɹ��󷵻�����
						data = d;
						if(param.cacheEnable){ _cache[pid] = data;}		//cache����,�������ݵ�cache
					}
				});
			}

			//cache��ajax��û�����ݻ��ߴ���,�����ʾ��Ϣ����
			if(data == "" || data == null){
				targetid.empty().show().append($("<span style='color:red;'>û���¼����ݣ�</span>"));
				return;
			}

			var span_width = eval("param.span_width."+targetid.attr("id"));			//ÿ��������ʾ��Ŀ��
			span_width = (span_width == undefined ? param.span_width.d1:span_width );//û�����õĻ�����ʹ�õ�һ������������ֵ
			var inspan_width = ($.browser.msie)?1:3;								//�ڲ����ֺ�checkbox֮��ľ���
	
			var dat = data.split(param.splitChar.charAt(0));						//�����趨�ָ�������������һ�ηָ����������������
			var html = [];															//��ʽ�����ݴ��������Ϊ�����Ч�ʣ�ʹ��������
			var ss = [];
			//ѭ����ø�ʽ������ʾ�ַ���
			for(var i = 0 ; i < dat.length ; i++){
				ss = dat[i].split(param.splitChar.charAt(1));		//�ڶ��ηָ������ÿ���������е�����ֵ����ʾ�ַ���
				html.push("<span title='"+dat[i]+"' name='"+pid+"' style='width:"+span_width+"px;white-space:nowrap;float:left;'>");
				html.push("<input type='checkbox' value='" + ss[0] + "'>");
				html.push("<span name='"+targetid.attr("id")+"' style='margin-left:"+inspan_width+"px;'>" + ss[1] + "</span>");
				html.push("</span>");
			}
			targetid.empty().show().append($(html.join("")));		//��ʽ����html�������Ŀ������
			if(param.maxItems > 1){fs.change_status(targetid);}		//ͬ��״̬,��ѡ״̬�ޱ�Ҫ
				
			fs.add_input_event(targetid);							//����input���¼���
			fs.add_span_event(targetid);							//����span���¼���
		},
		init_event : function(){		//����ѡ�����checkbox���¼���ȷ����ȡ���¼���Ӧ
			$("#selArea").find(":input").live("click",function(){
				$(this).parent().remove();
				$("#container > div").find(":input[value="+this.value+"]").attr("checked",false);
			});
			$("#_cancel").click(function(){
				$("#bodybg").hide();
				$("#popupAddr").fadeOut();
			});
			$("#_ok").click(function(){
				var vals = "";
				var txts = "";
				$("#selArea").find(":input").each(function(i){
					vals += ("," + this.value);
					txts += ("," + $(this).next().text());
				});
				fs.set_returnVals(param.returnValue,txts);
				fs.set_returnVals(param.returnText,txts);
		
				$("#bodybg").hide();
				$("#popupAddr").fadeOut();
			});
		},
		change_status : function(targetid){ //�л���ͬԪ�أ��γɲ�ͬ�¼��б�ʱ��ͬ����ѡ������Ԫ�غ����γ���Ԫ�ص�ѡ��״̬
			var selArea = $("#selArea");
			var selinputs = selArea.find(":input");
			var vals =[];

			if(selinputs.length > 0){
				selinputs.each(function(){ vals.push(this.value); });
			}
			targetid.find(":input").each(function(){
				if($.inArray(this.value,vals) != -1){ this.checked = true; }
			});
		},
		add_input_event : function(targetid){	//�����ɵ�Ԫ�ؼ������input�ĵ����¼���Ӧ
			var selArea = $("#selArea");
			targetid.find(":input").click(function(){
				if (param.maxItems == 1){
					selArea.find("span").remove();
					$("#container > div").find(":checked:first").not($(this)).attr("checked",false);
					$(this).css("color","white");
					selArea.append($(this).parent().clone());
					$("#_ok").click();
				}else {
					if(this.checked && fs.check_level(this) && fs.check_num(this)){
						selArea.append($(this).parent().clone().css({"width":"","background":"","border":""}));
					}else{
						selArea.find(":input[value="+this.value+"]").parent().remove();
					}			
				}
			});
		},
		add_span_event : function(targetid){	//�����ɵ�Ԫ�ؼ������span�ĵ����¼���Ӧ
			var maxlev = param.showLevel;
			var thislevel = parseInt(targetid.attr("id").substring(1));
	
			var spans = targetid.children("span");
			spans.children("span").click(function(e){
				if (maxlev > thislevel){
					var next=$("#dc").clone();
					next.attr("id","d"+(thislevel+1));
					targetid.after(next);
			
					spans.css({"background":"","border":"","margin":""});
					$(this).parent().css({"background":"orange","border":"1px ridge","margin":"-1"});
					param.pid = $(this).prev().val();
					fs.add_data(next,param);
				}else{
					alert("��ǰ����ֻ������ʾ" +  maxlev + "�����ݣ�");
				}
			});
		},
		check_num : function(obj){	//�������ѡ������
			if($("#selArea").find(":input").size() < param.maxItems){
				return true;
			}else{
				obj.checked = false;
				alert("���ֻ��ѡ��"+param.maxItems+"��ѡ��");
				return false;
			}
		},
		check_level : function(obj){	//����Ƿ�����ѡȡͬ����ѡ�����ͬ��idѡ��
			var selobj = $("#selArea > span");
			if(selobj.length ==0) return true;

			var oneLevel = param.oneLevel;
			if(oneLevel == false){
				return true;
			}else{
				var selLevel = selobj.find("span:first").attr("name");		//��ѡ��Ԫ�صļ���
				var thislevel = $(obj).next().attr("name");					//��ǰԪ�ؼ���
				if(selLevel != thislevel) {
					obj.checked = false;
					alert("��ǰ�趨ֻ����ѡ��ͬһ�����Ԫ�أ�");
					return  false;
				}else{
					var onePLevel = param.onePLevel;		//�Ƿ��趨ֻ����ѡ��ͬһ��id��ͬ��Ԫ��
					if (onePLevel == false) {
						return true;
					}else{
						var parentId = selobj.attr("name");					//��ѡ��Ԫ�صĸ�id
						var thisParentId = $(obj).parent().attr("name");	//��ǰԪ�ظ�id
						if (parentId != thisParentId){
							obj.checked = false;
							alert("��ǰ�趨ֻ����ѡ��ͬһ��������ͬ�ϼ���Ԫ�أ�");
							return false;
						}
						return true;
					}
				}
			}
		},
		set_returnVals : function(id,vals) {	//��"ȷ��"��ťʱ�������÷���ֵ
			if(id != ""){
				var Container = $("#" + id);
				if(Container.length > 0){
					if(Container.is("input")){
						Container.val(vals.substring(1));
					}else{
						Container.text(vals.substring(1));
					}
				}
				var area=$('input').eq(3).val();
    				// $('span').eq(3).html(area);  
			}	
		},
		init_style : function() {	//��ʼ��css
			var _margin = 4;
			var _width = param.width-_margin*5;

			var css = [];
			
			css.push("#popupAddr {position:absolute;;width:"+param.width+"px;height:auto;background-color:#fff;z-index:99;-moz-box-shadow:5px 5px 5px rgba(0,0,0,0.5);box-shadow:5px 5px 5px rgba(0,0,0,0.5);filter:progid:DXImageTransform.Microsoft.dropshadow(OffX=5,OffY=5,Color=gray);-ms-filter:progid:DXImageTransform.Microsoft.dropshadow(OffX=5,OffY=5,Color='gray');}");
			css.push("#bodybg {width:100%;z-index:98;position:absolute;top:0;left:0;background-color:#fff;opacity:0.1;filter:alpha(opacity =10);}");
			css.push("#heads {width:100%;font-size:14px;margin:0 auto;}");
			css.push("#headdiv {color:#006600;background-color:#EBF5EB;height:45px;margin:1px;}");
			css.push("#title {line-height:45px;font-size:15px;color:green;padding-left:20px;float:left;}");
			css.push("#close {float:right;padding-right:12px;line-height:45px;}");
			css.push("#container {width:100%;height:auto;margin-left:48px;}");
			css.push("#selArea {width:"+_width+"px;height:48px;margin:"+_margin+"px;padding:5px;background-color:#f4f4f4;float:left;}");
			css.push("#pbar {width:"+_width+"px;height:12px;margin:4px;display:block;overflow: hidden;font-size:1px;border:1px solid red;background:#333333;float:left;}");
	
			var d_css = "{width:"+_width+"px;margin:"+_margin+"px;padding:5px;height:auto;background-color:#fff;float:left;}";
			css.push("dc "+d_css);
			for (i = 1; i <=param.showLevel; i++) { css.push("#d" + i + " " + d_css); }
			$("head").append($("<style>"+css.join(" ")+"</style>"));
		}
	};

	if (window._cache == undefined || !param.shared ){ _cache = {}; }
	if (window._index == undefined) { _index = param.index; }

	fs.init_style();//��ʼ����ʽ

	var popupDiv = $("#popupAddr");	//����һ��divԪ��
	if (popupDiv.length == 0 ) {
		popupDiv = $("<div id='popupAddr'></div>");
		$("body").append(popupDiv);
	}
	var yPos = ($(window).height()-popupDiv.height()) / 2;
	var xPos = ($(window).width()-popupDiv.width()) / 2;
	popupDiv.css({"top": yPos,"left": xPos}).show();
	
	var bodyBack = $("#bodybg");  //����������
	if (bodyBack.length == 0 ) {
		bodyBack = $("<div id='bodybg'></div>");
		bodyBack.height($(window).height());
		$("body").append(bodyBack);
		popupDiv.html(fs.init_Container());	//����������
		fs.init_area();
		fs.init_event();
	}else {
		if (_index != param.index) {
			popupDiv.html(fs.init_Container(param));
			fs.init_area();
			fs.init_event();
			_index = param.index;
		}
	}

	if (param.dragEnable) {		//��������϶�
		var _move=false;		//�ƶ����
		var _x,_y;				//�����ؼ����Ͻǵ����λ��
		popupDiv.mousedown(function(e){
			_move=true;
			_x=e.pageX-parseInt(popupDiv.css("left"));
			_y=e.pageY-parseInt(popupDiv.css("top"));
		}).mousemove(function(e){
			if(_move){
				var x=e.pageX-_x;//�ƶ�ʱ�������λ�ü���ؼ����Ͻǵľ���λ��
				var y=e.pageY-_y;
				popupDiv.css({top:y,left:x});//�ؼ���λ��
		}}).mouseup(function(){ _move=false; });
	}
	bodyBack.show();
	popupDiv.fadeIn();
}

})(jQuery)

_cache ={"0":"0100:������,0200:�Ϻ�,0300:�㶫ʡ,0500:�����,0600:������,0700:����ʡ,0800:�㽭ʡ,0900:�Ĵ�ʡ,1000:����ʡ,1100:����ʡ,1200:ɽ��ʡ,1300:����ʡ,1400:����,1500:����ʡ,1600:�ӱ�ʡ,1700:����ʡ,1800:����ʡ,1900:����ʡ,2000:����ʡ,2100:ɽ��ʡ,2200:������ʡ,2300:����ʡ,2400:����ʡ,2500:����ʡ,2600:����ʡ,2700:����ʡ,2800:���ɹ�,2900:����,3000:����,3100:�½�,3200:�ຣʡ,3300:���,3400:����,3500:̨��,3600:����"
,"0300":"0302:������,0303:������,0304:��ͷ��,0305:�麣��,0306:��ɽ��,0307:��ɽ��,0308:��ݸ��,0310:�ӻ���,0314:�ع���,0315:������,0316:������,0317:տ����,0318:������,0319:��Զ��,0320:������,0321:��Դ��,0322:������,0323:ï����,0324:��β��,0325:˳����"
,"0700":"0702:�Ͼ���,0703:������,0704:������,0705:������,0706:��ɽ��,0707:������,0708:������,0709:��ͨ��,0710:����,0711:������,0712:���Ƹ���,0713:�γ���,0714:�żҸ���"
,"0800":"0802:������,0803:������,0804:������,0805:������,0806:����,0807:������,0808:̨����,0809:������,0810:��ˮ��,0811:��ɽ��,0812:������"
,"0900":"0902:�ɶ���,0903:������,0904:��ɽ��,0905:������,0906:������,0907:�˱���,0908:�Թ���,0909:�ڽ���,0910:��֦����"
,"1000":"1002:������,1003:������"
,"1100":"1102:������,1103:������,1104:Ȫ����,1105:������,1106:������,1107:������,1108:��ƽ��,1109:������,1110:������"
,"1200":"1202:������,1203:�ൺ��,1204:��̨��,1205:Ϋ����,1206:������,1207:�Ͳ���,1208:������,1209:������,1210:��Ӫ��,1211:̩����,1212:������,1213:������"
,"1300":"1302:�ϲ���,1303:�Ž���"
,"1400":"1402:������,1403:������,1404:������,1405:������"
,"1500":"1502:�Ϸ���,1503:�ߺ���,1504:������,1505:��ɽ��,1506:������,1507:������,1508:ͭ����,1509:������,1510:��ɽ��,1511:������,1512:������,1513:������,1514:������,1515:������"
,"1600":"1602:ʯ��ׯ��,1603:�ȷ���,1604:������,1605:��ɽ��,1606:�ػʵ���,1607:������"
,"1700":"1702:֣����,1703:������,1704:������"
,"1800":"1802:�人��,1803:�˲���,1804:��ʯ��,1805:�差��,1806:ʮ����,1807:������,1808:������,1809:Т����,1810:������"
,"1900":"1902:��ɳ��,1903:������,1904:��̶��,1905:������,1906:������,1907:������,1908:������,1909:������,1910:������,1911:������,1912:¦����,1913:������,1914:�żҽ���"
,"2000":"2002:������,2003:������,2004:������,2005:ͭ����,2006:�Ӱ���"
,"2100":"2102:̫ԭ��,2103:�˳���,2104:��ͬ��,2105:�ٷ���"
,"2200":"2202:��������,2203:������,2204:�绯��,2205:������,2206:���������,2207:ĵ������,2208:��ľ˹"
,"2300":"2302:������,2303:������,2304:��ɽ��,2305:Ӫ����,2306:��˳��,2307:������,2308:������,2309:��«����,2310:��Ϫ��,2311:������,2312:������"
,"2400":"2402:������,2403:������,2404:��Դ��,2405:ͨ����"
,"2500":"2502:������,2503:������,2504:��Ϫ��,2505:������,2506:������,2507:������,2508:��Զ��,2509:������,2510:�����"
,"2600":"2602:������,2603:������"
,"2700":"2702:������,2703:�����"
,"2800":"2802:���ͺ�����,2803:�����,2804:��ͷ��"
,"2900":"2902:������"
,"3000":"3002:������,3003:�տ�����"
,"3100":"3102:��³ľ����,3103:����������,3104:��ʲ������"
,"3200":"3202:������"
,"1607":"16071:������,16072:����,16073:��ɽ,16074:�ϴ�"
,"1602":"16021:����,16022:�޼�,16023:�»���"
,"16071":"160711:�ǹ���,160712:������,160713:�����,160714:��ׯ��,160715:���,160716:�����"};						//����