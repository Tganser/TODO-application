var express = require ('express');
var app = express();
var bodyParser = require ('body-parser');
var path = require ('path');
var pg = require('pg');

//port on locahost
var port = 9988;
var completeStatus;
//uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

var config = {
  database: 'todo_tasks',
  host: 'localhost',
  port: 5432,
  max: 12
};

var pool = new pg.Pool( config );

//create server, start listening
app.listen(port, function(){
  console.log('! server up on : ', port);
});

//this gets the base html to come up
app.get('/', function(req, res){
  console.log('finding the html');
  res.sendFile(path.resolve('public/views/index.html'));
});


app.post ('/createTask', function(req, res){

    console.log("task recieved from client: ", req.body.info);

    pool.connect(function(err, connection, done){
      if (err) {
        // res.send("Error in /createTask route");
        res.send(400);
      }
      else {
        console.log("success! We reached the database. ");
        //TODO need to set up the database so we can pass info to it!
        completeStatus = 'N';
        connection.query("INSERT into tasks(info, complete) values ($1, $2)", [req.body.info, completeStatus]);

        done();
        res.send(200);
    }

});

});//end app.post


app.get ('/getTasks', function(req, res){
  console.log('get Tasks route hit' );

  var allTasks = [];

    pool.connect(function( err, connection, done){
      if ( err ){
        console.log("we're in the error state");
        res.send("something weird is happening here.");

      } else {
        console.log('connected to db');
        var resultSet = connection.query("SELECT * from tasks WHERE complete='N'");

        resultSet.on( 'row', function ( row ){
          allTasks.push ( row );
          });

        resultSet.on('end', function(){
          done();
        res.send(allTasks);
      });

      }
        });
});//end app.get

app.delete ('/deleteTask', function(req, res){
  console.log('delete route hit' );


    pool.connect(function( err, connection, done){
      if ( err ){
        console.log("we're in the error state");
        res.send("something weird is happening here.");

      } else {
        console.log('connected to db on delete route');
        connection.query("DELETE FROM tasks WHERE id=$1",[req.body.id]);

        //DELETE FROM users WHERE id=1;
        //"DELETE FROM pets WHERE id=$1", [req.params.id]);

        done();
        res.send(200);
      }
        });
});//end app.delete

app.post ('/completeTask', function(req, res){
  console.log('complete route hit' );


    pool.connect(function( err, connection, done){
      if ( err ){
        console.log("we're in the error state");
        res.send("something weird is happening here.");

      } else {
        console.log('connected to db on complete route');
        connection.query("UPDATE tasks SET complete='Y' where id=$1;",[req.body.id]);

        done();
        res.send(200);
      }
        });
});//end app.update

app.get ('/getCompleteTasks', function(req, res){
  console.log('get Complete Tasks route hit' );

  var allCompleteTasks = [];

    pool.connect(function( err, connection, done){
      if ( err ){
        console.log("we're in the error state");
        res.send("something weird is happening here.");

      } else {
        console.log('connected to db');
        var resultSet = connection.query("SELECT * from tasks WHERE complete='Y'");

        resultSet.on( 'row', function ( row ){
          allCompleteTasks.push ( row );
          });

        resultSet.on('end', function(){
          done();
        res.send(allCompleteTasks);
      });

      }
        });
});//end app.get
