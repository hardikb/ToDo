// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

$("document").ready(function() {
	// viewtodo function call to display the todos..	

    viewToDo();  // to show all the data..
    dataClear(); //to clear the value of input tags

	// To hide the add new todoname form..
	$("#addToDoName").css("display","none");

	$("#conformationBox").fadeOut(100,0);


	// To show the new todoname form..
	$("#btnAddTodoName").click(function(){

	  $("#addToDoName").css("display" , "block");
	  //$("#addToDoName").fadeOut("2000");

	});

	$(".AlertSuceess").hide();
	$(".AlertSuceessRemove").hide();


	$("#btnSubmit").click(function() {

	  	creatTodo();
	  	viewToDo();
	  	dataClear();
	  	 	
 	  });

	$("#btnCloseAdd").click(function(){

	  $("#addToDoName").css("display" , "none");

	});

	$("#btnClearLocalStr").click(function() {
		if(confirm("Are you sure you want to clear all todos?"))
		{
			window.localStorage.clear();
		    location.reload(true);
		}
		else{
			alert("cleared")
		}
	});

	 $("#todosArea").on('change', '.chkdone', function (evt) {
	 		console.log("1", this)
    				var elem = $(this);
    				setTimeout(function(){
    					console.log("2", this)
    					if(elem.is(":checked"))
    					{    						
							elem.fadeOut(1000, function(){    					
			    				elem.parent().remove();
			    				var myid = elem.parent().attr('_index');
			    				console.log(myid);
			    				console.log(todoList[myid]);
			    				todoList.remove(myid);
			    				window.localStorage["myTodos"] = JSON.stringify(todoList);
			    				
		    				});
    					}
    				}, 2000);

    				
    		});

	 $("#todosArea").on('click', '#btnDone', function () {
    				$(this).fadeOut(300, function(){ 
    				$(this).parent().remove(); 
    				console.log(todoList.length);
    				
    				});
    		});

});



var todoList =  [];
	
if(window.localStorage["myTodos"]) {
	try{
		todoList = JSON.parse(window.localStorage["myTodos"]);
	}catch(ex){
		todoList =  [];
	}
}
viewToDo();

function creatTodo() {


	var todos = {};
	todos.valTodoName = $("#todoName").val();
	todos.valTodoTask = $("#todoTask").val();
	todos.valDueDate = $("#dueDate").data('date');

	    todoList.push(todos);
		window.localStorage["myTodos"] = JSON.stringify(todoList);
		
		

}

function viewToDo() {
$("#todosArea").empty();
	
	todoList.sort(function(a,b){		 
	  return new Date(b.valDueDate) - new Date(a.valDueDate);
	});
	
	for (var i = 0; i < todoList.length; i++) {

		var date = todoList[i].valDueDate || "Not specified";
        $("#todosArea").append('<li class="lisArea" _index=' + i +'><input type="checkbox" class="chkdone">' + '<h3>' + todoList[i].valTodoName +'</h3>' + '<h4>Task:' + todoList[i].valTodoTask + '</h4>' + ' <h5 class="BlockDueDate">Due Date:' + date +'</h5>' + '<button class="btnDone" class="btn btn-success">Done</button>' + '</li>');	
		console.log("todoList lenght :" , todoList.length);
		
	};
	$(".lisArea").addClass( "list-group-item list-group-item-info" ).css("border" , "3px double");
}
function dataClear() {

	$("#todoName").val("");
	$("#todoTask").val("");
	$("#dueDate").val("");
}

