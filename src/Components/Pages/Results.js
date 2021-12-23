import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../../consts'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import '../CSSfiles/results.css'


//a functional component the research inputs the data in the text input and receives ALL
//the results for the specific form/research. also being received is a metadata with time and date FOR EACH
//PARTICIPANT and their date and time of answering

const Results = ({ navigation, route }) => {

    const [formsNames, setFormsNames] = useState([])
    const [myResults, setMyResults] = useState([])
    const [name, setName] = useState("")
    const [flag, setFlag] = useState(false) //a flag to mark if we have any data to be shown- 
    //we won't show anything if it is false
    //and will show the results of the inputted form/research name
    const [showLoading, setShowLoading] = useState(false)
    const [serverOff, setServerOff] = useState(true)//a flag to check if the server is off

    useEffect(() => {
        axios.get(`http://${server}/test`)
            .then((data) => {
                setServerOff(false)

                let formsNamesArr = []
                axios.get(`http://${server}/get-forms-names`)
                    .then((data) => {
                        for (let i = 0; i < data.data.length; i++) {
                            if ((data.data)[i].name != "configurations") {
                                formsNamesArr.push((data.data)[i].name)
                            }
                        }
                        setFormsNames(formsNamesArr)

                    })
                    .catch((err) => {
                        console.log("problem with getting the names of the forms in useEffect: ", err)
                    })
            })
            .catch((err) => {
                console.log("server is probably down")
            })

    }, [])



    //a function that show the results as one big json separates to little jsons (each by a black border)
    const showResults = () => {

        return (
            <div className="json-wrapper">
                <pre id="json" >
                    {JSON.stringify(myResults,undefined,5)}
                </pre>
            </div>
        )

    }

    //a function- retrieves the results for the form/research specified in "name" variable
    const retrieveAnswers = () => {
        if (!formsNames.includes(name)) {
            alert("please choose a valid form name")
            return;
        }
        axios.get(`http://${server}/get-results?name=${name}`)
            .then((data) => {

                setMyResults(data.data)//puts the results json retrieved from the server in the front end in MyResults
                setShowLoading(false)
                setFlag(true)
            })
            .catch((err) => {
                if (err)
                    console.log("error in axios call in retrieveAnswers in Answer components is: ", err)
            })
    }

    return (
        <div>
            {
                formsNames ? (<form onSubmit={(e) => {
                    e.preventDefault()
                    if (name != "") {
                        setShowLoading(true)
                        retrieveAnswers()
                    }
                }}>
                    <label>Choose or type the name of requested research</label>
                    <br />
                    <Autocomplete
                        disabled={serverOff}
                        disablePortal
                        className="researches-names"
                        options={formsNames}
                        sx={{ width: 300 }}
                        value={name}
                        onChange={(event, value) => setName(value)}
                        renderInput={(params) => <TextField {...params} label="Choose Research" />}
                    />
                    <br />
                    <button disabled={serverOff} type="button" title="Retrieve" onClick={() => { setShowLoading(true); retrieveAnswers() }} >Get Results</button>
                    <br />
                </form>) : (<text>loading forms names...</text>)
            }
            <br />
            {serverOff ? (<text ><b><i>server is off. please run it</i></b></text>) : null}
            {
                //show "loading..."
                showLoading ? (<text>Loading Results...</text>) : null
            }
            {
                //if we have nothing to show- show nothing, if we searched for results and we have to show- show them
                flag ? (
                    showResults()
                ) : null
            }
        </div>
    )

}

export default Results