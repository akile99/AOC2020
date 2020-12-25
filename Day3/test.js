const fs = require('fs');
const test = 'test.txt';



const getArrayMap = (array) => {
	array.map((i,x) => {
		console.log(i[0],i[1])
	})
}

getArrayMap([[3,1],[2,3]])