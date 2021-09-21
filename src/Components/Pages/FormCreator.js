import React, { forwardRef, useRef, useState } from 'react'
//import axios from 'axios'
//import Dropdown from 'react-dropdown';
import '../CSSfiles/Formcreator.css'
import Dropdown from 'react-dropdown';
import DataField from '../MyComponents/DataField'
import { data } from '@jsonforms/examples/lib/arrays';

const FormCreator = () => {
  const [formValues, setFormValues] = useState([{ name: "", email: "" }])//the fields of the form the include name and email
  const [dataFields, setDataFields] = useState([<DataField />])//fields of the form the dictates the type of the field (text/number/boolean and what's in it)
  const [dataFieldsValues,setDataFieldsValues]=useState([{field_type:"",field_name:"",text_type:"",min_val:-1,max_val:-1,dropdown_fields_values:[]}])

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

  const removeDataField = (i) => {
    let newDataFields = [...dataFields];
    let newDataFieldsValues = [...dataFieldsValues];
    newDataFields.splice(i, 1);
    newDataFieldsValues.splice(i, 1);
    setDataFields(newDataFields)
    setDataFieldsValues(newDataFieldsValues)
  }

  //the method that adds the fields
  const addDataFields = () => {
    setDataFields([...dataFields, <DataField />])
    setDataFieldsValues([...dataFieldsValues,{field_type:"",field_name:"",text_type:"",min_val:-1,max_val:-1,dropdown_fields_values:[]}])
  }

  //#endregion

  const handleCallback = (childData,index) => {
    let newValues=[...dataFieldsValues]
    const temp_obj={
      field_type:childData.field_type,
      field_name:childData.field_name,
      text_type:childData.text_type,
      min_val:childData.min_val,
      max_val:childData.max_val,
      dropdown_fields_values:childData.dropdown_menu_values
    }
    newValues[index] = temp_obj;
    setDataFieldsValues(newValues);
    console.log(dataFieldsValues)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Please Enter Researcher's info:</h2>
      {formValues.map((element, index) => (
        <div className="form-inline" key={index}>
          <label>Name</label>
          <input type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} />
          <label>Email</label>
          <input type="text" name="email" value={element.email || ""} onChange={e => handleChange(index, e)} />
          {
            index ?
              <button type="button" className="button remove" onClick={() => removeInfoFields(index)}>Remove</button>
              : null
          }
        </div>
      ))}
      <div className="button-section">
        <button className="button add" type="button" onClick={() => addInfoFields()}>Add</button>
      </div>
      <br />
      <div>
        <h2>Add fields:</h2>
        <h5>Possible field types: free-text, dropdown menu, numeric input, date and true/false (checkboxes,radio buttons)</h5>
      </div>
      <br />
      <div className="dropdown-section">
        {
          dataFields.map((element, index) => {
            return (<div key={index}>
              <DataField parentCallback={handleCallback} index={index} />
              {
                index ?
                  <button type="button" className="data-field-remove" onClick={() => removeDataField(index)}>Remove</button>
                  : null
              }
            </div>)
          })
        }
        <br />
        <button className="button add" type="button" onClick={() => addDataFields()}>Add Data Fields</button>
      </div>
      <button className="button_submit" type="submit" onClick={() => {
        console.log("blah: " + JSON.stringify(dataFields[0].props))
      }}>Submit</button>
    </form>
  )
}


export default FormCreator