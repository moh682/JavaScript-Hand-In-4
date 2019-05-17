const express = require('express');
const graphqlHTTP = require('express-graphql');
const { schema } = require('./data/schema');

const app = express();

app.get('/', (req, res, next) => {
	res.send('it workss');
});

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true
	})
);

app.listen(8080, () => console.log('running server in port localhost//:8080'));
