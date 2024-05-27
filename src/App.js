import logo from './logo.svg';
//import './App.css';
import React, { useState } from 'react';  
import Navbar from './FrontPageComponents/Navbar';  
import PredictionGetter from './FrontPageComponents/PredictionGetter';  
import DatePicker from 'react-datepicker';  
import 'react-datepicker/dist/react-datepicker.css'; 

function App() {
  
  return (
    <div className="App">
      <Navbar/>
      <header className="App-header">
        <PredictionGetter/>
      </header>

      <Data></Data>
    </div>
  );
}
function Data(){
  return (
    <table>
      <tbody>
    <tr>
        <th>Header 1</th>
        <th>Header 2</th>
        <th>Header 3</th>
    </tr>
    <tr>
        <th>Row Header</th>
        <td>Cell 1</td>
        <td>Cell 2</td>
    </tr>
    <tr>
        <th>Row Header</th>
        <td>Cell 3</td>
        <td>Cell 4</td>
    </tr>
    </tbody>
</table>
  )
}

export default App;