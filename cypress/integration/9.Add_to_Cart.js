 //const { beforeEach } = require("mocha");
 //const { it } = require("mocha");

 import selectors from '../support/selectors.js';
 import data from "../../env.json"

 describe('Add item to cart',function(){
   
    //Url of the store
    const url=data.store.url
    
    //visiting the store before every testcase
    beforeEach(()=>{
        cy.visit(url)
    })

    it('Adding an item to the cart',function(){
       cy.visit(url+'/collections/all')
       /*
       cy.get(selectors.wishlist_modal).eq(0).click({force:true})
       cy.get("body").then($body => {
        if ($body.find(selectors.list).length < 1) {
            cy.get(selectors.close).click()
            cy.add_to_wishlist(11)  
        }
    });
    */
   
        cy.get(selectors.getProduct).eq(13).click()
        cy.get(selectors.wishlist).click()
        cy.get(selectors.add_to_wishlist).click()
        cy.wait(2000)
        
       //Add to cart
       cy.get(selectors.wishlist_modal).eq(0).click({force:true})
       cy.wait(1000)
       cy.get(selectors.list).eq(0).click()
       cy.get(selectors.product_in_list).eq(0).click()
       cy.wait(2000)
       cy.get('.swym-wishlist-product-detail-container .swym-wishlist-product-detail-text-container-inner > h3').then((tit)=>{
           let title=tit.text()
           cy.get('.swym-wishlist-product-detail-container .swym-wishlist-product-detail-text-container-inner .swym-product-final-price').then((q)=>{
               let quantity=q.text()
               cy.get(selectors.add_to_cart).eq(0).click()
               cy.wait(2000)
               cy.log('title',title)
               cy.log('quantity',quantity)
               cy.get(selectors.close).click()
               cy.get('.header-bar__module .cart-page-link').eq(0).click()
               cy.get('.wrapper.main-content >div #CartSection')
               cy.get('.grid__item.two-thirds > a').eq(0).contains(title)
               cy.wait(5000)
               cy.get('.cart__row .grid__item:nth-child(2) > div input[type="number"]').should('have.value','1')
               
           })
       })
       //cy.get('.swym-modal-content .swym-close-btn > a').click()

       //cy.go('back')
        
   })
   it.skip('Adding all item to the cart',function(){
       cy.visit(url+'/collections/all')
       cy.get(selectors.getProduct).eq(9).click()
       cy.get(selectors.wishlist).click()
       cy.get(selectors.add_to_wishlist).click()
       
       cy.get(selectors.getProduct).eq(10).click()
       cy.get(selectors.wishlist).click()
       cy.get(selectors.add_to_wishlist).click()
       //Add to cart
       cy.get(selectors.wishlist_modal).eq(0).click({force:true})
       cy.wait(1000)
       cy.get(selectors.list).eq(0).click()
       cy.get(selectors.product_in_list).each((a,index)=>{
           cy.get(a).eq(index).click()
           cy.wait(2000)
           cy.get('.swym-wishlist-product-detail-container .swym-wishlist-product-detail-text-container-inner > h3').then((tit)=>{
           let title=tit.text()
           cy.get('.swym-wishlist-product-detail-container .swym-wishlist-product-detail-text-container-inner .swym-product-final-price').then((q)=>{
               let quantity=q.text()
               cy.get('.swym-action-button-container .swym-wishlist-add-to-cart-btn').eq(0).click()
               cy.wait(2000)
               cy.log('title',title)
               cy.log('quantity',quantity)
               cy.get(selectors.close).click()
               cy.get('.header-bar__module .cart-page-link').eq(0).click()
               cy.get('.wrapper.main-content >div #CartSection')
               cy.get('.grid__item.two-thirds > a').eq(0).contains(title)
               cy.wait(5000)
               cy.get('.cart__row .grid__item:nth-child(2) > div input[type="number"]').should('have.value','1')
               
           })
       })
       
       })
       //cy.get('.swym-modal-content .swym-close-btn > a').click()

       //cy.go('back')
        
   })

})

 
