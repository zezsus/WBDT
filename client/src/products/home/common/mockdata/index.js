/** @format */

import { faker } from "@faker-js/faker";

const mockListProduct = [];
export const createProductFaker = () => {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    price: faker.number.float(),
    rating: faker.number.float({ min: 1, max: 5 }),
    brand: faker.company.name(),
    category: faker.commerce.department(),
    image: faker.image.imageUrl(),
    userId: faker.string.uuid(),
  };
};

export const listData = faker.helpers.multiple(createProductFaker, {
  count: 20,
});

export const createNewProduct = () => {
  const newProduct = createProductFaker();
  mockListProduct.push(newProduct);
  return [...mockListProduct, listData];
};

export const getListProduct = () => {
  return [mockListProduct, ...listData];
};
