import Controller from '../Controller';

const correctCarts = [
	{	
		system: 'master',
		number: '5516 7535 1595 1234' 
	},
	{
		system: 'visa',
		number: '4516 7535 1595 1237' 
	}
];

const uncorrectCarts = [
	{
		descr: 'incorrect',
		number: '5516 7535 1595 1231'  
	},
	{
		descr: 'short',
		number: '1235 4579 5108 120'
	},
	{
		descr: 'long',
		number: '7575 5017 5457 5057 65' 
	} 
];


test.each(correctCarts)(`correct carts system: $system`, ({system, number}) => {
	document.body.innerHTML = `
		<div class="container" id="app">
		</div>
	`;

	const app = new Controller('#app');

	const form = document.querySelector('.buttons-block');
	const input = form.querySelector('.input-text');
	const carts = document.querySelector('.carts-block');
	const modal = document.querySelector('.message-block')

	input.value = number;
	form.submit();

	const activeSystem = carts.querySelector(`.${system}`);
	expect(activeSystem.classList.contains('cart-item_active')).toBeTruthy();
	expect(modal.classList.contains('valid')).toBeTruthy();
 
})

test.each(uncorrectCarts)(`uncorrect cart number: $descr`, ({number}) => {
		const app = new Controller('#app');

	const form = document.querySelector('.buttons-block');
	const input = form.querySelector('.input-text');
	const modal = document.querySelector('.message-block')

	input.value = number;
	form.submit();

	expect(modal.classList.contains('invalid')).toBeTruthy();
})


