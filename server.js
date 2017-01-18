var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
var methodOverride = require('method-override');

var urlencodedParser = bodyParser.urlencoded({ extended: false});

//heroku or local
var PORT = process.env.PORT || 3000;

//var todoNextId = 1;
app.use(methodOverride('_method'));
app.engine('ejs', require('ejs').__express);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('Welcome to Tour for Chinese');
});

//GET /todos/?completed=false&q=work
app.get('/todos', function(req, res) {
	var queryParams = req.query;
	var objToFind = {};
	if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
		objToFind.completed = true;
	} else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
		objToFind.completed = false;
	}

	if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
		objToFind.description = {
			$like: '%' + queryParams.q + '%'
		}
	}

	db.todo.findAll({
		where: objToFind
	}).then(function(todos) {
		res.render('./index', {TODOS:todos});
	}, function(e) {
		res.status(500).send();
	});

});


//Create a Story
app.get('/todos/createStory', function(req, res) {
	res.render('./AddPeople');
});

//GET /todos/:id
app.get('/todos/:id', function(req, res) {
	//need to change req.params.id(string) to an int
	var todoId = parseInt(req.params.id, 10);

	db.todo.findById(todoId).then(function(todo) {
		if (!!todo) {
			res.render('./people', {TODO: todo});
		} else {
			res.status(404).send();
		}
	}, function(e) {
		res.status(500).send();
	});
});

//POST /todos/

app.post('/todos', urlencodedParser,  function(req, res) {
	//filter out other properties and only keep these two
	var body = _.pick(req.body, 'firstname', 'lastname','location','description');
	//call create on db.todo
	db.todo.create(body).then(function() {
		res.redirect('./todos');
	}, function(e) {
		res.status(400).json(e);
	});


});


//DELETE /todos/:id
app.delete('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	db.todo.destroy({
		where: {
			id: todoId
		}
	}).then(function(rowsDeleted) {
		if (rowsDeleted === 0) {
			res.status(404).json({
				error: 'No todo with id'
			});
		} else {
			res.redirect('/todos');
		}
	}, function() {
		res.status(400).send();
	});
});

//PUT /todos/:id  
app.put('/todos/:id', urlencodedParser, function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var body = _.pick(req.body, 'firstname', 'lastname', 'location', 'description');
	// var attributes = {};

	db.todo.findById(todoId).then(function(todo) {
		//**************** findById went well
		if (todo) {
			todo.update(body).then(function(todo) {  		//this then is for todo.update
				res.redirect('/todos'); 					//if todo.update went well -> res.json(todo.toJSON())
			}, function(e) { 								//else if todo.update went wrong
				res.status(400).json(e); 					// --> res.status(400).json(e)
			});
		} else {							//:id doesn't exist
			res.status(404).send(); 
		}

	}, function() { //This res.status(500) will be fired if findById
		res.status(500).send(); //went wrong

	})

});

//{force:true}
db.sequelize.sync({force:true}).then(function() {
	app.listen(PORT, function() {
		console.log('Express listening on port ' + PORT + '!');
		console.log(process.env.DATABASE_URL);
	});
 })


// then(function(){
// 	return db.todo.bulkCreate([
// 	{

//     	"firstname": "Michael",
//     	"lastname": "Liu",
//     	"role": true,
//     	"location": "Los Angelos",
//     	"description": "Let\'s go to ShabuShabu",
//     	"completed": false,

// 	},
// 	{

//     	"firstname": "Ray",
//     	"lastname": "Liu",
//     	"role": true,
//     	"location": "China",
//     	"description": "Whatever",
//     	"completed": false,

// 	},
// 	{

//     	"firstname": "Richard",
//     	"lastname": "Yi",
//     	"role": true,
//     	"location": "Vancouver",
//     	"description": "I m a super dad!",
//     	"completed": false,

// 	}]
// 	)
// })