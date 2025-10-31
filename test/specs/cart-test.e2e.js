import LoginPage from '../pageobjects/login.page.js'
import StorePage from '../pageobjects/store.page.js'

async function initialize() {
    await LoginPage.open();
    await LoginPage.login('standard_user', 'secret_sauce');
}

describe ('Cart features function correctly', () =>{
    it('should correctly add items to cart', async () => {
        
    })
    it('should create a badge on the cart icon', async () => {

    })
    it('should list item names with correct descriptions and prices', async () => {

    })
    it('should correctly remove items from the cart', async () => {

    })
})
