import React from 'react'
import SkewLoader from "react-spinners/SkewLoader";
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import 'bootstrap/dist/css/bootstrap.min.css';


const style = {

    navbar : {
    background : "#333",
    height : "8vh",
    position : "fixed",
    top : "0",
    color : "white",
    width : "100%",
    display : "flex", 
    justifyContent : "space-between",
    alignItems : "center",
    zIndex: "1000"
    },
    text :{
        fontSize : "1.2rem",
        fontWeight : "900",
        textTransform : "uppercase",
        paddingLeft : "15px",
        display:"flex",
        
    },
    text2 : {
        paddingRight : "10px",
        display : "flex",
    },
    loader :{
        paddingLeft : "20px"
    },
    toggle :{
        marginRight : "20px",
        cursor : "pointer"
    }

}

function Nav({themeColorCallback}) {
    const [theme , setTheme] = React.useState(localStorage.getItem('theme-color') || 'light')

    const handleTheme = (value) =>{
        setTheme(value)
    }
    localStorage.setItem('theme-color' , theme)
    themeColorCallback(theme)

    return (
        <div  style={style.navbar} className="nav">
            <div style={style.text}>Covid-19 <span className="live-tage">
                <SkewLoader
                size = {11}
                color="red"
                
                />
                </span></div>
            
            <div style={style.text2} data-toggle="tooltip" data-placement="top" title="toogle light/dark theme">
                <div style={style.toggle}>
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
