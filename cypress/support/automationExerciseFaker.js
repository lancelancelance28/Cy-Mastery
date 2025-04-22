// Import Faker.js
import { faker } from '@faker-js/faker';

const generateUserData = () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
  return {
    name: firstName + '' + lastName,
    email: faker.internet.email(),
    password: 'password123', // Static password
    firstName: firstName,
    lastName: lastName,
    address: faker.location.streetAddress(),
    country: 'Canada', // Static country
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode('#####'),
    mobile: faker.phone.number('##########'),
    cardName: firstName + '' + lastName,
    cardNumber: faker.finance.creditCardNumber(), // Faker generates a valid card number
    cvc: faker.finance.creditCardCVV(),
    expiryMonth: faker.date.month(), // This will give a full month Name like 'January', 'February', etc.
    expiryYear: faker.date.future().getFullYear(), // Generates a future year for expiry
  };
};

const generateFakeOrder = () => {
  return {
    id: faker.number.int({ min: 1000000000, max: 9999999999 }), // large random ID
    petId: faker.number.int({ min: 1, max: 100 }), // assuming petId from 1 to 100
    quantity: faker.number.int({ min: 1, max: 5 }),
    shipDate: faker.date.soon().toISOString(),
    status: 'placed', // you can also randomize from ['placed', 'approved', 'delivered'] if needed
    complete: faker.datatype.boolean(),
  };
};

export { generateUserData, generateFakeOrder };

