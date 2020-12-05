const { default: validatorUtils } = require("../../utils/Validator.utils")

describe('test phoneNumberValidator', () => {

  test('phoneNumberValidator success', () => {
    expect(validatorUtils.phoneNumberValidator('9999999999')).toBeTruthy()
  })

  test('phoneNumberValidator failure', () => {
    expect(validatorUtils.phoneNumberValidator('99999')).toBeFalsy()
  })
})