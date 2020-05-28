import { getGreeting } from '../support/app.po';

describe('vgames', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Video Game Store');
  });

  it('should login the user', () => {
    // Function helper example, see `../support/app.po.ts` file
    cy.get('#btn-login').click();

    //check if we see gallery page.
    getGreeting().contains('Video Game Gallery');
  });
  
});
