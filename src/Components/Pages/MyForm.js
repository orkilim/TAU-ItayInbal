import React, { useEffect, useState } from 'react'
import Form from '@rjsf/core'
import axios from 'axios'
import { server } from '../../consts'
import '../CSSfiles/Formcreator.css'

import 'bootstrap/dist/css/bootstrap.min.css';

//A functional component- renders a form (from the received data with the axios) to be filled by the participant
const MyForm = () => {

  const [schema, setSchema] = useState("")
  const [ui, setUI] = useState("")
  const [isReady, setIsReady] = useState(false)//a variable to check if the schema and ui variables already have
  //the required data. starts as false- turns to use when schema and ui
  //gets the proper data

  const [nameOfCollection, setNameOfCollection] = useState("")

  useEffect(() => {

    const title=window.location.pathname.slice(7)
    //a call to our server to get the form's schema and ui schema (if there is any),
    //and set them as the ones we are using
    axios.get(`http://${server}/get-form?title=${title}`)
      .then((data) => {
        setSchema(data.data.schema)
        setUI(data.data.UI)
        setNameOfCollection(data.data.nameOfCollection)
        setIsReady(true)
      })
      .catch((err) => {
        if (err) {
          console.log("error in axios, in useEffect, in MyForm is: ", err)
          alert(err)
        }
      })

  }, [])


  //a function- handles the submitting of the form
  const handleSubmit = (data) => {
    axios.post(`http://${server}/save-results`, {
      answers: data.formData,
      name: nameOfCollection
    })
      .then((data) => {
        if (data.status == 200) {
          alert("answers were saved successfully. thank you for your participation. you can close the window now")
        }
      })
      .catch((err) => {
        if (err) {
          alert("a problem occured: ", err)
        }
      })
  }

  return (
    <div>
      {
        //show form if done to load it, else show "loading"
        isReady ? <Form
          className="my-form"
          schema={schema}
          uiSchema={ui}
          onSubmit={handleSubmit}
        /> : <text>loading</text>
      }
    </div>
  )

}

export default MyForm