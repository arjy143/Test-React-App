import React, { useState, useEffect } from 'react';  
import axios from 'axios';  
import DatePicker from 'react-datepicker';  
import 'react-datepicker/dist/react-datepicker.css'; 
  
const PredictionGetter = () => { 
  const today = new Date();  
  const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());   
  const [startDate, setStartDate] = useState(oneMonthAgo);  
  const [endDate, setEndDate] = useState(today);  
  const [inputValue, setInputValue] = useState('');  
  const [loading, setLoading] = useState(false);  
  const [responseData, setResponseData] = useState('');  
  
  useEffect(() => {  
    console.log(responseData);  
  }, [responseData]);  
  
  const handleSubmit = async () => {  
    setLoading(true);  
    try {  
      const url = 'http://localhost:8000/train-model/';  
      const formattedStartDate = startDate.toISOString().slice(0, 10);  
      const formattedEndDate = endDate.toISOString().slice(0, 10); 
      const response = await axios.get(url, { params: { ticker: inputValue, start_date : formattedStartDate, end_date : formattedEndDate } });  
      const resultData = JSON.stringify(response.data);  
      setResponseData(resultData);  
      console.log(response.data);  
    } catch (error) {  
      console.error(error);  
    } finally {  
      setLoading(false);  
    }  
  };  
  
  return (  
    <div>  
      <div>  
        <h3>Start Date:</h3>  
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />  
  
        <h3>End Date:</h3>  
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />  
      </div> 
      <h3>Ticker:</h3>
      <input  
        type="text"  
        value={inputValue}  
        onChange={(e) => setInputValue(e.target.value)}  
      />  
      <button onClick={handleSubmit}>Submit</button>  
      {loading ? (  
        <p>Loading...</p>  
      ) : (  
        responseData !== '' && <p>{JSON.parse(responseData).prediction}</p>  
      )}  
    </div>  
  );  
};  
  
export default PredictionGetter;  
