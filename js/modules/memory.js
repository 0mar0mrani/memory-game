export default function Memory() {
	const numbersOfUniqueCards = 8;
	const numbersOfIdenticalCards = 2;
	const timeCardIsVisible = 1 * 1000;

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
				handleCardElementClick(index);
			})
		}
	}

	function handleCardElementClick(cardElementIndex) {
		const clickedCard = cards[cardElementIndex];

		clickedCard.flipped = true;
		flips += 1;


		setIsRoundOver();

		if (isRoundOver) {
			for (const cardElement of cardElements) {
				cardElement.classList.add('memory__card--disabled')
			}

			setTimeout(() => {
				const isMatch = returnCheckIsMatch(clickedCard.ID);

				if (isMatch) {
					cardsCopy = returnDeepCopy(cards);
				} else {
					cards = returnDeepCopy(cardsCopy);
				}
				
				flips = 0;
				isRoundOver = false;

				for (const cardElement of cardElements) {
					cardElement.classList.remove('memory__card--disabled')
				}

				renderHTML();				
			}, timeCardIsVisible)
		}	else {
			previousClickedCardID = clickedCard.ID;
		}

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
		renderFlippedCards();
		
		function renderFlippedCards() {
			for (let index = 0; index < cards.length; index += 1) {
				if (cards[index].flipped) {
					cardElements[index].classList.add('memory__card--flipped');
				} else {
					cardElements[index].classList.remove('memory__card--flipped');
				}
			}
		}
	}

	function renderAllCards() {
		cardsContainerElement.innerHTML = '';

		for (const card of cards) {
			const cardButton = document.createElement('button');
			const cardFrontBackContainer = document.createElement('div');
			const cardFront = document.createElement('div');
			const cardFrontImage = document.createElement('img');
			const cardBack = document.createElement('div');
			const cardBackText = document.createElement('div');

			// cardBackText.innerText = '?';
			cardBackText.innerText = `${card.ID}`;

			cardFrontImage.src = '/assets/img/oro.jpg'

			cardButton.className = 'memory__card';
			cardFrontBackContainer.className = 'memory__card-front-back-container';
			cardFront.className = 'memory__card-front';
			cardBack.className = 'memory__card-back';
			cardBackText.className = 'memory__card-back-text';

			cardFront.append(cardFrontImage);
			cardBack.append(cardBackText);
			cardFrontBackContainer.append(cardFront);
			cardFrontBackContainer.append(cardBack);
			cardButton.append(cardFrontBackContainer);
			cardsContainerElement.append(cardButton);
		}

		setQuerySelectors();
		setEventListeners();
	}
 
	// Called functions
	shuffleCards();
	cardsCopy = returnDeepCopy(cards);
	renderAllCards();
	renderHTML();
}