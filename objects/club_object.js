// the basic construction for all clubs

const Club = () => {
	this.clubName = null;
	this.clubRoster = null;
	this.clubSchedule = null;
};

Club.prototype = () {
	// add method to keep track of club name in case a team renames itself
	// add method to search players by their club and add to roster
	// add method to search masterSchedule and filter out club specific matches
} ();