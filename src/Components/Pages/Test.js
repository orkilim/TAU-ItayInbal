import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../../consts';

const Test=({navigation})=>{

    const [connectionIndicatorText,setText]=useState("")//text to indicate failed or successful connection

    useEffect(()=>{
        axios.get(`http://${server}/test`)
        .then((data)=>{
            setText(data.data)
        })
        .catch((err)=>{
            console.log(JSON.stringify(err))
            setText("server is down- activate it")
        })
    },[])


    return(
        connectionIndicatorText?(<div>
            <text>{connectionIndicatorText}</text>
        </div>):null
    )
}

export default Test