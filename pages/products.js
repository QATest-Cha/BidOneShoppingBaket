//Creaetd by Chamil A.
//Created date 17 April 2025
exports.ProductsPage = class ProductsPage {

    constructor(page) {
        this.page = page
        this.search_textbox = page.getByPlaceholder('Search by Product Code or Description');
        this.search_button = page.getByRole('button', { name: 'Search' })
        this.viewBasket_button = page.getByRole('button', { name: 'view Basket' })
        this.logout_buton = page.getByRole('button', { name: 'Logout' })
        this.addBasket_button = page.getByRole('heading', { name: 'Fresh Apples' })
        this.basket_header = page.getByRole('heading', { name: 'Basket' })
        this.backToShop_button = page.getByRole('button', { name: 'Back to Shop' })
        this.clearBasket_button = page.getByRole('button', { name: 'Clear Basket' })

    }

    //Navigate to Shop Page
    async gotoShopPage() {
        await this.page.goto('file:///Users/chamilaabey/Downloads/MockWebsite/shop.html')
    }

    //Navigate to Basket Page
    async gotoBasketPage() {
        await this.page.goto('file:///Users/chamilaabey/Downloads/MockWebsite/basket.html')
    }

    //Search By ProductId
    async searchbyprodId(prodid) {
        await this.search_textbox.fill(prodid)
        await this.search_button.click()
    }

    //Search By Product Description
    async searchbyprodDes(proddes) {
        await this.search_textbox.fill(proddes)
        await this.search_button.click()
    }

    //Verify View Basket Button without any items
    async viewBasket() {
        await this.viewBasket_button.click()
        await this.basket_header.getByRole()
    }

    // Logout Option
    async logoutbasket() {
        await this.logout_buton.click()
    }

    // Add to Basket
    async addToBasket() {
        await this.addBasket_button.click()
        await this.basket_header.getByRole()
    }

    //Clear Basket
    async clearBasket() {
        await this.clearBasket_button.click()
    }

    //Back to Shop
    async backToShop() {
        await this.backToShop_button.click()
    }


}

