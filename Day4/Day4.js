const fs = require('fs');
const test = 'test.txt';
const input = 'input.txt';

const checkPassports = (file) => {
	let validPassports = 0;
	let passports = [];
	let isValid = 0;
	// Read file and assign data string to lines
	fs.readFile(`./${file}`, (err, data) => {
		const lines = data.toString().split('\n\n');
		lines.map((line, i) => {
			passports.push(getKeys(lines[i]));
		})
		passports.map(p => {
			isValid += validatePassportPart1(p);
		})
		console.log(isValid);
	})
}

getKeys = (passport) => {
	let withKeys = []
	//Key === 3 char left of ':''
	clean = passport.replace(/\n/g, ' ');
	keys = clean.split(' ');
	return keys;
}

validatePassportPart1 = (passport) => {
	let count = 0;
	passport.map((key, i) => {
		//byr (Birth Year)
		//four digits; at least 1920 and at most 2002.
		if(key.includes('byr')) { 
			byr = key.split(':');
			if(byr[1] >= 1920 && byr[1] <= 2002) {
				count ++;
			}
		// iyr (Issue Year)
		// four digits; at least 2010 and at most 2020.
		}else if(key.includes('iyr')) {
			iyr = key.split(':');
			if(iyr[1] >= 2010 && iyr[1] <= 2020) {
				count ++;
			}
			
		// eyr (Expiration Year)
		// four digits; at least 2020 and at most 2030.
		}else if(key.includes('eyr')) {
			eyr = key.split(':');
			if(eyr[1] >= 2020 && eyr[1] <= 2030) {
				count ++;
			}
		// hgt (Height)
		// a number followed by either cm or in:
		// If cm, the number must be at least 150 and at most 193.
		// If in, the number must be at least 59 and at most 76.
		}else if(key.includes('hgt')) {
			hgt = key.split(':');
			if(hgt[1].includes('cm')) {
				if((hgt[1].split('cm')[0]) >= 150 && (hgt[1].split('cm')[0]) <= 193) {
					count ++;
				}
			}else if(hgt[1].includes('in')) {
				if((hgt[1].split('in')[0]) >= 59 && (hgt[1].split('in')[0]) <= 76) {
					count ++;
				}
			}
		// hcl (Hair Color)
		// a # followed by exactly six characters 0-9 or a-f.
		}else if(key.includes('hcl')) {
			hcl = key.split(':');
			ch = hcl[1].split('');
			const hexArray = ['0','1','2','3','4','5',
						'6','7','8','9',
						'a','b','c','d','e','f'];
			testHex = 0;
			if(ch[0] === '#' && ch.length === 7) {
				for (let i = 1; i < ch.length; i++) {
					if(hexArray.includes(ch[i])) {
						testHex ++
					}
				}
				if(testHex === 6) {
					count ++;
				}
			}
		// ecl (Eye Color)
		// exactly one of: amb blu brn gry grn hzl oth.
		}else if(key.includes('ecl')) {
			const validEyeColor = ['amb', 'blu', 'brn',
								 'gry', 'grn', 'hzl', 'oth']
			ecl = key.split(':');
			if(validEyeColor.includes(ecl[1])) {
				count ++;
			}
		// pid (Passport ID)
		// a nine-digit number, including leading zeroes.
		}else if(key.includes('pid')) {
			const number = ['0','1','2','3','4',
							'5','6','7','8','9']
			pid = key.split(':');
			let countNumbers = 0;
			if(pid[1].length === 9) {
				ch = pid[1].split('');
				ch.map(n => {
					if(number.includes(n)){
						countNumbers ++
					}
					
				})
				if(countNumbers === 9) {
					count ++;
				}
				
			}
		}
		// ignore cid
		// cid (Country ID)
		// else if(key.includes('cid')) {
		// 	count ++;
		// }
	})
	if(count === 7){
		return 1;
	}else {
		return 0;
	}
}
checkPassports(input);
/*
--- Day 4: Passport Processing ---
You arrive at the airport only to realize that you grabbed your North Pole Credentials instead of your passport. While these documents are extremely similar, North Pole Credentials aren't issued by a country and therefore aren't actually valid documentation for travel in most of the world.

It seems like you're not the only one having problems, though; a very long line has formed for the automatic passport scanners, and the delay could upset your travel itinerary.

Due to some questionable network security, you realize you might be able to solve both of these problems at the same time.

The automatic passport scanners are slow because they're having trouble detecting which passports have all required fields. The expected fields are as follows:

byr (Birth Year)
iyr (Issue Year)
eyr (Expiration Year)
hgt (Height)
hcl (Hair Color)
ecl (Eye Color)
pid (Passport ID)
cid (Country ID)
Passport data is validated in batch files (your puzzle input). Each passport is represented as a sequence of key:value pairs separated by spaces or newlines. Passports are separated by blank lines.

Here is an example batch file containing four passports:

ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in
The first passport is valid - all eight fields are present. The second passport is invalid - it is missing hgt (the Height field).

The third passport is interesting; the only missing field is cid, so it looks like data from North Pole Credentials, not a passport at all! Surely, nobody would mind if you made the system temporarily ignore missing cid fields. Treat this "passport" as valid.

The fourth passport is missing two fields, cid and byr. Missing cid is fine, but missing any other field is not, so this passport is invalid.

According to the above rules, your improved system would report 2 valid passports.

Count the number of valid passports - those that have all required fields. Treat cid as optional. In your batch file, how many passports are valid?

Your puzzle answer was 235.

The first half of this puzzle is complete! It provides one gold star: *

--- Part Two ---
The line is moving more quickly now, but you overhear airport security talking about how passports with invalid data are getting through. Better add some data validation, quick!

You can continue to ignore the cid field, but each other field has strict rules about what values are valid for automatic validation:

byr (Birth Year) - four digits; at least 1920 and at most 2002.
iyr (Issue Year) - four digits; at least 2010 and at most 2020.
eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
hgt (Height) - a number followed by either cm or in:
If cm, the number must be at least 150 and at most 193.
If in, the number must be at least 59 and at most 76.
hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
pid (Passport ID) - a nine-digit number, including leading zeroes.
cid (Country ID) - ignored, missing or not.
Your job is to count the passports where all required fields are both present and valid according to the above rules. Here are some example values:

byr valid:   2002
byr invalid: 2003

hgt valid:   60in
hgt valid:   190cm
hgt invalid: 190in
hgt invalid: 190

hcl valid:   #123abc
hcl invalid: #123abz
hcl invalid: 123abc

ecl valid:   brn
ecl invalid: wat

pid valid:   000000001
pid invalid: 0123456789
Here are some invalid passports:

eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007
Here are some valid passports:

pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719
Count the number of valid passports - those that have all required fields and valid values. Continue to treat cid as optional. In your batch file, how many passports are valid?

*/



