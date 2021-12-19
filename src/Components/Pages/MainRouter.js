import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FormCreator from './FormCreator';
import '../CSSfiles/Home.css'
import MyForm from './MyForm';
import Results from './Results';
import Test from './Test'
import Home from './Home';

const MainRouter = () => {


  return (
    <Router>
      <div className="router_div">
        <Switch>
          {
            //page with instructions on how to get to each route
          }
          <Route exact path="/">
            <Home />
          </Route>

          {
            //route to the Formcreator itself
          }
          <Route exact path="/create-form">
            <FormCreator />
          </Route>

          {
            //route to go to the actual form created by the Formcreator component
          }
          <Route path="/forms/:formId">
            <MyForm />
          </Route>

          {
            //route to get to the results of selected form. the chosen form will be inputed inside 
            //the page, NOT in the url route
          }
          <Route exact path="/results">
            <Results/>
          </Route>

        
          {
            //UI-to-server communication test
          }
          <Route path="/test">
            <Test/>
          </Route>

          {
            //route for every other url input
          }
          <Route path="*">
            <div><text>this is not the path you are looking for</text></div>
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default MainRouter



