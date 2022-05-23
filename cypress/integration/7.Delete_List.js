//const { beforeEach } = require("mocha");
//const { it } = require("mocha");

import selectors from '../support/selectors.js';
import data from "../../env.json"

describe('Deleting list',function(){
   
    //Url of the store
    const url=data.store.url

    //visiting the store before every testcase
    beforeEach(()=>{
        cy.visit(url)
    })

    it('Delete a list',function(){
       
        //Collections Page
        cy.visit(url+'/collections/all')

       /*
       cy.get(selectors.wishlist_modal).eq(0).click({force:true})
       cy.get("body").then($body => {
        if ($body.find(selectors.list).length < 1) {
            cy.get(selectors.close).click()
            cy.add_to_wishlist(10)  
        }
        });*/

        cy.get(selectors.getProduct).eq(10).click()
        cy.get(selectors.wishlist).click()
        cy.get(selectors.add_to_wishlist).click()
        cy.wait(2000)
        cy.go('back')
        
        //Wishlist Modal
        cy.get(selectors.wishlist_modal).eq(0).click({force:true})
        cy.wait(1000)
        cy.get(selectors.list).eq(0).click()
        cy.get(selectors.actions).click({force:true})

        //Deleting the list
        cy.get('.swym-wishlist-context-menu-content > button').contains('Delete List').click()
        cy.get('.swym-clear-wishlist-modal-dialog > button').eq(0).click()
        cy.get('.swym-wishlist-container-content-htc-user > div').should('have.class','swym-empty-wishlist-container')
   
        
   })

})

 
