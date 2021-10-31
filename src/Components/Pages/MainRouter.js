import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//import FormCreator from './FormCreator';
import FormCreator from './FormCreator';
import Home from './Home';
import '../CSSfiles/Home.css'
import MyForm from './MyForm';
import FormCreatorV2 from './FormCreatorV2';

const MainRouter = () => {


  return (
    <Router>
      <div className="router_div">
        <Switch>
          <Route exact path="/">
            <div><text>no page for this route, for the form creator end URL with /formcreator</text></div>
          </Route>
          <Route exact path="/formcreator">
            <FormCreator />
          </Route>
          <Route path="/form/:name">
            <MyForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default MainRouter



/**
 *
 * <Route path="/view">
                <FormViewer />
              </Route>


              <li>
                <Link to="/view">View Forms</Link>
              </li>
 */