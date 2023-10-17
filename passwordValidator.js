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
