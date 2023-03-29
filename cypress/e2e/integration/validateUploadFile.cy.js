import loginPage from "../page-objects/login";
import uploadFile from "../page-objects/uploadFile";

const login = new loginPage
const file = new uploadFile

describe('Login Page', () => {
    beforeEach(() => {
      cy.window().then(win => win.sessionStorage.clear());
      cy.clearCookies();
      cy.clearLocalStorage();
      let url = Cypress.config().baseUrl;
      cy.visit(url);
      cy.viewport(1500, 1000)
      // cy.fixture('data.json').then(function (testData) {
      //   this.testData = testData;
      // })
    })
  
    it('Upload a File & check on UI it is visible there or not?', () => {
      //var user = this.testData.username
      login.enterUsername()
      login.enterPassword()
      login.clickLoginButton()
      login.validateSuccessfulLogin()
      file.clickComposeIcon()
      file.enterMandatoryFields()
      file.uploadFile()
      //file.validatSuccessfullUpload()
    })
})