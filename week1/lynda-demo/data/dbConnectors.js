const mongoose = require('mongoose');
const Sequelize = require('sequelize');
const _ = require('lodash');
const casual = require('casual');

// Mongo Connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/friends');

const friendSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	gender: String,
	language: String,
	age: Number,
	contacts: { type: Array }
});

const Friends = mongoose.model('friends', friendSchema);

//SQL
const sequelize = new Sequelize('database', null, null, {
	dialect: 'sqlite',
	storage: './aliens.sqlite'
});

// Creates Alien Schema
const Aliens = sequelize.define({
	firstName: { type: Sequelize.STRING },
	lastName: { type: Sequelize.STRING },
	planet: { type: Sequelize.STRING }
});

// Creates dummy data
Aliens.sync({ force: true }).then(() => {
	_.times(10, (i) => {
		Aliens.create({
			firstName: casual._first_name,
			lastName: casual._last_name,
			planet: casual.word
		});
	});
});

module.exports = { Friends, Aliens };
