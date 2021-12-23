import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../../consts';
import { Link } from "react-router-dom";

const Home = () => {

    const [status, setStatus] = useState("")

    useEffect(() => {
        axios.get(`http://${server}/test`)
            .then((data) => {
                setStatus(data.data)
            })
            .catch((err) => {
                setStatus("server isn't up")
                console.log("Error from axios in Home component: ",err)
            })
    }, [])

    return (
        <div>
            {status ? (
                <div>
                    <b>Welcome to Formcreator</b>
                    <br />
                    <br/>
                    <Link to="/create-form">Create Form</Link>
                    <br />
                    <br/>
                    <Link to="/results">Results</Link>
                    <br />
                    <br/>
                    <text>{status}</text>
                </div>
            ) : null
            }
        </div>
    )
}

export default Home