export default function Memory() {
	const numbersOfUniqueCards = 8;
	const numbersOfIdenticalCards = 2;

	const cards = returnCreateCards();

	const cardsContainerEl = document.querySelector('.memory__cards-container')
	let cardButtons = null;

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

	function renderHTML() {
		cardsContainerEl.innerHTML = '';

		for(const card of cards) {
			const cardEl = document.createElement('button');
			cardEl.innerText = `${card.ID}`;
			cardEl.className = 'memory__card';
			cardsContainerEl.append(cardEl);
		}

		setQuerySelectors();
		setEventListeners();
	}

	function setQuerySelectors() {
		cardButtons = document.querySelectorAll('.memory__card');
	} 

	function setEventListeners() {
		for (let index = 0; index < cardButtons.length; index += 1) {
			cardButtons[index].addEventListener('click', () => {
				console.log(index);
			})
		}
	}
 
	// Called functions
	shuffleCards();
	renderHTML();

	console.log(cards);
}