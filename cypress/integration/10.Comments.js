//const { beforeEach } = require("mocha");
//const { it } = require("mocha");

import selectors from '../support/selectors.js';
import data from "../../env.json"

describe('Comments',function(){
  
    //Url of the store
    const url=data.store.url

    //visiting the store before every testcase
    beforeEach(()=>{
        cy.visit(url)// Login through our credentials
        cy.get('.header-bar__module.header-bar__module--list #customer_login_link').click()
        cy.get('#CustomerEmail').type('sapsswathi@gmail.com')
        cy.get('#CustomerPassword').type('swathi@2001')
        cy.get('#customer_login input[type="submit"]').click()
        cy.wait(4000)/*
        cy.get('iframe')
            .first()
            .its('0.contentDocument.body')
            .should('not.be.undefined')
            .and('not.be.empty')
            .then(cy.wrap)
            .find('#recaptcha-anchor')
            .should('be.visible')
            .click();*/

    })
    
    it('Comment on a list and product ',function(){
    
        //Collections Page
        cy.visit(url+'/collections/all')
        /*
        cy.get(selectors.wishlist_modal).eq(0).click({force:true})
        cy.get("body").then($body => {
            if ($body.find(selectors.list).length < 1) {
                cy.get(selectors.close).click()
                cy.add_to_wishlist(7)  
            }
        });
        */
        cy.get(selectors.getProduct).eq(8).click()
        cy.get(selectors.wishlist).click()
        cy.get(selectors.add_to_wishlist).click()
        cy.wait(2000)
        
        //Opening the wishlist modal
        cy.get(selectors.wishlist_modal).eq(0).click({force:true})
        cy.wait(2000) 
        cy.get(selectors.list).eq(0).click()
        cy.wait(3000)
        cy.get('.swym-comments-preview .swym-add-comment-container .swym-add-comment > textarea').click({force:true})
        cy.wait(5000)

        //Commenting on the list
        cy.get('.swym-add-comment-container .swym-add-comment > textarea').eq(1).type('New model of this product?')
        cy.get('.swym-comments-content .swym-add-comment-container .swym-add-comment > button').click({force:true}) 
        cy.get('.swym-modal-content .swym-close-btn.swym-nav').click()
        cy.get('.swym-comment-item .swym-comment-details .swym-comment-text').should('have.text','New model of this product?')
        cy.get(selectors.close).click()
        cy.go('back')

        //Commenting on the product
        cy.wait(2000)
        cy.get(selectors.wishlist_modal).eq(0).click({force:true})
        cy.get(selectors.list).eq(0).click()
        cy.get(selectors.product_in_list).eq(0).click()
        cy.get('.swym-comments-preview .swym-add-comment-container .swym-add-comment > textarea').click({force:true})
        cy.get('.swym-add-comment-container .swym-add-comment > textarea').eq(1).type('New Model of this?')
        cy.get('.swym-comments-content .swym-add-comment-container .swym-add-comment > button').click({force:true}) 
        cy.get('.swym-modal-content .swym-close-btn.swym-nav').click()
        cy.get('.swym-comment-item .swym-comment-details .swym-comment-text').should('have.text','New Model of this?')
        
        //Closing the wishlist modal
        cy.get(selectors.close).click()
        cy.go('back')

        
    })

})