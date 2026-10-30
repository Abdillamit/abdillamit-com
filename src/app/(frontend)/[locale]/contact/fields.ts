// Rules for the contact form, shared by the browser and the server action.
// `true` means the field has a problem.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const checkFields = (name: string, email: string, message: string) => ({
  name: name.length < 2 || name.length > 100,
  email: !EMAIL.test(email) || email.length > 254,
  message: message.length < 10 || message.length > 4000,
})
