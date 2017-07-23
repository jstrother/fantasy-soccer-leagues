function loopArray(array, callback, time, alwaysRuns) {
	console.log('loop running');
	let i = 0,
		total = array.length - 1;
	const loop = () => {
		console.log(`id: ${array[i]}`);
		callback(array[i]);
		if (i < total) {
			i++;
		}
		else {
			console.log('end of loop');
			if(alwaysRuns === false) return;
			i = 0;
		}
		setTimeout(loop, time);
	};
	loop();
}

module.exports = loopArray;