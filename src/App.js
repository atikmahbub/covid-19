import React from 'react';
import Status from './Status'
import './css/App.css'
import Nav from './nav'
import Chart from './Chart'

function Copyright(){
  return(
    <div>
      {"Copyright © "}
      <a color="#1D2939" target="_BLANK" href="https://www.facebook.com/atik.m11">
        Atik Mahbub
      </a>{" "}
    </div>
  )
}

function App() {

  const [date, setDate] = React.useState(new Date().toLocaleString())
  React.useEffect(() => {
    let interval = setInterval(() =>{
      const date = new Date().toLocaleString()
      setDate(date.toLocaleString())
    } , 10*1000)
    return () =>{
      clearInterval(interval)
    }

  })
  
  return (
    <div className="App-div">
      <div>
      <Nav/>
      </div>
    
    <div className="time">  Update On : {date} </div>

    <div className="App">
        <div><Status/></div>
        <div ><Chart/></div>
    </div>

    <div className="copyright">
      <Copyright/>
    </div> 
    </div>
  );
}

export default App;
