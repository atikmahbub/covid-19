import React from 'react'
import SkewLoader from "react-spinners/SkewLoader";
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import 'bootstrap/dist/css/bootstrap.min.css';
import corona from '../image/corona.png'
import '../css/nav.css'


function Nav({themeColorCallback}) {
    const [theme , setTheme] = React.useState(localStorage.getItem('theme-color') || 'light')

    const handleTheme = (value) =>{
        setTheme(value)
    }
    localStorage.setItem('theme-color' , theme)
    themeColorCallback(theme)

    return (
        <div className={theme === "dark" ? "navbar navbar-dark" : "navbar"}>
            <div className = "nav-text">
            <img src={corona} alt="logo" width="25" height ="25" className= "corona-image"/>
                Covid-19 
                <span className="live-tage">
                <SkewLoader
                size = {11}
                color="red"
                className="nav-loader"
                />
                </span></div>
            
            <div className="nav-text2" data-toggle="tooltip" data-placement="top" title="toogle light/dark theme">
                <div className="nav-toggle">
                    {
                        theme === 'light' ? <Brightness4Icon onClick={() => handleTheme('dark')}/> : <Brightness7Icon onClick={() => handleTheme('light')}/>
                    }
                </div>
                <div>#staySafe</div>
            </div>
        </div>
    )
}

export default Nav
