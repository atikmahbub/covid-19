import React from 'react';
import Status from './Status'
import Info from './Info'
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
    <>
    <Nav/>
   <div className="App-main">
      <div className="time">  Update On : {date} </div>
      <div className="App">
        <div className="status-div"><Status/></div>
        <div className="info-div"><Info/></div>
      </div>
      <div>
        <Chart/>
      </div>
    </div>
    <div className="copyright">
      <Copyright/>
    </div>
    
    </>
  );
}

export default App;
