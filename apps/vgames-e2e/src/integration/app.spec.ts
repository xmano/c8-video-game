import { getGreeting } from '../support/app.po';

/**
 * Before running the e2e tests,
 * please ensure the document count is zero
 */
describe('vgames', () => {

  before(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Video Game Store');
  });

  it('Do Logout', () => {
    cy.get('.fancy-button').click();

    cy.wait(500);
  });  

  it('Login with userA Email & Password', () => {
    cy.get('#email').type('a@c8.com');
    cy.get('#password').type('123456');

    cy.get('#btn-login').click();

    cy.get('#gallery-page').contains('Video Game Gallery');
  });   

  it('should allow adding a title', () => {
    cy.get('#title').type('Fantastic Four');
    cy.get('#desc').type('Four super heroes');

    cy.get('#add-title').click();
    cy.wait(200);

    cy.get('#game_titles').children().its('length')
      .should("equal", 2);
  });

  it('should allow deleting a title', () => {
    cy.get('#delete-title').click();   
    
    cy.wait(200);

    cy.get('#game_titles').children().its('length')
    .should("equal", 1);    
  });


  it('Do Logout', () => {
    //Find the log out button
    //and click it..
    cy.get('.fancy-button').click();

    cy.wait(500);

  });   

  it('Login with another Email & Password account', () => {
    //Find the log out button
    //and click it..
    cy.get('#email').type('b@c8.com');
    cy.get('#password').type('654321');

    cy.get('#btn-login').click();

    cy.get('#gallery-page').contains('Video Game Gallery');
  });  

  it('should not allow updating title of different owner', () => {
    cy.get('#list-title').type('--2');
    cy.get('#list-desc').type('--2');

    cy.get('#update-title').click();   
    cy.wait(200);

    cy.get('#game_titles').children().its('length')
      .should("equal", 1);
  });  

});
