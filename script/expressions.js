export class Expression {
	face;
	identity;

	constructor(face, identity) {
		this.face = face;
		this.identity = identity;
	}
	expressionID;
	returnToNeutral() {
		this.face.innerHTML = `<img
        src="image/${this.identity}Icon.png"
        alt="Player icon"
        class="profile-icon js-player-icon" />`;
	}
	endPreviousExpression() {
		clearTimeout(this.dialogueTimeOutId);
	}
	endPreviousDialogue() {
		clearTimeout(this.expressionID);
	}
	displayExpression() {
		this.endPreviousDialogue();
		this.expressionID = setTimeout(() => {
			this.returnToNeutral();
		}, 2500);
	}
	makeExpression(string) {
		this.displayExpression();
		this.face.innerHTML = `<img
        src="image/${this.identity}${string}.png"
        alt="${this.identity} icon"
        class="profile-icon js-player-icon" />`;
	}
	motivatedExpression() {
		this.displayExpression();
		this.face.innerHTML = `<img
        src="image/${this.identity}Motivated.png"
        alt="${this.identity} icon"
        class="profile-icon js-player-icon" />`;
	}
}
