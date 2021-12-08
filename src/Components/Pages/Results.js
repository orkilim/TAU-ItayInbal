import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from './consts'


//a functional component the research inputs the data in the text input and receives ALL
//the results for the specific form/research. also being received is a metadata with time and date FOR EACH
//PARTICIPANT and their date and time of answering

const Results=({navigation,route})=>{

    const [myResults,setMyResults]=useState([])
    const [name,setName]=useState("")
    const [flag,setFlag]=useState(false) //a flag to mark if we have any data to be shown- 
                                        //we won't show anything if it is false
                                        //and will show the results of the inputted form/research name


    //a function- retrieves the results for the form/research specified in "name" variable
    const retrieveAnswers=()=>{
        axios.get(`http://${server}/get-results?name=${name}`)
        .then((data)=>{
            
            const resultsArray=[]
            for(const item in data.data)
            {
                resultsArray.push((data.data)[item])
            }
            setMyResults(resultsArray)
            setFlag(true)
        })
        .catch((err)=>{
            if(err)
                console.log("error in axios call in retrieveAnswers in Answer components is: ",err)
        })
    }

    return(
        <div>
            <form>
                <label>Research to get answers to:</label>
                <input type="text" value={name} title="Research" onChange={(event)=>{setName(event.target.value)}} />
                <button type="button" title="Retrieve" onClick={()=>{retrieveAnswers()}} >Retrieve</button> 
            </form>
            {
                flag?(
                  myResults.map((element,index)=>{
                      return(
                          <div key={index}>
                              <text key={index}>{JSON.stringify(element.answers)}</text>
                          </div>
                      )
                  })  
                ):null
            }
        </div>
    )

}

export default Results