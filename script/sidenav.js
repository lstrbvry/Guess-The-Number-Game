export const ResetScoreButton = {
	resetButton: document.getElementById("js-reset-score-button"),
	addEventToReset(score, player, computer, turns, countdown) {
		this.resetButton.addEventListener("click", () => {
			player.speakResetted();
			score.resetScore();
			score.renderScores();
			score.storeLocalStorage();
			computer.speakResetted();
			turns.finishRound();
		});
		this.resetButton.addEventListener("mouseenter", () => {
			player.speakReset();
		});
	},
};

export const AboutUsButton = {
	aboutButton: document.getElementById("js-about-page"),
	addEventToAbout() {
		this.aboutButton.addEventListener("click", () => {
			window.open("about.html", "_self");
		});
	},
};
