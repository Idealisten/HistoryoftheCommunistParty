$(function () {
    var ht = "<div id='alertDiv' style='padding:5px 10px 5px 10px; border:1px solid #ccc;z-index: 2147483647; position:fixed ! important; left: 5px; bottom:50px; background-color:#ffffff; color:#000; line-height:24px; font-size:12px;border-radius: 6px;background:#000;filter:alpha(Opacity=80);-moz-opacity:0.8;opacity: 0.8; color:#fff;max-width:90%;display:none'></div>";
    var obj = $("#alertDiv");
    if (obj.length == 0) {
        $(document.body).append(ht);
    }
});


function showlist(f) {
    $.ajax({
        url: "/Ajax/DataHandler.ashx",
        data: { "ac": "PDF", "u": f, "c": Math.random(), path: Math.random() },
        type: 'post',
        async: false,
        dataType: 'text',
        success: function (data) {
            if (data != "-1") {
				$.each(eval(data),function(key,val){ 
					$(".clearfix").append("<li>"+(key+1)+".<a href='/PDF/"+f+"/"+val+"'>"+val+"</a></li>"); 
				}); 
            }
        }
    });
}

function showlist(f) {
    $.ajax({
        url: "/Ajax/DataHandler.ashx",
        data: { "ac": "PDF", "u": f, "c": Math.random(), path: Math.random() },
        type: 'post',
        async: false,
        dataType: 'text',
        success: function (data) {
            if (data != "-1") {
				$.each(eval(data),function(key,val){ 
					$(".clearfix").append("<li>"+(key+1)+".<a href='/PDF/"+f+"/"+val+"'>"+val+"</a></li>"); 
				}); 
            }
        }
    });
}

function showcuotiList()
{
	$.ajax({
        url: "/Ajax/DataHandler.php",
        data: { "ac": "cuoti", "t":tid,"m":m, path: Math.random() },
        type: 'post',
        async: false,
        dataType: 'text',
        success: function (data) {
            if (data.indexOf("@Error")==-1) {
				title=eval(data);
				showctitle();
            }
			else
			{
				JAlert(data);
			}
        }
    });
}

function showctitle()
{
	$("#rs").html("");
	var tx = title[c]["sign"]==0?"<img src=\"images/icon_dan.png\" alt=\"\">":"<img src=\"images/icon_duo.png\" alt=\"\">";
	var btn = title[c]["sign"]==0?"radio":"checkbox";
	$("#t").html(tx+" "+title[c]["title"]).attr("da",title[c]["right"]).attr("data-id",title[c]["id"]);
	var op="";
	var arr = title[c]["option"].split("+|+");
	$.each(arr,function(index,j){
		if(j!="")
		{
			var arr2 = j.split("|");
			if(title[c]["op"]==arr2[0])
			{
				op+="<li><span class='on'>"+arr2[0]+"</span>"+arr2[1]+"</li>";
			}
			else
			{
				op+="<li><span class=''>"+arr2[0]+"</span>"+arr2[1]+"</li>";
			}
		}
	});
	$("#o").html(op);
	$("#rs").html("正确答案："+$("#t").attr("da"));
	//var target = $(this.hash);
	$('.dt-content').animate({
		 //scrollTop($(document).height()-150)
	}, 1000);
}

function nextone(t)
{
	if(t=="+")
	{
		c++;
		if(c>(title.length-1))
		{
			c--;
			JAlert('没有下一道错题了');
			return;
		}
	}
	else
	{
		c--;
		if(c<0)
		{
			JAlert('没有前一道错题了');
			c++;
			return;
		}
	}
	showctitle();
}

function getTitle()
{
	$.ajax({
        url: "/Ajax/DataHandler.php",
        data: { "ac": "Title", "t":tid,"g":gid, path: Math.random() },
        type: 'post',
        async: false,
        dataType: 'text',
        success: function (data) {
            if (data.indexOf("@Error")==-1) {
				title=eval(data);
				showtitle();
				timer(intDiff);
            }
			else
			{
				JAlert(data);
			}
        }
    });
}

