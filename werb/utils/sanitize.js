export const sanitizeText = (value) =>
  String(value || '')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export const validateInquiry = (payload) => {
  const errors = {}

  if (!payload.name || payload.name.length < 2) {
    errors.name = 'Please enter at least 2 characters for your name.'
  }

  if (!isEmail(payload.email)) {
    errors.email = 'Please provide a valid email address.'
  }

  if (!payload.message || payload.message.length < 10) {
    errors.message = 'Please enter a message with at least 10 characters.'
  }

  return errors
}
