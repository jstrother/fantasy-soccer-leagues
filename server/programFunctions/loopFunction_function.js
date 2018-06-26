// this function loops continuously over arrays.

function loopFunction(array, callback, time, repeat) {
	let i = repeat === false ? 0 : 1,
		total = array.length - 1;
	const loop = () => {
		let id = repeat === false ? array[i] : array[i].id; // the second array here is one that is an array of objects in this specific program
		callback(id);
		
		if (i < total) {
			i++;
		}
		else {
			// some arrays we want to repeat, others no
			if(repeat === false) return;
			i = 0;
		}
		
		setTimeout(loop, time);
	};
	loop();
}

module.exports = loopFunction;