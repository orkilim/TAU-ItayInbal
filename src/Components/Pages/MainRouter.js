import React from 'react'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
//import FormCreator from './FormCreator';
import FormCreatorV2 from './FormCreatorV2';
import Home from './Home';
import '../CSSfiles/Home.css'
import ShowForms from './ShowForms'

const MainRouter=()=>{
    
    
    return (
        <Router>
          <div className="router_div">
            
            
            <Switch>

              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/create">
                <FormCreatorV2 />
              </Route>
              <Route path="/show">
                <ShowForms />
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