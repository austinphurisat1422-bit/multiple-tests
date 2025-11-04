import { $, browser } from '@wdio/globals'
import Page from './page.js';
import StorePage from './store.page.js';

class CartPage extends Page {
    get cartBadge () {
        return StorePage.cartBadge;
    }

    get cartItem () {
        return $('.cart_item');
    }

    get cartQuantity () {
        return $('.cart_quantity_label');
    }
}

export default new CartPage();
