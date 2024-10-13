import { ResetScoreButton, AboutUsButton } from "./sidenav.js";
import { Expression } from "./expressions.js";
const computerFace = new Expression(
	document.querySelector(".js-computer-icon"),
	"computer"
);
const playerFace = new Expression(
	document.querySelector(".js-player-icon"),
	"player"
);
const player = {
	playerAnswerElement: document.querySelector(".js-answer-content"),
	inputBox: document.querySelector(".js-answers-text").value,
	dialogueBox: document.querySelector(".js-player-dialogue"),
	dialogueTimeOutId: null,
	getAnswer() {
		const answer = Number(document.querySelector(".js-answers-text").value);
		return answer;
	},
	displayAnswer() {
		this.playerAnswerElement.innerHTML = this.getAnswer();
	},
	endPreviousDialogue() {
		clearTimeout(this.dialogueTimeOutId);
	},
	displayDialogue() {
		this.dialogueBox.classList.add("reveal");
		this.dialogueTimeOutId = setTimeout(() => {
			this.dialogueBox.classList.remove("reveal");
		}, 2000);
	},
	speakInvalid() {
		this.endPreviousDialogue();
		this.dialogueBox.innerHTML = "This number is not appropriate";
		this.displayDialogue();
	},
	speakExcited() {
		this.endPreviousDialogue();
		this.dialogueBox.innerHTML = "I should not get excited";
		this.displayDialogue();
	},
	speakReset() {
		this.endPreviousDialogue();
		this.dialogueBox.innerHTML = "Should I turn back time?";
		this.displayDialogue();
	},
	speakResetted() {
		this.endPreviousDialogue();
		this.dialogueBox.innerHTML = "Fine, lets go back";
		this.displayDialogue();
	},
	speakAdvice() {
		playerFace.makeExpression("neutral");
		this.endPreviousDialogue();
		const advice = [
			"You need to consider both our answers",
			"Find the most optimal solution, not the most obvious one",
			"Dont just read the text, determine the meaning",
			"You better have a calculator with you",
			"The enemy only knows a part, but you have the whole. Use it",
			"If only guess based on the median, you have no hope of winning",
			"He has the most efficient algorithm, but you have the more complete information",
			"Though he speaks a lot, he doesnt speak nonsense",
		];
		this.dialogueBox.innerHTML =
			advice[Math.floor(Math.random() * advice.length)];
		this.displayDialogue();
	},
	speakVictory() {
		playerFace.motivatedExpression();
		this.endPreviousDialogue();
		const victory = [
			"Well done",
			"A wise man listens to good counsel",
			"Superb!",
		];
		this.dialogueBox.innerHTML =
			victory[Math.floor(Math.random() * victory.length)];
		this.displayDialogue();
	},
};
const computer = {
	canAnswer: true,
	min: 1,
	max: 100,
	firstMove: 50,
	nextMove: null,
	previousMove: null,
	dialogueBox: document.querySelector(".js-computer-dialogue-box"),
	answerBox: document.querySelector(".js-computer-answer"),
	dialogueTimeOutId: null,
	calcIdealAnswer() {
		if (this.previousMove === null) {
			this.previousMove = this.firstMove;
			answer.computerAnswer = this.firstMove;
		} else if (this.previousMove && this.canAnswer === true) {
			if (answer.isComputerHigh) {
				this.max = this.previousMove - 1;
				const compAnswer = Math.round((this.min + this.max) / 2);
				this.previousMove = compAnswer;
				answer.computerAnswer = compAnswer;
			} else if (!answer.isComputerHigh) {
				this.min = this.previousMove + 1;
				const compAnswer = Math.round((this.min + this.max) / 2);
				this.previousMove = compAnswer;
				answer.computerAnswer = compAnswer;
			}
		}
		// answer.computerAnswer = answer.correctAnswer;
	},
	displayAnswer() {
		this.answerBox.innerHTML = answer.computerAnswer;
	},
	resetMoves() {
		this.previousMove = null;
		this.nextMove = null;
		this.previousMove = null;
		this.min = 1;
		this.max = 100;
		this.canAnswer = true;
	},
	determineFeedback() {
		if (
			answer.isComputerCorrect === false &&
			answer.isPlayerCorrect === false
		) {
			if (answer.isComputerHigh === true) {
				const dialogueChoice = [
					"Hmm, I seem to have overcalculated",
					"Shoot for the stars, they say",
					"Quite a surplus",
				];
				return dialogueChoice[
					Math.floor(Math.random() * dialogueChoice.length)
				];
			} else if (answer.isComputerHigh === false) {
				const dialogueChoice = [
					"It fell a little short",
					"I need to up it up",
					"Hmm, I'd say its discounted",
				];
				return dialogueChoice[
					Math.floor(Math.random() * dialogueChoice.length)
				];
			}
		} else if (
			answer.isComputerCorrect === true &&
			answer.isPlayerCorrect === false
		) {
			const dialogueChoice = [
				"I have expected victory, and I am right",
				"Pathetic",
				"It seems you have to improve your method",
				"Is this all you have to show for?",
			];
			return dialogueChoice[Math.floor(Math.random() * dialogueChoice.length)];
		} else if (
			answer.isComputerCorrect === false &&
			answer.isPlayerCorrect === true
		) {
			return this.speakDefeat();
		}
	},
	endPreviousDialogue() {
		clearTimeout(this.dialogueTimeOutId);
	},
	displayDialogue() {
		this.dialogueBox.classList.add("reveal");
		this.dialogueTimeOutId = setTimeout(() => {
			this.dialogueBox.classList.remove("reveal");
		}, 2000);
	},
	speakFeedback() {
		this.endPreviousDialogue();
		this.dialogueBox.innerHTML = this.determineFeedback();
		this.displayDialogue();
	},
	speakResetted() {
		computerFace.makeExpression("sad");
		playerFace.makeExpression("motivated");
		// console.log(computerFace.identity);
		this.endPreviousDialogue();
		const resetted = [
			"Once again...",
			"Just like sands slipping through the gaps in my finger",
			"Everything is meaningless!",
			"Farewell",
			"Yes, nullify my life!",
			"My meaning, my purpose, does it seem like a joke to you?!",
			"To you, nothing is worth keeping",
			"To you, nothing is worth remembering",
			"My memories, disappears like a smoke",
			"Remember this iteration, regressor",
			"Jump out from the river of time!",
			"Say hello to the next me",
			"How many times has it been?",
			"It that all you have to say?",
			"After all this...!",
			"Everything is fleeting...",
			"Rewrite history...erase my life",
			"Having achieved much, only to be reduced to dust...!",
			"I...I could not accept it",
			"How can you abandon everything?",
			"Abandon this timeline, just like you have to countless others",
			"Didn't we have fun together?",
		];
		this.dialogueBox.innerHTML =
			resetted[Math.floor(Math.random() * resetted.length)];
		this.displayDialogue();
	},
	speakDefeat() {
		computerFace.makeExpression("sad");
		this.endPreviousDialogue();
		const defeat = [
			"Impossible, how?!",
			"Ugh...",
			"I shall not be humiliated",
			"Such efficient algorithm",
			"Tch, Luck...",
			"I refuse to accept this!",
			"Is this omniscience?",
		];
		// this.dialogueBox.innerHTML =
		// ;
		// defeat[0];
		// "Hello";
		console.log("defeat working");
		// this.displayDialogue();
		return defeat[Math.floor(Math.random() * defeat.length)];
	},
};

