import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

/*
Start code made from this project: https://codesandbox.io/s/j2ly83749w
*/
const client = new ApolloClient({
	//uri: `https://32ypr38l61.sse.codesandbox.io/`
	uri: `http://localhost:4000/`
});

class App extends Component {
	state = { selectedDog: null };

	onDogSelected = ({ target }) => {
		this.setState(() => ({ selectedDog: target.value }));
	};

	render() {
		return (
			<ApolloProvider client={client}>
				<div>
					<h2>Building Query components (DOG) 🚀</h2>
				</div>
			</ApolloProvider>
		);
	}
}

export default App;
