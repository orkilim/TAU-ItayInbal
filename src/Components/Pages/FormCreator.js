import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../CSSfiles/Formcreator.css'
//import DataField from '../MyComponents/DataField'
//import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
//import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
//import { v4 as uuidv4 } from 'uuid';
import Form from '@rjsf/core';

const FormCreator = () => {

    const [schemaFile, setSchemaFile] = useState("")
    const [UIschemaFile, setUISchemaFile] = useState("")
    const [name, setName] = useState("")
    const [link, setLink] = useState("")

    /*useEffect(() => {
        console.log("schema: ", schemaFile)
        console.log("ui: ", UIschemaFile)
    }, [schemaFile, UIschemaFile])*/

    const handleSubmit = () => {
        try {
            axios.post(`http://localhost:3030/route/createForm`, {
                name: name,
                schema: schemaFile
                //ui: UIschemaFile
            })
                .then((data) => {
                    console.log(data.data)
                    console.log(data.data.msg)
                    setLink(data.data.link)
                })
        } catch (error) {
            if (error)
                console.log("error in handleSubmit in FormCreator is: ", error)
        }
    }

    const pageViews = () => {
        if (schemaFile != "" && /*UIschemaFile != "" &&*/ link == "") {
            //return(<div><text>sup ma nigga?</text></div>)

            return showForm()
        }
        else if (link != "") {
            return showLink()
        }
        else {
            return chooseFiles()
        }
    }

    const showLink = () => {

        return (
            <div className='wrapper'>
                <text>link to {name} is: </text>
                <br />
                <text>{link}</text>
            </div>
        )
    }

    const showForm = () => {
        return (
            <div className='wrapper'>
                <Form
                    schema={schemaFile}
                    //uiSchema={UIschemaFile}
                    //renderers={materialRenderers}
                    //cells={materialCells}
                />
                <form>
                    <label>Name of research:</label>
                    <input type="text" title="name of research" value={name} onChange={(e) => { setName(e.target.value) }} />
                </form>
                <br />
                <button type="button" title="Save Form" onClick={handleSubmit}>Save Form</button>
            </div>
        )
    }

    const chooseFiles = () => {

        return (
            <div className="wrapper">
                <label>Choose a Schema JSON file: </label>
                <input type="file" title="Choose a Schema JSON file" onChange={(e) => {
                    e.target.files[0].text()
                        .then((data) => {
                            data = JSON.parse(data)
                            setSchemaFile(data)
                        })
                        .catch((error) => {
                            if (error) {
                                console.log("error in chooseFiles in schema choosing is: ", error)
                            }
                        })
                }} ></input>
                
            </div>
        )
    }

    return pageViews()

}


export default FormCreator



/**<label>Choose a Uischema JSON file: </label>
                <input type="file" title="Choose a UISchema JSON file" onChange={(e) => {
                    e.target.files[0].text()
                        .then((data) => {
                            data = JSON.parse(data)
                            setUISchemaFile(data)
                        })
                        .catch((error) => {
                            if (error) {
                                console.log("error in chooseFiles in UI choosing is: ", error)
                            }
                        })
                }} ></input> */