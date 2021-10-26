import React, { useEffect, useState } from 'react'
import Form from "@rjsf/core";

const FormCreatorV3=()=>{
    
    const [schemaFile, setSchemaFile] = useState("")
    const [UIschemaFile, setUISchemaFile] = useState("")

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
                />
                <br />
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
                                console.log("error in chooseFiles is: ", error)
                            }
                        })
                }} ></input>
                <label>Choose a Uischema JSON file: </label>
                <input type="file" title="Choose a UISchema JSON file" onChange={(e) => {
                    e.target.files[0].text()
                        .then((data) => {
                            data = JSON.parse(data)
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

}

export default FormCreatorV3