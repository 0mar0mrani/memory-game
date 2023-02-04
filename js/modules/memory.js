export default function Memory() {
	const numbersOfUniqueCards = 8;
	const numbersOfIdenticalCards = 2;

	let cards = returnCreateCards();
	let cardsCopy = null;

	let isRoundOver = false;
	let flips = 0;
	let previousClickedCardID = null;

	const cardsContainerEl = document.querySelector('.memory__cards-container')
	let cardEl = null;

	function setQuerySelectors() {
		cardEl = document.querySelectorAll('.memory__card');
	} 

	function setEventListeners() {
		for (let index = 0; index < cardEl.length; index += 1) {
			cardEl[index].addEventListener('click', () => {
				handleCardButtonClick(index);
			})
		}
	}

	function handleCardButtonClick(cardElIndex) {
		const clickedCard = cards[cardElIndex];

		clickedCard.flipped = true;
		flips += 1;

		setIsRoundOver();

		if (isRoundOver) {
			console.log('its over');
			const isMatch = returnCheckIsMatch(clickedCard.ID);

			if (isMatch) {
				cardsCopy = returnDeepCopy(cards);
			} else {
				cards = returnDeepCopy(cardsCopy)
			}

			flips = 0;
			isRoundOver = false;
		}

		previousClickedCardID = clickedCard.ID;
		console.log(cards);
	}

	function setIsRoundOver() {
		const maxFlips = numbersOfIdenticalCards;

		if (flips === maxFlips) {
			isRoundOver = true;
		}
	}

	function returnDeepCopy(cards) {
		const cardsStringed = JSON.stringify(cards);
		return JSON.parse(cardsStringed);
	}

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

	function returnCheckIsMatch(clickedCardID) {
		if (clickedCardID === previousClickedCardID) {
			return true;
		} else {
			return false;
		}
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
 
	// Called functions
	shuffleCards();
	cardsCopy = returnDeepCopy(cards);
	renderHTML();

	console.log(cards);
}