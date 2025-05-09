const { generateFakeOrder } = require("../../support/automationExerciseFaker");

describe('Store API Tests - Swagger Petstore', () => {
  const storePath = '/store';

  let testOrder = generateFakeOrder()

  /*-------------------------------------Get Inventory-------------------------------------*/
  it('GET /store/inventory - should return inventory status', () => {
    cy.api(`${storePath}/inventory`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('available');
    });
  });
  /*-------------------------------------Post Order - 200 -------------------------------------*/
    before(() => {
      cy.api({
          method: 'POST',
          url: `${storePath}/order`,
          body: testOrder,
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.include({
            id: testOrder.id,
            petId: testOrder.petId,
            quantity: testOrder.quantity,
            status: testOrder.status,
            complete: testOrder.complete,
          });
        });
    });
  
 /*-------------------------------------Post Order - 400-------------------------------------*/
 it('POST /store/order - should return 400 for invalid order (missing required fields)', () => {
      cy.api({
        method: 'POST',
        url: '/store/order/45$%#',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        cy.log('Received expected 400 for invalid order');
      });
    });

  /*-------------------------------------Get Order - 200-------------------------------------*/
      it('GET /store/order/{orderId} - should retrieve the placed order', () => {
        cy.api(`${storePath}/order/${testOrder.id}`).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.id).to.eq(testOrder.id);
        });
      });

  
/*-------------------------------------Get Order - 400-------------------------------------*/
    it('GET /store/order/{orderId} - should return 400 for invalid order ID', () => {
        cy.api({
          method: 'GET',
          url: `${storePath}/order/$%#$6`,
          failOnStatusCode: false,
        }).then((res) => {
          expect(res.status).to.eq(400);
        });
      });
  /*-------------------------------------Get Order - 404-------------------------------------*/
      it('GET /store/order/{orderId} - should return 400 for not found ID', () => {
        cy.api({
          method: 'GET',
          url: `${storePath}/order/9999999999999494`,
          failOnStatusCode: false,
        }).then((res) => {
          expect(res.status).to.eq(404);
        });
      });
      


/*-------------------------------------Delete Order - 400-------------------------------------*/
        it('DELETE /store/order - should return 400 for invalid ID', () => {
          cy.api({
            method: 'DELETE',
            url: `${storePath}/order/$%$$#%`,
            failOnStatusCode: false,
          }).then((deleteResponse) => {
            expect(deleteResponse.status).to.eq(400);
          });
        });
        
/*-------------------------------------Delete Order - 404-------------------------------------*/
        it('DELETE /store/order - should return 404 for Not Found', () => {
          cy.api({
            method: 'DELETE',
            url: `${storePath}/order/(99999999999999999999999)`,
            failOnStatusCode: false,
          }).then((deleteResponse) => {
            expect(deleteResponse.status).to.eq(404);
          });
        });
        
        /*-------------------------------------Delete Order-------------------------------------*/
  
  
});

describe('User API Tests - Swagger Petstore', () => {
  const userPath = '/user';

  let user = {
    id:'12333',
    username: 'johndoe1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    password: 'password123',
    phone: '123-456-7890',
    userStatus: 1
  };
  const users = [
    {
      id:'1234',
      username: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      phone: '123-456-7890',
      userStatus: 1
    },
    {
      id:'1235',
      username: 'janedoe',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'janedoe@example.com',
      password: 'password456',
      phone: '987-654-3210',
      userStatus: 1
    }
  ];

 /*-------------------------------------POST Create With List -200-------------------------------------*/
  it('POST /user/createWithList - 200 create users with list', () => {
    cy.request({
      method: 'POST',
      url: `${userPath}/createWithList`,
      body: users,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('ok');
    });
  });

/*-------------------------------------GET User using username - 200-------------------------------------*/
  it('GET user/{username} - 200 successfully get username',()=>{
    cy.api({
      method: 'GET',
      url: `${userPath}/${user.username}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('username',user.username)
      expect(response.body).to.have.property('email',user.email)
    })
  });

  /*-------------------------------------GET User using username - 400-------------------------------------*/
  it('GET user/{username} - 400 Fail to get User due to invalid username',()=>{
    cy.api({
      method: 'GET',
      url: `${userPath}/${user.username}$^&$%`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      
    })
  });

  /*-------------------------------------GET User using username - 404-------------------------------------*/
  it('GET user/{username} - 404 Fail to get User',()=>{
    cy.api({
      method: 'GET',
      url: `${userPath}/${user.username}234234234`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.message).to.eq('User not found');
    })
  })

  /*-------------------------------------PUT User change name - 200-------------------------------------*/
  it('PUT user/{username} - 200 Successful Change Data',()=>{
    const updatedUser = { ...user, firstName: 'Jonathan' };

    cy.api({
      method: 'PUT',
      url: `${userPath}/${user.username}`,
      body: updatedUser,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('123');
    });
  })

  /*-------------------------------------PUT User change name - 400-------------------------------------*/
  it('PUT user/{username} - 400 Invalid User Supplied',()=>{

    cy.api({
      method: 'PUT',
      url: `${userPath}/${user.username}`,
      body: '{ "firstName": "Oops"',
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq('bad input');
    });
  })

    /*-------------------------------------PUT User change name - 404-------------------------------------*/
    it('PUT user/{username} - 404 User Not Found',()=>{
  
      cy.api({
        method: 'PUT',
        url: `${userPath}///`,
        body: '{ "firstName": "Oops"}',
        failOnStatusCode: false,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    })
     /*-------------------------------------DELETE User - 200-------------------------------------*/
    it('DELETE /user - 200 successfully delete a user', () => {
      cy.api({
        method: 'DELETE',
        url: `${userPath}/${user.username}`,
        body: user,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq(user.username)
      });
    });
    /*-------------------------------------DELETE User - 400-------------------------------------*/
    it('DELETE /user - 400 invalid username supplied', () => {
      cy.api({
        method: 'DELETE',
        url: `${userPath}/%0`,
        body: '{ "id": 123, "username": "badjson"',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });
  /*-------------------------------------DELETE User - 404-------------------------------------*/
    it('DELETE /user - 404 user not found', () => {
      cy.api({
        method: 'DELETE',
        url: `${userPath}///`,
        body: user,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });

  /*-------------------------------------GET User Login - 200-------------------------------------*/
  it('GET user/login - 200 Logs User into the system',()=>{
    cy.api({
      method: 'GET',
      url: `${userPath}/login?username=${user.username}&password=${user.password}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
    })
  });

  /*-------------------------------------GET User Logout - 200-------------------------------------*/
    it('GET user/login - 400 Logs User into the system',()=>{
      cy.api({
        method: 'GET',
        url: `${userPath}/logout`,
      }).then((response) => {
        expect(response.status).to.eq(200);
      })
    });
  
  /*-------------------------------------POST Create With Array -200-------------------------------------*/
  it('POST /user/createWithList - 200', () => {
    cy.request({
      method: 'POST',
      url: `${userPath}/createWithList`,
      body: users,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('ok');
    });
  });

   /*-------------------------------------POST Create User - 200-------------------------------------*/
  it('POST /user - 200', () => {
    cy.api({
      method: 'POST',
      url: `${userPath}`,
      body: user,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq(user.id)
    });
  });
});