export default function Memory() {
	const numbersOfUniqueCards = 8;
	const numbersOfIdenticalCards = 2;

	const cards = returnCreateCards();

	function returnCreateCards() {
		let newCards = [];

		for (let index = 0; index < numbersOfIdenticalCards; index += 1) {
			for (let index = 0; index < numbersOfUniqueCards; index += 1) {
				const object = {
					ID: index,
					flipped: false,
				}
				newCards.push(object);
			}
		}

		return newCards;	
	}

	console.log(cards);
}