// Constants representing various selectors for HTML elements.
const FLOATING_BUTTON_CLASS = '.floating-button'; //-------------------------------- Selector for the floating action button.
const CLOSE_BUTTON_CLASS = '.close-button'; //-------------------------------------- Selector for the close button.
const SOCIAL_PANEL_CONTAINER_CLASS = '.social-panel-container'; //------------------ Selector for the social panel container.
const HOVER_ELEMENTS_SELECTOR = '.social-panel ul li a, .social-panel .fa-heart'; // Selector for elements that trigger effects on hover.

// Constants for configuring the confetti effect.
const BURST_DELAY = 200; //----------- Delay between each burst of confetti.
const CONFETTI_DURATION = 300 * 16; // Duration for the confetti animation effect.

// Self-executing anonymous function: this structure helps avoid global scope pollution.
(function () {
	// Object containing references to necessary DOM elements.
	const elements = {
		floating_button: document.querySelector(FLOATING_BUTTON_CLASS), //-------------- Floating button element.
		close_button: document.querySelector(CLOSE_BUTTON_CLASS), //-------------------- Close button element.
		social_panel_container: document.querySelector(SOCIAL_PANEL_CONTAINER_CLASS), // Container for the social panel.
		hover_elements: document.querySelectorAll(HOVER_ELEMENTS_SELECTOR), //---------- Elements that will trigger confetti on hover.
	};

	// Destructuring for easier reference.
	const { floating_button, close_button, social_panel_container, hover_elements } = elements;

	// * CONFETTI -----------------------------------------------------------------------------------------------------------------------------

	// Flags and variables for managing the confetti effect.
	let is_confetti_active = false; // Indicates whether the confetti animation is currently active.
	let confetti_timeout; //---------- Holds a reference to the timeout for the confetti effect.

	// Function to start the confetti effect with a random number of bursts.
	const Start_Confetti = () => {
		const random_bursts = Math.round(Random_In_Range(1, 4)); // Generate a random number of bursts.
		Fire_Confetti_Bursts(random_bursts); //-------------------- Initiate the confetti effect.
	};

	// Function to create multiple bursts of confetti.
	const Fire_Confetti_Bursts = (number_of_bursts) => {
		// Prevent multiple confetti triggers.
		if (is_confetti_active) {
			return;
		}

		is_confetti_active = true;

		// Trigger the confetti bursts in succession with delays.
		for (let i = 0; i < number_of_bursts; i++) {
			setTimeout(() => {
				confetti(Configure_Confetti()); // Calls a function (from confetti library) to create the effect.
			}, i * BURST_DELAY);
		}

		// Reset confetti after the effect is over.
		confetti_timeout = setTimeout(() => {
			confetti.reset(); //---------- Reset the confetti effects.
			is_confetti_active = false; // Mark that the confetti is no longer active.
		}, CONFETTI_DURATION);
	};

	// Function configuring the properties of the confetti animation.
	const Configure_Confetti = () => ({
		particleCount: Random_In_Range(266, 444),
		spread: Random_In_Range(277, 333),
		startVelocity: Random_In_Range(18, 33),
		gravity: Random_In_Range(0.6, 0.8),
		ticks: 300,
		shapes: ['circle', 'square'],
		scalar: Random_In_Range(0.6, 0.8),
		zIndex: 9999,
		origin: {
			x: Random_In_Range(0.1, 0.9),
			y: Random_In_Range(0.1, 0.3),
		},
		colors: [
			[165, 104, 246],
			[230, 61, 135],
			[0, 199, 228],
			[253, 214, 126],
			[253, 114, 116],
			[54, 169, 225],
			[123, 237, 159],
			[255, 159, 243],
			[255, 159, 67],
			[4, 217, 255],
			[255, 255, 0],
			[255, 105, 180],
			[138, 43, 226],
			[0, 255, 127],
			[210, 105, 30],
			[255, 140, 0],
			[70, 130, 180],
			[255, 20, 147],
			[0, 191, 255],
			[147, 112, 219],
		],
	});

	// Function to generate a random number within a range.
	const Random_In_Range = (min, max) => Math.random() * (max - min) + min;

	// Function to stop the confetti effect and reset its state.
	const Stop_Confetti = () => {
		if (confetti_timeout) {
			clearTimeout(confetti_timeout); // Clear the existing timeout if it's set.
			confetti_timeout = null; //------- Reset the timeout variable.
		}

		confetti.reset(); //---------- Reset the confetti effects.
		is_confetti_active = false; // Mark that the confetti is no longer active.
	};

	// * CONFETTI -----------------------------------------------------------------------------------------------------------------------------

	// Function to toggle the visibility of the social panel.
	const Toggle_Social_Panel = () => social_panel_container.classList.toggle('visible');

	// Function to close the social panel.
	const Close_Social_Panel = () => social_panel_container.classList.remove('visible');

	// Function to set up the necessary event listeners.
	const Setup_Event_Handlers = () => {
		// Set up the click event for the floating button, which toggles the social panel.
		floating_button.addEventListener('click', Toggle_Social_Panel);

		// Set up the click event for the close button, which hides the social panel.
		close_button.addEventListener('click', Close_Social_Panel);

		// Add event listeners for each hover element to trigger the confetti effects.
		hover_elements.forEach((elem) => {
			elem.addEventListener('mouseenter', Start_Confetti); // Start confetti on mouse enter.
			elem.addEventListener('mouseleave', Stop_Confetti); //- Stop confetti on mouse leave.
		});
	};

	// Call the setup function to initialize event handlers.
	Setup_Event_Handlers();
})(); // End of the self-executing anonymous function.
