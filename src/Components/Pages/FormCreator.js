import React, { useState } from 'react'
import axios from 'axios'
import '../CSSfiles/Formcreator.css'
import DataField from '../MyComponents/DataField'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells, } from '@jsonforms/material-renderers';

const FormCreator = () => {
  const [formValues, setFormValues] = useState([{ name: "", email: "" }])//the fields of the form the include name and email
  const [dataFields, setDataFields] = useState([<DataField />])//fields of the form the dictates the type of the field (text/number/boolean and what's in it)
  const [dataFieldsValues, setDataFieldsValues] = useState([{ field_type: "", field_name: "", text_type: "", min_val: -1, max_val: -1, dropdown_fields_values: [] }])
  const [isStillCreating, setIsStillCreating] = useState("entering values")//a state var to indicate at which stages of the form creation we are at right now
  const [formJSONs, setJSONS] = useState({})
  const [dataOfNewForm, setDataOfNewForm] = useState(null)



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
    setDataFieldsValues([...dataFieldsValues, { field_type: "", field_name: "", text_type: "", min_val: -1, max_val: -1, dropdown_fields_values: [] }])
  }

  //#endregion

  //a method to update the data from the data fields (the "children" components) to the form (the "parent" component)
  const handleCallback = (childData, index) => {
    let newValues = [...dataFieldsValues]
    const temp_obj = {
      field_type: childData.field_type,
      field_name: childData.field_name,
      text_type: childData.text_type,
      min_val: childData.min_val,
      max_val: childData.max_val,
      dropdown_fields_values: childData.dropdown_menu_values
    }
    newValues[index] = temp_obj;
    setDataFieldsValues(newValues);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3030/route/addForm/', {
      contactInfo: formValues,
      dataFieldsValues: dataFieldsValues
    })
      .then((data) => {
        setJSONS(data.data)
        setIsStillCreating("checking newly created form")
      })
      .catch((err) => {
        if (err)
          console.error("error in sending values to server: " + err)
      })
  }

  //#region Different renderings of this page
  const formCreationStages = () => {
    if (isStillCreating == "entering values") {
      return enterFormValues()
    }
    else if (isStillCreating == "checking newly created form") {
      return showCreatedForm()
    }
    else {
      return (
        <Redirect to="../" />
      )
    }
  }

  const enterFormValues = () => {
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
        }}>Create Form</button>
      </form>
    )
  }

  const showCreatedForm = () => {
    //const myJSONs = JSON.parse(formJSONs)
    console.log(formJSONs)
    return (
      <div>
        <JsonForms
          schema={formJSONs.schema}
          uischema={formJSONs.UI}
          renderers={materialRenderers}
          cells={materialCells}
          data={dataOfNewForm}
          onChange={({ data, _errors }) => setDataOfNewForm(data)}
        />
      </div>
    )
  }
  //#endregion
  return (
    formCreationStages()
  )
}


export default FormCreator