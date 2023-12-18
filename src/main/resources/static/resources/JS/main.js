//页面3个全局变量

	var bookList={};//，存放界面显示的书的数组；
	var pagenum=1;//当前页面号；缺省为1；
	var pageSize=3;//每面显示3条记录。
	
	
	$.getBookList=function(){
		$.ajax({
    	url:"servlet/BookList",//得到书的列表，根据页面号（pagenum）；
    	async: false,//同步，等待下一步操作，必须先到数据。
		type:"post",
		data:{"pagenum":pagenum,"pageSize":pageSize},
		datatype: "json",
		success:function(data){
			//alert(data);
			bookList=JSON.parse(data);
			//alert(bookList[0].bookName);
			
			}
		});
	}
	//以下为内部函数，显示书籍	
	$.displayBook=function(){
		$("#table tr").eq(0).nextAll().remove();//除第0行外，全部删除其它行。
		for (var i in bookList){
			//alert("123");
			$("#table").append("<tr><td>" + bookList[i].bookName+ "</td><td>"
			+ bookList[i].price	+ "</td><td>"+ bookList[i].storage	
			+ "</td><td><a  href='javascript:void(0);' onclick='$.edit("+ i 
			+ ")'>编辑</a>/<a href='javascript:void(0);' onclick='$.del("+ i + ")'>删除</a></td>");
		}
	}
	/* $(function(){ 
		 $.getBookList();//页面没加载之前，执行该方法，初始化界面：显示第一页的书
		 $.displayBook();//显示；
	 });*/
	//页面加载后的动作处理：
	$(function() {
		//1，点击增加新书的提交动作
		 $.getBookList();//页面没加载之前，执行该方法，初始化界面：显示第一页的书
		 $.displayBook();//显示；
		$("#submit").click(function(){
			//获取用户输入的数据，组成JSON对象
			var bookObject = {
				"bookID" : $("#bookID").val(),
				"bookName":$("#bookName").val(),		
				"price":$("#price").val(),
				"publishing": $("#publishing").val(),
				"storage":$("#num").val(),
				"type":$("#type").val(),
				"pic":$("#pic").attr("src"),
			};
			//alert(bookObject.pic);
			//alert(bookObject.bookID);
		$.ajax({
    		url:"servlet/AddBook",
			type:"post",
			data:{"book":JSON.stringify(bookObject)},
			//datatype: "json",
			success:function(data){
				if(data=="ok") alert("增加新书成功！");
				else alert("失败！");
			}
		});
	});
		
		

	//2、编辑后,SAVE动作；
	$("#editsave").click(function(){
			//获取用户输入的数据，组成JSON对象
			var bookObject = {
				"bookID" : $("#ebookID").val(),
				"bookName":$("#ebookName").val(),		
				"price":$("#eprice").val(),
				"publishing": $("#epublishing").val(),
				"storage":$("#enum").val(),
				"type":$("#etype").val(),
				"pic":$("#bookpic")[0].src,
		};
		$.ajax({
    		url:"servlet/EditBook",
			type:"post",
			data:{"book":JSON.stringify(bookObject)},
			//datatype: "json",
			success:function(data){
				if(data=="ok") alert("修改成功！");
				else alert("失败！");
			}
		});
	});
	//3、点击分类查询
		$(".index").click(function() {
			// 二种思路 ：1、前台实现：删除不符合要求的行，2、先全部删除，再从后台取出该类型的书籍。各有特点。
			$("#table tr").eq(0).nextAll().remove();//采用第二种；除第0行外，全部删除。
			$("#page").css("visibility","hidden");//不做分页处理。隐藏
			$.ajax({
    		url:"servlet/SearchBook",
			type:"post",
			data:{"booktype":$(this).val()},// $(this)表示的是用jquery封装候的当前对象;需要上下文理解。
			datatype: "json",
			success:function(data){
				bookList=JSON.parse(data);;
				$.displayBook();
				}
			});
		});
	});
	
	//4个动作函数，函数定义，事件响应的一种方式。
	$.addBook=function(){//等同于：function addBook(){..}，点击增加新书。
		//1、显示的DIV隐藏；并显示新书增加的界面；
		$("#addNewBook").css("visibility","visible");
		$("#initBook").css("visibility","hidden");
		$("#editDiv").css("visibility","hidden");
	
	}
	//点击“查找与编辑”。
	$.editBook=function(){
		//1、显示的DIV隐藏；并显示新书增加的界面；
		$("#addNewBook").css("visibility","hidden");
		$("#initBook").css("visibility","visible");
		$("#editDiv").css("visibility","hidden");
		$("#page").css("visibility","visible");
		$.getBookList();
		$.displayBook();//显示；
		
	}
	//点击“编辑”，进入编辑页面，并填充数据
	$.edit = function(i) {
		$("#addNewBook").css("visibility","hidden");
		$("#initBook").css("visibility","hidden");
		$("#editDiv").css("visibility","visible");
		$("#page").css("visibility","hidden");
		//填充数据；
		$("#ebookID").val(bookList[i].bookID);
		$("#ebookName").val(bookList[i].bookName);
		$("#eprice").val(bookList[i].price);
		$("#epublishing").val(bookList[i].publishing);
		$("#enum").val(bookList[i].storage);
		$("#etype").val(bookList[i].type);
		$("#bookpic").attr("src",bookList[i].pic);
		alert($("#bookpic")[0].src);
		
	}
	
	$.del = function(t) {
		//alert("bookID="+bookList[t].bookID);
		$.ajax({
			url : "servlet/DelBook",
			type : "post",
			//dataType : "text",
			data : {"bookID" : bookList[t].bookID},
			success : function(data) {
				if(data=="ok") location.reload();
				else alert("删除失败");
			}
		});
	}
	//分页处理的4个动作函数
	//1、设置页面的大小。
	$.setPageSize=function(){
	//获取值
		var str=$("#pagesize").val();
	//输入的不是数字：需要进行处理
		if(isNaN(str)){
			$("#pagesize").val("3");
			str="3";
		}
		pageSize=parseInt(str);
		//规定页面在1到100之间。
		if(pageSize<1) pageSize=1;
		if(pageSize>100)pageSize=100;
	}
	
	$.go = function() {
		//修改pagenum的值；
		var numStr=$("#pagenum").val();//获取文本框中的值
		if(isNaN(numStr)){//若文本框中输入的字母等。
			$("#pagenum").val("1");
			pagenum=1;
		}
		else pagenum=parseInt(numStr);//修改当前的页面值。
		$.getBookList();
		$.displayBook();
		
		}
	
	$.next=function(){
		pagenum=pagenum+1;
		$("#pagenum").val(pagenum);
		//alert(""+pagenum);
		$.getBookList();
		$.displayBook();
	}
	
	$.previous=function(){
		pagenum=pagenum-1;
		if(pagenum<1)pagenum=1;//如果小于1，则为1
		$("#pagenum").val(pagenum);
		//alert(""+pagenum);
		$.getBookList();
		$.displayBook();
	}