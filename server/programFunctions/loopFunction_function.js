// this function loops continuously over arrays.

function loopFunction(array, callback, time, repeat) {
	console.log('loop running');
	let i = repeat === false ? 0 : 1,
		total = array.length - 1;
	const loop = () => {
		let id = repeat === false ? array[i] : array[i].id;
		console.log(id);
		callback(id);
		
		if (i < total) {
			i++;
		}
		else {
			console.log('end of loop');
			// some arrays we want to repeat, others no
			if(repeat === false) return;
			i = 0;
		}
		
		setTimeout(loop, time);
	};
	loop();
}

module.exports = loopFunction;