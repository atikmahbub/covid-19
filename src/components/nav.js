import React from 'react'
import SkewLoader from "react-spinners/SkewLoader";


const style = {

    navbar : {
    background : "#1D2939",
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
        paddingRight : "10px"
    },
    loader :{
        paddingLeft : "20px"
    }

}

function Nav() {
    return (
        <div  style={style.navbar}>
            <div style={style.text}>Covid-19 <span className="live-tage">
                <SkewLoader
                size = {11}
                color="red"
                
                />
                </span></div>
            
            <div style={style.text2}>#staySafe</div>
        </div>
    )
}

export default Nav
