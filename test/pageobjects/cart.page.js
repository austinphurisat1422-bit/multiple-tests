import { $, $$, browser } from '@wdio/globals'
import Page from './page.js';
import StorePage from './store.page.js';

class CartPage extends Page {
    get cartBadge () {
        return StorePage.cartBadge;
    }

    get cartItemLabels () {
        return $$('.cart_item_label');
    }

    get removeBtn () {
        return $('button[id*="remove"]')
    }

    get cartQuantity () {
        return $('.cart_quantity_label');
    }

    async assertBadge (amount) {
        expect(this.cartBadge).toExist();
        expect(this.cartBadge).toHaveText(expect.stringContaining(`${amount}`));
    }

    async assertCartItems () {
        let products = StorePage.productsList;
        let cartSize = await this.cartItemLabels.length;
        
        for (let i = 0; i < cartSize; i++) {
            console.log('Start loop');
            let itemName = await this.cartItemLabels[i].$('a').$('div').getText();
            
            switch (itemName) {
                case products[0].name:
                    await expect(this.cartItemLabels[i].$('.inventory_item_desc')).toHaveText(products[0].description);
                    break;
                case products[1].name:
                    await expect(this.cartItemLabels[i].$('.inventory_item_desc')).toHaveText(products[1].description);
                    break;
                case products[2].name:
                    await expect(this.cartItemLabels[i].$('.inventory_item_desc')).toHaveText(products[2].description);
                    break;
                case products[3].name:
                    await expect(this.cartItemLabels[i].$('.inventory_item_desc')).toHaveText(products[3].description);
                    break;
                case products[4].name:
                    await expect(this.cartItemLabels[i].$('.inventory_item_desc')).toHaveText(products[4].description);
                    break;
                case products[5].name:
                    await expect(this.cartItemLabels[i].$('.inventory_item_desc')).toHaveText(products[5].description);
                    break;
            }
        }
    }

    async assertRemoveFromCart() {
        let cartSize = await this.cartItemLabels.length;

        for (let i = 0; i < cartSize; i++) {
            await this.removeBtn.click();
        }

        await expect(this.cartBadge).not.toExist();
    }
}

export default new CartPage();
