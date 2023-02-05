const productController = require('../../controller/products');
const productModel = require('../../models/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');
const allProducts = require('../data/all-products.json');

// jest.fn() db의 실제값을 가져오는 것이 아닌 jest에서 생성한 임의의 값을 가져온다.
productModel.create = jest.fn();
productModel.find = jest.fn();

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
})

describe('Product Controller Create', () => {
  beforeEach(() => {
    req.body = newProduct;
  })

  test('should have a createProduct function', () => {
    expect(typeof productController.createProduct).toBe('function')
  })

  test('should call ProductModel.create', async () => {
    req.body = newProduct;
    await productController.createProduct(req, res, next);
    expect(productModel.create).toBeCalledWith(newProduct);
  })

  test('should return 201 response code', async () => {
    await productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  })

  test('should return json body in response', async () => {
    productModel.create.mockReturnValue(newProduct);
    await productController.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct)
  })

  test('should handle errors', async () => {
    const errorMessage = { message: "description property missing"};
    const rejectedPromise = Promise.reject(errorMessage);
    productModel.create.mockReturnValue(rejectedPromise);
    await productController.createProduct(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  })
})

describe('Product Controller Get', () => {
  test('should have a getProducts function', () => {
    expect(typeof productController.getProducts).toBe('function')
  });

  test('should call ProductModel.find({})', async () => {
    await productController.getProducts(req, res, next);
    expect(productModel.find).toHaveBeenCalledWith({});
  });

  test('should return 200 response', async () => {
    await productController.getProducts(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled).toBeTruthy();
  });

  test('should return json body in response', async () => {
    productModel.find.mockReturnValue(allProducts);
    await productController.getProducts(req, res, next);
    expect(res._getJSONData()).toStrictEqual(allProducts)
  })
})
