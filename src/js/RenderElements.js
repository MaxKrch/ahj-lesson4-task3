export default class RenderElements {
	constructor(container, cartsList) {
		this.container = container;
		this.inputListener;
		this.submitListener;
		this.cartsList = cartsList;

		this.renderPage();
		this.registerEvents();
	}

	renderPage() {
		const carts = this.renderCarts();
		this.container.append(carts);
		this.carts = carts;

		const form = this.renderForm();
		this.container.append(form);
		this.form = form;

		const modal = this.renderModal();
		this.container.append(modal);
		this.modal = modal;
	}

	registerEvents() {
		const inputEl = this.form.querySelector(".input-text");
		this.inputEl = inputEl;
		inputEl.addEventListener("input", (event) => {
			this.inputListener(event);
		});

		this.form.addEventListener("submit", (event) => {
			event.preventDefault();
			this.submitListener(event);
		});
	}

	renderCarts() {
		const carts = document.createElement("div");
		carts.classList.add("carts-block");

		this.cartsList.map((item) => {
			const newCart = this.renderCart(item);
			carts.append(newCart);
		});

		return carts;
	}

	renderCart(cart) {
		const newCart = document.createElement("div");

		newCart.classList.add("carts-item", "cart-item_passive", cart.name);

		return newCart;
	}

	renderForm() {
		const newForm = document.createElement("form");

		newForm.setAttribute("action", "");
		newForm.setAttribute("method", "POST");
		newForm.classList.add("buttons-block");
		newForm.innerHTML = `
			<input type="text" class="input-text" placeholder="0000 0000 0000 0000">
			<input type="submit" class="input-button" value="Проверить карту">
		`;

		return newForm;
	}

	renderModal() {
		const newModal = document.createElement("div");

		newModal.classList.add("message-block");
		newModal.innerHTML = `
			<div class="message-item hidden-item"></div>
		`;

		return newModal;
	}

	updateInputValue(value) {
		this.inputEl.value = value;
	}

	updatePositionCursor(position) {
		this.inputEl.selectionStart = position;
		this.inputEl.selectionEnd = position;
	}

	showActiveCart(cartName) {
		const oldActiveSystem = this.carts.querySelectorAll(".cart-item_active");

		oldActiveSystem.forEach((item) => {
			item.classList.add("cart-item_passive");
			item.classList.remove("cart-item_active");
		});

		if (cartName !== "unknown") {
			const newActiveSystem = this.carts.querySelector(`.${cartName}`);
			newActiveSystem.classList.remove("cart-item_passive");
			newActiveSystem.classList.add("cart-item_active");
		}
	}

	showModal(message, isValid) {
		this.modal.textContent = message;
		this.modal.classList.remove("hidden-item");
		this.modal.classList.add(isValid);
	}

	hideModal(isValid) {
		this.modal.textContent = "";
		this.modal.classList.add("hidden-item");
		this.modal.classList.remove(isValid);
	}
	addInputListener(callback) {
		this.inputListener = callback;
	}

	addSubmitListener(callback) {
		this.submitListener = callback;
	}
}
