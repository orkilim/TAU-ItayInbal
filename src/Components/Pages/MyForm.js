import React, { useEffect, useState } from 'react'
import Form from '@rjsf/core'
import axios from 'axios'
import { server } from './consts'

const MyForm=()=>{

    const [schema,setSchema]=useState("")
    //const [ui,setUI]=useState("")
    const [isReady,setIsReady]=useState(false)
    const [nameOfCollection,setNameOfCollection]=useState("")

    useEffect(()=>{ 
       //console.log("hummus:",window.location.pathname.slice(6))
       //console.log(window.location.host)
       const title=window.location.pathname.slice(6)

       axios.get(`http://${server}/route/get-form?title=${title}`)
       .then((data) => {
         console.log("data is: ", data)
         setSchema(data.data.schema)
         //setUI(data.data.UI)
         setNameOfCollection(data.data.nameOfCollection)
         setIsReady(true)
       })
       .catch((err) => {
         if (err) {
           console.log("error in axios, in useEffect, in MyForm is: ", err)
         }
       })

    },[])

    const handleSubmit=(data)=>{
        //console.log(data.formData)
        axios.post(`http://${server}/route/save-answers`,{
          answers:data.formData,
          name:nameOfCollection
        })
        .then((data)=>{
          if(data.status==200)
          {
            alert("answers were saved successfully. thank you for your participation. you can close the window now")
          }
        })
        .catch((err)=>{
          if(err)
          {
            alert("a problem occured: ",err)
          }
        })
    }

    return(
        <div>
            {
                isReady?<Form
                schema={schema}
                //uiSchema={ui}
                onSubmit={handleSubmit}
                />:<text>loading</text>
            }
        </div>
    )

}

export default MyForm