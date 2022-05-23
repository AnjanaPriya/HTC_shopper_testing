//const { beforeEach } = require("mocha");
//const { it } = require("mocha");

import selectors from '../support/selectors.js';
import data from "../../env.json"

describe('Duplicating list',function(){
   
    //Url of the store
    const url=data.store.url

    //visiting the store before every testcase
    beforeEach(()=>{
        cy.visit(url)
    })

    it('Duplicate a list',function(){
       
        //Collections Page
        cy.visit(url+'/collections/all')
       /*
       cy.get(selectors.wishlist_modal).eq(0).click({force:true})
       cy.get("body").then($body => {
        if ($body.find(selectors.list).length < 1) {
            cy.get(selectors.close).click()
            cy.add_to_wishlist(10)  
        }
    });
    */
    cy.get('.grid .grid__item > div > div >div:nth-child(3) .grid-link__title').eq(11).invoke('text').then((text)=>{
        
        cy.get(selectors.getProduct).eq(11).click()
        cy.get(selectors.wishlist).click()
        cy.get(selectors.add_to_wishlist).click()
        cy.wait(2000)
        
        cy.get(selectors.wishlist_modal).eq(0).click({force:true})
        cy.wait(1000)
        cy.get(selectors.list).eq(0).click({force:true})
        cy.get(selectors.actions).click({force:true})

        //Duplicating a list
        cy.get('.swym-wishlist-context-menu-content > button').contains('Duplicate List').click()
        cy.get('.swym-duplicate-wishlist-button-container .swym-duplicate-wishlist-btn').click()
        cy.wait(2000)
        cy.get(selectors.my_wishlist).contains('My Wishlist Copy').click()
        cy.get(selectors.title).should('have.text',text)
        cy.get(selectors.close).click()
        cy.go('back')
    })
        
   })

})

 
