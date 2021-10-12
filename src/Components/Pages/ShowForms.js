import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../CSSfiles/ShowForms.css'
//import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

const ShowForms = () => {

    const [shownForms, setShownForms] = useState([])

    useEffect(() => {
        console.log("hello")
        axios.get('http://localhost:3030/route/getForms')
            .then((data) => {
                console.log(data.data)
                setShownForms(data.data)
            })
            .catch((err) => {
                if (err)
                    console.log("problem with axios in ShowForms: " + err)
            })
    }, [])


    return (
        <div className="show-forms-wrapper">
            {
                shownForms.map((element, index) => {
                    const tempArr = element.split(" ")
                    let projectNameStr = ""
                    let namesStr = ""
                    if (tempArr[tempArr.length - 1] == "Schema.json") {
                        {
                            const projectNameArr = tempArr[tempArr.length - 2].split("_")
                            for (let i = 0; i < projectNameArr.length; i++) {

                                if (i != projectNameArr.length - 1) {
                                    projectNameStr += projectNameArr[i] + " "
                                }
                                else {
                                    projectNameStr += projectNameArr[i]
                                }
                            }
                            for (let i = 1; i < tempArr.length - 2; i++) {
                                if (i != tempArr.length - 3) {
                                    namesStr += tempArr[i] + " "
                                }
                                else {
                                    namesStr += "and " + tempArr[i]
                                }
                            }
                        }
                        return (<div className="project" key={index} >
                            <button className="project-button" onClick={()=>{}} title={`${projectNameStr} By ${namesStr}`}>
                                
                            </button>
                        </div>
                        )
                    }

                })
            }
        </div>
    )


}

export default ShowForms