import React, { useEffect, useState } from 'react';
import './App.css';
//import schema from './Components/SchemaComps/schema.json'
//import UI from './Components/SchemaComps/UI.json'
import { JsonForms } from '@jsonforms/react';
import {materialRenderers, materialCells,} from '@jsonforms/material-renderers';
import { Router, Route, Switch } from "react-router";
import axios from 'axios'
import MainRouter from './Components/Pages/MainRouter'


function App() {

  

  return (
    <div className='App'>
      <MainRouter/>
    </div>
  );
}

export default App;
