import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from './consts'

const Answers=({navigation,route})=>{

    const [myResults,setMyResults]=useState([])
    const [name,setName]=useState("")
    const [flag,setFlag]=useState(false)

    const retrieveAnswers=()=>{
        axios.get(`http://${server}/route/get-answers?name=${name}`)
        .then((data)=>{
            
            console.log(data)
            const tempArr=[]
            for(const item in data.data)
            {
                tempArr.push((data.data)[item])
            }
            setMyResults(tempArr)
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

export default Answers