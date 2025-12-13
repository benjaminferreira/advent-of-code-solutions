const fs = require("fs");
let splitData = [];
let numIDs = 0;
let ranges = [];
let combinedRanges = [];

function CombineRanges() {
	// Loop through ranges to build new combinedRanges array
	for (let i = 0; i < ranges.length; i++) {
		const splitRange = ranges[i].split("-");
		let first = parseInt(splitRange[0]);
		let last = parseInt(splitRange[1]);

		if (i === 0) {
			// Always just add first range
			combinedRanges.push([first,last]);
		}
		else {
			let prevFirst = combinedRanges[i-1][0];
			let prevLast = combinedRanges[i-1][1];
			if (combinedRanges[i-1][0] >= first && com) {
				
			}
		}
	}
}


// // Up fresh count and return if ID is between range
// if (id >= first && id <= last) {
// 	numIDs++;
// 	return;
// }


// Get file contents
fs.readFile("testnput.txt", (err, data) => {
	if (err) throw err;

	// Split up data
	splitData = data.toString().split("\r\n\r\n");

	// Set ranges
	ranges = splitData[0].split("\n");

	// Combine overlapping ranges
	CombineRanges();

	combinedRanges.forEach((range) => CountIDs(range));

	console.log("This many total IDs are included in the supplied ranges: " + numIDs);
});
