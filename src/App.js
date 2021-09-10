import React, { useState } from 'react';
import './App.css';
import { JsonForms } from '@jsonforms/react';
import Schema from './Components/SchemaComps/Schema.json'
import UiSchema from './Components/SchemaComps/UiSchema.json'
import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';
//import fs from 'fs'
import axios from 'axios'

const schema = Schema;
const uischema = UiSchema;

const axiosCall=()=>{
  axios.post("http://localhost:3030/route/addForm/",
    {
      "form_title": "Itay and Inbal's project",
      "1": {
        "field_name": "is eligable for experiment",
        "field_type": "boolean"
      },
      "2": {
        "field_name": "age",
        "field_type": "numeric"
      }
    })
    .then((data) => {
      const UI_schema=JSON.parse(data.config.data)
      console.log(UI_schema)
    })
    .catch((error) => {
      if (error)
        console.log("that was the error:\n"+error)
    }
    )
}

function App() {

  const [data, setData] = useState();

  axiosCall()
  
  return (
    <div className='App'>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data, _errors }) => setData(data)}
      />
    </div>
  );
}

export default App;
