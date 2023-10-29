// Define the rules for password validation.
// Each rule is an object that specifies the condition to check and the related CSS class.
const PASSWORD_RULES = {
	// Rule: Password must contain an uppercase letter.
	// Using a regex to test the presence of at least one uppercase character.
	'rule-uppercase': {
		test: /[A-Z]/,
		class_name: 'rule-uppercase',
	},

	// Rule: Password must contain a lowercase letter.
	// Using a regex to test the presence of at least one lowercase character.
	'rule-lowercase': {
		test: /[a-z]/,
		class_name: 'rule-lowercase',
	},

	// Rule: Password must contain a number.
	// Using a regex to test the presence of at least one numeric character.
	'rule-number': {
		test: /[0-9]/,
		class_name: 'rule-number',
	},

	// Rule: Password must contain a symbol.
	// Using a regex to test for anything that is not an alphanumeric character.
	'rule-symbol': {
		test: /[^A-Za-z0-9]/,
		class_name: 'rule-symbol',
	},

	// Rule: Password must be more than 6 characters long.
	// Using a function to check the password length.
	'rule-length': {
		test: (password) => password.length > 6,
		class_name: 'rule-length',
	},
};

// Freeze the object to prevent modification, maintaining the integrity of the rules.
Object.freeze(PASSWORD_RULES);

// Self-executing anonymous function to avoid global scope pollution.
(function () {
	// Helper function: shorthand for document.getElementById.
	const Get_Element = (id) => document.getElementById(id);

	// Helper function: shorthand for getting the first element of a given class name.
	const Get_Class_Element = (class_name) => document.getElementsByClassName(class_name)[0];

	// Populate the 'element' property for each rule with the corresponding DOM element.
	for (let rule_key in PASSWORD_RULES) {
		PASSWORD_RULES[rule_key].element = Get_Class_Element(PASSWORD_RULES[rule_key].class_name);
	}

	// Object holding references to significant DOM elements for easy access.
	const elements = {
		password_input: Get_Element('password_text'), //---------------- The password input field.
		toggle_password_button: Get_Class_Element('toggle-password'), // The button to toggle password visibility.
		password_rules: Get_Class_Element('password-rules'), //--------- The container displaying the password rules.
	};

	// Function to toggle the visibility of the password between plain text and hidden.
	const Toggle_Password_Visibility = () => {
		// Check the current type of the input field.
		const is_password = elements.password_input.getAttribute('type') === 'password';

		// Toggle the 'active' class for the button.
		elements.toggle_password_button.classList.toggle('active');

		// Change the type attribute to toggle visibility.
		elements.password_input.setAttribute('type', is_password ? 'text' : 'password');
	};

	// * Check the password -------------------------------------------------------------------------------------------------------------------

	// Function to check the entered password against all defined rules.
	const Check_The_Password = () => {
		// Get the current password from the input field.
		const password = elements.password_input.value;

		// Iterate through all the rules and validate them.
		for (let rule_key in PASSWORD_RULES) {
			Validate_Rule(password, PASSWORD_RULES[rule_key]);
		}
	};

	// Function to validate a specific rule based on the password entered.
	const Validate_Rule = (password, rule_config) => {
		// Check if the rule is met. Accommodates both functions and regex.
		const is_rule_met = typeof rule_config.test === 'function' ? rule_config.test(password) : rule_config.test.test(password);

		// If the rule is met, add the 'active' class; otherwise, remove it.
		rule_config.element.classList[is_rule_met ? 'add' : 'remove']('active');
	};
	// * Check the password -------------------------------------------------------------------------------------------------------------------

	// Function to bind the event listeners.
	const Bind_Events = () => {
		// When the toggle button is clicked, execute the visibility toggle function.
		elements.toggle_password_button.addEventListener('click', Toggle_Password_Visibility);

		// Show the password rules when the input field is focused.
		elements.password_input.addEventListener('focus', () => elements.password_rules.classList.add('active'));

		// Hide the password rules when the input field loses focus.
		elements.password_input.addEventListener('blur', () => elements.password_rules.classList.remove('active'));

		// When the user types in the input field, check the password validity.
		elements.password_input.addEventListener('input', Check_The_Password);
	};

	// Bind the events to the DOM elements.
	Bind_Events();
})(); // The function executes immediately after its definition.
