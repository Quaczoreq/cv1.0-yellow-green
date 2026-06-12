// Accordion functionality
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const accordion = header.parentElement;
    const isActive = accordion.classList.contains('active');

    document.querySelectorAll('.accordion.active').forEach(openAccordion => {
      if (openAccordion !== accordion) {
        openAccordion.classList.remove('active');
      }
    });

    accordion.classList.toggle('active', !isActive);
  });
});

document.querySelectorAll('.nested-accordion-header').forEach(header => {
  header.addEventListener('click', (event) => {
    event.stopPropagation();

    const nestedAccordion = header.parentElement;
    const parentAccordionContent = nestedAccordion.closest('.accordion-content');
    const isActive = nestedAccordion.classList.contains('active');

    if (parentAccordionContent) {
      parentAccordionContent.querySelectorAll('.nested-accordion.active').forEach(openNested => {
        if (openNested !== nestedAccordion) {
          openNested.classList.remove('active');
        }
      });
    }

    nestedAccordion.classList.toggle('active', !isActive);
  });
});

// EmailJS Configuration
if (typeof emailjs !== 'undefined') {
  emailjs.init('m5iXLobcxC0hDlfLd');
}

// Form submission handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    if (typeof emailjs === 'undefined') {
      alert('Email service is currently unavailable. Please try again later.');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      return;
    }

    emailjs.sendForm('outlookMessageService', 'CVmessageNotification', this)
      .then(function() {
        alert('Thank you! Your message has been sent successfully.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, function(error) {
        alert('Oops! Something went wrong. Please try again.\nError: ' + error.text);
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  });
}
