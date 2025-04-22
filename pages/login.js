//Creaetd by Chamil A.
//Created date 17 April 2025
exports.LoginPage = class LoginPage {

    constructor(page) {
        this.page = page
        this.username_textbox = page.getByLabel('Username:')
        this.password_textbox = page.getByLabel('Password:')
        this.login_button = page.getByRole('button', { name: 'Login' })
    }

    //Navigate to Login Page
    async gotoLoginPage() {
        await this.page.goto('file:///Users/chamilaabey/Downloads/MockWebsite/index.html');
    }


    //Enter User name and password
    async login(username, password) {
        await this.username_textbox.fill(username)
        await this.password_textbox.fill(password)
        await this.login_button.click()
    }
}


