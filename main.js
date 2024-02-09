/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/Validation.js
class Validation {
  static validationLength(number) {
    if (number.length < 16) {
      return "Слишком короткимй номер карты";
    }
    if (number.length > 16) {
      return "Слишком длинный номер карты";
    }
    return false;
  }
  static validationSystem(number, systems) {
    const system = systems.find(item => +item.code === +number);
    const nameSystem = system ? system.name : "unknown";
    return nameSystem;
  }
  static validationNumber(number) {
    const numberStr = "" + number;
    const isEven = numberStr.length % 2 === 0 ? true : false;
    const arrayNumbers = numberStr.split("");
    const sum = arrayNumbers.reduce((acc, item, index) => {
      if (isEven && index % 2 === 0 || !isEven && index % 2 === 1) {
        const doubleNum = item > 4 ? item * 2 - 9 : item * 2;
        return acc + +doubleNum;
      }
      return acc + +item;
    }, 0);
    const chek = sum % 10 === 0 ? true : false;
    return chek;
  }
}
;// CONCATENATED MODULE: ./src/js/RenderElements.js
class RenderElements {
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
    inputEl.addEventListener("input", event => {
      this.inputListener(event);
    });
    this.form.addEventListener("submit", event => {
      event.preventDefault();
      this.submitListener(event);
    });
  }
  renderCarts() {
    const carts = document.createElement("div");
    carts.classList.add("carts-block");
    this.cartsList.map(item => {
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
    oldActiveSystem.forEach(item => {
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
;// CONCATENATED MODULE: ./src/js/Controller.js


const cartsList = [{
  code: 2,
  name: "mir"
}, {
  code: 4,
  name: "visa"
}, {
  code: 5,
  name: "master"
}, {
  code: 6,
  name: "maestro"
}];
class Controller {
  constructor(container) {
    this.container = document.querySelector(container);
    this.render = new RenderElements(this.container, cartsList);
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
;// CONCATENATED MODULE: ./src/js/app.js

new Controller("#app");
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;