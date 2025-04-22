//Creaetd by Chamil A.
//Created date 17 April 2025

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { ProductsPage } from '../pages/products';


test('Test 1: Verify login page title', async ({ page }) => {

    const Login = new LoginPage(page)
    await Login.gotoLoginPage();
    await expect(page).toHaveTitle('Login - Mock Shop')

});

test('Test 2: Verify login with correct username/password', async ({ page }) => {
    const Login = new LoginPage(page)
    await Login.gotoLoginPage();
    await Login.login('user1', 'user1')
    await expect(page).toHaveTitle('Shop - Mock Shop')

});

test('Test 3: Verify login with incorrect password', async ({ page }) => {
    const Login = new LoginPage(page)
    await Login.gotoLoginPage();
    await Login.login('user1', 'user2')
    await expect(page.locator('text=Invalid username or password')).toHaveText('Invalid username or password')

});

test('Test 4: Verify navigate to Shop Page from Login', async ({ page }) => {
    const Login = new LoginPage(page)
    const search = new ProductsPage(page)
    await Login.gotoLoginPage();
    await Login.login('user1', 'user1')
    await search.gotoShopPage();
    await expect(page).toHaveTitle('Shop - Mock Shop')

});


test('Test 5: Verify product list in Shop Page', async ({ page }) => {
    const search = new ProductsPage(page)
    await search.gotoShopPage();
    const productCards = page.locator('.product-card');
    const count = await productCards.count();

    for (let i = 0; i < count; i++) {
        const product = productCards.nth(i);
        //const expected = expectedProducts[i];

        await expect(product.locator('img')).toBeVisible();
        await expect(product.locator('h3')).not.toHaveText('');
        await expect(product.locator('p', { hasText: 'Code:' })).toBeVisible();
        await expect(product.locator('p', { hasText: 'Price:' })).toBeVisible();
        await expect(product.locator('p', { hasText: 'UOM:' })).toBeVisible();
        await expect(product.locator('p', { hasText: 'Qty:' })).toBeVisible();
        await expect(product.locator('button')).toHaveText('Add to Basket');
    }
});

test('Test 6: Verify search by Product Id', async ({ page }) => {
    const search = new ProductsPage(page)

    await search.gotoShopPage();
    await search.searchbyprodId('POO1')
    await search.searchbyprodDes('Organic Bananas')


    const productCards = page.locator('.product-card');
    const count = await productCards.count();

    for (let i = 0; i < count; i++) {
        const product = productCards.nth(i);
        //const expected = expectedProducts[i];

        await expect(product.locator('p', { hasText: 'Code:' })).toBeVisible();
        await expect(product.locator('h3')).not.toHaveText('');
    }
});

test('Test 7: Verify search by Product Description', async ({ page }) => {
    const search = new ProductsPage(page)

    await search.gotoShopPage();
    await search.searchbyprodDes('Organic Bananas')


    const productCards = page.locator('.product-card');
    const count = await productCards.count();
    // await expect(page.search.searchbyprodId('POO1')).toContain('POO1');

    for (let i = 0; i < count; i++) {
        const product = productCards.nth(i);
        //const expected = expectedProducts[i];

        await expect(product.locator('h3')).not.toHaveText('');
    }
});

test('Test 8: Verify View Basket from Shop Page', async ({ page }) => {
    const search = new ProductsPage(page)
    await search.gotoShopPage();
    await search.viewBasket();
    await search.gotoBasketPage();
    await expect(page).toHaveTitle('Basket - Mock Shop')
    await expect(page.locator('text=Your basket is empty.')).toHaveText('Your basket is empty.');
    await expect(page.locator('text=Total: $')).toHaveText('Total: $0.00');
});


test('Test 9: Verify Logout from Shop Page', async ({ page }) => {
    const search = new ProductsPage(page)
    await search.gotoShopPage();
    await search.logoutbasket();
    await expect(page).toHaveTitle('Login - Mock Shop')

});

test('Test 10: Verify Add to Basket option', async ({ page }) => {
    const search = new ProductsPage(page)
    await search.gotoShopPage();
    await search.addToBasket()


    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert')
        expect(dialog.message()).toContain('This page says Fresh Apples added to basket!')
        await dialog.accept()

    });
})


test('Test 11: Verify Basket Page with item', async ({ page }) => {
    const search = new ProductsPage(page)
    await search.gotoShopPage();
    await search.viewBasket()
    await expect(page).toHaveTitle('Basket - Mock Shop')
    await expect(page.locator('text=Total: $')).not.toHaveText('Total: $5.79');
    //  await expect(page.locator('text= Qty in Basket:')).not.toHaveText('Qty in Basket: 1');

});

test('Test 12: Verify product list in Basket Page', async ({ page }) => {
    const search = new ProductsPage(page)
    await search.gotoBasketPage();
    const productCards = page.locator('.product-card');
    const count = await productCards.count();

    for (let i = 0; i < count; i++) {
        const product = productCards.nth(i);

        await expect(product.locator('img')).toBeVisible();
        await expect(product.locator('h3')).not.toHaveText('');
        await expect(product.locator('p', { hasText: 'Code:' })).toBeVisible();
        await expect(product.locator('p', { hasText: 'Price:' })).toBeVisible();
        await expect(product.locator('p', { hasText: 'UOM:' })).toBeVisible();
        await expect(product.locator('p', { hasText: 'Qty:' })).toBeVisible();

    }
});


test('Test 13: Verify Clear Basket', async ({ page }) => {
    const search = new ProductsPage(page)
    await search.gotoShopPage();
    await search.viewBasket()
    await expect(page).toHaveTitle('Basket - Mock Shop')
    await expect(page.locator('text=Total: $')).not.toHaveText('Total: $26.65');
    await search.clearBasket()

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert')
        expect(dialog.message()).toContain('This page says Basket cleared!')
        await dialog.accept()
    })

    await expect(page.locator('text=Your basket is empty.')).toHaveText('Your basket is empty.');
    await expect(page.locator('text=Total: $')).toHaveText('Total: $0.00');

});

test('Test 14: Verify Logout from Basket Page', async ({ page }) => {
    const search = new ProductsPage(page)
    await search.gotoShopPage();
    await search.viewBasket()
    await search.logoutbasket();
    await expect(page).toHaveTitle('Login - Mock Shop')

});

test('Test 15: Verify Back to Shop from Basket Page', async ({ page }) => {
    const search = new ProductsPage(page)
    await search.gotoShopPage();
    await search.viewBasket()
    await search.backToShop()
    await expect(page).toHaveTitle('Shop - Mock Shop')

});
