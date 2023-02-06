export default function Memory() {
	const numbersOfUniqueCards = 8;
	const numbersOfIdenticalCards = 2;
	const timeCardIsVisible = 1 * 1000;
	
	const maxAttempts = 15;

	let cards = null;
	let cardsCopy = null;
	let attempts = 0;
	let isGameOver = false;
	let isRoundOver = false;
	let isNewGame = true;
	let flips = 0;
	let previousClickedCardIDs = [];
	let isCardsDisabled = false;
	let announcementMessage = null;

	const oroImages = [
		'/assets/image/oro1.jpg',
		'/assets/image/oro2.jpg',
		'/assets/image/oro3.jpg',
		'/assets/image/oro4.jpg',
		'/assets/image/oro5.jpg',
		'/assets/image/oro6.jpg',
		'/assets/image/oro7.jpg',
		'/assets/image/oro8.jpg',
	]

	const cardsContainerElement = document.querySelector('.memory__cards-container');
	const attemptsElement = document.querySelector('.memory__attempts');
	const resetButtonElements = document.querySelectorAll('.memory__button-reset');
	const announcementElement = document.querySelector('.memory__announcement');
	const announcementMessageElement = document.querySelector('.memory__announcement-message');
	let cardElements = null;

	function setQuerySelectors() {
		cardElements = document.querySelectorAll('.memory__card');
	} 

	for (const resetButton of resetButtonElements) {
		resetButton.addEventListener('click', handleResetButtonClick);
	}

	function setEventListeners() {
		for (let index = 0; index < cardElements.length; index += 1) {
			cardElements[index].addEventListener('click', () => {
				handleCardElementClick(index);
			})

			cardElements[index].addEventListener('mousemove', handleCardElementMouseover);
			cardElements[index].addEventListener('mouseleave', handleCardElementMouseleave);
		}
	}

   function handleCardElementMouseover(event) {
      addHoverEffect(event);
   }

   function handleCardElementMouseleave(event) {
		removeHoverEffect(event);
   }

	function handleResetButtonClick() {
		initGame();
		renderHTML();
	}

	function handleCardElementClick(cardElementIndex) {
		const clickedCard = cards[cardElementIndex];

		clickedCard.flipped = true;
		flips += 1;
		isNewGame = false;
		isRoundOver = returnCheckIsRoundOver();

		if (isRoundOver) {
			isCardsDisabled = true;

			setTimeout(() => {
				const isMatch = returnCheckIsMatch(clickedCard.id);

				if (isMatch) {
					cardsCopy = returnDeepCopy(cards);
					const isWinner = returnCheckIfWinner();

					if (isWinner) {
						isGameOver = true;
						announcementMessage = 'You won!';
					}
				} else {
					cards = returnDeepCopy(cardsCopy);
					attempts += 1;

					if (attempts >= maxAttempts) {
						isGameOver = true;
						announcementMessage = 'You lost, try again!';
					} else {
						isGameOver = false;
					}
				}
				
				initRound();
				renderHTML();		
			}, timeCardIsVisible)
		}	else {
			previousClickedCardIDs.push(clickedCard.id);
		}
		
		renderHTML();
	}

	/** Checks if all cards are flipped */
	function returnCheckIfWinner() {
		let isAllFlipped = true;

		for (const card of cards) {
			if (!card.flipped) {
				isAllFlipped = false;
			}
		}

		return isAllFlipped;
	}

	/** Reset game when game is over */
	function initGame() {
		cards = returnCreateCards();
		shuffleCards();
		cardsCopy = returnDeepCopy(cards);
		attempts = 0;
		isGameOver = false;
		isRoundOver = false;
		isNewGame = true;
		flips = 0;
		previousClickedCardIDs = [];
	}

	/** Reset game when the round is over */
	function initRound() {
		isCardsDisabled = false;
		flips = 0;
		isRoundOver = false;
		previousClickedCardIDs = [];
	}

	/** Checks if round is over */
	function returnCheckIsRoundOver() {
		const maxFlips = numbersOfIdenticalCards;

		if (flips === maxFlips) {
			return true;
		} else {
			return false;
		}
	}

	/** Creates a deep copy of cards */
	function returnDeepCopy(cards) {
		const cardsStringed = JSON.stringify(cards);
		return JSON.parse(cardsStringed);
	}

	/** Creates card objects and pushes it into an array based on numbersOfIdenticalCards & numbersOfUniqueCards */
	function returnCreateCards() {
		let newCards = [];

		for (let index = 0; index < numbersOfIdenticalCards; index += 1) {
			for (let index = 0; index < numbersOfUniqueCards; index += 1) {
				const object = {
					id: index,
					flipped: false,
				}
				newCards.push(object);
			}
		}

		return newCards;	
	}

	/** Checks if the clicked card is the same as previous card(s) in the same round */
	function returnCheckIsMatch(clickedCardID) {
		const cardsAreIdentical = (cardId) => cardId === clickedCardID;

		if (previousClickedCardIDs.every(cardsAreIdentical)) {
			return true;
		} else {
			return false;
		}
	}

	/** Shuffles the order of cards, this way of shuffling is called 'Fisher–Yates shuffle' */
	function shuffleCards() {
		for (let index = cards.length - 1; index > 0; index -= 1) {
			const randomIndex = Math.floor(Math.random() * (index + 1));
	
			[cards[index], cards[randomIndex]] = [cards[randomIndex], cards[index]];
		}
	}

	function addHoverEffect(event) {
		const card = event.currentTarget;
      const cardBackFrontContainer = event.currentTarget.firstChild;

      const degrees = 20 * 0.01;

      const cardPositions = card.getBoundingClientRect();

      const cardWidth = card.offsetWidth;
      const cardHeight = card.offsetHeight;

      const centerXOfCard = cardWidth / 2;
      const centerYOfCard = cardHeight / 2;

      const mouseXCoordinatesOfCard = event.clientX - cardPositions.left;
      const mouseYCoordinatesOfCard = event.clientY - cardPositions.top;

      const xCoordinatesInPercentFromCenter = (mouseXCoordinatesOfCard - centerXOfCard) * 100 / centerXOfCard;
      const yCoordinatesInPercentFromCenter = (mouseYCoordinatesOfCard - centerYOfCard) * 100 / centerYOfCard;

      cardBackFrontContainer.style.transform = `rotateY(${xCoordinatesInPercentFromCenter * degrees}deg) rotateX(${-1 * yCoordinatesInPercentFromCenter * degrees}deg)`
      cardBackFrontContainer.style.transition = 'transform 0.1s'
	}

	function removeHoverEffect(event) {
		const cardBackFrontContainer = event.currentTarget.firstChild;
      cardBackFrontContainer.style.transform = 'rotateY(0deg) rotateX(0deg)'
      cardBackFrontContainer.style.transition = 'transform 1s'
	}

	function renderHTML() {
		if(isNewGame) {
			renderCards();
		}
		renderAttempts();
		renderFlippedCards();
		renderAnnouncement();

		if (isCardsDisabled) {
			renderDisableCards(); 
		} else {
			renderEnableCard();
		}

		function renderAttempts() {
			attemptsElement.innerText = `Attempts: ${attempts}/${maxAttempts}`;
		}

		function renderFlippedCards() {
			for (let index = 0; index < cards.length; index += 1) {
				if (cards[index].flipped) {
					cardElements[index].classList.add('memory__card--flipped');
				} else {
					cardElements[index].classList.remove('memory__card--flipped');
				}
			}
		}

		function renderAnnouncement() {
			if (isGameOver) {
				announcementElement.classList.add('memory__announcement--open');
				announcementMessageElement.innerText = announcementMessage;
			} else {
				announcementElement.classList.remove('memory__announcement--open');
			}
		}

		function renderDisableCards() {
			for (const cardElement of cardElements) {
				cardElement.classList.add('memory__card--disabled')
			}
		}

		function renderEnableCard() {
			for (const cardElement of cardElements) {
				cardElement.classList.remove('memory__card--disabled')
			}
		}

		function renderCards() {
			cardsContainerElement.innerHTML = '';
	
			for (let index = 0; index < cards.length; index += 1) {
				const cardButton = document.createElement('button');
				const cardFrontBackContainer = document.createElement('div');
				const cardFront = document.createElement('div');
				const cardFrontImage = document.createElement('img');
				const cardBack = document.createElement('div');
				const cardBackText = document.createElement('div');
	
				const cardID = cards[index].id;
				cardFrontImage.src = oroImages[cardID];
	
				cardBackText.innerText = `?`;
				
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
	}
 
	// Called functions
	initGame();
	renderHTML();
}