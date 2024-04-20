
/**
 * Easy selector helper function
 */
const select = (el, all = false) => {
	el = el.trim()
	if (all) {
		return [...document.querySelectorAll(el)]
	} else {
		return document.querySelector(el)
	}
}

/**
 * Easy event listener function
 */
const on = (type, el, listener, all = false) => {
	let selectEl = select(el, all)
	if (selectEl) {
		if (all) {
			selectEl.forEach(e => e.addEventListener(type, listener))
		} else {
			selectEl.addEventListener(type, listener)
		}
	}
}

/**
 * Easy on scroll event listener 
 */
const onscroll = (el, listener) => {
	el.addEventListener('scroll', listener)
}

/**
 * Navbar links active state on scroll
 */
let navbarlinks = select('#navbar .scrollto', true)
const navbarlinksActive = () => {
	let position = window.scrollY + 200
	navbarlinks.forEach(navbarlink => {
		if (!navbarlink.hash) return
		let section = select(navbarlink.hash)
		if (!section) return
		if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
			navbarlink.classList.add('active')
		} else {
			navbarlink.classList.remove('active')
		}
	})
}
window.addEventListener('load', navbarlinksActive)
onscroll(document, navbarlinksActive)

/**
 * Scrolls to an element with header offset
 */
const scrollto = (el) => {
	let header = select('#header')
	let offset = header.offsetHeight

	let elementPos = select(el).offsetTop
	window.scrollTo({
		top: elementPos - offset,
		behavior: 'smooth'
	})
}

/**
 * Toggle .header-scrolled class to #header when page is scrolled
 */
let selectHeader = select('#header')
if (selectHeader) {
	const headerScrolled = () => {
		if (window.scrollY > 100) {
			selectHeader.classList.add('header-scrolled')
		} else {
			selectHeader.classList.remove('header-scrolled')
		}
	}
	window.addEventListener('load', headerScrolled)
	onscroll(document, headerScrolled)
}

/**
 * Back to top button
 */
let backtotop = select('.back-to-top')
if (backtotop) {
	const toggleBacktotop = () => {
		if (window.scrollY > 100) {
			backtotop.classList.add('active')
		} else {
			backtotop.classList.remove('active')
		}
	}
	window.addEventListener('load', toggleBacktotop)
	onscroll(document, toggleBacktotop)
}

/**
 * Mobile nav toggle
 */
on('click', '.mobile-nav-toggle', function (e) {
	select('#navbar').classList.toggle('navbar-mobile')
	this.classList.toggle('bi-list')
	this.classList.toggle('bi-x')
})

/**
 * Mobile nav dropdowns activate
 */
on('click', '.navbar .dropdown > a', function (e) {
	if (select('#navbar').classList.contains('navbar-mobile')) {
		e.preventDefault()
		this.nextElementSibling.classList.toggle('dropdown-active')
	}
}, true)

/**
 * Scrool with ofset on links with a class name .scrollto
 */
on('click', '.scrollto', function (e) {
	if (select(this.hash)) {
		e.preventDefault()

		let navbar = select('#navbar')
		if (navbar.classList.contains('navbar-mobile')) {
			navbar.classList.remove('navbar-mobile')
			let navbarToggle = select('.mobile-nav-toggle')
			navbarToggle.classList.toggle('bi-list')
			navbarToggle.classList.toggle('bi-x')
		}
		scrollto(this.hash)
	}
}, true)

/**
 * Scroll with ofset on page load with hash links in the url
 */
window.addEventListener('load', () => {
	if (window.location.hash) {
		if (select(window.location.hash)) {
			scrollto(window.location.hash)
		}
	}
});

/**
 * Preloader
 */
let preloader = select('#preloader');
if (preloader) {
	window.addEventListener('load', () => {
		preloader.remove()
	});
}

/**
 * Clients Slider
 */
new Swiper('.clients-slider', {
	speed: 400,
	loop: true,
	autoplay: {
		delay: 5000,
		disableOnInteraction: false
	},
	slidesPerView: 'auto',
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
		clickable: true
	},
	breakpoints: {
		320: {
			slidesPerView: 2,
			spaceBetween: 40
		},
		480: {
			slidesPerView: 3,
			spaceBetween: 60
		},
		640: {
			slidesPerView: 4,
			spaceBetween: 80
		},
		992: {
			slidesPerView: 6,
			spaceBetween: 120
		}
	}
});

/**
 * Porfolio isotope and filter
 */
window.addEventListener('load', () => {
	let portfolioContainer = select('.portfolio-container');
	if (portfolioContainer) {
		let portfolioIsotope = new Isotope(portfolioContainer, {
			itemSelector: '.portfolio-item'
		});

		let portfolioFilters = select('#portfolio-flters li', true);

		on('click', '#portfolio-flters li', function (e) {
			e.preventDefault();
			portfolioFilters.forEach(function (el) {
				el.classList.remove('filter-active');
			});
			this.classList.add('filter-active');

			portfolioIsotope.arrange({
				filter: this.getAttribute('data-filter')
			});
			portfolioIsotope.on('arrangeComplete', function () {
				AOS.refresh()
			});
		}, true);
	}

});

