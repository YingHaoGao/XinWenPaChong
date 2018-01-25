var $ = require("./jquery.min.js");
// var $ = require("jquery");
var num = 0;
var end=false;
var content = [];
var scrollTop = 0;
var content_url="";
getData();

$("#list").on("click", ".title_wrap", function () {
	var _index = $(this).data("index");
	var title = $(this).attr("title");
	var page = `<h1>${title}</h1>
				${content[_index].content}
				`
	$("#list").hide();
	$(".content_page").css({transform:'translateX(0)',display:'block'});
	$(".content").html(page);
	$("#loading").hide();
	$(".close_btn").show();
	$('html ,body').animate({scrollTop: 0}, 300);
});

$(".close_btn").on("click", function () {
	$(this).hide();
	$(".content_page").css({transform:'translateX(100%)',display:'none'});
	$("#list").show();
	$("#loading").show();
})
$('#loading').on('click',function () {
	end ? num=0 : num=num;
	getData();
	$('html ,body').animate({scrollTop: 0}, 300);
})

function getData() {
	var list = "";
	num += 10;
	scrollTop = 140 * num;
	// https://www.toutiao.com/
	//https://www.toutiao.com/api/pc/focus/
	$.get('https://zhuanlan.zhihu.com/api/recommendations/posts?limit=10&offset='+num+'&seed=50', function (result) {
		content=[];
		if(result.length>0){
			end=false;
			for (var i = 0; i < result.length; i++) {
				var data = result[i];
				content.push({
					content:data.content,
					content_url:data.url
				});
				var titleImg = data.titleImage ? `<img class="title_image" src="${data.titleImage}" />` : "";
				list += `<li>
						${titleImg}
						<a class="title_wrap" data-index="${i}" title="${data.title}">
							<h3>${data.title}</h3>
							<div>${data.summary.replace(/<[^>]*>/g, "")}</div>
						</a>
					</li>`
			}
		}else{
			end=true;
			list="没有更多了  -_-||";
		}
		
		$("#list").html(list);
	})
}