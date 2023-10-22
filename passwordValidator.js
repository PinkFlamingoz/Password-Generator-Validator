const PASSWORD_RULES = {
	'rule-uppercase': {
		test: /[A-Z]/,
		className: 'rule-uppercase',
	},
	'rule-number': {
		test: /[0-9]/,
		className: 'rule-number',
	},
	'rule-symbol': {
		test: /[^A-Za-z0-9]/,
		className: 'rule-symbol',
	},
	'rule-length': {
		test: (password) => password.length > 6,
		className: 'rule-length',
	},
};

// Freezing PASSWORD_RULES to ensure its properties can't be added/removed/changed.
Object.freeze(PASSWORD_RULES);

(function () {
	const getElement = (id) => document.getElementById(id);
	const getClassElement = (className) => document.getElementsByClassName(className)[0];

	// Cache elements for reuse
	for (let ruleKey in PASSWORD_RULES) {
		PASSWORD_RULES[ruleKey].element = getClassElement(PASSWORD_RULES[ruleKey].className);
	}

	const elements = {
		passwordInput: getElement('password_text'),
		togglePasswordBtn: getClassElement('toggle-password'),
		passwordRules: getClassElement('password-rules'),
	};

	const togglePasswordVisibility = () => {
		const isPassword = elements.passwordInput.getAttribute('type') === 'password';
		elements.togglePasswordBtn.classList.toggle('active');
		elements.passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
	};

	const validateRule = (password, ruleConfig) => {
		const isRuleMet = typeof ruleConfig.test === 'function' ? ruleConfig.test(password) : ruleConfig.test.test(password);
		ruleConfig.element.classList[isRuleMet ? 'add' : 'remove']('active');
	};

	const checkThePassword = () => {
		const password = elements.passwordInput.value;
		for (let ruleKey in PASSWORD_RULES) {
			validateRule(password, PASSWORD_RULES[ruleKey]);
		}
	};

	const bindEvents = () => {
		elements.togglePasswordBtn.addEventListener('click', togglePasswordVisibility);
		elements.passwordInput.addEventListener('focus', () => elements.passwordRules.classList.add('active'));
		elements.passwordInput.addEventListener('blur', () => elements.passwordRules.classList.remove('active'));
		elements.passwordInput.addEventListener('input', checkThePassword);
	};

	bindEvents();
})();
