
import { faker } from '@faker-js/faker';

export function generateFakeUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = faker.internet.username({ firstName, lastName }).toLowerCase();
  const password = faker.internet.password({ length: 10, memorable: true });
  const ssn = `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 9000) + 1000}`;
  return {
    firstName,
    lastName,
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode('#####'),
    phoneNumber: faker.phone.number('##########'),
    ssn: ssn,
    username,
    password,
  };
}
