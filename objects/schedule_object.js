// the basic construction for Schedule object

const Schedule = () => {
	this.masterMatchList = null;
	this.numSeasonMatches = this.masterMatchList.length();
	this.scheduleURL = 'http://www.mlssoccer.com/schedule?month=all&year=2017&club=select&club_options=9&op=Update&form_build_id=form-ORn_kjWBAHvfd2ahH5gk9xi5HZpp0OTYpCYHbemGCFs&form_id=mp7_schedule_hub_search_filters_form'
};

Schedule.prototype = () => {
	let scheduleScraper = () => {
		return null; // for now
	};
} ();