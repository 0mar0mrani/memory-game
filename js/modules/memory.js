export default function Memory() {
	const numbersOfUniqueCards = 8;
	const numbersOfIdenticalCards = 2;

	let cards = returnCreateCards();
	let cardsCopy = null;

	let isRoundOver = false;
	let flips = 0;
	let previousClickedCardID = null;

	const cardsContainerElement = document.querySelector('.memory__cards-container')
	let cardElements = null;

	function setQuerySelectors() {
		cardElements = document.querySelectorAll('.memory__card');
	} 

	function setEventListeners() {
		for (let index = 0; index < cardElements.length; index += 1) {
			cardElements[index].addEventListener('click', () => {
				handleCardButtonClick(index);
			})
		}
	}

	function handleCardButtonClick(cardElementIndex) {
		const clickedCard = cards[cardElementIndex];

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
		renderHTML();
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
		renderAllCards();
		renderFlippedCards();


		function renderAllCards() {
			cardsContainerElement.innerHTML = '';

			for (const card of cards) {
				const cardElement = document.createElement('button');
				cardElement.innerText = `${card.ID}`;
				cardElement.className = 'memory__card';
				cardsContainerElement.append(cardElement);
			}

			setQuerySelectors();
			setEventListeners();
		}
		
		function renderFlippedCards() {
			for (let index = 0; index < cards.length; index += 1) {
				if (cards[index].flipped) {
					cardElements[index].classList.add('memory__card--flipped');
				}
			}
		}
	}
 
	// Called functions
	shuffleCards();
	cardsCopy = returnDeepCopy(cards);
	renderHTML();
}