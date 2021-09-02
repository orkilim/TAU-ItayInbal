import React,{ useState } from 'react';
import './App.css';
import { JsonForms } from '@jsonforms/react';
import { person } from '@jsonforms/examples';
import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';

const schema = person.schema;
const uischema = person.uischema;
const initialData = person.data;

function App() {
  
  const [data, setData] = useState(initialData);

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
