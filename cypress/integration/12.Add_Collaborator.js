//const { beforeEach } = require("mocha");
//const { it } = require("mocha");

import selectors from "../support/selectors";
import data from "../../env.json"

describe('Adding a collaborator',function(){
   
    //Url of the store
    const url=data.store.url
    
    before(()=>{
       // Login through our credentials
     cy.visit(url)
     cy.get(selectors.customer_login).click()
     cy.get('#CustomerEmail').type(data.mail)
     cy.get('#CustomerPassword').type(data.password)
     cy.get(selectors.submit).click()
     cy.wait(5000)

    //cy.clickRecaptcha();
  })

    //visiting the store before every testcase
    beforeEach(()=>{
        cy.visit(url)
    })

    it('Add a Collobarator',function(){
       
        //COllectiosn Page
        cy.visit(url+'/collections/all')
       
        /*
        cy.get(selectors.wishlist_modal).eq(0).click({force:true})
        cy.get("body").then($body => {
        if ($body.find(selectors.list).length < 1) {
            cy.get(selectors.close).click()
            cy.add_to_wishlist(5)  
        }
        });
        */

        cy.get(selectors.getProduct).eq(14).click()
        cy.wait(4000)

        //Clicking on the wishlist button in the PDP
        cy.get(selectors.wishlist).click()
        cy.get(selectors.add_to_wishlist).click()
        cy.wait(2000)
    
        //Adding Collaboratpr
        cy.get(selectors.wishlist_modal).eq(0).click({force:true})
        cy.wait(3000)
        cy.get(selectors.list).eq(0).click()
        cy.get(selectors.actions).click({force:true})
        var pid=""
        //RouteMatcher
        cy.window().then((win)=>{
          pid=encodeURIComponent(win.swymJSObject.pid)
          cy.intercept('/api/v3/lists/add-collaborator?pid='+pid).as('AddCollaborator')
          cy.get(selectors.collaborator).contains('Add Collaborator').click()
          cy.get(selectors.collaborator_email).type('anjana.swathi@swymcorp.com')
          cy.get(selectors.add_collaborator).click()
          
          //Checking whether it gave statuscode is 200 or not.
          cy.wait('@AddCollaborator').then((intercept)=>{
            expect(intercept.response.statusCode).to.equal(200)
          })
        })
         
   })

})

 
