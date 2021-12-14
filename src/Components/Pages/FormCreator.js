import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../CSSfiles/Formcreator.css'
import Form from '@rjsf/core';
import { Alert, Checkbox,FormControlLabel } from '@mui/material';
import { server } from './consts';

import 'bootstrap/dist/css/bootstrap.min.css';


//a functional component- renders the page where the setup and creation of the form's configuration happen 
const FormCreator = () => {

    const [schemaFile, setSchemaFile] = useState("")
    const [UIschemaFile, setUISchemaFile] = useState("")
    const [name, setName] = useState("")
    const [link, setLink] = useState("")
    const [withUI, setWithUI] = useState(false)

    useEffect(()=>{console.log(withUI)},[withUI])

    /**
     *a function- sends a http request with the name of the form  research (name),
     *the schema.json file (schema), and the ui-schema (ui) to the server we built
     * 
     */

    const handleSubmit = () => {
        if(withUI){
            try {
            
                //http request via the Axios npm (instead of Fetch function)
                axios.post(`http://${server}/create-form`, {
                    name: name,
                    schema: schemaFile,
                    ui: UIschemaFile
                })
                    .then((data) => {
    
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
        else{
            try {
            
                //http request via the Axios npm (instead of Fetch function)
                axios.post(`http://${server}/create-form`, {
                    name: name,
                    schema: schemaFile,
                })
                    .then((data) => {
    
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
    }



    /**
     * rendering modes- select what to show on the page according to the place of the user in the system
     * (where the user is in the flow of the usage)
     */

    const pageViews = () => {

        //step 2

        if (withUI && schemaFile != "" && UIschemaFile != "" && link == "") {
            {
                //rendering form example with ui-schema
                return showFormWithUI()
            }
        }
        else if(!withUI && schemaFile != ""  && link == "") {
            //rendering without ui
            return showFormWithoutUI()
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
 * page render- shows the link created to the actul furm with the structure 
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
 * page render shows how the form will look like with the chosen schema JSON file
 * 
 * WITH UI-SCHEMA
 * 
 * NOT A REAL FILE!!! DOES NOT SAVE ANSWERS!!!
 * 
 * USAGE: after form is to the reseacher's liking, enter the name of the form in the input BELOW the form
 * (in Name of research text input)  and press "submit"
 */
const showFormWithUI = () => {
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
 * page render shows how the form will look like with the chosen schema JSON file 
 * 
 * WITHOUT UI-SCHEMA
 * 
 * NOT A REAL FILE!!! DOES NOT SAVE ANSWERS!!!
 * 
 * USAGE: after form is to the reseacher's liking, enter the name of the form in the input BELOW the form
 * (in Name of research text input)  and press "submit"
 */
 const showFormWithoutUI = () => {
    return (
        <div className='wrapper'>
            <Form className="my-form"
                schema={schemaFile}
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
 * page render- choose schema and an optional ui-schema JSON files 
 * to create the requested form CONFIGURATION!!!
 * 
 */
const chooseFiles = () => {
    return (
        <div className="wrapper">
            <label>Choose a Schema JSON file: </label>
            {
                //choose schema JSON file
            }
            <input className="file-input" type="file" title="Choose a Schema JSON file" onChange={(e) => {
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
            <FormControlLabel control={<Checkbox checked={withUI} onChange={(e)=>{setWithUI(e.target.checked)}} />} label="include a UI-schema?" />
            <br/>
            
            {
                //choose ui-schema JSON file
            
            
                withUI ? (
                    <div>
                    <label>Choose a Uischema JSON file: </label>
                    <input className="file-input" type="file" title="Choose a UISchema JSON file" onChange={(e) => {
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
                ) : null
            }
        </div>
    )
}

return pageViews()

}


export default FormCreator



/**
 *
 *
 * <label>Choose a Uischema JSON file: </label>
                {
                    //choose ui-schema JSON file
                }
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
 */