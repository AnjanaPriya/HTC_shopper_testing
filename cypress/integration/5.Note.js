//const { beforeEach } = require("mocha");
//const { it } = require("mocha");

import selectors from '../support/selectors.js';
import data from "../../env.json"

describe('Note',function(){
  
    //Url of the store
    const url=data.store.url

    //visiting the store before every testcase
    beforeEach(()=>{
        cy.visit(url)
    })

    //Checking wishlist launch point
    it('Adding a note and Changing an existing note',function(){

        //Collections Page
        cy.visit(url+'/collections/all')
        /*
        cy.get(selectors.wishlist_modal).eq(0).click({force:true})
        cy.wait(4000)
        
        cy.get("body").then($body => {
            if ($body.find(selectors.list).length < 1) {
                cy.get(selectors.close).click()
                cy.add_to_wishlist(5)  
            }
        });
        */
        cy.get(selectors.getProduct).eq(7).click()
        cy.get(selectors.wishlist).click()
        cy.get(selectors.add_to_wishlist).click()
        cy.wait(2000)
        
        cy.get(selectors.wishlist_modal).eq(0).click({force:true})
        cy.wait(2000)

        //Adding a new note
        cy.get(selectors.note).eq(0).click()
        let note='New Collections'
        cy.get('.swym-wishlist-note-popup-content .swym-note-container > textarea').type(note)
        cy.get('.swym-wishlist-note-popup-content .swym-action-btn-container > button').should('have.text','Done').click()
        cy.get(selectors.close).click()
        cy.get(selectors.wishlist_modal).eq(0).click({force:true})
        cy.get(selectors.note_text).should('have.text',note)
        cy.wait(1000)
        cy.get(selectors.close).click()
        
        //Changing an existing note
        cy.get(selectors.wishlist_modal).eq(0).click({force:true})
        cy.wait(2000) 
        cy.get(selectors.note).eq(0).click()
        let add_note='and New Models'
        cy.get('.swym-wishlist-note-popup-content .swym-note-container > textarea').type(add_note)
        cy.get('.swym-wishlist-note-popup-content .swym-action-btn-container > button').should('have.text','Done').click()
        cy.get(selectors.close).click()
        cy.get(selectors.wishlist_modal).eq(0).click({force:true})
        cy.get(selectors.note_text).should('have.text',note+add_note)

    })

})