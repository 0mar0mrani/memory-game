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

	function shuffleCards() {
		for (let index = cards.length - 1; index > 0; index -= 1) {
			const randomIndex = Math.floor(Math.random() * (index + 1));
	
			[cards[index], cards[randomIndex]] = [cards[randomIndex], cards[index]];
		}
	}

	// Called functions
	shuffleCards();

	console.log(cards);
}