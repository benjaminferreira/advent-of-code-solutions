const fs = require("fs");
let joltageSum = 0;

function ChooseBats(bank) {
	bank = bank.trim();

	// find first big numba
	let bigDigit1 = 0;
	let bigSpot1 = 0;
	for (let i = 0; i < bank.length-1; i++) {
		let curDigit = parseInt(bank[i]);
		if (curDigit > bigDigit1) {
			bigDigit1 = curDigit;
			bigSpot1 = i;
		}
	}

	// find second (start at first big number's spot + 1)
	let bigDigit2 = 0;
	for (let i = bigSpot1+1; i < bank.length; i++) {
		let curDigit = parseInt(bank[i]);
		if (curDigit > bigDigit2) {
			bigDigit2 = curDigit;
		}
	}

	joltageSum += parseInt("" + bigDigit1 + bigDigit2);
}

// Get file contents
fs.readFile("input.txt", (err, data) => {
	if (err) throw err;

	// Split up data
	const splitData = data.toString().split("\n");

	splitData.forEach((bank) => ChooseBats(bank));
	console.log("Sum of all joltages: " + joltageSum);
});
