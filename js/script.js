// ===== DOM Elements =====
const darkModeToggle = document.getElementById('darkModeToggle');
const yearElement = document.getElementById('year');
const projectCards = document.querySelectorAll('.project-card');

// ===== Initialize Page =====
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  yearElement.textContent = new Date().getFullYear();

  // Check for saved dark mode preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️ Light Mode';
  }

  // Initialize all interactive components
  initDarkMode();
  initFormValidation();
  initProjectCardInteractions();
});

// ===== Dark Mode Functionality =====
function initDarkMode() {
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Update button text and save preference
    const isDark = document.body.classList.contains('dark-mode');
    darkModeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    
    // Dispatch event for other components
    document.dispatchEvent(new CustomEvent('colorSchemeChange', {
      detail: { isDarkMode: isDark }
    }));
  });
}

// ===== Contact Form Handling =====
function initFormValidation() {
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const formData = getFormData();
    const errors = validateForm(formData);

    if (errors.length > 0) {
      showAlert(errors.join('<br>'), 'error');
      return;
    }

    try {
      // UI Loading State
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="spinner"></span> Sending...
      `;

      // Simulate API call (replace with actual fetch)
      await simulateApiCall(formData);
      
      // Success
      contactForm.reset();
      showAlert('Message sent successfully! I\'ll respond within 24 hours.', 'success');
    } catch (error) {
      showAlert('Failed to send message. Please try again later.', 'error');
      console.error('Form submission error:', error);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}

function getFormData() {
  return {
    name: contactForm.querySelector('input[type="text"]').value.trim(),
    email: contactForm.querySelector('input[type="email"]').value.trim(),
    message: contactForm.querySelector('textarea').value.trim()
  };
}

function validateForm({ name, email, message }) {
  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name) errors.push('• Name is required');
  if (!email) errors.push('• Email is required');
  else if (!emailRegex.test(email)) errors.push('• Please enter a valid email');
  if (!message) errors.push('• Message is required');
  else if (message.length < 10) errors.push('• Message should be at least 10 characters');

  return errors;
}

// ===== Project Card Interactions =====
function initProjectCardInteractions() {
  projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger if clicking links/buttons
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
      
      card.classList.toggle('expanded');
    });
  });
}

// ===== UI Helpers =====
function showAlert(message, type) {
  // Remove existing alerts
  const existingAlert = document.querySelector('.form-alert');
  if (existingAlert) existingAlert.remove();

  // Create alert
  const alert = document.createElement('div');
  alert.className = `form-alert ${type}`;
  alert.innerHTML = message;
  
  // Add to DOM
  contactForm.parentNode.insertBefore(alert, contactForm);
  
  // Auto-dismiss
  setTimeout(() => {
    alert.style.opacity = '0';
    setTimeout(() => alert.remove(), 300);
  }, 5000);
}

// ===== API Simulation =====
function simulateApiCall(data) {
  return new Promise((resolve) => {
    console.log('Simulated API call with:', data);
    setTimeout(resolve, 1500); // Simulate network delay
  });
}

// ===== Event Listeners =====
document.addEventListener('colorSchemeChange', (e) => {
  // Handle other dark-mode dependent components
  console.log('Color scheme changed to:', e.detail.isDarkMode ? 'Dark' : 'Light');
});


// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');
const submitBtn = contactForm.querySelector('.submit-btn');
const btnText = submitBtn.querySelector('.btn-text');
const spinner = submitBtn.querySelector('.spinner');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // UI Loading State
  btnText.textContent = 'Sending...';
  spinner.style.display = 'block';
  submitBtn.disabled = true;

  try {
    // Send to Formspree
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: {
        'Accept': 'application/json'
      }
    });

    // Handle Response
    if (!response.ok) {
      throw new Error(await response.text());
    }

    // Success
    contactForm.reset();
    showStatus('✅ Message sent! (Check your email for confirmation)', 'success');
    
  } catch (error) {
    console.error('Form error:', error);
    showStatus('❌ Failed to send. Please email me directly at arun@example.com', 'error');
    
  } finally {
    // Reset UI
    btnText.textContent = 'Send Message';
    spinner.style.display = 'none';
    submitBtn.disabled = false;
  }
});

function showStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`;
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    formStatus.style.opacity = '0';
    setTimeout(() => {
      formStatus.textContent = '';
      formStatus.className = 'form-status';
      formStatus.style.opacity = '1';
    }, 300);
  }, 5000);
}