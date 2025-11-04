import LoginPage from '../pageobjects/login.page.js'
import StorePage from '../pageobjects/store.page.js'

async function initialize() {
    await LoginPage.open();
    await LoginPage.login('standard_user', 'secret_sauce');
    await StorePage.addAllToCart.click();
}

describe('Hamburger menu buttons function on:', () => {
    it('inventory page', async () => {
        initialize();

        await StorePage.assertHamburgerMenu();
    })
    it ('item page', async () => {
        initialize();

        await StorePage.goToItem();
        await StorePage.assertHamburgerMenu();
    })
    it ('cart page', async () => {
        initialize();

        await StorePage.goToCart();
        await StorePage.assertHamburgerMenu();
    })
})

