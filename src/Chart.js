import React from 'react'
import Paper from '@material-ui/core/Paper'
import { Line } from "react-chartjs-2";
import './css/Chart.css'
import { Pie } from "react-chartjs-2";
import axios from 'axios'

const initialState = {
  Active:"",
  Death : "",
  Recovered : ""
}

function Chart() {

  const [state,setState]  = React.useState(initialState)
  React.useEffect(() =>{
    getStatusData()
    let interval = setInterval(() =>{
        getStatusData() ; 
    },1000 * 10)
    return () => clearInterval(interval);
    },[])

  const getStatusData = () =>{
    console.log("Refreshing...")
    axios.get('https://corona.lmao.ninja/all')
    .then(response =>{
        setState({ ...state,
          Active : response.data.cases ,
          Death : response.data.deaths,
          Recovered : response.data.recovered
          })
    })
    .catch(err =>{
        console.log("Error:" , err)
    })
}

    const caseData = {
        dataLine: {
          labels: ["January" , "February" , "March"],
          datasets: [
            {
              label: "Total Cases",
              fill: true,
              lineTension: 0.2,
              borderColor: "#17a2b8",
              borderCapStyle: "butt",
              borderDash: [1],
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBorderWidth: 2,
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              data: [11950 , 88604 , 250865]
            },
        ]
        }
    }

    const deathData = {
        dataLine: {
          labels: ["January" , "February" , "March"],
          datasets: [
            {
              label: "Total Deaths",
              fill: true,
              lineTension: 0.2,
              borderColor: "rgb(173, 75, 75)",
              borderCapStyle: "butt",
              borderDash: [1],
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBorderWidth: 2,
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              data: [259 , 2977, 14906]
            },
        ]
        }
    }

    const pieData = {
      labels: ["Active", "Deaths" , "Recovered"],
      datasets: [
        {
          data: [state.Active - (state.Death + state.Recovered), state.Death ,state.Recovered],
          backgroundColor: ["#78a7de", "#e38181" ,"#baedb4"],
          hoverBackgroundColor: ["#8f38e0", "#97B1F1"]
        }
      ]
    };

    return (
        <div className = "chart-main">

        <Paper elevation={3} className="chart1">
        <h5 className="chart-title">
                <span>Total Cases</span>
              </h5>
              <hr className="hr-1"/>
              <Line
                data={caseData.dataLine}
                options={{ responsive: true }}
                height="210"

              />
        </Paper>


        <Paper elevation={3} className="chart1" >
        <h5 className="chart-title">
            <span>Total Death</span>
              </h5>
              <hr className="hr-1"/>
              <Line
                data={deathData.dataLine}
                options={{ responsive: true }}
                height="210"

              />
        </Paper>

        <Paper elevation={3} className="chart1" >
        <h5 className="chart-title">
            <span>Total Recovered</span>
              </h5>
              <hr className="hr-1"/>
              <Pie
                data={pieData}
                options={{ responsive: true }}
                height="200"
              />
        </Paper>

        </div>
    )
}

export default Chart
