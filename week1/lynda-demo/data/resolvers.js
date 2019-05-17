const mongoose = require('mongoose');
const Friends = require('./dbConnectors');

// resolver map
module.exports = {
	Query: {
		getFriend: ({ id }) => {
			return new Friend(id, friendDatabase[id]);
		}
	},
	Mutation: {
		createFriend: (root, { input }) => {
			const newFriend = new Friends({
				firstName: input.firstName,
				lastName: input.lastName,
				gender: input.gender,
				language: input.language,
				age: input.age,
				email: input.email,
				contacts: input.contacts
			});

			newFriend.id = newFriend._id;

			return newFriend.save();
		}
	}
};
