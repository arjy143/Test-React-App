import React, { useState } from 'react';  
import DatePicker from 'react-datepicker';  
import 'react-datepicker/dist/react-datepicker.css';  

const [startDate, setStartDate] = useState(null);  
const [endDate, setEndDate] = useState(null);  

return (  
  <div>  
    <h3>Start Date:</h3>  
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />  
  
    <h3>End Date:</h3>  
    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />  
  </div>  
);  

