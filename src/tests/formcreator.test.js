import { render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { useState } from 'react'
import FormCreator from '../Components/Pages/FormCreator'

test("initial test, checks if runs",()=>{
    render(<FormCreator/>)

    userEvent.type(screen.getByPlaceholderText("Field Name:"),"country")
    userEvent.click(screen.getByText("field type"))
    userEvent.click(screen.getByText("Text"))
    userEvent.click(screen.getByText("text type"))
    userEvent.click(screen.getByText("Choice Menu (Dropdown)"))
    userEvent.type(screen.getByTitle("value_name_0"),"USA")
    userEvent.click(screen.getByText("Add Value Fields"))
    
    screen.debug()
})