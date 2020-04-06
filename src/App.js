import React from 'react';
import DataStatus from './components/DataStatus'
import './css/App.css'
import Nav from './components/nav'

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
  const [loader , setLoader] = React.useState(true)
  
  const handleLoading = (value) =>{
      setLoader(value)
  }
  return (
    <div className="App-div">
      <div>
      <Nav/>
      </div>

    <div className="App">
        <div className="staus-app">
          <DataStatus handleLoading={handleLoading}/>
        </div>
    </div>

    <div className="copyright">

      { !loader ?
      <Copyright/>
      : ""}
    </div> 
    </div>
  );
}

export default App;
