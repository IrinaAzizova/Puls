
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


	/* ______ modals ______ */

	const consultationBtns = document.querySelectorAll('[data-modal="consultation"]'),
		  buyBtns = document.querySelectorAll('[data-modal="buy"]'),
		  overlay = document.querySelector('.overlay'),
		  consultationModal = overlay.querySelector('#consultation-modal'),
		  buyModal = overlay.querySelector('#buy-modal'),
		  modalClose = overlay.querySelectorAll('.modal__close');

	consultationBtns.forEach(btn => {
		btn.addEventListener('click', (event) => {
			event.preventDefault();
			consultationModal.classList.add('animate__fadeIn');
			consultationModal.classList.remove('animate__fadeOut');
			overlay.style.display = 'flex';
			consultationModal.style.display = 'block';			
		});
	});

	buyBtns.forEach(btn => {
		btn.addEventListener('click', (event) => {
			event.preventDefault();
			buyModal.classList.add('animate__fadeIn');
			buyModal.classList.remove('animate__fadeOut');
			overlay.style.display = 'flex';
			buyModal.style.display = 'block';
		});
	});

	modalClose.forEach(cross => {
		cross.addEventListener('click', (event) => {
			if (event.target.parentNode.id = 'consultation-modal') {
				consultationModal.classList.add('animate__fadeOut');
				consultationModal.classList.remove('animate__fadeIn');
				
			} else if (event.target.parentNode.id = 'buy-modal') {
				buyModal.classList.add('animate__fadeOut');
				buyModal.classList.remove('animate__fadeIn');
			}
			setTimeout(() => {
				overlay.style.display = 'none';
				consultationModal.style.display = 'none';
				buyModal.style.display = 'none';
			}, 300);
			
			
			
		});
	});


	/* _____ validation (used jQuery validate library) _____ */

	const rules = {
		rules: {			
			name: {
				required: true,
				minlength: 2
			},	
			tel: {
				required: true,
				minlength: 11
			},
			email: {
			  required: true,
			  email: true
			}
		},
		messages: {
			name: {
			  required: "Введите ваше имя",
			  minlength: jQuery.validator.format("Введите минимум {0} символа!")
			},
			tel: {
				required: "Введите ваш номер телефона",
				minlength: jQuery.validator.format("Введите минимум {0} символов!")
			},
			email: {
				required: "Введите ваш email-адрес",
				email: "Введите корректный адрес"
			}
		  }
	};

	$('#buy-modal__form').validate(rules);
	$('#consultation-modal form').validate(rules);
	$('.consultation .form_consultation').validate(rules);


	/* _____ input phone mask _____ */

	const phoneInputMask_var2 = (phoneInputSelector) => {
		const eventCalllback = event => {
			const el = event.target,
				clearVal = el.dataset.phoneClear,
				pattern = el.dataset.phonePattern,
				matrix_def = "+7(___) ___-__-__",
				matrix = pattern ? pattern : matrix_def,
				def = matrix.replace(/\D/g, "");
			let i = 0,
				val = event.target.value.replace(/\D/g, "");
	
			if (clearVal !== 'false' && event.type === 'blur') {
				if (val.length < matrix.match(/([\_\d])/g).length) {
					event.target.value = '';
					return;
				}
			}
			if (def.length >= val.length) val = def;
			event.target.value = matrix.replace(/./g, function (a) {
				return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
			});
		}
	
		const phone_inputs = document.querySelectorAll(phoneInputSelector);
		for (let elem of phone_inputs) {
			for (let ev of ['input', 'blur', 'focus']) {
				elem.addEventListener(ev, eventCalllback);
			}
		}
	}
	
	phoneInputMask_var2('input[type="tel"]');



	/* _____ Sending emails from the site (used jQuery ajax()) _____ */

	$('form').submit(function(e) {
		e.preventDefault();
		if (!$(this).valid()) {
			return;
		}
		
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('#consultation-modal, #buy-modal').fadeOut();
			$('.overlay, #thanks-modal').fadeIn('slow');
			$('form').trigger('reset');
			setTimeout(() => {
				$('.overlay, #thanks-modal').fadeOut();
			}, 3000);
			return false;
		});
	});



	/* _____ pageup button _____ */

	const pageUpBtn = document.querySelector('#pageup');
	window.addEventListener('scroll', () => {
		if (document.documentElement.scrollTop > 1600) {
			pageUpBtn.classList.remove('animate__fadeOut');
			pageUpBtn.classList.add('animate__fadeIn');
			pageUpBtn.style.display = 'block';
		} else {
			pageUpBtn.classList.add('animate__fadeIn');
			pageUpBtn.classList.remove('animate__fadeOut');
			pageUpBtn.style.display = 'none';
			
		}
	});



	/* _____ fadeUp animation ____ */

	const observer = new IntersectionObserver(entries => {
		// перебор записей
		entries.forEach(entry => {
		  	// если элемент появился
		  	if (entry.isIntersecting) {
				// добавить ему CSS-класс
				entry.target.classList.add('animate__fadeInUp');
		 	}
		});
	});
	document.querySelectorAll('.reviews__item').forEach(item => {
		observer.observe(item);
	});	  
});