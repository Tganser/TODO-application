console.log('js');

$(document).ready(onReady);

function onReady(){
  console.log('jQ sourced');
  getAllTasks();

  //set up event listeners
  $('#create').on('click', createATask);

  $('.allTasks').on('click', '.delete', deleteTask);
  $('.allTasks').on('click', '.completebutton', completeTask);
  // $('.allTasks').on('click', '.task', completeTask);
  // $('.delete').on('click', deleteTask);
  // $('.completebutton').on('click', completeTask);
}

// create a task
//function createATask
//input field, title, complete (checkbox?), delete (button)
//ajax post to server

//show all tasks
//show all tasks
//GET route to server

// complete a task
// change visual represntation of task
//event listener for complete click
//mute coloring

//delete task
// delete route to database


function createATask(){
  var task = $('#newTask').val();
  console.log("This is the new task: ", task);

  var taskToSend = {
    info: task
  };

  $.ajax ({
    url: "/createTask",
    type: "POST",
    data: taskToSend,
    success: function(response){
      console.log('in /createTask route', response);
      console.log(response);

    }
  });
  getAllTasks();
}


function getAllTasks(){

  $.ajax ({
    url: "/getTasks",
    type: "GET",
    success: function(response){
      console.log('in get Tasks route', response);
      appendTasks(response);
    }
  });
  // $('.task').on('click', completeTask);
} //end getAllTasks

function appendTasks (responseArray){

  $('.allTasks').empty();
  for (var i = 0; i < responseArray.length; i++) {
    $('.allTasks').append('<div class="task" data-ident="'+responseArray[i].id+'">  <p>'+  responseArray[i].info + ' <button class="completebutton">Complete</button> <button class="delete" data-ident="'+responseArray[i].id+'">Delete</button></p></div>');
  }
}
//<span class="box"> &#9744</span>

function deleteTask(){
  console.log('in delete task function');
  console.log($(this).data().ident);

  taskToDelete = {
    id : $(this).data().ident
  };

  $.ajax ({
    url: "/deleteTask",
    type: "DELETE",
    data: taskToDelete,
    success: function(response){
      console.log('in delete route', response);
      getAllTasks();
    }
  });

}


function completeTask(){
  //  &#10003; unicode for checkmark
  // &#9745
  console.log('in complete task function');
  // var thistask = $(this).parent().data(ident);
  // console.log('ID FOR TASK: ' + thistask);
  $(this).parent().addClass('completed-task');
  // console.log($(this).parent());
  // $(this).parent('.box').remove();
  // $('.box').remove();
  // $('.box').append('<span>&#9745</span>');
  // $('.completedTasks').append('<p>'+  $(this).parent().info + '<button class="delete">Delete</button></p></div>');


}
