//const { beforeEach } = require("mocha");
//const { it } = require("mocha");

import selectors from '../support/selectors.js';
import data from "../../env.json"

describe('Sharing list',function(){
  
    //Url of the store
    const url=data.store.url

    //visiting the store before every testcase
    beforeEach(()=>{
        cy.visit(url)
    })

    it('Sharing List',function(){
        
        //Collections Page
        cy.visit(url+'/collections/all')
        /*
        cy.get(selectors.wishlist_modal).eq(0).click({force:true})
        cy.get("body").then($body => {
            if ($body.find(selectors.list).length < 1) {
                cy.get(selectors.close).click()
                cy.add_to_wishlist(8)  
            }
        });*/
        cy.get(selectors.getProduct).eq(9).click()
        cy.get(selectors.wishlist).click()
        cy.get(selectors.add_to_wishlist).click()
        cy.wait(2000)
        cy.go('back')
        cy.wait(2000)
        
        cy.get(selectors.wishlist_modal).eq(0).click({force:true})
        cy.wait(3000)
        cy.get(selectors.list).eq(0).click()
        cy.wait(3000)

        //Sharing the list
        cy.get(selectors.share_list).click()

        var pid=""
        //RouteMatcher using intercepts
        cy.window().then((win)=>{
            pid=encodeURIComponent(win.swymJSObject.pid)
            cy.intercept('/api/v3/lists/emailList?pid='+pid).as('CheckShare')
            cy.get('#swym-email').type('awesomeqqq12345@gmail.com')
            cy.get(selectors.share).click()
            cy.wait(2000)

            //Checking whether it gave statuscode is 200 or not.
            cy.wait('@CheckShare').then((intercept)=>{
                expect(intercept.response.statusCode).to.equal(200)
            })
            
        })  
         
    })

})

 
