const fs = require('fs');
const test = 'test.txt'
const input = 'input.txt'

question1 = (text, file) => {
	fs.readFile(`./${file}`, (err, data) => {
	console.time('expense-time');
	if (err) {
			console.log('eerrerrrrooorrr');
		}
	
	const expenseReport = data.toString();
	const expenseReportArray = expenseReport.split('\n');
	// loop over all the line in the file
	console.log(`The answer is to ${text} is ${partone(expenseReportArray)}`);
	console.log(`The second part ${text} is ${parttwo(expenseReportArray)}`);
	console.timeEnd('expense-time');
	})
}
	

checkSum = (a, b) => Number(a) + Number(b);

multiplyNums = (a, b) => (Number(a) * Number(b));

partone = (array) => {
	let first = 0;
	let second = 0;
	array.some(a => {
		array.some(b => {
			if(checkSum(a, b) === 2020) {
				first = a;
				second = b;
			};
		})
	})
	return multiplyNums(first,second)
}

parttwo = (array) => {
	let first = 0;
	let second = 0;
	let test = 0;
	array.some(a => {
		array.some(b => {
			array.some(c => {
				if(checkSum(checkSum(a,b),c) === 2020) {
					first = a;
					second = b;
					test = c;
				}
			})
		})
	})
	return multiplyNums(multiplyNums(first,second),test)
}

	// multiply the two numbers that equal 2020
//question1("test", test)
question1("input", input)

