//const { beforeEach } = require("mocha");
//const { it } = require("mocha");

import selectors from '../support/selectors.js';
import data from "../../env.json"

describe('Filter by label',function(){
  
    //Url of the store
    const url=data.store.url

    //visiting the store before every testcase
    
    beforeEach(()=>{
        cy.visit(url)
    })

    it('Filter by label',function(){
        //Collections Page
        cy.visit(url+'/collections/all')

        /*
        cy.get(selectors.wishlist_modal).eq(0).click()
        cy.get("body").then($body => {
            if ($body.find(selectors.list).length < 1) {
                cy.get(selectors.close).click()
                cy.add_to_wishlist(5)  
            }
        });
        cy.get(selectors.getProduct).eq(2).click()
        cy.wait(2000)
        cy.get(selectors.wishlist).click()
        cy.wait(4000)
        cy.get('.swym-modal-content .swym-add-wishlist-container .swym-wishlist-options .swym-option-label').click()
        cy.get('.swym-results-container > button:nth-child(1)').click()
        cy.get(selectors.add_to_wishlist).click()
        cy.go('back')
        */
        cy.get(selectors.getProduct).eq(5).click()
        cy.wait(4000)
        //Clicking on the wishlist button in the PDP
        cy.get(selectors.wishlist).click()
        cy.get(selectors.add_to_wishlist).click()
        cy.go('back')

        let name="new collections"
        cy.get('.grid .grid__item > div > div >div:nth-child(3) .grid-link__title').eq(13).invoke('text').then((text1)=>{
            cy.get(selectors.getProduct).eq(13).click()
            cy.wait(2000)
            cy.get(selectors.wishlist).click()
            // More waiting time bcoz it had many api's to fetch , 
            cy.wait(2000)
            cy.get('.swym-modal-content .swym-add-wishlist-container .swym-wishlist-options .swym-option-label').click()
            cy.get('.swym-label-input-container > input').type(name)
            cy.get('.swym-new-label-container > button').click()
            
            cy.get(selectors.add_to_wishlist).click()
            cy.wait(2000)
            cy.go('back')
            cy.get('.grid .grid__item > div > div >div:nth-child(3) .grid-link__title').eq(14).invoke('text').then((text2)=>{
                cy.get(selectors.getProduct).eq(14).click()
                cy.wait(2000)
                cy.get(selectors.wishlist).click()
                cy.wait(2000)
                cy.get('.swym-modal-content .swym-add-wishlist-container .swym-wishlist-options .swym-option-label').click()
                cy.get('.swym-results-container .swym-label-name').contains(name).click()
                cy.get(selectors.add_to_wishlist).click()
                cy.wait(2000)
                cy.get(selectors.wishlist_modal).eq(0).click({force:true})
                cy.get(selectors.my_wishlist).contains('My Wishlist').click()
                cy.get('.swym-wishlist-detail-htc-user .swym-wishlist-detail-header .swym-primary-actions .swym-label-dropdown').click()
                cy.get('.swym-results-container .swym-search-results-list > button .swym-label-name').contains(name).click()
                cy.get('.swym-group-by-label .swym-group-by-label-name').should('have.text',name)
                cy.wait(2000)
                cy.get('.swym-group-by-label .swym-wishlist-grid > a').its('length').should('eq',2) 
                cy.get('.swym-group-by-label .swym-wishlist-grid > a .swym-title').eq(0).should('have.text',text2)
                cy.get('.swym-group-by-label .swym-wishlist-grid > a .swym-title').eq(1).should('have.text',text1)
                
                
            })
           
        })
        
        
    })

})