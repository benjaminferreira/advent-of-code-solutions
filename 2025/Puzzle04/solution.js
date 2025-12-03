const fs = require("fs");
invalidIDSum = 0;

function FindInvalidIDs(idRange) {
	const splitRange = idRange.split("-");
	const firstIDInt = parseInt(splitRange[0]);
	const lastIDInt = parseInt(splitRange[1]);

	// Create array using ID range
	const IDRange = Array.from({ length: lastIDInt - firstIDInt + 1 }, (_, index) => firstIDInt + index);

	IDRange.forEach((id) => {
		const idStr = id.toString();
		const len = idStr.length;

		// Skip IDs that have only one character
		if (len <= 1) return;

		// Loop through all possible lengths that can be checked (1, 2, up to string length / 2)
		for (let checkLen = 1; checkLen <= Math.floor(len / 2); checkLen++) {
			let fullMatch = true;

			// Skip if current pattern length does not fit evenly into full ID length
			if (len % checkLen !== 0) continue;

			// Get pattern that
			const checkPattern = idStr.slice(0, checkLen);

			// Loop through each group of characters at the current check length to see if the pattern holds up
			for (let pos = checkLen; pos + checkLen <= len; pos += checkLen) {
				if (idStr.slice(pos, pos + checkLen) !== checkPattern) {
					fullMatch = false;
					break;
				}
			}

			// Add to the invalid ID sum if we got a full match (invalid ID)
			if (fullMatch) {
				invalidIDSum += id;
				break;
			}
		}
	});
}

// Get file contents
fs.readFile("input.txt", (err, data) => {
	if (err) throw err;

	// Split up data
	const splitData = data.toString().split(",");

	splitData.forEach((idRange) => FindInvalidIDs(idRange));
	console.log("Sum of all invalid IDs found: " + invalidIDSum);
});
