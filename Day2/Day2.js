const fs = require('fs');
const test = 'testinput.txt'
const input = 'input.txt'

partone = (file) => {
	fs.readFile(`./${file}`, (err, data) => {
		let validPasswords = 0;
		const passwords = data.toString().split('\n');
		passwords.map(password => {
			min = password.split('-')[0];
			max = password.split('-')[1].split(' ')[0];
			key = password.split('-')[1].split(' ')[1].split(':')[0];
			pass = password.split(':')[1];

			validPasswords += isPasswordValid(pass);
			//console.log(`min = ${min} + max = ${max} key = ${key} password = ${pass}`);
			//max =
		})
	console.log(validPasswords);
	})
}

isPasswordValid = (pass) => {
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

function a() {
	return 4+5
}

partone(input)