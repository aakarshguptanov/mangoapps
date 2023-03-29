class loginPage{
    usernameTextbox() { return cy.xpath("//input[@id='user_id']") }
    passwordTextbox() { return cy.xpath("//input[@id='password']") }

    enterUsername(user) {
        //this.usernameTextbox().should('be.visible').type(user)
        cy.xpath("//input[@id='user_id']").should('be.visible').type("maassignment@yopmail.com")
    }
    enterPassword() {
        cy.xpath("//input[@id='password']").should('be.visible').type("temp123")
    }
    clickLoginButton() {
        cy.xpath("//button[@type='submit']").should('be.visible').click()
    }
    validateSuccessfulLogin() {
        cy.xpath("//li[contains(text(), 'News Feed')]").should('be.visible')
        cy.log("You have entered to the application with valid creds.")
    }

  }
   
  export default loginPage;