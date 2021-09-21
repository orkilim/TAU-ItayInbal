import React, { useEffect, useState } from 'react'
import '../CSSfiles/Formcreator.css'
import Dropdown from 'react-dropdown';

const DataField=(props)=>{

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

    const sendChildData = (event) => {
        const myState={
            "field_name":fieldName,
            "text_type":textType,
            "field_type":dropdownValue,
            "min_val":minVal,
            "max_val":maxVal,
            "dropdown_menu_values":dropdownFieldsValues,
        }
        props.parentCallback(myState,props.index);
        //event.preventDefault();
    }

useEffect(()=>{
    sendChildData()
},[dropdownValue,fieldName,textType,minVal,maxVal,dropdownFieldsValues])

//#region Methods
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


//#endregion

return (
    <div>
      <div>
        <input className="dataInput" required={true} onChange={(e) => { setFieldName(e.target.value) }} placeholder="Field Name:" type="text" ></input>
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
                  setMin("invisible")
                  setMax("invisible")
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




export default DataField