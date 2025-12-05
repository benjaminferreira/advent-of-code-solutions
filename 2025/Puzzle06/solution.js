const fs = require("fs");
let joltageSum = 0;

function ChooseBats(bank) {
	bank = bank.trim();
	let batCount = 12; // Set battery count to whatever you want
	let joltageStr = "";
	let bigSpot = -1;

	// For each battery, find the highest digit leaving enough room for remaining batteries
	while (batCount > 0) {
		batCount--;
		let bigDigit = 0;
		
		for (let i = bigSpot + 1; i < bank.length - batCount; i++) {
			let curDigit = parseInt(bank[i]);
			if (curDigit > bigDigit) {
				bigDigit = curDigit;
				bigSpot = i;
			}
		}

		joltageStr += bigDigit;
	}

	joltageSum += parseInt(joltageStr);
}

// Get file contents
fs.readFile("input.txt", (err, data) => {
	if (err) throw err;

	// Split up data
	const splitData = data.toString().split("\n");

	splitData.forEach((bank) => ChooseBats(bank));
	console.log("Sum of all joltages: " + joltageSum);
});
