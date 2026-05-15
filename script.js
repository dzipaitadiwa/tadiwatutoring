// This wrapper ensures the JavaScript runs ONLY after the page completely loads
document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript engine is successfully loaded and tracking elements!");

    const modal = document.getElementById('bookingModal');
    const closeBtn = document.querySelector('.close-btn');
    const trialForm = document.getElementById('trialForm');
    const triggerButtons = document.querySelectorAll('.cta-btn');

    // 1. Hook up the Modal Box opening triggers
    if (triggerButtons.length > 0 && modal) {
        triggerButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.display = 'flex'; // Reveals form overlay framework
            });
        });
    }

    // 2. Hook up the Close button action
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // 3. Close the modal frame if the dark space background is clicked
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 4. Extract data strings and redirect pipeline to WhatsApp API
    if (trialForm) {
        trialForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevents the browser page from reloading

            // Gather inputs typed by the user
            const name = document.getElementById('studentName').value;
            const age = document.getElementById('studentAge').value;
            const sitting = document.getElementById('examSitting').value;

            // WhatsApp Contact Configuration
            const countryCode = "263"; // Zimbabwe Code
            const localNumber = "715643891"; // <-- REPLACE THIS WITH YOUR ACTUAL PHONE NUMBER (e.g., 771234567)

            // Constructing a human-readable structured message for your chat inbox
            // Note: %0A creates a clean new-line break in WhatsApp messages
            const textMessage = `Hi Tadiwa! I want to book a free trial O-Level STEM class.%0A%0A` +
                                `*Student Booking Details:*%0A` +
                                `• *Name:* ${name}%0A` +
                                `• *Age:* ${age} years old%0A` +
                                `• *Exam Sitting:* ${sitting} Sitting`;

            // Standard web URL endpoint framework for WhatsApp redirection
            const url = `https://wa.me/${countryCode}${localNumber}?text=${textMessage}`;

            // Launch a secure browser window target sending data straight to WhatsApp
            window.open(url, '_blank');
            
            // Clean up UI state
            modal.style.display = 'none';
            trialForm.reset();
        });
    }

    // 5. Accordion Event Trigger loops for FAQ dropdowns
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
            const sign = item.querySelector('.faq-question span');
            if (sign) {
                sign.textContent = item.classList.contains('active') ? '−' : '+';
            }
        });
    });
});