/**
 * Initiate portfolio lightbox 
 */
const portfolioLightbox = GLightbox({
	selector: '.portfolio-lightbox'
});

/**
 * Portfolio details slider
 */
new Swiper('.portfolio-details-slider', {
	speed: 400,
	loop: true,
	autoplay: {
		delay: 5000,
		disableOnInteraction: false
	},
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
		clickable: true
	}
});

/**
 * Testimonials slider
 */
new Swiper('.testimonials-slider', {
	speed: 600,
	loop: true,
	autoplay: {
		delay: 5000,
		disableOnInteraction: false
	},
	slidesPerView: 'auto',
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
		clickable: true
	}
});

/**
 * Animation on scroll
 */
window.addEventListener('load', () => {
	AOS.init({
		duration: 1000,
		easing: "ease-in-out",
		once: true,
		mirror: false
	});
});

/**
 * Initiate Pure Counter 
 */
new PureCounter();


/**
 * Contact form validation
 */
const contactform = select('.contactform');
const contactEmailInvalidFeedback = select(".contactform .email-feedback.invalid-feedback");
const contactAlertError = select(".contactform .alert-danger");
const contactAlertSuccess = select(".contactform .alert-success");
const contactLoading = select(".contactform .loading");

const contactNameInput = select('#id_name');
const contactEmailInput = select('#id_email');
const contactSubjectInput = select('#id_subject');
const contactMessageInput = select('#id_message');
const contactRecepientInput = select('#id_recipient_email');

contactform.addEventListener('submit', event => {
	event.preventDefault();
	const form = event.target;

	// Fetch data from the URL to extract company contact email
	fetch('https://api.loxinformatics.com/base/company-info/')
		.then(response => {
			if (!response.ok) {
				throw new Error('Failed to fetch company info');
			}
			return response.json();
		})
		.then(data => {
			const email = data[0].email;
			const contactRecipientInput = select('#id_recipient_email'); // Ensure proper selection
			if (contactRecipientInput) {
				contactRecipientInput.value = email;
			} else {
				throw new Error('Recipient email input not found');
			}

			if (!form.checkValidity()) {
				event.stopPropagation();
				showError("contactform", "Enter a valid email address.");
				form.classList.add('was-validated');
			} else {
				showLoading("contactform");

				// Serialize form data
				const formData = new FormData(form);

				fetch('https://api.loxinformatics.com/contact/send-mail/', {
					method: 'POST',
					body: formData
				})
					.then(response => {
						return response.json();
					})
					.then(data => {
						if (data.message) {
							hideLoading("contactform");
							handleSuccess("contactform", data.message);
						}
						else if (data.errors) {
							hideLoading("contactform");
							handleError("contactform", data.errors.email[0].message);
						}
						else {
							throw new Error("Failed to read 'message' or 'errors' field")
						}
					})
					.catch(error => {
						hideLoading("contactform");
						handleError("contactform", "Failed to send email");
						console.error('Error sending email:', error);
					});
			}
		})
		.catch(error => {
			handleError("contactform", "Failed to fetch company info");
			console.error('Error fetching data:', error);
		});
}, false);

/**
 * Form validation functions
 */
function showLoading(formtype) {
	if (formtype === "contactform") {
		contactLoading.classList.remove("d-none");
		contactAlertError.classList.add("d-none");
		contactAlertSuccess.classList.add("d-none");
	}
}

function hideLoading(formtype) {
	if (formtype === "contactform") {
		contactLoading.classList.add("d-none");
	}
}

function showError(formtype, errorMessage) {
	if (formtype === "contactform") {
		contactEmailInvalidFeedback.textContent = errorMessage;
		contactAlertError.textContent = errorMessage;
		contactAlertError.classList.remove("d-none");
		contactAlertSuccess.classList.add("d-none");
	}
}

function handleSuccess(formtype, successMessage) {
	console.log(successMessage);

	if (formtype === "contactform") {
		contactAlertError.classList.add("d-none");
		contactAlertSuccess.textContent = successMessage;
		contactAlertSuccess.classList.remove("d-none");
		contactNameInput.value = "";
		contactEmailInput.value = "";
		contactSubjectInput.value = "";
		contactMessageInput.value = "";
		contactEmailInput.classList.remove("is-invalid");
		contactform.classList.remove('was-validated');
	}
}

function handleError(formtype, errorMessage) {
	console.error("There was a problem with the request:", errorMessage);
	showError(formtype, errorMessage);

	if (formtype === "contactform") {
		contactEmailInput.classList.add("is-invalid");
	}
}