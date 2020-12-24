const fs = require('fs');
const test = 'testinput.txt'
const input = 'input.txt'

partOne = (file) => {
	console.time('test-one');
	fs.readFile(`./${file}`, (err, data) => {
		let validPasswords = 0;
		const passwords = data.toString().split('\n');
		passwords.map(password => {
			min = password.split('-')[0];
			max = password.split('-')[1].split(' ')[0];
			key = password.split('-')[1].split(' ')[1].split(':')[0];
			pass = password.split(':')[1];

			validPasswords += isPasswordOneValid(pass);
			//console.log(`min = ${min} + max = ${max} key = ${key} password = ${pass}`);
			//max =
		})
	console.log(validPasswords);
	console.timeEnd('test-one');
	})
	
}

partTwo = (file) => {
	console.time('test-two');
	fs.readFile(`./${file}`, (err, data) => {
		let validPasswords = 0;
		const passwords = data.toString().split('\n');
		passwords.map(password => {
			min = password.split('-')[0];
			max = password.split('-')[1].split(' ')[0];
			key = password.split('-')[1].split(' ')[1].split(':')[0];
			pass = password.split(':')[1];

			validPasswords += isPasswordTwoValid(pass);
			//console.log(`min = ${min} + max = ${max} key = ${key} password = ${pass}`);
			//max =
		})
	console.log(validPasswords);
	console.timeEnd('test-two');
	})

}

isPasswordOneValid = (pass) => {
	let count = 0; 
	pass.split('').map(i => {
		if(i === key) {
			count ++
		}
	})
	if(min <= count && count <= max) {
		return 1;
	}else {return 0}

}

//if key is at position 1 or 2
isPasswordTwoValid = (pass) => {
	let count = 0; 
	pass.split('').map((char, index) => {
		if(Number(index)  === Number(min) && char === key) {
			count ++;
		}else if(Number(index)  === Number(max) && char === key) {
			count ++;
		}
	})
	if(count === 1) {
		return 1;
	}
	else {
		return 0;
	}
}

partOne(input)
partTwo(input)

















