import React, { useState } from 'react'
import axios from 'axios'
import {addRequestedDataField} from '../SchemaComps/DataMethods'

const FormCreator = () => {
    const [formValues, setFormValues] = useState([{ name: "", email : ""}])
    const [dataFields,setDataFields]=useState([])

    //#region Resercher's info methods
    const handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
      }
    
    const addInfoFields = () => {
        setFormValues([...formValues, { name: "", email: "" }])
      }
    
    const removeInfoFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(formValues));
    }
    //#endregion
    
    //#region Data fields methods
    const addDataFields = () => {
        setFormValues([...formValues, addRequestedDataField()])
      }
    //#endregion

    return (
        <form  onSubmit={handleSubmit}>
          {formValues.map((element, index) => (
            <div className="form-inline" key={index}>
            <h2>Please Enter Resercher's info:</h2>
              <label>Name</label>
              <input type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} />
              <label>Email</label>
              <input type="text" name="email" value={element.email || ""} onChange={e => handleChange(index, e)} />
              {
                index ? 
                  <button type="button"  className="button remove" onClick={() => removeInfoFields(index)}>Remove</button> 
                : null
              }
            </div>
          ))}
          <div className="button-section">
              <button className="button add" type="button" onClick={() => addInfoFields()}>Add</button>   
          </div>
          <div>
              <h2>Add fields:</h2>
              <h3>Possible field types: free-text, dropdown menu, numeric input, date and true/false (checkboxes,radio buttons)</h3>

          </div>
          <div className="button-section">
              <button className="button add" type="button" onClick={() => addDataFields()}>Add</button>   
          </div>
          <button className="button_submit" type="submit">Submit</button>
      </form>
    )
}

export default FormCreator