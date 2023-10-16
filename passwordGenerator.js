const CHAR_TYPES = {
	LOWER: 'lowercase',
	UPPER: 'uppercase',
	NUMBER: 'numbers',
	SYMBOL: 'symbols',
};

const CHAR_SETS = {
	LOWER: 'abcdefghijklmnopqrstuvwxyz',
	UPPER: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	NUMBER: '0123456789',
	SYMBOL: '!@#$%^&*()-_=+{}[]\\|;:"<>,./?`~',
};

(function () {
	const getElement = (id) => document.getElementById(id);

	const elements = {
		password_settings_form: getElement('password_settings_form'),
		result: getElement('result'),
		length: getElement('length'),
		generate: getElement('generate'),
		clipboard: getElement('clipboard'),
		clear: getElement('clear'),
		ranged_value: getElement('ranged_value'),
		password_text: getElement('password_text'),
		pasteToTest: getElement('paste-to-test'),
		error: getElement('error-message'),
	};

	const showError = (message) => {
		elements.error.textContent = message || '';
	};

	const getSelectedTypes = () => Object.keys(CHAR_TYPES).filter((type) => getElement(CHAR_TYPES[type]).checked);

	const updateRangeValue = () => {
		elements.ranged_value.textContent = elements.length.value;
	};

	const handlePasswordGeneration = () => {
		const selectedTypes = getSelectedTypes();

		if (selectedTypes.length === 0) {
			showError('Select at least one character type.');
			return;
		}

		const passwordLength = Number(elements.length.value);
		elements.result.textContent = generatePassword(selectedTypes, passwordLength);

		// Clear the error message after successful password generation
		showError(null);
	};

	const generatePassword = (selectedTypes, length) => {
		const allChars = selectedTypes.map((type) => CHAR_SETS[type]).join('');
		const requiredChars = shuffle(selectedTypes.map((type) => getRandomCharacter(CHAR_SETS[type])));
		const remainingChars = Array.from({ length: length - requiredChars.length }, () => getRandomCharacter(allChars));
		return [...requiredChars, ...remainingChars].join('');
	};

	const getRandomCharacter = (charSet) => charSet[Math.floor(Math.random() * charSet.length)];

	const shuffle = (array) => {
		const arr = [...array];
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	};

	const copyPasswordToClipboard = async () => {
		const password = elements.result.textContent;
		if (!password) {
			alert('First generate a password.');
			return;
		}

		try {
			await navigator.clipboard.writeText(password);
			alert('Password copied to clipboard.');
		} catch (err) {
			alert('Failed to copy. Try manually.');
			console.error('Clipboard write failed:', err);
		}
	};

	const clearFields = () => {
		elements.result.textContent = '';
		elements.password_text.value = '';
	};

	const pastePasswordToTestField = () => {
		elements.password_text.value = elements.result.textContent;
	};

	const eventConfigs = {
		clipboard: copyPasswordToClipboard,
		generate: handlePasswordGeneration,
		clear: clearFields,
		pasteToTest: pastePasswordToTestField,
		length: updateRangeValue,
	};

	const bindEvents = () => {
		for (const [key, handler] of Object.entries(eventConfigs)) {
			elements[key].addEventListener('click', handler);
		}
		elements.password_settings_form.addEventListener('change', handlePasswordGeneration);
	};

	// Initialize event bindings
	bindEvents();
})();
