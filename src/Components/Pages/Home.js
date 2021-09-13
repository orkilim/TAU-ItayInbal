import React from 'react'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import '../CSSfiles/Home.css'

const Home=({history})=>{
    return(
        <div className="Home">
            <text>home page</text>
            <ul className="pages_list">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/create">Form Creator</Link>
                </li>

            </ul>
        </div>
    )
}

export default Home