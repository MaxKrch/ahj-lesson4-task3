export default class Validation {
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
		const system = systems.find((item) => +item.code === +number);

		const nameSystem = system ? system.name : "unknown";

		return nameSystem;
	}

	static validationNumber(number) {
		const numberStr = "" + number;
		const isEven = numberStr.length % 2 === 0 ? true : false;
		const arrayNumbers = numberStr.split("");

		const sum = arrayNumbers.reduce((acc, item, index) => {
			if ((isEven && index % 2 === 0) || (!isEven && index % 2 === 1)) {
				const doubleNum = item > 4 ? item * 2 - 9 : item * 2;
				return acc + +doubleNum;
			}
			return acc + +item;
		}, 0);

		const chek = sum % 10 === 0 ? true : false;
		return chek;
	}
}