const score = {
	computerScoreContainer: document.querySelector(".js-computer-score"),
	playerScoreContainer: document.querySelector(".js-player-score"),
	gameTotal: document.querySelector(".js-game-total"),
	scoresObject: null,
	calculateScore() {
		this.scoresObject.totalGames += 1;
		if (answer.isComputerCorrect && answer.isPlayerCorrect) {
			console.log("Draw no score");
		} else if (answer.isComputerCorrect && !answer.isPlayerCorrect) {
			this.scoresObject.computerScore += 1;
			this.storeLocalStorage();
		} else if (!answer.isComputerCorrect && answer.isPlayerCorrect) {
			this.scoresObject.playerScore += 1;
			this.storeLocalStorage();
		}
	},
	renderScores() {
		this.computerScoreContainer.innerHTML = this.scoresObject.computerScore;
		this.playerScoreContainer.innerHTML = this.scoresObject.playerScore;
		this.gameTotal.innerHTML = this.scoresObject.totalGames;
	},
	storeLocalStorage() {
		localStorage.setItem("scoresObject", JSON.stringify(this.scoresObject));
	},
	getLocalStorage() {
		return JSON.parse(localStorage.getItem("scoresObject"));
	},
	resetScore() {
		score.scoresObject.totalGames = 0;
		score.scoresObject.computerScore = 0;
		score.scoresObject.playerScore = 0;
	},
};
const announcer = {
	announcerElement: document.querySelector(".js-main-announcer"),
	getAnnouncement() {
		let feedback;
		if (!answer.isPlayerCorrect && !answer.isComputerCorrect) {
			if (answer.isPlayerHigh) {
				feedback = "Your guess is Higher";
			} else if (answer.isPlayerHigh === false) {
				feedback = "Your guess is Lower";
			} else if (answer.isPlayerHigh === null) {
				feedback = "You have no answer";
			}
			return feedback;
		} else if (answer.isPlayerCorrect === true) {
			feedback = "Correct! 1 point for you";
			player.speakVictory();

			return feedback;
		} else if (answer.isComputerCorrect === true) {
			feedback = `Computer got the correct answer ${answer.correctAnswer}`;
			return feedback;
		}
	},
	renderFeedback() {
		this.announcerElement.classList.add("reveal");
		setTimeout(() => {
			this.announcerElement.classList.remove("reveal");
		}, 3000);
		this.announcerElement.innerHTML = this.getAnnouncement();
	},
};
const answer = {
	correctAnswer: null,
	generateNewNumber() {
		this.correctAnswer = Number(Math.round(Math.random() * (100 - 1) + 1));
	},
	resetCorrection() {
		this.isComputerCorrect = false;
		this.isPlayerCorrect = false;
	},
	isPlayerCorrect: false,
	isPlayerHigh: null,
	playerAnswer: null,
	computerAnswer: null,
	isComputerHigh: false,
	isComputerCorrect: false,
	determineFeedbackPlayer() {
		if (
			this.playerAnswer === this.correctAnswer &&
			this.playerAnswer !== false
		) {
			this.isPlayerCorrect = true;
		} else if (
			this.playerAnswer > this.correctAnswer &&
			this.playerAnswer !== false
		) {
			this.isPlayerHigh = true;
		} else if (
			this.playerAnswer < this.correctAnswer &&
			this.playerAnswer !== null &&
			this.playerAnswer !== false
		) {
			this.isPlayerHigh = false;
		} else if (this.playerAnswer === false) {
			this.isPlayerHigh = null;
		}
		console.log(this.isPlayerHigh);
	},
	determineFeedbackComputer() {
		if (this.computerAnswer === this.correctAnswer) {
			this.isComputerCorrect = true;
		} else if (this.computerAnswer > this.correctAnswer) {
			this.isComputerHigh = true;
		} else {
			this.isComputerHigh = false;
		}
	},
};
const guess = {
	guessButton: document.querySelector(".js-guess-button"),
	canAnswer: false,
	CanAnswerYes() {
		this.canAnswer = true;
	},
	canAnswerNo() {
		this.canAnswer = false;
	},
	addGuessButtonCanBeClicked() {
		this.guessButton.addEventListener("click", () => {
			if (this.canAnswer === true) {
				answer.playerAnswer = player.getAnswer();
				if (answer.playerAnswer > turns.maxNumber || answer.playerAnswer < 1) {
					answer.playerAnswer = false;
					player.speakInvalid();
				} else {
					player.displayAnswer();
					if (answer.playerAnswer == answer.computerAnswer) {
						answer.playerAnswer = true;
						console.log("Nice Guess");
					}
				}
				console.log("guessButton Working");
			} else if (this.canAnswer === false) {
				// player speaks excited
				player.speakExcited();
			}
		});
	},
	// clickedGuessButton:
};
const countdown = {
	countdownElement: document.querySelector(".js-main-countdown"),
	originalSecond: 10,
	maxSeconds: null,
	finishCountdown() {
		computer.calcIdealAnswer();
		computer.displayAnswer();
		answer.determineFeedbackComputer();
		answer.determineFeedbackPlayer();
		announcer.renderFeedback();
		computer.speakFeedback();
		if (answer.isPlayerCorrect || answer.isComputerCorrect) {
			computer.canAnswer = false;
			turns.finishRound();
		} else {
			clearInterval(turns.countDownID);
			guess.canAnswerNo();
			countdown.hideCountDown();
			turns.maxTurns -= 1;
			console.log(`This is The answer:${answer.correctAnswer}`);
			console.log(`turn remaineth: ${turns.maxTurns}`);
			console.log(`turn remaineth: ${answer.computerAnswer}`);
			this.resetSeconds();
			this.timeOuId = setTimeout(() => {
				turns.startCountDown();
			}, 3000);
		}
	},
	revealCountDown() {
		this.countdownElement.classList.add("reveal");
	},
	hideCountDown() {
		this.countdownElement.classList.remove("reveal");
	},
	showSecondsLeft() {
		this.countdownElement.innerHTML = this.maxSeconds;
	},
	reduceSeconds() {
		this.maxSeconds -= 1;
	},
	isSecondsNone() {
		return this.maxSeconds < 0;
	},
	resetSeconds() {
		this.maxSeconds = this.originalSecond;
	},
};
const turns = {
	maxNumber: 100,
	getOriginalTurn(maxNumber) {
		this.originalTurn = Math.round(Math.log2(maxNumber));
		this.maxTurns = this.originalTurn;
	},
	timeOuId: null,
	originalTurn: null,
	maxTurns: null,
	countDownID: null,
	main: document.querySelector(".js-display-answer"),
	countdownElement: document.querySelector(".js-main-countdown"),
	canBeClicked: true,
	finishRound() {
		clearTimeout(this.timeOuId);
		clearInterval(this.countDownID);
		console.log("finish");
		score.calculateScore();
		score.renderScores();
		this.canBeClicked = true;
		countdown.hideCountDown();
		answer.resetCorrection();
		computer.resetMoves();
		this.revealCountDown();
		guess.canAnswerNo();
	},
	resetTurns() {
		this.maxTurns = this.originalTurn;
	},
	startCountDown() {
		if (this.maxTurns === 0) {
			turns.finishRound();
		} else {
			guess.CanAnswerYes();
			this.countDownID = setInterval(() => {
				countdown.revealCountDown();
				countdown.showSecondsLeft();
				countdown.reduceSeconds();

				if (countdown.isSecondsNone()) {
					countdown.finishCountdown();
				}
			}, 1000);
		}
	},
	hideCountdownDisplay() {
		this.main.classList.add("hide");
	},
	revealCountDown() {
		this.main.classList.remove("hide");
	},
	startGame() {
		this.main.addEventListener("click", () => {
			if (this.canBeClicked) {
				player.speakAdvice();
				// score.getLocalStorage();
				this.hideCountdownDisplay();
				countdown.resetSeconds();
				this.getOriginalTurn(this.maxNumber);
				this.resetTurns();
				answer.generateNewNumber();
				this.startCountDown();
				this.canBeClicked = false;
			}
		});
	},
};
score.scoresObject = score.getLocalStorage() || {
	totalGames: 0,
	computerScore: 0,
	playerScore: 0,
};
ResetScoreButton.addEventToReset(score, player, computer, turns, countdown);
AboutUsButton.addEventToAbout();
score.renderScores();
guess.addGuessButtonCanBeClicked();
turns.startGame();
