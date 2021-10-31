import React, { useEffect, useState } from 'react'
import Form from '@rjsf/core'
import axios from 'axios'

const MyForm=()=>{

    const [schema,setSchema]=useState("")
    const [ui,setUI]=useState("")
    const [isReady,setIsReady]=useState(false)

    useEffect(()=>{ 
       console.log("hummus:",window.location.pathname.slice(6))
       const title=window.location.pathname.slice(6)

       axios.get(`http://localhost:3030/route/getForm?title=${title}`)
       .then((data) => {
         console.log("data is: ", data)
         setSchema(data.data.schema)
         setUI(data.data.UI)
         setIsReady(true)
       })
       .catch((err) => {
         if (err) {
           console.log("error in axios, in useEffect, in MyForm is: ", err)
         }
       })

    },[])

    const handleSubmit=(data)=>{
        console.log(data.formData)
    }

    return(
        <div>
            {
                isReady?<Form
                schema={schema}
                uiSchema={ui}
                onSubmit={handleSubmit}
                />:<text>loading</text>
            }
        </div>
    )

}

export default MyForm