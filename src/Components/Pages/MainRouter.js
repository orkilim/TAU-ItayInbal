import React from 'react'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import FormCreator from './FormCreator';
import Home from './Home';
import '../CSSfiles/Home.css'

const MainRouter=()=>{
    
    
    return (
        <Router>
          <div className="router_div">
            
            
            <Switch>

              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/create">
                <FormCreator />
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