function showtitle()
{
	if(c==title.length)
	{
		Result(gkid);
		return;
	}
	$("#rs").html("");
	var tx = title[c]["sign"]==0?"<img src=\"images/icon_dan.png\" alt=\"\">":"<img src=\"images/icon_duo.png\" alt=\"\">";
	var btn = title[c]["sign"]==0?"radio":"checkbox";
	$("#t").html(tx+" "+title[c]["title"]).attr("da",title[c]["right"]).attr("data-id",title[c]["id"]);
	var op="";
	var arr = title[c]["option"].split("+|+");
	$.each(arr,function(index,j){
		if(j!="")
		{
			var arr2 = j.split("|");
			//op+="<input type='"+btn+"' name='option' value='"+arr2[0]+"' style='display:none;'>"+arr2[0]+"."+arr2[1]+"<br />";
			op+="<li><input type='"+btn+"' name='option' value='"+arr2[0]+"' style='display:none;'><span class=''>"+arr2[0]+"</span>"+rexFilter(arr2[1])+"</li>";
		}
	});
	$("#o").html(op);
	if(c<title.length)
	{
		c++;
	}
	choseop();
	isClickB = true;
}


const rexFilter = (originString) => {
    var result = originString.replace(/&([^&;]+);/g, function(matchStr, b) {
        var entity = {
            quot: '"',
            lt: '<',
            gt: '>',
            apos: "'",
            amp: '&',
            ldquo: '"',
            rdquo: '"'
        };
        var r = entity[b];
        return typeof r === 'string' ? r : matchStr;
    });
    return result;
}

function choseop()
{
	$("#o li").each(function(){
    	$(this).click(function(){
			if(isClickA&&isClickB) {
				var op = $(this).find("span");
				var bt = $(this).find("input");
				if($(bt).attr("type")=="radio")
				{
					clear();
				}
				if($(op).attr("class")=="on")
				{
					$(op).attr("class","off");
					$(bt).prop("checked",false);
				}	
				else
				{
					$(op).attr("class","on");
					$(bt).prop("checked",true);
				}
			}
		});
  	});
}

function clear()
{
	$("#o li").each(function(){
    	var op = $(this).find("span");
		var bt = $(this).find("input");
		$(op).attr("class","off");
		$(bt).prop("checked",false);
  	});
}

var isClickA = true; //防止点击快过
var isClickB = true; //防止点击快过
function next()
{
	if(isClickA&&isClickB) {
		isClickA = false;
		isClickB = false;
		var d="";
		$.each($('input[name="option"]:checked'),function(){
			d+=$(this).val();
		});
		
		
		if(d=="")
		{
			JAlert("请先答题！");	
			isClickA = true;
			isClickB = true;
		}
		else
		{
			var s=0;
			if(d!=$("#t").attr("da"))
			{
				s=0;
				JAlert("答题错误！");	
				$("#t").append("<span style='color:red;'>[错]</span>");
				$("#rs").html("答题错误，正确答案："+$("#t").attr("da")).attr("style","color:red;text-align:center;");
				setTimeout(function (){w++; WrongList($("#t").attr("data-id"),tid,gid,d,gkid,s);xiayiti();}, 1000);
			}
			else
			{
				$("#t").find("span").remove().append("<span style='color:green;'>[对]</span>");
				$("#rs").html("回答正确").attr("style","color:green;text-align:center;");
				s=1;
				r++;
				WrongList($("#t").attr("data-id"),tid,gid,d,gkid,s);
				xiayiti();
			}
			
		}
	}
	else
	{
		//JAlert("点击太快喽");
	}
}

function xiayiti()
{
	if(w>0)  //容错题目：错误1道则退出答题。
	{
		Result(gkid);
		return;
	}
	setTimeout(function (){showtitle();}, 1000);
}

