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
        var resultSet = connection.query("SELECT * from tasks");

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
