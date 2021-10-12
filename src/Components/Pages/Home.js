import { StylesContext } from '@material-ui/styles';
import React from 'react'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import '../CSSfiles/Home.css'

const Home=({history})=>{
    return(
        <div className="home">
            <h1 className="liads-lab-title" >Welcome to Liad Mudrick's Lab </h1>
            <text>Home Page</text>
            <br/>
            <ul className="pages-list">
                <li className="home-button">
                    <Link style={{textDecoration:"none",color:"black"}} to="/create">Form Creator</Link>
                </li>
                <li className="home-button">
                    <Link style={{textDecoration:"none",color:"black"}} to="/show">Show Existing Forms</Link>
                </li>
            </ul>
        </div>
    )
}

export default Home
