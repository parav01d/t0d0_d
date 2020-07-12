var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(cors());
app.use(bodyParser.json());

var lastId = 3;
var todos = [
  {
    id: 1,
    name: "be awesome",
    isFinished: true
  },
  {
    id: 2,
    name: "be faithful",
    isFinished: false
  },
  {
    id: 3,
    name: "be lovely",
    isFinished: false
  }
]

app.get('/todo', function (request, response) {
  response.status(200).send(todos);
});

app.post('/todo', function (request, response) {
  lastId = lastId +1 ;
  todos.push({
    id: lastId,
    name: request.body.name,
    isFinished: false
  });
  response.status(201).send(todos);
});

app.put('/todo/:id', function (request, response) {
  todos = todos.map(todo => {
    if(todo.id === parseInt(request.params.id, 10)) {
      todo.name = request.body.name;
      todo.isFinished = request.body.isFinished;
    }
    return todo;
  });
  response.status(200).send(todos);
});

app.delete('/todo/:id', function (request, response) {
  todos = todos.filter(todo => (todo.id !== parseInt(request.params.id, 10)));
  response.status(200).send(todos);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
