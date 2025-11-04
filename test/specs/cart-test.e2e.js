import LoginPage from '../pageobjects/login.page.js';
import StorePage from '../pageobjects/store.page.js';
import CartPage from '../pageobjects/cart.page.js';

async function initialize() {
    await LoginPage.open();
    await LoginPage.login('standard_user', 'secret_sauce');
}

let cartSize = 5;

describe ('Cart features function correctly', () =>{
    it('should correctly add items to cart', async () => {
        initialize();

        await StorePage.addToCart(cartSize);
        await StorePage.goToCart();
    })
    it('should create a badge on the cart icon', async () => {
        await CartPage.assertBadge(cartSize);
    })
    it('should list item names with correct descriptions and prices', async () => {
        await CartPage.assertCartItems();
    })
    it('should correctly remove items from the cart', async () => {
        await CartPage.assertRemoveFromCart();
    })
})
