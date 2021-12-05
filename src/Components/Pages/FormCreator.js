import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../CSSfiles/Formcreator.css'
import Form from '@rjsf/material-ui';
import { Alert } from '@mui/material';
import { server } from './consts';


//a FUNCTIONAL COMPONENT!!! renders the page where the setup and creation of the form's configuration happen 
const FormCreator = () => {

    const [schemaFile, setSchemaFile] = useState("")
    const [UIschemaFile, setUISchemaFile] = useState("")
    const [name, setName] = useState("")
    const [link, setLink] = useState("")
    const [withUI,setWithUI]=useState(false)
    
    /**
     *a FUNCTION!!! sends a http request with the name of the form  research (name),
     *the schema.json file (schema), and the ui-schema (ui) to the server we built
     * 
     */

    const handleSubmit = () => {
        try {

            //http request via the Axios npm (instead of Fetch function)
            axios.post(`http://${server}/create-form`, {
                name: name,
                schema: schemaFile,
                ui: UIschemaFile
            })
                .then((data) => {
                    console.log("data.data: ",data.data)

                    if (data.status == 201) {

                        alert("a research with that name already exists")
                        return
                    }
                    setLink(data.data.link)
                })
        } catch (error) {
            if (error)
                console.log("error in handleSubmit in FormCreator is: ", error)
                alert(error)
        }
    }



    /**
     * RENDERING MODES!!! select what to show on the page according to the place of the user in the system
     * (where the user is in the flow of the usage)
     */

    const pageViews = () => {

        //step 2
        if (schemaFile != "" && UIschemaFile != "" && link == "") {
            if (withUI) { //rendering form example WITH ui-schema

            }
            else {
                //rendering form example without ui-schema
                return showForm()
            }
        }
        else if (link != "") {//step 3 and final
            //showing the link created to a real form
            return showLink()
        }
        else {
            //step 1- JSON file selection
            return chooseFiles()
        }
    }


    /**
     * A PAGE RENDER!!! shows the link created to the actul furm with the structure 
     * we specified in schema and ui-schema earlier
     */
    const showLink = () => {

        return (
            <div className='wrapper'>
                <text>link to {name} is: </text>
                <br />
                <text>{link}</text>
            </div>
        )
    }


    /**
     * A PAGE RENDER!!! shows how the form will look like with the chosen schema JSON file
     * NOT A REAL FILE!!! DOES NOT SAVE ANSWERS!!!
     * 
     * USAGE: after form is to the reseacher's liking, enter the name of the form in the input BELOW the form
     * (in Name of research text input)  and press "submit"
     */
    const showForm = () => {
        return (
            <div className='wrapper'>
                <Form className="my-form"
                    schema={schemaFile}
                    uiSchema={UIschemaFile}
                />
                <form>
                    <label>Name of research:</label>
                    <input required={true} type="text" title="name of research" value={name} onChange={(e) => { setName(e.target.value) }} />
                </form>
                <br />
                <button type="button" title="Save Form" onClick={handleSubmit}>Save Form</button>
            </div>
        )
    }


    /**
     * A PAGE RENDER!!! choose schema and an optional ui-schema JSON files 
     * to create the requested form CONFIGURATION!!!
     * 
     */
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
                <label>Choose a Uischema JSON file: </label>
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
                }} ></input>
            </div>
        )
    }

    return pageViews()

}


export default FormCreator

