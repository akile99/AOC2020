test = () => {
	let binary = 1000110100;
	let colBin = 100;
	let rowBin = 1000110;
	let digit = parseInt(binary, 2);
	let row = parseInt(rowBin, 2);
	let col = parseInt(colBin, 2);
	console.log('full', digit);
	console.log('mult', row * 8 + col);

}

test();