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
		// Return if this ID has an odd number of characters
		if (idStr.length % 2 !== 0) return;

		if (idStr.slice(0, idStr.length / 2) === idStr.slice(idStr.length / 2)) {
			// Add current ID to sum if the first half of the ID string equals the second
			invalidIDSum += id;
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
