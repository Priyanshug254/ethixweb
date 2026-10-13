/**
 * Client-side validation helpers
 */

export function validateLeadForm(formData) {
  const errors = {};

  if (!formData.full_name || formData.full_name.trim().length < 2) {
    errors.full_name = 'Please provide your full name (at least 2 characters).';
  } else if (formData.full_name.length > 100) {
    errors.full_name = 'Name cannot exceed 100 characters.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!formData.email || !emailRegex.test(formData.email.trim())) {
    errors.email = 'Please provide a valid business email address.';
  }

  if (formData.phone && formData.phone.trim().length > 0) {
    // Basic phone validation permitting +, spaces, hyphens, and digits
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      errors.phone = 'Please provide a valid contact number or leave empty.';
    }
  }

  if (!formData.service || formData.service.trim().length === 0) {
    errors.service = 'Please select a service of interest.';
  }

  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = 'Please share brief details of your project (at least 10 characters).';
  } else if (formData.message.length > 3000) {
    errors.message = 'Message must be within 3,000 characters.';
  }

  if (!formData.consent) {
    errors.consent = 'You must agree to the processing of your enquiry details.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
