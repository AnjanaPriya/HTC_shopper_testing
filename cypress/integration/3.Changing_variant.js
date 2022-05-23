//const { beforeEach } = require("mocha");
//const { it } = require("mocha");

import selectors from "../support/selectors";
import data from "../../env.json"

describe('Changing the variant before adding to wishlist',function(){
  
    //Url of the store
    const url=data.store.url

    //visiting the store before every testcase
    beforeEach(()=>{
        cy.visit(url)
    })

    it('Changing the variant',function(){

        //Collections Page
        cy.visit(url+'/collections/all')
        
        // Changing Variant before adding to list!
        cy.get(selectors.getProduct).eq(6).click()
        cy.get(selectors.wishlist).click()
        cy.get(selectors.variant).select('M')
        cy.get(selectors.add_to_wishlist).click()
        cy.wait(2000)

        //Checking whether it's rendered or not in the wishlist modal
        cy.get(selectors.wishlist_modal).eq(0).click({force:true})
        cy.wait(4000) 
        cy.get(selectors.my_wishlist).contains('My Wishlist').click()
        cy.get('.swym-wishlist-grid > a > div').eq(1).should('have.text','M')

        //Closing the wishlist modal
        cy.get(selectors.close).click()
        cy.go('back')
  
    })
})

