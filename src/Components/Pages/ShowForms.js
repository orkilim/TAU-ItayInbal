import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../CSSfiles/ShowForms.css'
//import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

const ShowForms = () => {

    const [researchersArr, setResearchersArr] = useState([{ name: "" }])
    const [shownForms, setShownForms] = useState([])

    const onSubmit=() => {
        let amountOfResearchers = 0;
        let researchersStr = ""
        for(let i=0;i<researchersArr.length;i++)
        {
            
            if(researchersArr[i].name!=""){
                researchersStr+="&name"+(i+1)+"="+researchersArr[i].name
                amountOfResearchers++
            }
        }
        const axiosUrl = `http://localhost:3030/route/getForms?amountOfResearchers=${amountOfResearchers}${researchersStr}`
        console.log(axiosUrl)
        axios.get(axiosUrl)
            .then((data) => {
                console.log(data.data)
                setShownForms(data.data)
            })
            .catch((err) => {
                if (err)
                    console.log("problem with axios in ShowForms: " + err)
            })
    }


    const handleChange = (index, e) => {
        let newArr = [...researchersArr]
        newArr[index].name = e.target.value
        setResearchersArr(newArr)
    }

    const addResearcher = () => {
        let newArr = [...researchersArr, { name: "" }]
        setResearchersArr(newArr)
    }

    const removeResearcher = (index) => {
        let newArr = [...researchersArr]
        newArr.splice(index, 1)
        setResearchersArr(newArr)

    }

    return (
        <div className="show-forms-wrapper">
            <h1>Forms from Prof. Liad Mudrik's lab</h1>
            <h4>Enter researchers' private names to find forms by them</h4>
            <h4>Each one in their own input rectangle. NO PhD, Dr. or Prof. prefix or suffix- just private names</h4>
            <form>
                {
                    researchersArr.map((element, index) => {
                        return (<div className="researcher-div" key={index}>
                            <label>Researcher {index + 1}:</label>
                            <input type="text" name="name" value={researchersArr[index].name} onChange={(e) => { handleChange(index, e) }}></input>
                            <button type="button" title="Add Researcher" onClick={() => { addResearcher(index) }} >Add Researcher</button>
                            {
                                index ?
                                    <button type="button" className="button remove" onClick={() => removeResearcher(index)}>Remove Researcher</button>
                                    : null
                            }
                        </div>)
                    })
                }
            </form>
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

                            <text className="project-button" onClick={() => { }} >
                                {projectNameStr} By {namesStr}
                            </text>
                        </div>
                        )
                    }

                })
            }
            <button type="submit" title="Search Forms" onClick={()=>{onSubmit()}}>Search Forms</button>
        </div>
    )


}

export default ShowForms