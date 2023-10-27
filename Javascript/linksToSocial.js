(() => {
	const FLOATING_BTN_CLASS = '.floating-button';
	const CLOSE_BTN_CLASS = '.close-button';
	const SOCIAL_PANEL_CONTAINER_CLASS = '.social-panel-container';
	const HOVER_ELEMENTS_SELECTOR = '.social-panel ul li a, .social-panel .fa-heart';
	const BURST_DELAY = 200;
	const CONFETTI_DURATION = 300 * 16;

	// Elements
	const elements = {
		floatingBtn: document.querySelector(FLOATING_BTN_CLASS),
		closeBtn: document.querySelector(CLOSE_BTN_CLASS),
		socialPanelContainer: document.querySelector(SOCIAL_PANEL_CONTAINER_CLASS),
		hoverElements: document.querySelectorAll(HOVER_ELEMENTS_SELECTOR),
	};

	const { floatingBtn, closeBtn, socialPanelContainer, hoverElements } = elements;

	const randomInRange = (min, max) => Math.random() * (max - min) + min;

	// Confetti settings configuration
	const configureConfetti = () => ({
		particleCount: 444,
		spread: 333,
		startVelocity: 30,
		gravity: 0.8,
		ticks: 300,
		shapes: ['circle', 'square'],
		scalar: 0.8,
		zIndex: 9999,
		origin: {
			x: randomInRange(0.1, 0.9), // Randomize x between 10% and 90%
			y: randomInRange(0.1, 0.3), // Randomize y between 10% and 30%
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

	let isConfettiActive = false;
	let confettiTimeout;

	const toggleSocialPanel = () => socialPanelContainer.classList.toggle('visible');
	const closeSocialPanel = () => socialPanelContainer.classList.remove('visible');

	const fireConfettiBursts = (numberOfBursts) => {
		if (isConfettiActive) return;
		isConfettiActive = true;

		for (let i = 0; i < numberOfBursts; i++) {
			setTimeout(() => {
				confetti(configureConfetti());
			}, i * BURST_DELAY);
		}

		confettiTimeout = setTimeout(() => {
			confetti.reset();
			isConfettiActive = false;
		}, CONFETTI_DURATION);
	};

	const startConfetti = () => {
		const randomBursts = Math.round(randomInRange(1, 4));
		fireConfettiBursts(randomBursts);
	};

	const stopConfetti = () => {
		if (confettiTimeout) {
			clearTimeout(confettiTimeout);
			confettiTimeout = null;
		}

		confetti.reset();
		isConfettiActive = false;
	};

	const setupEventHandlers = () => {
		if (floatingBtn) {
			floatingBtn.addEventListener('click', toggleSocialPanel);
		} else {
			console.error('Floating button element not found');
		}

		if (closeBtn) {
			closeBtn.addEventListener('click', closeSocialPanel);
		} else {
			console.error('Close button element not found');
		}

		hoverElements.forEach((elem) => {
			elem.addEventListener('mouseenter', startConfetti);
			elem.addEventListener('mouseleave', stopConfetti);
		});
	};

	// Start the process
	setupEventHandlers();
})();
