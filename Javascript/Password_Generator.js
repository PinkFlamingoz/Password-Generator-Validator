// Define constants representing the types of characters to be included in the password.
const CHAR_TYPES = {
	LOWER: 'lowercase', // Represents lowercase characters.
	UPPER: 'uppercase', // Represents uppercase characters.
	NUMBER: 'numbers', //- Represents numeric characters.
	SYMBOL: 'symbols', //- Represents special characters or symbols.
};

// Define constants containing the characters corresponding to each type.
const CHAR_SETS = {
	LOWER: 'abcdefghijklmnopqrstuvwxyz', //------- All lowercase letters in the English alphabet.
	UPPER: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', //------- All uppercase letters in the English alphabet.
	NUMBER: '0123456789', //---------------------- All digits.
	SYMBOL: '!@#$%^&*()-_=+{}[]\\|;:"<>,./?`~', // Commonly used special characters and symbols.
};

// Self-executing anonymous function: this structure helps avoid global scope pollution.
(function () {
	// Helper function: a shorthand for getting elements by their ID.
	const Get_Element = (id) => document.getElementById(id);

	// Define an object to hold the various elements we will interact with.
	const elements = {
		password_settings_form: Get_Element('password_settings_form'), // The form where the user sets password preferences.
		result: Get_Element('result'), //-------------------------------- The element displaying the generated password.
		length: Get_Element('length'), //-------------------------------- The input control for password length.
		generate: Get_Element('generate'), //---------------------------- The button triggering the password generation.
		clipboard: Get_Element('clipboard'), //-------------------------- The button to copy the password to the clipboard.
		clear: Get_Element('clear'), //---------------------------------- The button to clear all fields.
		ranged_value: Get_Element('ranged_value'), //-------------------- Display element for the range input's value.
		password_text: Get_Element('password_text'), //------------------ The input where the generated password can be pasted for testing.
		paste_to_test: Get_Element('paste-to-test'), //------------------ The button for pasting the password into the test field.
		error: Get_Element('error_message'), //-------------------------- The element to display any error messages.
	};

	// * GENERATE PASSWORD --------------------------------------------------------------------------------------------------------------------

	// Event handler function for password generation.
	const Handle_Password_Generation = () => {
		// Get the selected character types.
		const selected_types = Get_Selected_Types();

		// Check if at least one character type is selected.
		if (selected_types.length === 0) {
			Show_Error('Select at least one character type.'); // Display error if none are selected.
			return;
		}

		// Get the desired password length from the input.
		const password_length = Number(elements.length.value);

		// Generate and display the password.
		elements.result.textContent = Generate_Password(selected_types, password_length);

		Show_Error(null); // Clear any previous error messages.
	};

	// Function to determine which character types are selected.
	const Get_Selected_Types = () => {
		// Filter character types based on whether the corresponding checkbox is checked.
		return Object.keys(CHAR_TYPES).filter((type) => Get_Element(CHAR_TYPES[type]).checked);
	};

	// Function to display error messages.
	const Show_Error = (message) => {
		elements.error.textContent = message || ''; // If there's a message, display it; otherwise, clear the error message.
	};

	// Function to generate a password based on selected character types and specified length.
	const Generate_Password = (selected_types, length) => {
		// Create a string of all possible characters.
		const all_chars = selected_types.map((type) => CHAR_SETS[type]).join('');

		// Ensure the password contains at least one of each selected character type.
		const required_chars = Shuffle(selected_types.map((type) => Get_Random_Character(CHAR_SETS[type])));

		// Fill the rest of the password length with random characters from the possible set.
		const remaining_chars = Array.from({ length: length - required_chars.length }, () => Get_Random_Character(all_chars));

		// Combine and return the final password.
		return [...required_chars, ...remaining_chars].join('');
	};

	// Function to shuffle the elements of an array (used for the characters in the password).
	const Shuffle = (array) => {
		// Create a copy of the array to avoid altering the original.
		const arr = [...array];
		// Fisher-Yates (Knuth) shuffle algorithm.
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i.
			[arr[i], arr[j]] = [arr[j], arr[i]]; //---------- Swap elements.
		}
		return arr;
	};

	// Function to get a random character from a string of characters.
	const Get_Random_Character = (char_set) => {
		// Select a random index from the string.
		return char_set[Math.floor(Math.random() * char_set.length)];
	};
	// * GENERATE PASSWORD --------------------------------------------------------------------------------------------------------------------

	// Function to update the text content of the ranged value display.
	const Update_Range_Value = () => {
		// Reflect the current value of the range input in the associated display element.
		elements.ranged_value.textContent = elements.length.value;
	};

	// Event handler function to copy the generated password to the clipboard.
	const Copy_Password_To_Clipboard = async () => {
		// Get the generated password.
		const password = elements.result.textContent;

		if (!password) {
			// If no password is generated, alert the user.
			alert('First generate a password.');
			return;
		}

		try {
			// Try to copy the text to the clipboard.
			await navigator.clipboard.writeText(password);

			// Alert the user of success.
			alert('Password copied to clipboard.');
		} catch (err) {
			// Handle exceptions by notifying the user.
			alert('Failed to copy. Try manually.');
			console.error('Clipboard write failed:', err);
		}
	};

	// Function to clear all input and output fields.
	const Clear_Fields = () => {
		elements.result.textContent = ''; //-------- Clear the generated password display.
		elements.password_text.value = ''; //------- Clear the password test field.
		elements.ranged_value.value = 33; //-------- Reset range value.
		elements.ranged_value.textContent = '33'; // Reset range value display.
	};

	// Event handler function for pasting the generated password into the test field.
	const Paste_Password_To_Test_Field = (event) => {
		// Prevent the default action to ensure our code executes.
		event.preventDefault();

		// Copy the generated password from the result display to the password test input field.
		elements.password_text.value = elements.result.textContent;
	};

	// Define a configuration for binding event handlers to elements.
	const event_configs = {
		clipboard: Copy_Password_To_Clipboard,
		generate: Handle_Password_Generation,
		clear: Clear_Fields,
		paste_to_test: Paste_Password_To_Test_Field,
		length: Update_Range_Value,
	};

	// Function to bind events to elements based on the configuration.
	const Bind_Events = () => {
		// Iterate through the event configuration and bind each event handler.
		for (const [key, handler] of Object.entries(event_configs)) {
			if (key === 'paste_to_test') {
				// Special case: we want to prevent the default form submission.
				elements[key].addEventListener('click', (event) => handler(event));
			} else {
				// For most events, we bind the handler directly.
				elements[key].addEventListener('click', handler);
			}
		}

		// For the form change event, regenerate the password if the settings are altered.
		elements.password_settings_form.addEventListener('change', Handle_Password_Generation);

		// Update the range value display and regenerate the password when the range input changes.
		elements.length.addEventListener('input', (event) => {
			Update_Range_Value();
			Handle_Password_Generation();
		});
	};

	// Execute the event binding function.
	Bind_Events();
})(); // End of the self-executing anonymous function.
