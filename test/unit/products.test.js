const productcontroller = require('../../controller/products');

describe('Product Controller Create', () => {
  test('should have a createProduct function', () => {
    expect(typeof productcontroller.createProduct).toBe('function')
  })
})
