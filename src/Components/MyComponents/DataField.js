import React, { useEffect, useState } from 'react'
import '../CSSfiles/Formcreator.css'
import Dropdown from 'react-dropdown';

const DataField = (props) => {

  const [dropdownValue, setDropdownValue] = useState("")//the value of the FIRST dropdown=text/number/boolean
  const [fieldName, setFieldName] = useState("")//the NAME of the attribute we want to add to the form
  const [textType, setTextType] = useState("")//when chosen text field- the type of the text field=free-text/date/dropdown menu
  const [minLabel, setMin] = useState("")//what word will appear above the minimum limitation field of number or free text
  const [minVal, setMinVal] = useState("")//minimum value of number or minimum length of text
  const [maxLabel, setMax] = useState("")//what word will appear above the maximum limitation field of number or free text
  const [maxVal, setMaxVal] = useState("")//maximum value of number or maximum length of text
  const [dropdownFieldsValues, setDropdownFieldsValues] = useState([{ value_name: "" }])//after we chose text->dropdown menu: which values can we choose from it
  const [label, setLabel] = useState("invisible")//a label for the second dropdown (text-type)
  const [dataInput, setDataInput] = useState("invisible")//className for data inputs
  const [valuesForDropdownClassName, setvaluesForDropdownClassName] = useState("invisible")//a state variable to change the class name of the text->dropdown values
  const [textTypeDropdown, setTextTypeDropdown] = useState("invisible")//classname state variable

  const type_options = ["Text", "Number", "Boolean"]//options for first dropdown


  const sendChildData = (event) => {
    const myState = {
      //values
      "field_name": fieldName,
      "text_type": textType,
      "field_type": dropdownValue,
      "min_val": minVal,
      "max_val": maxVal,
      "dropdown_menu_values": dropdownFieldsValues,
      //labels
      "max_label":maxLabel,
      "min_label":minLabel,
      "text_type_label":label,
      "max_min_input_label_className":dataInput,
      "text_type_dropdown_className":textTypeDropdown,
      "values_for_dropdown_className":valuesForDropdownClassName

    }
    props.parentCallback(myState, props.index);
    //event.preventDefault();
  }

  //on change of the data field so that the form creator can receive the changes
  useEffect(() => {
    sendChildData()
  }, [dropdownValue, fieldName, textType, minVal, maxVal, dropdownFieldsValues])

  //initial state of the data field
  /*useEffect(()=>{
    const my_start_labels = {
      //labels
      "max_label":maxLabel,
      "min_label":minLabel,
      "text_type_label":label,
      "max_min_input_label_className":dataInput,
      "text_type_dropdown_className":textTypeDropdown,
      "values_for_dropdown_className":valuesForDropdownClassName

    }
    props.parentCallback(my_start_labels, props.index);
  },[])*/

  /*const updateDataField=(obj)=>{
    setDropdownValue(obj.dropdownValue)
    setFieldName(obj.field_name)
    setMinVal(obj.minVal)
    setMaxVal(obj.maxVal)
    setTextType(obj.textType)
    setDropdownFieldsValues(obj.dropdownFieldsValues)
  }*/

  //#region Methods
  const handleDropdownChange = (i, e) => {
    let newDropdownValues = [...dropdownFieldsValues];
    newDropdownValues[i].value_name = e.target.value;
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
    <div className="datafield-wrapper">
      <div>
        <input className="dataInput" value={props.data.field_name} required={true} onChange={(e) => { setFieldName(e.target.value) }} placeholder="Field Name:" type="text" ></input>
        <br />
        <label>Choose Field Type:▼</label>
        <Dropdown
          className="dropdown"
          options={type_options}
          placeholder="field type"
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
          value={props.data.field_type}
        />
        <label className={label} >Choose Text Type:▼</label>
        <Dropdown
          className={props.data.text_type_dropdown_className}
          placeholder="text type"
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
          value={props.data.text_type}
        />
        <label className={props.data.min_label} >{props.data.min_label}</label>
          <input className={props.data.max_min_input_label_className} value={props.data.min_val} type="number" onChange={(e) => { setMinVal(e.target.value) }} ></input>
        
        <label className={props.data.max_label} >{props.data.max_label}</label>
        <input className={props.data.max_min_input_label_className} value={props.data.max_val} type="number" onChange={(e) => { setMaxVal(e.target.value) }} ></input>
      </div>
      <div className={props.data.values_for_dropdown_className}>
        {
          dropdownFieldsValues.map((element, index) => {
            return (<div key={index}>
              <label>Value Name:</label>
              <input type="text" title={"value_name_" + index} value={element.value_name || ""} onChange={(e) => handleDropdownChange(index, e)} />
              {
                index ?
                  <button type="button" name={"add_value_" + index} className="button remove" onClick={() => removeValueField(index)}>Remove</button>
                  : null
              }
            </div>)
          })
        }
        <div className="button-section">
          <button className="button add" name="add_values_button" type="button" onClick={() => addValueField()}>Add Value Fields</button>
        </div>
      </div>
    </div>
  )

}




export default DataField