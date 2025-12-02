const fs = require("fs");
let currentNum = 50;
let zeroCount = 0;

function Move(code) {
	const codeVal = parseInt(code.slice(1, -1));
	const codeDir = code[0];

	if (codeDir === "R") {
		// If direction is Right, add value to current number
		currentNum += codeVal;

		// Find the hundred's place by dividing current number by 100
		let hundosPlace = Math.floor(currentNum / 100);

		if (hundosPlace) {
			// If a positive number of 100's can fit into the current number, subtract that many hundos from it
			currentNum -= hundosPlace * 100;
		}
	} else if (codeDir === "L") {
		// If direction is Left, subtract value from current number
		currentNum -= codeVal;

		// Find the negative hundred's place by dividing current number by 100 (then multiply by -1)
		let hundosPlace = -1 * Math.floor(currentNum / 100);

		if (hundosPlace) {
			// If a positive number of -100's can fit into the current number, add that many hundos to it
			currentNum += hundosPlace * 100;
		}
	}

	// Final check if num equals zero, up the count
	if (currentNum === 0) {
		zeroCount++;
	}
}

// Get file contents
fs.readFile("input.txt", (err, data) => {
	if (err) throw err;

	// Split up data by new lines
	const splitData = data.toString().split("\n");

	// Run Move function on each line to change currentNum and zeroCount
	splitData.forEach((code) => Move(code));
	console.log("Number of zero's hit: " + zeroCount);
});
