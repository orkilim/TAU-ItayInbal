import React, { useState } from 'react'
//import axios from 'axios'
//import Dropdown from 'react-dropdown';
import '../CSSfiles/Formcreator.css'
import Dropdown from 'react-dropdown';

const FormCreator = () => {
  const [formValues, setFormValues] = useState([{ name: "", email: "" }])//the fields of the form the include name and email
  const [dataFields, setDataFields] = useState([])//fields of the form the dictates the type of the field (text/number/boolean and what's in it)
  const [dropdownValue, setDropdownValue] = useState("")//the value of the FIRST dropdown=text/number/boolean
  const [fieldName, setFieldName] = useState("")//the NAME of the attribute we want to add to the form
  const [textType, setTextType] = useState("")//when chosen text field- the type of the text field=free-text/date/dropdown menu
  const [minLabel, setMin] = useState("")//what word will appear above the minimum limitation field of number or free text
  const [minVal, setMinVal] = useState(0)//minimum value of number or minimum length of text
  const [maxLabel, setMax] = useState("")//what word will appear above the maximum limitation field of number or free text
  const [maxVal, setMaxVal] = useState(0)//maximum value of number or maximum length of text
  const [dropdownFieldsValues, setDropdownFieldsValues] = useState([{ value_name: "" }])//after we chose text->dropdown menu: which values can we choose from it
  const [label, setLabel] = useState("invisible")//a label for the second dropdown (text-type)
  const [dataInput, setDataInput] = useState("invisible")//className for data inputs
  const [valuesForDropdownClassName, setvaluesForDropdownClassName] = useState("invisible")//a state variable to change the class name of the text->dropdown values
  const [textTypeDropdown, setTextTypeDropdown] = useState("invisible")//classname state variable

  const type_options = ["Text", "Number", "Boolean"]//options for first dropdown

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

  const handleDropdownChange = (i, e) => {
    let newDropdownValues = [...dropdownFieldsValues];
    newDropdownValues[i][e.target.name] = e.target.value;
    setDropdownFieldsValues(newDropdownValues);
  }

  const removeValueField = (i) => {
    let newDropdownValues = [...dropdownFieldsValues];
    newDropdownValues.splice(i, 1);
    setDropdownFieldsValues(newDropdownValues)
  }

  const addValueField = () => {
    setDropdownFieldsValues([...dropdownFieldsValues, { value_name: "" }])
  }

  //the method the BUILDS the fields
  const addRequestedDataField = () => {
    return (
      <div>
        <div>
          <input className="dataInput" onChange={(e) => { setFieldName(e.target.value) }} placeholder="Field Name:" type="text" ></input>
          <br />
          <label>Choose Field Type:▼</label>
          <Dropdown
            className="dropdown"
            options={type_options}
            onChange={(data) => {

              switch (data.value) {
                case "Text":
                  {
                    setDropdownValue("text")
                    setMin("Minimum Length: ")
                    setMax("Maximum Length: ")
                    setLabel("label")
                    setTextTypeDropdown("dropdown")
                    setDataInput("data-input")
                    setLabel("label")
                    setMinVal("")
                    setMaxVal("")
                    break;
                  }
                case "Number":
                  {
                    setDropdownValue("number")
                    setMin("Minimum: ")
                    setMax("Maximum: ")
                    setTextTypeDropdown("invisible")
                    setDataInput("data-input")
                    setvaluesForDropdownClassName("invisible")
                    setLabel("invisible")
                    setMinVal("")
                    setMaxVal("")
                    break;
                  }
                case "Boolean":
                  {
                    setDropdownValue("boolean")
                    setMin("Not Available")
                    setMax("Not Available")
                    setTextTypeDropdown("invisible")
                    setDataInput("invisible")
                    setvaluesForDropdownClassName("invisible")
                    setLabel("invisible")
                    break;
                  }
                default:
                  break;
              }
            }}
            value={dropdownValue}
          />
          <label className={label} >Choose Text Type:▼</label>
          <Dropdown
            className={textTypeDropdown}
            options={["Free-Text", "Date", "Choice Menu (Dropdown)"]}
            onChange={(data) => {
              setTextType(data.value)
              if (data.value != "Choice Menu (Dropdown)") {

                setvaluesForDropdownClassName("invisible")
                if (data.value == "Date") {
                  setDataInput("invisible")
                  setMin("invisible")
                  setMax("invisible")
                }
                else {
                  setDataInput("data-input")
                }
              }
              else {
                setMin("invisible")
                setMax("invisible")
                setvaluesForDropdownClassName("values-for-dropdown")
                setDataInput("invisible")
              }

            }}
            value={textType}
          />
          <label className={minLabel} >{minLabel}</label>
          <input className={dataInput} type="number" onChange={(e) => { setMinVal(e.target.value) }} ></input>
          <label className={maxLabel} >{maxLabel}</label>
          <input className={dataInput} type="number" onChange={(e) => { setMaxVal(e.target.value) }} ></input>
        </div>
        <div className={valuesForDropdownClassName}>
          {
            dropdownFieldsValues.map((element, index) => {
              return (<div key={index}>
                <label>Value Name:</label>
                <input type="text" name="value_name" value={element.value_name || ""} onChange={(e) => handleDropdownChange(index, e)} />
                {
                  index ?
                    <button type="button" className="button remove" onClick={() => removeValueField(index)}>Remove</button>
                    : null
                }
              </div>)
            })
          }
          <div className="button-section">
            <button className="button add" type="button" onClick={() => addValueField()}>Add Value Fields</button>
          </div>
        </div>
      </div>
    )

  }

  //the method that adds the fields
  const addDataFields = () => {
    //setFormValues([...formValues, addRequestedDataField()])
    addRequestedDataField()
  }

  //#endregion

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
          addRequestedDataField()
        }
        <br />
        <button className="button add" type="button" onClick={() => addDataFields()}>Add Data Fields</button>
      </div>
      <button className="button_submit" type="submit">Submit</button>
    </form>
  )
}

export default FormCreator