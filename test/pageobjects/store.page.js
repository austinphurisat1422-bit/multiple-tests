import { $, browser } from '@wdio/globals'
import Page from './page.js';
import LoginPage from './login.page.js';
import CartPage from './cart.page.js';

class StorePage extends Page {
    get cartLink () {
        return $('a.shopping_cart_link');
    }

    get backpackProductImg () {
        return $('img.inventory_item_img[alt="Sauce Labs Backpack"]');
    }

    get inventoryHeader () {
        return $('span.title')
    }

    get addAllToCart () {
        return $('[id*="add-to-cart"]')
    }

    get hamburgerMenu () {
        return $('#react-burger-menu-btn');
    }

    get allItemsBtn () {
        return $('#inventory_sidebar_link');
    }

    get aboutBtn () {
        return $('#about_sidebar_link');
    }

    get logoutBtn () {
        return $('#logout_sidebar_link');
    }

    get resetAppStateBtn () {
        return $('#reset_sidebar_link');
    }

    get cartBadge () {
        return $('.shopping_cart_badge');
    }

    get backToInventoryBtn () {
        return $('#back-to-products')
    }

    async assertAllItems () {
        await this.allItemsBtn.click();
        await expect(this.inventoryHeader).toHaveText(expect.stringContaining('Products'))
    }

    async assertResetAppState () {
        await this.resetAppStateBtn.click();
        await expect(this.cartBadge).not.toBeExisting();
    }

    async assertLogout () {
        await this.logoutBtn.click();
        await expect(LoginPage.inputUsername).toBeExisting();
    }

    async assertAbout () {
        await expect(this.aboutBtn).toHaveAttribute('href', 'https://saucelabs.com/')
    }

    async assertHamburgerMenu () {
        await this.hamburgerMenu.click();
        await this.assertResetAppState();
        await this.assertAbout();
        await this.assertAllItems();
        await browser.back();
        await browser.refresh();
        await this.hamburgerMenu.click();
        await this.assertLogout();
    }

    async addToCart (amount) {
        for (let i = 0; i < amount; i++) {
            await this.addAllToCart.click();
        }
        await expect(this.cartBadge).toHaveText(expect.stringContaining(`${amount}`));
    }

    async goToCart () {
        await this.cartLink.click();
        await expect(CartPage.cartQuantity).toExist();
    }
}

export default new StorePage();
