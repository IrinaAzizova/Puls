document.addEventListener('DOMContentLoaded', () => {

	/* _____ slider connection _____ */
	const slider = ItcSlider.getOrCreateInstance('.itc-slider');

	/* _____ product card animation _____ */
	const cardWrapper = document.querySelectorAll('.catalogue-card__wrapper'),
		  moreLinks = document.querySelectorAll('.catalogue-card__more'),
		  backLinks = document.querySelectorAll('.catalogue-card__back');

	moreLinks.forEach((eachLink, i) => {
	  	eachLink.addEventListener('click', (event) => {
			event.preventDefault();
			cardWrapper[i].classList.add('catalogue-card__wrapper_active');
	  	});
  	});

	backLinks.forEach((eachLink, i) => {
		eachLink.addEventListener('click', (event) => {
		  event.preventDefault();
		  cardWrapper[i].classList.remove('catalogue-card__wrapper_active');
		});
	});

	/* _____ tabs _____ */
	const tabs = document.querySelectorAll('.catalogue__tab'),
		  catalogueCards = document.querySelectorAll('.catalogue-card');

	tabs.forEach((eachTab, i) => {
		eachTab.addEventListener('click', () => {
			tabs.forEach(tab => {
				tab.classList.remove('catalogue__tab_active');
			});
			catalogueCards.forEach(eachCard => {
				if (eachCard.dataset.tab != tabs[i].dataset.tab) {
					eachCard.style.display = 'none';
				} else {
					eachCard.style.display = 'block';
				}
			});
			tabs[i].classList.add('catalogue__tab_active');			
		});
	});
});