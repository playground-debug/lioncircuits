const { productsList } = require("../../utils/Constant.utils")

describe('test productList', () => {

  test('productList length', () => {
    expect(productsList).toHaveLength(7);
  })
})