/**

 * @file Manages the frontend interactivity for the Newendo Pucón website.
 * @summary Includes form validation, smooth scrolling, EmailJS form submission, and a back-to-top button.
 * @author Tu sitio web 3.0
 * @version 1.1.0
 */

(function () {
    'use strict';

    /**
     * Initializes all interactive components after the DOM is fully loaded.
     */
    document.addEventListener('DOMContentLoaded', function () {
        initializeFormValidation();
        initializeSmoothScroll();
        initializeFormSubmission();
        initializeBackToTopButton();
    });

    /**
     * Sets up Bootstrap's custom validation styles on all forms.
     * Prevents form submission if fields are invalid.
     */
    function initializeFormValidation() {
        const forms = document.querySelectorAll('.needs-validation');
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }

    /**
     * Implements smooth scrolling for all anchor links pointing to an ID.
     */
    function initializeSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetElement = document.querySelector(this.getAttribute('href'));
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Handles the contact form submission using EmailJS.
     * Displays feedback messages to the user (loading, success, or error).
     */
    function initializeFormSubmission() {
        const contactForm = document.getElementById('formulario');
        if (!contactForm) return;

        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();

            if (this.checkValidity()) {
                const formData = {
                    nombre: this.nombre.value,
                    email: this.email.value,
                    mensaje: this.mensaje.value
                };

                const messageContainer = document.getElementById('message');
                messageContainer.innerHTML = 'Enviando registro...';
                messageContainer.className = 'alert alert-info';

                emailjs.send('service_47igsq5', 'template_bkon6gg', formData)
                    .then(response => {
                        console.log('SUCCESS!', response.status, response.text);
                        messageContainer.innerHTML = '¡Registro enviado con éxito! Nos pondremos en contacto contigo pronto.';
                        messageContainer.className = 'alert alert-success';
                        contactForm.reset();
                        contactForm.classList.remove('was-validated');
                    }, error => {
                        console.log('FAILED...', error);
                        messageContainer.innerHTML = 'Hubo un error al enviar el registro. Por favor, inténtalo de nuevo más tarde.';
                        messageContainer.className = 'alert alert-danger';
                    });
            }

            this.classList.add('was-validated');
        });
    }

    /**
     * Manages the visibility of the 'back-to-top' button.
     * The button appears when the user scrolls down 100 pixels.
     */
    function initializeBackToTopButton() {
        const backToTopButton = document.querySelector('.back-to-top');
        if (backToTopButton) {
            const toggleBackToTop = () => {
                if (window.scrollY > 100) {
                    backToTopButton.classList.add('active');
                } else {
                    backToTopButton.classList.remove('active');
                }
            };
            window.addEventListener('load', toggleBackToTop);
            document.addEventListener('scroll', toggleBackToTop);
        }
    }
})();