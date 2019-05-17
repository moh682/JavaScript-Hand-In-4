var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/******************************************
 **************** graphQL *****************
 ******************************************/

var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
var { makeExecutableSchema } = require('graphql-tools');

// The Simple Solution
var typeDefs = `
  type Query {
    getMessage(message:String): Message
  }

  type Message {
    message: String
  }

  type Mutation {
    addMessage(message: String): [Message]
  }
`;

const data = [];

class Message {
	constructor(message) {
		this.message = message;
	}
}

// instead of Root resolver
const resolvers = {
	Query: {
		getMessage: ({ id: input }) => {
			return `input: ${input}`;
		}
	},
	Mutation: {
		addMessage: (root, { message }) => {
			console.log(message);
			data.push(message);
		}
	}
};

var schema = makeExecutableSchema({ typeDefs, resolvers });

/******************************************/

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// Creates the graphql router
app.use(
	'/graphql',
	express_graphql({
		schema,
		rootValue: root,
		graphiql: true
	})
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
