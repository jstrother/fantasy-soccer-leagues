// this function loops continuously over arrays.

function loopFunction(array, callback, time, isLeagueArray) {
	console.log('loop running');
	let i = isLeagueArray === false ? 0 : 1,
		total = array.length - 1;
	const loop = () => {
		let id = isLeagueArray === false ? array[i] : array[i].id;
		console.log(id);
		callback(id);
		
		if (i < total) {
			i++;
		}
		else {
			console.log('end of loop');
			// if this is an array of leagues, then we want the loop to repeat, if it is playerIds, then we want it to stop so the next league can be processed
			if(isLeagueArray === false) return;
			i = 0;
		}
		
		setTimeout(loop, time);
	};
	loop();
}

module.exports = loopFunction;