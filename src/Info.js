import React from 'react'
import Paper from '@material-ui/core/Paper'
import './css/info.css'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

function Info() {

    const numbers = ['+8801944333222','+8801937000011','+8801937110011','+8801927711784',"+8801927711785",'+8801550064901-05']
    return (
        <div className="info-main">
        <Paper elevation={3} className="info2">
            <p className="title-info">Symptoms</p>
            <hr className = "hr-1"/>
            <div>Common Symptomps are:
                <ul>
                    <li>fever</li>
                    <li>tiredness</li>
                    <li>dry cough</li>
                </ul>
            </div>
            <div>
            Other symptoms include:
            <ul>
                    <li>shortness of breath</li>
                    <li>aches and pains</li>
                    <li>sore throat</li>
                    <li>and very few people will report diarrhoea, nausea or a runny nose</li>
                </ul>
            </div>
        </Paper>
        <Paper elevation={3} className="info1">
                <p className="title-info">IECDR Hotline(Bangladesh)</p>
                <hr className = "hr-1"/>
                <div>
                    {
                    numbers.map((num) =>
                        <div className="hotline-div">
                            <div><ArrowRightIcon/></div>
                            <div>{num}</div>
                        </div>
                    )
                    }
                </div>
        </Paper>
        </div>
    )
}

export default Info
