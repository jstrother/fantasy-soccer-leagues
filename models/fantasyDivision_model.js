const mongoose = require('mongoose'),
			
			fantasyDivisionSchema = mongoose.Schema({
			  name: { type: String, required: true },
				clubs: Array,
				schedule: Array
			}),

			FantasyDivision = mongoose.model('FantasyDivision', fantasyDivisionSchema);

module.exports = FantasyDivision;