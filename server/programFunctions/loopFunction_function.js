// this function loops continuously over arrays.

function loopFunction(array, callback, time, repeat) {
	console.log('loop running');
	let i = 1,
		total = array.length - 1;
	const loop = () => {
		let id = array[i].id;
		console.log(id);
		callback(id);
		
		if (i < total) {
			i++;
		}
		else {
			console.log('end of loop');
			// some arrays we want to repeat, others no
			if(repeat === false) return;
			i = 1;
		}
		
		setTimeout(loop, time);
	};
	loop();
}

module.exports = loopFunction;