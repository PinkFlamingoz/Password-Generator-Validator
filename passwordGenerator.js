const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');
const clearEl = document.getElementById('clear');
var rangeEl = document.getElementById('rangeValue');
const passwordTextEl = document.getElementById('passwordText');
const paste_to_testEl = document.getElementById('paste-to-test');

rangeEl.innerHTML = lengthEl.value;
lengthEl.oninput = function () {
	rangeEl.innerHTML = this.value;
	thePasswordBaby();
};

const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol,
};

clipboardEl.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const password = resultEl.innerText;

	if (!password) {
		alert('Maybe generate something first?');
		return;
	}

	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard ' + '\n' + 'Password: ' + password);
});

generateEl.addEventListener('click', () => {
	thePasswordBaby();
});

function thePasswordBaby() {
	const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;

	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
}

// We need to set a password value
// Then we need to filter out the unchecked settings
// Loop over the desired lenght of our passowrd, with that we call the getRandom/Lower/Upper/Number/Symbols functions
// Last we simply just add the password to the password value and return it
function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = '';
	const typesCount = lower + upper + number + symbol; // Gets the amount of checks we selected
	const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter((item) => Object.values(item)[0]); // Turns it into a array of objects, and filters out the false (uncheked settings)

	// Doesn't have a selected type
	if (typesCount === 0) {
		return '';
	}

	// create a loop
	for (let i = 0; i < length; i += typesCount) {
		typesArr.forEach((type) => {
			const funcName = Object.keys(type)[0]; // We get the function name for lower, upper, number, symbol
			generatedPassword += randomFunc[funcName]();
		});
	}

	const finalPassword = generatedPassword.slice(0, length);

	return finalPassword;
}

clearEl.addEventListener('click', () => {
	resultEl.innerText = '';
	passwordTextEl.value = '';
});

paste_to_testEl.addEventListener('click', () => {
	passwordTextEl.value = resultEl.innerText;
});

// 26 letters in the Alphabet -> that is our limit for math.random, we want numbers only from 0 to 25 ( all together 26 )
// also the link to the online browser character set https://www.w3schools.com/html/html_charset.asp for reference
// lower case "a" starts from 97, so for example if we get 0 + 97 it will give us the lower case "a", if we get 4 + 97 we will get the lower case "e"
// and the limit if we get 25 + 97 we get the lower case "z" ( this includes all the lower cases so we just have to add the number wher it starts )
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*()-_=+{}[]|;:"<>,./?`~';
	return symbols[Math.floor(Math.random() * symbols.length)];
}
