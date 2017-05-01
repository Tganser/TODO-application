console.log('js');

$(document).ready(onReady);

function onReady(){
  console.log('jQ sourced');
  getAllTasks();
  getCompleteTasks();

  //set up event listeners
  $('#create').on('click', createATask);
  $('.allTasks').on('click', '.delete', deleteTask);
  $('.allTasks').on('click', '.completebutton', completeTask);
  $('.completedTasks').on('click', '.delete', deleteTask);
}



//creates a new task in the database
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
      getAllTasks();
      getCompleteTasks();

    }
  });
}

//get all the tasks from the database, this is called in every function as well
function getAllTasks(){
  $.ajax ({
    url: "/getTasks",
    type: "GET",
    success: function(response){
      console.log('in get Tasks route', response);
      appendTasks(response);
    }
  });
} //end getAllTasks

//this brings the tasks to the DOM, called in getAllTasks()
function appendTasks (responseArray){
  $('.allTasks').empty();
  for (var i = 0; i < responseArray.length; i++) {
    $('.allTasks').append('<div class="task" data-ident="'+responseArray[i].id+'">  <p>'+  responseArray[i].info + ' <button class="completebutton" data-ident="'+responseArray[i].id+'">Complete</button> <button class="delete" data-ident="'+responseArray[i].id+'">Delete</button></p></div>');
  }
}
//<span class="box"> &#9744</span>

//deletes a task (from both all tasks and completed tasks sections)
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
      getCompleteTasks();
    }
  });
}

//completes the task - moves it to lower section and changes coloring
function completeTask(){
  //  &#10003; unicode for checkmark
  // &#9745
  console.log('in complete task function');

  taskToUpdate = {
    id : $(this).data().ident
  };
  //
  // console.log(taskToUpdate);
  // console.log($(this).parent().data().ident);
  // console.log($(this).parent().data());
  // console.log($(this).data().ident);
  // console.log($(this).data());

  $(this).parent().addClass('completed-task');


  $.ajax ({
    url: "/completeTask",
    type: "POST",
    data: taskToUpdate,
    success: function(response){
      console.log('in update route', response);
      $(this).parent().addClass('completed-task');
      getAllTasks();
      getCompleteTasks();
    }
  });
  getAllTasks();
  getCompleteTasks();
}

//completes task on button click
function getCompleteTasks(){

    $.ajax ({
      url: "/getCompleteTasks",
      type: "GET",
      success: function(response){
        console.log('in get complete Tasks route', response);
        appendCompleteTasks(response);
      }
    });
  } //end getAllTasks


//brings completed tasks to the DOM
  function appendCompleteTasks (responseArray){
    $('.completedTasks').empty();
    for (var i = 0; i < responseArray.length; i++) {
      $('.completedTasks').append('<div class="task" data-ident="'+responseArray[i].id+'">  <p>'+  responseArray[i].info + ' <button class="delete" data-ident="'+responseArray[i].id+'">Delete</button></p></div>');
    }
  }
