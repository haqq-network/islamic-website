describe('main-page', () => {
  beforeEach(() => {
    return cy.visit('/');
  });

  it('should have correct title', () => {
    cy.title().should('include', 'IslamicCoin');
  });

  it('should display main heading', () => {
    cy.get('h1')
      .contains('Your Gateway to Shariah Compliant Web3')
      .should('be.visible');
  });

  it('should have a visible "Why Islamic Coin?" section', () => {
    cy.get('h2').contains('Why Islamic Coin?').should('be.visible');
  });

  it('should display "Backed by" section with logos', () => {
    cy.get('h2').contains('Backed by').should('be.visible');
    cy.get('img[alt*="logo"]').should('have.length.at.least', 3);
  });

  it('should display "Pioneering the Future of Islamic Finance" section', () => {
    cy.get('h2')
      .contains('Pioneering the Future of Islamic Finance')
      .should('be.visible');
  });

  it('should show "Latest Islamic Coin News" section', () => {
    cy.get('h2').contains('Latest Islamic Coin News').should('be.visible');
    cy.get('[data-attr="news-card"]').should('have.length.at.least', 3);
  });

  it('should display Advisory Board members', () => {
    cy.get('h2').contains('Advisory Board').should('be.visible');
    cy.get('[data-attr="board-member-card"]').should('have.length.at.least', 4);
  });

  it('should have HAQQ Wallet section with app store links', () => {
    cy.get('h2')
      .contains('Manage Your Shariah Portfolio with HAQQ Wallet')
      .should('be.visible');
    cy.get('a[data-attr*="download"]').should('be.visible');
  });

  it('should have "Learn and Grow" section', () => {
    cy.get('h2')
      .contains('Learn and Grow with Islamic Coin')
      .should('be.visible');
  });

  it('should have "Join Our Community" section', () => {
    cy.get('h2').contains('Join Our Community').scrollIntoView();
    cy.get('h2').contains('Join Our Community').should('be.visible');
  });

  it('should have footer with social media links in footer', () => {
    cy.get('footer').scrollIntoView();
    cy.get('footer a[data-attr*="community"]')
      .should('be.visible')
      .should('have.length.at.least', 3);
  });
});
