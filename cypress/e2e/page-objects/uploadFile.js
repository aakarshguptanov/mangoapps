class uploadFile{
    compose_icon() { return cy.xpath("//ul[@id='ms-top-def-nav']//a[@title='Universal compose box']") }
    update_icon() { return cy.xpath("//a[@header-title='Share An Update With Your Teams']//do-not-translate[contains(text(), 'Update')]") }
    to_textbox() { return cy.xpath("//input[@id='token-input-myTeams']") }
    your_update_textbox() { return cy.xpath("//textarea[@id='project_status_update_team']") }
    attach_file_option() { return cy.xpath("//a[@class='attachLinkonDialog']") }
    done_button() { return cy.xpath("//button[@id='btn_file_upload']") }
    share_button() { return cy.xpath("//button[@id='ms-feed-btn']") }

    clickComposeIcon() {
        this.compose_icon().should('be.visible').click()
    }
    enterMandatoryFields() {
        this.update_icon().should('be.visible').click({force: true})
        this.to_textbox().should('be.visible').type("Assignment 1")
        cy.get('.token-input-dropdown-item2-facebook').should('exist')
        cy.get('.token-input-dropdown-item2-facebook').contains('Assignment 1').click()
        this.your_update_textbox().should('be.visible').type('Dummy Text')
    }
    uploadFile() {
        this.attach_file_option().should('be.visible').click()
        // cy.get('#uploaded-file-list').selectFile('cypress/fixtures/sample.pdf', {
        //     action: 'drag-drop'
        //   })
        cy.get('#fileupload').attachFile('sample.pdf')
        cy.fixture('sample.pdf', 'binary').then((pdf) => {
            cy.request({
            method: 'POST',
            url: '/ce/pulse/user/files/save_file_attributes',
            body: pdf,
            headers: {
                'Content-Type': 'application/pdf'
            }
            }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('status', 'ok')
        })
    })
        cy.wait(2000)
        this.done_button().should('be.visible').click({force: true})
        cy.scrollTo('top')
        this.share_button().should('be.visible').click({force: true})
        cy.wait(5000)
    }
    validatSuccessfullUpload() {
        cy.contains('Message posted successfully ').should('be.visible')
    }
  }
   
  export default uploadFile;