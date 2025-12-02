const fs = require("fs");
let currentNum = 50;
let zeroCount = 0;

// Moves to the Right one spot, returning the new value
function MoveUpOne(val) {
	if (val === 99) {
		zeroCount++;
		return 0;
	} else {
		return val + 1;
	}
}

// Moves to the Left one spot, returning the new value
function MoveDownOne(val) {
	if (val === 1) {
		zeroCount++;
		return 0;
	} else if (val === 0) {
		return 99;
	} else {
		return val - 1;
	}
}

// Re-factored from puzzle 1 to go super-granular mode on it (the math stuff was getting annoying)
function Move(code) {
	let codeVal = parseInt(code.slice(1, -1));
	const codeDir = code[0];

	if (codeDir === "R") {
		while (codeVal > 0) {
			currentNum = MoveUpOne(currentNum);
			codeVal--;
		}
	} else if (codeDir === "L") {
		while (codeVal > 0) {
			currentNum = MoveDownOne(currentNum);
			codeVal--;
		}
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
