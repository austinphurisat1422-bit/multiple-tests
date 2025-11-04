import { $, browser } from '@wdio/globals'
import Page from './page.js';
import LoginPage from './login.page.js';
import CartPage from './cart.page.js';

class StorePage extends Page {
    get productsList () {
        let products = [
            {name: 'Sauce Labs Backpack', description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.'},
            {name: 'Sauce Labs Bike Light', description: `A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.`},
            {name: 'Sauce Labs Bolt T-Shirt', description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.'},
            {name: 'Sauce Labs Fleece Jacket', description: `It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.`},
            {name: 'Sauce Labs Onesie', description: `Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.`},
            {name: 'Test.allTheThings() T-Shirt (Red)', description: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.'}
        ]

        return products
    }

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

    async goToItem () {
        await this.backpackProductImg.click();
    }
}

export default new StorePage();
