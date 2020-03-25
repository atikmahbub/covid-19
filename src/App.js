import React from 'react';
import Status from './components/Status'
import './css/App.css'
import Nav from './components/nav'
import Chart from './components/Chart'

function Copyright(){
  return(
    <div className="copy-div">
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
    
    <div className="time">Last Updated on : {date} </div>

    <div className="App">
        <div className="staus-app"><Status/></div>
        <div><Chart/></div>
    </div>

    <div className="copyright">
      <Copyright/>
    </div> 
    </div>
  );
}

export default App;
