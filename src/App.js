import React, { useEffect, useState } from 'react';
import './App.css';
//import schema from './Components/SchemaComps/schema.json'
//import UI from './Components/SchemaComps/UI.json'
import { JsonForms } from '@jsonforms/react';
//import Schema from './Components/SchemaComps/Schema.json'
//import UiSchema from './Components/SchemaComps/UiSchema.json'
import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';
//import fs from 'fs'
import axios from 'axios'
import { Generate } from '@jsonforms/core';

//const schema = Schema;
//const uischema = UiSchema;


function App() {

  const [data, setData] = useState();
  const [UI, setUI] = useState({})
  const [schema, setSchema] = useState({})

  useEffect(()=>{
    axios.post('http://localhost:3030/route/addForm/', {
    "form_title": "Itay and Inbal's project",
    "1": {
      "field_name": "name",
      "field_type": "string",
      "minLength": 3,
      "maxLength": 10
    },
    "2": {
      "field_name": "age",
      "field_type": "number",
      "minimum": 18
    }
  })
    .then((data) => {
      setUI(data.data.UI)
      setSchema(data.data.schema)
    })
    .catch((err) => {
      if (err)
        console.log("error is in App: " + err)
    })
  },[])

  console.log(JSON.stringify(UI))
  console.log(JSON.stringify(schema))

  return (
    <div className='App'>
      <JsonForms
        schema={schema}
        uischema={UI}
        //data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data, _errors }) => setData(data)}
      />
    </div>
  );
}

export default App;