function WrongList(i,t,g,o,gk,s)
{
	$.ajax({
        url: "/Ajax/DataHandler.php",
        data: { "ac": "WT", "i": i, "t": t, "g": g, "gk": gk, "o": o, "s": s, path: Math.random() },
        type: 'post',
        async: false,
        dataType: 'text',
        success: function (data) {
            if (data != 1) {
				JAlert(data); 
				return;
            }
			isClickA = true;
        }
    });
}

function Result(gk)
{
	$.ajax({
        url: "/Ajax/DataHandler.php",
        data: { "ac": "GRE", "gk": gk, "w": w, "r": r, "ts": ts, path: Math.random() },
        type: 'post',
        async: false,
        dataType: 'text',
        success: function (data) {
            if (data != 1) {
				JAlert(data); 
				return;
            }
			else
			{
				window.location.replace("../title/resultzh.php?gk="+gkid+"&r="+r+"&w="+w);	
			}
        }
    });	
}

function getResult(gk)
{
	$.ajax({
        url: "/Ajax/DataHandler.php",
        data: { "ac": "SRE", "gk": gk, "w": w, "r": r, path: Math.random() },
        type: 'post',
        async: false,
        dataType: 'text',
        success: function (data) {
            if (data.indexOf("@Error") != -1) {
				JAlert(data);
				return;
            }
			else
			{
				var obj= eval('(' + data + ')');
				$("#jf").html(obj.jifen);
				$("#r").html(obj.result);
				$("w").html(obj.wrong);
				$("r").html(obj.right);
				$("l").html(obj.left);
				$("t").html(timerstr(obj.time));
				if(obj.wrong>0 || obj.right==0)   //只要错1道题就退出
				{
					$(document).attr("title","闯关失败");
					$(".chgjg-content").addClass("sb");
					$("body").attr("style","background-color: #dddddd");
					$(".button02").click(function(){
						window.location.replace('./');
					});
				}
				else
				{
					$(document).attr("title","闯关成功");
				}
				
				if(obj.tg==1)
				{
					$(document).attr("title","通关成功");
					$(".mask").css("height",$(window).height()).fadeIn();
					$(".close").click(function(){
						$(".mask").fadeOut();
						window.location.replace("gankazh.php");
					});
				}
				
				
				
				$(".rego").click(function(){
					window.location.replace('titlezh.php?t='+obj.t+'&g='+obj.g);
				});
			}
        }
    });	
}


function AddGKRecord()
{
	$.ajax({
        url: "/Ajax/DataHandler.php",
        data: { "ac": "AddGK", "t": tid, "g": gid, path: Math.random() },
        type: 'post',
        async: false,
        dataType: 'text',
        success: function (data) {
            if (data.indexOf("@Error") != -1) {
				JAlert(data);
				return;
            }
			else
			{
				gkid=data;
				getTitle();
				$("#quit").removeAttr("disabled")
			}
        }
    });	
}

function getUserJF()
{
	$.ajax({
        url: "/Ajax/DataHandler.php",
        data: { "ac": "GetJF", path: Math.random() },
        type: 'post',
        async: false,
        dataType: 'text',
        success: function (data) {
            if (data.indexOf("@Error") != -1) {
				JAlert(data);
				return;
            }
			else
			{
				$(".jf").html(data);
			}
        }
    });	
}

function getUserPM(t)
{
	$.ajax({
        url: "/Ajax/DataHandler.php",
        data: { "ac": "GetPM","t":t, path: Math.random() },
        type: 'post',
        async: false,
        dataType: 'text',
        success: function (data) {
            if (data.indexOf("@Error") != -1) {
				JAlert(data);
				return;
            }
			else
			{
				if(t==0){pw = data;}
				if(t==1){pa = data;}
				$(".pm").html(data);
			}
        }
    });
}

