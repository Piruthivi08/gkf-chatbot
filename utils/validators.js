// Email validation
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation
const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

// Name validation
const validateName = (name) => {
  return name && name.trim().length > 0;
};

// Date validation
const validateDate = (date) => {
  return !isNaN(Date.parse(date));
};

module.exports = {
  validateEmail,
  validatePhone,
  validateName,
  validateDate,
};
