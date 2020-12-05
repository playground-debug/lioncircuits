function phoneNumberValidator(phoneNumber) {
  const PhoneNumberValidator = /^[6-9]\d{9}$/
  return PhoneNumberValidator.test(phoneNumber)
}

export default {
  phoneNumberValidator
}