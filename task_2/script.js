class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = this.form.querySelector('.submit-btn');
        this.successMessage = document.getElementById('successMessage');
        
        this.init();
    }

    init() {
        
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        
        
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    
    handleSubmit(e) {
        e.preventDefault();
        
        
        if (this.validateForm()) {
            this.submitForm();
        }
    }

    
    validateForm() {
        const fullName = document.getElementById('fullName');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        let isValid = true;

        
        isValid &= this.validateField(fullName);
        isValid &= this.validateField(email);
        isValid &= this.validateField(subject);
        isValid &= this.validateField(message);

        return isValid;
    }

    
    validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        const errorElement = document.getElementById(fieldName + 'Error');
        const formGroup = field.closest('.form-group');

        
        this.clearError(field);

        
        if (!value) {
            this.showError(field, `${this.getFieldLabel(fieldName)} is required`);
            return false;
        }

        
        if (fieldName === 'email') {
            if (!this.isValidEmail(value)) {
                this.showError(field, 'Please enter a valid email address');
                return false;
            }
        }

        
        if (fieldName === 'fullName') {
            if (value.length < 2) {
                this.showError(field, 'Full name must be at least 2 characters long');
                return false;
            }
        }

        
        if (fieldName === 'subject') {
            if (value.length < 3) {
                this.showError(field, 'Subject must be at least 3 characters long');
                return false;
            }
        }

        
        if (fieldName === 'message') {
            if (value.length < 10) {
                this.showError(field, 'Message must be at least 10 characters long');
                return false;
            }
        }

        return true;
    }

    
    showError(field, message) {
        const errorElement = document.getElementById(field.name + 'Error');
        const formGroup = field.closest('.form-group');
        
        errorElement.textContent = message;
        formGroup.classList.add('error');
    }

    
    clearError(field) {
        const errorElement = document.getElementById(field.name + 'Error');
        const formGroup = field.closest('.form-group');
        
        errorElement.textContent = '';
        formGroup.classList.remove('error');
    }

    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    
    getFieldLabel(fieldName) {
        const labels = {
            'fullName': 'Full Name',
            'email': 'Email Address',
            'subject': 'Subject',
            'message': 'Message'
        };
        return labels[fieldName] || fieldName;
    }

    
    async submitForm() {
        
        this.setSubmitLoading(true);

        try {
            
            await new Promise(resolve => setTimeout(resolve, 2000));

            
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);

            
            console.log('Form submitted with data:', data);

            
            this.showSuccess();

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your message. Please try again.');
        } finally {
            this.setSubmitLoading(false);
        }
    }

    
    setSubmitLoading(isLoading) {
        const btnText = this.submitBtn.querySelector('.btn-text');
        const btnLoader = this.submitBtn.querySelector('.btn-loader');

        if (isLoading) {
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
            this.submitBtn.disabled = true;
        } else {
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            this.submitBtn.disabled = false;
        }
    }

    
    showSuccess() {
        
        this.form.style.display = 'none';
        this.successMessage.style.display = 'block';

        
        this.form.reset();
        
        
        const formGroups = this.form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error');
        });

        const errorMessages = this.form.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
        });

        
        setTimeout(() => {
            this.successMessage.style.display = 'none';
            this.form.style.display = 'flex';
        }, 5000);
    }
}


class FormEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.addFloatingLabels();
        this.addCharacterCount();
        this.addEnterKeySubmission();
    }

    
    addFloatingLabels() {
        const inputs = document.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });

            
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
    }

    
    addCharacterCount() {
        const messageField = document.getElementById('message');
        const messageGroup = messageField.closest('.form-group');
        
        
        const counter = document.createElement('span');
        counter.className = 'char-counter';
        counter.textContent = '0 characters';
        messageGroup.appendChild(counter);

        
        messageField.addEventListener('input', () => {
            const length = messageField.value.length;
            counter.textContent = `${length} character${length !== 1 ? 's' : ''}`;
            
            
            if (length < 10) {
                counter.style.color = '#e74c3c';
            } else if (length < 50) {
                counter.style.color = '#f39c12';
            } else {
                counter.style.color = '#27ae60';
            }
        });
    }

    
    addEnterKeySubmission() {
        const inputs = document.querySelectorAll('input');
        
        inputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    document.getElementById('contactForm').dispatchEvent(new Event('submit'));
                }
            });
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
    new FormEnhancements();
});


const style = document.createElement('style');
style.textContent = `
    .char-counter {
        font-size: 0.8rem;
        color: #7f8c8d;
        text-align: right;
        margin-top: 5px;
        transition: color 0.3s ease;
    }
`;
document.head.appendChild(style);
