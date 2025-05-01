describe('Página de teste do Play 04', () => {
  it('Deve carregar a página e mostrar um texto esperado', () => {
    cy.visit('/play-04-cypress')
    cy.contains('Play 04 - Cypress') // ou o texto que você espera na página
  })
})
