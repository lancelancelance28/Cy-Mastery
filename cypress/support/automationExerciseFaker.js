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

export default generateUserData;
