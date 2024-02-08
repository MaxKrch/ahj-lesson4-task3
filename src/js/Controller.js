import Validation from "./Validation";
import Render from "./RenderElements";
const cartsList = [
	{
		code: 2,
		name: "mir",
	},
	{
		code: 4,
		name: "visa",
	},
	{
		code: 5,
		name: "master",
	},
	{
		code: 6,
		name: "maestro",
	},
];

export default class Controller {
	constructor(container) {
		this.container = document.querySelector(container);
		this.render = new Render(this.container, cartsList);

		this.init();
	}

	init() {
		this.registerEventListeners();
	}

	registerEventListeners() {
		this.render.addInputListener(this.inputListener.bind(this));
		this.render.addSubmitListener(this.submitListener.bind(this));
	}

	inputListener(event) {
		const oldValue = "" + event.target.value;
		const newValue = "" + this.clearNumber(oldValue);
		const newPositionCursor = this.calcPositionCursor(event.target.selectionStart);

		this.render.updateInputValue(newValue);
		this.render.updatePositionCursor(newPositionCursor);
	}

	clearNumber(number) {
		let clearValue = number.replaceAll(/[^\d]/g, "");
		const count = clearValue.length;

		if (count > 3) {
			const arrayNumber = clearValue.split("");
			clearValue = "";
			arrayNumber.forEach((item, index) => {
				clearValue += item;
				if ((index + 1) % 4 === 0) {
					clearValue += " ";
				}
			});
		}
		return clearValue;
	}

	calcPositionCursor(oldPosition) {
		let positionCursor = oldPosition;

		if ((positionCursor - 4) % 5 === 0) {
			positionCursor += 1;
		}
		return positionCursor;
	}

	submitListener(event) {
		const form = event.target;
		const number = form.querySelector(".input-text").value;
		const numberStr = "" + number;
		const clearNumber = numberStr.replaceAll(/[^\d]/g, "");

		const chekLength = Validation.validationLength(clearNumber);
		if (chekLength) {
			this.render.showModal(chekLength, "invalid");
			setTimeout(() => {
				this.render.hideModal("invalid");
			}, 1000);
			return;
		}

		const chekSystem = Validation.validationSystem(clearNumber[0], cartsList);
		this.render.showActiveCart(chekSystem);

		const chekNumber = Validation.validationNumber(clearNumber);
		const mess = chekNumber ? "Корректный номер карты" : "Некоректный номер карты";
		const isValid = chekNumber ? "valid" : "invalid";

		this.render.showModal(mess, isValid);
		setTimeout(() => {
			this.render.hideModal(isValid);
		}, 1000);
	}
}
