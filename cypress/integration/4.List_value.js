//const { beforeEach } = require("mocha");
//const { it } = require("mocha");

import selectors from '../support/selectors.js';
import data from "../../env.json"

describe('Checking the list value',function(){
  
    //Url of the store
    const url=data.store.url

    //visiting the store before every testcase
    beforeEach(()=>{
        cy.visit(url)
    })

    it('List Value',function(){
        
        //Collections Page
        cy.visit(url+'/collections/all')
        /*
        cy.get(selectors.wishlist_modal).eq(0).click({force:true})
        cy.wait(5000)
        
        cy.get("body").then($body => {
            if ($body.find(selectors.list).length < 1) {   
                //evaluates as true
                cy.get(selectors.close).click()
                cy.get(selectors.wishlist_modal).eq(0).click({force:true})
                cy.add_to_wishlist(5)
                cy.go('back')
                cy.add_to_wishlist(6)
            
            }
            else{
                cy.get(selectors.list).eq(0).click()
                    cy.get(selectors.product_in_list).then((c)=>{
                        if(c < 1){
                            add_to_wishlist(5)
                        }
                    })
    
            }
        });
        */

        //Adding some products to wishlist modal to check the list value
        cy.get(selectors.getProduct).eq(5).click()
        cy.get(selectors.wishlist).click()
        cy.get(selectors.add_to_wishlist).click()
        cy.wait(2000)
        cy.go('back')
        cy.get(selectors.getProduct).eq(6).click()
        cy.get(selectors.wishlist).click()
        cy.get(selectors.add_to_wishlist).click()
        cy.wait(2000)
        
        //Opening the wishlist modal
        cy.get(selectors.wishlist_modal).eq(0).click({force:true})
        cy.wait(2000)
        cy.get(selectors.list).eq(0).click()
        cy.wait(2000)

        //Initializing the listValue by 0.
        let listValue=0

        //Going to every product in the specific list and add the price to listValue
        cy.get(selectors.product_in_list).its('length').then((last)=>{
            cy.get(selectors.product_in_list).each((a,index)=>{
              cy.get(selectors.product_in_list).eq(index).click({force:true})
              cy.wait(1000)

              //Taking quantity and price of every product
              cy.get('.swym-wishlist-quantity-select .swym-product-quantity > div').eq(index).invoke('text').then((c)=>{
                  cy.get('.swym-product-price .swym-product-final-price').eq(index).invoke('text').then((text)=>{
                      let price=Number(text.slice(1))
                      listValue=listValue+(Number(c))*(price)
                      cy.log('listValue',listValue)

                  })
              }).as('wish')
              cy.get('@wish').then((inter)=>{
                cy.log('listvalue',listValue)
                if(last==index+1){
                    cy.log('last',listValue)
                    cy.get(selectors.total_list_value).should('have.text',`$${listValue}.00`)
                }
              
              })
                cy.get(selectors.back_btn).click()
            })
            
        })

        //Closing the wishlist modal
        cy.get(selectors.close).click()
        cy.go('back')
        
    })

})