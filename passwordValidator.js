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
		passwordInput: getElement('passwordText'),
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

//---------------------

function _id(name) {
	return document.getElementById(name);
}

function _class(name) {
	return document.getElementsByClassName(name);
}

_class('toggle-password')[0].addEventListener('click', () => {
	_class('toggle-password')[0].classList.toggle('active');

	if (_id('passwordText').getAttribute('type') == 'password') {
		_id('passwordText').setAttribute('type', 'text');
	} else {
		_id('passwordText').setAttribute('type', 'password');
	}
});

_id('passwordText').addEventListener('focus', () => {
	_class('password-rules')[0].classList.add('active');
});

_id('passwordText').addEventListener('blur', () => {
	_class('password-rules')[0].classList.remove('active');
});

function checkThePassword() {
	let password = _id('passwordText').value;
	console.log(_id('passwordText').value);

	if (/[A-Z]/.test(password)) {
		_class('rule-uppercase')[0].classList.add('active');
	} else {
		_class('rule-uppercase')[0].classList.remove('active');
	}

	if (/[0-9]/.test(password)) {
		_class('rule-number')[0].classList.add('active');
	} else {
		_class('rule-number')[0].classList.remove('active');
	}

	if (/[^A-Za-z0-9]/.test(password)) {
		_class('rule-symbol')[0].classList.add('active');
	} else {
		_class('rule-symbol')[0].classList.remove('active');
	}

	if (password.length > 6) {
		_class('rule-lenght')[0].classList.add('active');
	} else {
		_class('rule-lenght')[0].classList.remove('active');
	}
}

_id('passwordText').addEventListener('mousemove', () => {
	checkThePassword();
});

_id('passwordText').addEventListener('keyup', () => {
	checkThePassword();
});