function getYZDDPMList()
{
	$.ajax({
        url: "/Ajax/DataHandler.php",
        data: { "ac": "YZDDPMList","p":p, path: Math.random() },
        type: 'post',
        async: false,
        dataType: 'text',
        success: function (data) {
            if (data.indexOf("@Error") != -1) {
				JAlert(data);
				$("#bottom").html("无法显示排名信息");
				return;
            }
			else
			{
				var obj = $(".week");
				var p = eval('(' + data + ')');
				if(p.length>0)
				{
					for(var i=0;i< p.length;i++){ 
					    pm++;
					    if(pm<4)
						{
							$(obj).append("<li class=\"boder-b\"><div class=\"phb-zh\"><span><table width='100%' border='0' cellspacing='0'><tr><td width='70'>"+p[i].right+"</td><td align='right' style='font-size:14px'>"+timerstr(p[i].time)+"</td></tr></table></span></div><div class=\"name\"><span><img src=\"images/medal"+pm+".png\"></span><img onerror='javascript:this.src=\"images/headpic.png\";' src='"+p[i].pic+"'>"+p[i].name+"</div></li>");
						}
						else
						{
							$(obj).append("<li class=\"boder-b\"><div class=\"phb-zh\"><span><table width='100%' border='0' cellspacing='0'><tr><td width='70'>"+p[i].right+"</td><td align='right' style='font-size:14px'>"+timerstr(p[i].time)+"</td></tr></table></span></div><div class=\"name\"><span>"+pm+"</span><img onerror='javascript:this.src=\"images/headpic.png\";' src='"+p[i].pic+"'>"+p[i].name+"</div></li>");
						}
					}
					
					if(p.length<50)
					{
						flag=false;
						$("#bottom").html("已经全部显示");
					}
					else
					{
						flag=true;
						cgmore("yzdd");
					}
				}
				else
				{
					$("#bottom").html("已经全部显示");
					flag=false;
				}
				
			}
        }
    });	
}

function getUserMC()
{
	$.ajax({
        url: "/Ajax/DataHandler.php",
        data: { "ac": "GetyzddPM", path: Math.random() },
        type: 'post',
        async: false,
        dataType: 'text',
        success: function (data) {
            if (data.indexOf("@Error") != -1) {
				JAlert(data);
				return;
            }
			else
			{
				var p = eval('(' + data + ')');
				$(".pm").html(p.pm);
				$(".sj").html(p.sj);
			}
        }
    });
}


function cgmore(t)
{
	$(window).scroll(function(){
		var a = document.getElementById("bottom").offsetTop;
		if (a >= $(window).scrollTop() && a < ($(window).scrollTop() + $(window).height())) {
			//alert("div在可视范围");
			if (flag) {
                // 触发后
                flag = false;
                p++;
				getYZDDPMList();
            }
		}
    });
}

function JAlert(s) {
    var obj = $("#alertDiv");
    obj.html(s);
    var x = ($(window).width() - obj.width()) / 2;
    var y = ($(window).height() - obj.height()) / 2;
    obj.css("left", x).css("bottom", y);
    obj.fadeIn().delay(1000).fadeOut();
}


function DAlert()
{
    var obj = $("#alertDiv");
    obj.html("");
    obj.fadeOut();
}


function timer(intDiff) {
	window.setInterval(function () {
		var minute = 0,
			second = 0;//时间默认值        
		if (intDiff > 0) {
			minute = Math.floor(intDiff / 60);
			second = Math.floor(intDiff) - (minute * 60);
		}
		if (minute <= 9) minute = '0' + minute;
		if (second <= 9) second = '0' + second;
		$('#minute').html('<s></s>' + minute + '分');
		$('#second').html('<s></s>' + second + '秒');
		intDiff--;
		if (intDiff <= 0) {
			Result(gkid);
			clearInterval(timer);   //定时器清除；
			//history.back(-1);
		}
		ts++;
	}, 1000);

}

function timerstr(ts) {
	var minute = 0,
		second = 0;//时间默认值        
	if (ts > 0) {
		minute = Math.floor(ts / 60);
		second = Math.floor(ts) - (minute * 60);
	}
	if (minute <= 9) minute = '0' + minute;
	if (second <= 9) second = '0' + second;
    return minute+":"+second;
}
