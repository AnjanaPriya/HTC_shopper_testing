//const { beforeEach } = require("mocha");
//const { it } = require("mocha");

import selectors from '../support/selectors.js';
import data from "../../env.json"

describe('Adding to Wishlist',function(){
  
    //Url of the store
    const url=data.store.url

    //visiting the store before every testcase
    beforeEach(()=>{
        cy.visit(url)
    })

    //Checking wishlist launch point
    it('Checking if wishlist launch point is there',function(){
        cy.wait(3000)
        cy.get(selectors.wishlist_modal).eq(0).should('be.visible')

    })

    it('Add to single wishlist',function(){
        
        //Going to the collections page
        cy.visit(url+'/collections/all')
        
        cy.get('.grid .grid__item > div > div >div:nth-child(3) .grid-link__title').eq(0).invoke('text').then((text)=>{
            // Product details page of a specific product
            cy.get(selectors.getProduct).eq(0).click()
            cy.wait(4000)

            //Clicking on the wishlist button in the PDP
            cy.get(selectors.wishlist).click()
            cy.get(selectors.add_to_wishlist).click()
            cy.wait(3000)

            //Opening the Wishlist Modal
            cy.get(selectors.wishlist_modal).eq(0).click({force:true})

            //Opening the "My Wishlist"(default) list.
            cy.get(selectors.my_wishlist).contains('My Wishlist').click({force:true})
            cy.wait(3000)
            cy.get(selectors.title).should('have.text',text)
            
            // Closing the Wishlist Modal
            cy.get(selectors.close).click()
            cy.go('back')
        

        })
            
    })
    it('Creating new List and using the existing list',function(){
        
        //Going to collections page
        cy.visit(url+'/collections/all')

        //Creating new list and adding
        const name="New trends"
        cy.get('.grid .grid__item > div > div >div:nth-child(3) .grid-link__title').eq(1).invoke('text').then((text)=>{
            // Product details page of a specific product
            cy.get(selectors.getProduct).eq(1).click()
            cy.get(selectors.wishlist).click()
            cy.get(selectors.new_list).clear().type(name).type('{enter}')
            cy.get(selectors.add_to_wishlist).click()
            cy.wait(2000)
            cy.get(selectors.wishlist_modal).eq(0).click({force:true})
            cy.get(selectors.list_name).should('have.text',name).click()
            cy.get(selectors.close).click()
            cy.go('back')

        })

        //Adding to the Existing list
        cy.get('.grid .grid__item > div > div >div:nth-child(3) .grid-link__title').eq(2).invoke('text').then((text)=>{
            cy.get(selectors.getProduct).eq(2).click()
            cy.get(selectors.wishlist).click()
            cy.wait(2000)
            cy.get('.swym-wishlist-options .swym-wishlist-select-dropdown .swym-display-list').click()
            cy.wait(2000)
            cy.get('.swym-wishlist-dropdown-content-container > div .swym-results-container > button').eq(0).click()
            cy.get(selectors.add_to_wishlist).click()
            cy.wait(2000)

            //Clicking on the wishlist modal
            cy.get(selectors.wishlist_modal).eq(0).click({force:true})
            cy.get(selectors.my_wishlist).contains(name).click()
            cy.wait(3000)
            cy.get(selectors.title).contains(text)

            //Closing the list modal
            cy.get(selectors.close).click()
            cy.go('back')
        })
        
    })

    it('Add to existing label and create new label',function(){
       
        //Collections Page
        cy.visit(url+'/collections/all')   
        
        //Adding to the existing label
        cy.get('.grid .grid__item > div > div >div:nth-child(3) .grid-link__title').eq(3).invoke('text').then((text)=>{
            cy.get(selectors.getProduct).eq(3).click()
            cy.wait(2000)
            cy.get(selectors.wishlist).click()
            cy.wait(2000)
            cy.get('.swym-modal-content .swym-add-wishlist-container .swym-wishlist-options .swym-option-label').click()
            cy.get('.swym-results-container > button:nth-child(1)').click()
            cy.get(selectors.add_to_wishlist).click()
            cy.wait(2000)
            cy.get(selectors.wishlist_modal).eq(0).click({force:true})
            cy.get(selectors.my_wishlist).contains('My Wishlist').click()
            cy.get(selectors.label_name).contains('Label 1')
            cy.get(selectors.title).should('have.text',text)

        })
        // closing the list modal
        cy.get(selectors.close).click()
        cy.go('back')

        //Creating a new label
        cy.visit(url+'/collections/all')
        let label='Fan'
        cy.get('.grid .grid__item > div > div >div:nth-child(3) .grid-link__title').eq(4).invoke('text').then((text)=>{
            cy.get(selectors.getProduct).eq(4).click()
            cy.wait(2000)
            cy.get(selectors.wishlist).click()
            cy.wait(2000)
            cy.get('.swym-modal-content .swym-add-wishlist-container .swym-wishlist-options .swym-option-label').click()
            cy.get('.swym-label-input-container > input').type(label)
            cy.get('.swym-new-label-container > button').click()
             
            // Clicking on the wishlist button
            cy.get(selectors.add_to_wishlist).click()
            cy.wait(2000)
            cy.get(selectors.wishlist_modal).eq(0).click({force:true})
            cy.get(selectors.my_wishlist).contains('My Wishlist').click()
            cy.get('.swym-group-by-label .swym-group-by-label-name').contains(label)
            cy.get(selectors.title).eq(0).should('have.text',text)
            
        })
            
        // closing the list modal
        cy.get(selectors.close).click()
        cy.go('back')
    })

})