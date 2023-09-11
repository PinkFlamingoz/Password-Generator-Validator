(function () {
	const elements = {
		floatingBtn: document.querySelector('.floating-btn'),
		closeBtn: document.querySelector('.close-btn'),
		socialPanelContainer: document.querySelector('.social-panel-container'),
	};

	elements.floatingBtn.addEventListener('click', () => {
		elements.socialPanelContainer.classList.toggle('visible');
	});

	elements.closeBtn.addEventListener('click', () => {
		elements.socialPanelContainer.classList.remove('visible');
	});
})();
