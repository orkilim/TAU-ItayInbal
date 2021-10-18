import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../CSSfiles/Formcreator.css'
//import DataField from '../MyComponents/DataField'
//import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
//import { JsonForms } from '@jsonforms/react';
//import { materialRenderers, materialCells, } from '@jsonforms/material-renderers';
import { v4 as uuidv4 } from 'uuid';
import Form from "@rjsf/core";
import fs from 'fs'
import jthf from 'json-to-html-form'
import ReactDOMServer from "react-dom/server";

const FormCreatorV2 = ({ navigation }) => {

    const [schemaFile, setSchemaFile] = useState("")
    const [UIschemaFile, setUISchemaFile] = useState("")

    const handleSubmit=(data)=>{
        const html=jthf.getForm(data)
        axios.post(`http://localhost:3030/route/createForm`,{
            path:"C:/Users/Or/Desktop/testing folder/testing1.html",
            html:html
        })
        .then((data)=>{
            console.log(data)
        })
        .catch((err)=>{
            if(err){
                console.log("problem in handleSubmit in FormCreatorV2: ",err)
            }
        })
    }

    //#region Different page renders- before and after file choices

    const pageViews = () => {
        if (schemaFile != "" && UIschemaFile != "") {
            return showForm()
        }
        else {
            return chooseFiles()
        }
    }

    const showForm = () => {


        return (
            <div className='wrapper'>
                <Form
                    schema={schemaFile}
                    uiSchema={UIschemaFile}
                    onSubmit={(data)=>{handleSubmit(data.formData)}}
                />
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
                            data=JSON.parse(data)
                            setSchemaFile(data)
                        })
                        .catch((error) => {
                            if (error) {
                                console.log("error in chooseFiles is: ", error)
                            }
                        })
                }} ></input>
                <label>Choose a Uischema JSON file: </label>
                <input type="file" title="Choose a UISchema JSON file" onChange={(e) => {
                    e.target.files[0].text()
                        .then((data) => {
                            data=JSON.parse(data)
                            setUISchemaFile(data)
                        })
                        .catch((error) => {
                            if (error) {
                                console.log("error in chooseFiles is: ", error)
                            }
                        })
                }} ></input>
            </div>
        )
    }

    //#endregion

    return pageViews()
};


export default FormCreatorV2;