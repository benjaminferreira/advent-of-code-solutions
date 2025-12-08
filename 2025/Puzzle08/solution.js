const fs = require("fs");
let splitData = [];
let numAccessibleRolls = 0;
let needToCheckForAccessible = true;
let prevRow = null;

function ParseRow(row, index) {
	//console.log(row) // Output row to take a gander
	row = row.trim();
	let curRow = [];

	for (let i = 0; i < row.length; i++) {
		if (row[i] === ".") {
			// Empty slots marked with -1
			curRow[i] = -1;
			continue;
		}

		// Start by setting current spot's adj-roll count to 0
		curRow[i] = 0;

		if (i === 0) {
			// Check character above and above-right
			if (prevRow) {
				if (prevRow[i+1] > -1) {
					prevRow[i+1]++;
					curRow[i]++;
				}
				if (prevRow[i] > -1) {
					prevRow[i]++;
					curRow[i]++;
				}
			}
		}
		else if (i === row.length - 1) {
			// Check previous character in same line
			if (curRow[i-1] > -1) {
				curRow[i-1]++;
				curRow[i]++;
			}
			// Check character above and above-left
			if (prevRow) {
				if (prevRow[i-1] > -1) {
					prevRow[i-1]++;
					curRow[i]++;
				}
				if (prevRow[i] > -1) {
					prevRow[i]++;
					curRow[i]++;
				}
			}
		}
		else {
			// Check previous character in same line
			if (curRow[i-1] > -1) {
				curRow[i-1]++;
				curRow[i]++;
			}
			// Check all three characters above
			if (prevRow) {
				if (prevRow[i-1] > -1) {
					prevRow[i-1]++;
					curRow[i]++;
				}
				if (prevRow[i] > -1) {
					prevRow[i]++;
					curRow[i]++;
				}
				if (prevRow[i+1] > -1) {
					prevRow[i+1]++;
					curRow[i]++;
				}
			}
		}
	}

	// If exists, loop through previous row to update total count
	if (prevRow) {
		for (i = 0; i < prevRow.length; i++) {
			if (prevRow[i] > -1 && prevRow[i] < 4) {
				// Remove accessible row
				prevRow[i] = -1;

				numAccessibleRolls++;
				needToCheckForAccessible = true;
			}
		}
		
		// Set the original splitData object rows
		splitData[index - 1] = prevRow.map((item) => {
			if (item === -1)
				return ".";
			else {
				return "@";
			}
		}).join("");
	}

	// If final row, loop through CURRENT row to update total count
	if (index === splitData.length - 1) {
		for (i = 0; i < curRow.length; i++) {
			if (curRow[i] > -1 && curRow[i] < 4) {
				// Remove accessible row
				curRow[i] = -1;

				numAccessibleRolls++;
				needToCheckForAccessible = true;
			}
		}
		// Set the original splitData object rows
		splitData[index] = curRow.map((item) => {
			if (item === -1)
				return ".";
			else {
				return "@";
			}
		}).join("");
	}

	// Set prevRow
	prevRow = curRow;
}

// Get file contents
fs.readFile("input.txt", (err, data) => {
	if (err) throw err;

	// Split up data
	splitData = data.toString().split("\n");

	// Redo the parse after each time
	while (needToCheckForAccessible) {
		prevRow = null;
		needToCheckForAccessible = false;
		splitData.forEach((row, index) => ParseRow(row, index));
	}
	console.log("This many total rolls are accessible: " + numAccessibleRolls);
});
