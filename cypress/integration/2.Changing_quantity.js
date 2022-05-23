//const { beforeEach } = require("mocha");
//const { it } = require("mocha");
import selectors from "../support/selectors";
import data from "../../env.json"

describe('Changing quantity before adding to wishlist',function(){
  
    //Url of the store
    const url=data.store.url

    //visiting the store before every testcase
    beforeEach(()=>{
        cy.visit(url)
    })

    //Checking wishlist launch point
    it('Changing the quantity',function(){
        
        //Collections page
        cy.visit(url+'/collections/all')
        
        //Changing quantity before adding to the wishlist
        cy.get(selectors.getProduct).eq(7).click()
        cy.get(selectors.wishlist).click()
        cy.get(selectors.add_quantity).eq(1).click()
        cy.get(selectors.add_quantity).eq(1).click()
        cy.get(selectors.quantity).should('have.text','3')
        cy.get(selectors.add_to_wishlist).click()
        cy.wait(5000)
        cy.get(selectors.wishlist_modal).eq(0).click({force:true})
        
        // Opening the Wishlist Modal
        cy.get(selectors.my_wishlist).contains('My Wishlist').click()
        cy.get(selectors.product_in_list).click()
        cy.get(selectors.quantity).should('have.text','3')

        //Closing the wishlist modal
        cy.get(selectors.close).click()
        cy.go('back')
    })
})