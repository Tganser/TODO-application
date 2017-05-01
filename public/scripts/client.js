console.log('js');

$(document).ready(onReady);

function onReady(){
  console.log('jQ sourced');
  getAllTasks();
  //set up event listeners
  $('#create').on('click', createATask);
  $('.delete').on('click', deleteTask);
  $('.task').on('click', completeTask);
}

$('.task').on('click', completeTask);


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

} //end getAllTasks

function appendTasks (responseArray){

  $('.allTasks').empty();
  for (var i = 0; i < responseArray.length; i++) {
    $('.allTasks').append('<div class="task"> <p> &#9744      '+  responseArray[i].info + '</p></div>');
  }
}

function deleteTask(){
  console.log('in delete task function');
}

function completeTask(){
  //  &#10003; unicode for checkmark
  // &#9745
  console.log('in complete task function');
  $(this).addClass('.completed-task');
}
