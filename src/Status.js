import React from 'react'
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import './css/status.css'
import MaterialTable from 'material-table';

const initialStatus = {
    confirm_cases : 0,
    recover : 0,
    death : 0,
    totalCountry : 0,
    tableData : [],
    loading : false,
    error : null
}

const statusReducer = (state , action) =>{

    switch(action.type){
        case "FETCH_DATA_SUCCESS":
            return{
                ...state,
                confirm_cases  :  action.payload.cases,
                death : action.payload.deaths,
                recover :  action.payload.recovered,
                error: false
            }
        case "FETCH_DATA_ERROR":
            return{
                ...state,
                error : true,
                loading : true,
            }
        case "COUNTRY_STAT_SUCCESS":
            return{
                ...state,
                tableData : action.payload,
                totalCountry : action.length
            }
        default:
            return state
    }
    
}

function Status() {
    const [state, dispatch] = React.useReducer(statusReducer, initialStatus)
    let columns = [
          { title: 'Country', field: 'country' },
          { title: 'Cases', field: 'cases' },
          { title: 'Today Cases', field: 'todayCases' },
          { title: 'Deaths', field: 'death' },
          { title: 'Critical', field: 'critical' },
          { title: 'Today Deaths', field: 'todayDeaths',cellStyle: {
            color : "red",
            fontWeight : "900",

          }, },
          { title: 'Recovered', field: 'recovered', cellStyle :{
              color : "#28a745",
              fontWeight: "900"
            }},
          
        ]
    let data = state.tableData.map(table=>{
        return {
          country :  table.country,
          cases : table.cases,
          todayCases : table.todayCases,
          death :  table.deaths,
          todayDeaths : "+" + table.todayDeaths,
          recovered : table.recovered,
          critical :  table.critical
        }
    })

    React.useEffect(() =>{
    
    getStatusData()
    getCountryData()
    let interval = setInterval(() =>{
        getStatusData() ; 
        getCountryData()
    },1000 * 10)
    return () => clearInterval(interval);
    },[])

    const getStatusData = () =>{
        console.log("Refreshing...")
        axios.get('https://corona.lmao.ninja/all')
        .then(response =>{
            dispatch({type : "FETCH_DATA_SUCCESS" ,  payload : response.data})
        })
        .catch(err =>{
            dispatch({type : "FETCH_DATA_ERROR" })
        })
    }

    const getCountryData = () =>{
        axios.get('https://corona.lmao.ninja/countries')
        .then(res=>{
            dispatch({type : "COUNTRY_STAT_SUCCESS" , payload :  res.data , length : res.data.length})
        })
    }
    return (
        <div>
        <div className = "status-main">
            <Paper elevation={3} className="paper-1">
                 <div className="paper-text1">Confirmed</div>
                <div className="paper-number">{state.confirm_cases}</div>
            </Paper>
            <Paper elevation={3} className="paper-2">
                <div className="paper-text2">Death</div>
                <div className="paper-number">{state.death}</div>
            </Paper>
            <Paper elevation={3} className="paper-3">
                <div className="paper-text3">Recovered</div>
                <div className="paper-number">{state.recover}</div>
            </Paper>
            <Paper elevation={3} className="paper-4">
                <div className="paper-text4">Total Country </div>
                <div className="paper-number">{state.totalCountry}</div>
            </Paper>
            
            {state.error ? "Getting Error" : ""}
        </div>
        <br></br>
        <div className="stat-table">
            <Paper elevation={3} className="stat-table1">
                <MaterialTable
                    title="COVID-19"
                    columns={columns}
                    data={data}
                    localization={{ toolbar: { searchPlaceholder: 'Search Country' } }}
                    options={{
                        headerStyle: {
                          backgroundColor: "#1D2939",
                          color: "#FFF",
                          fontSize: ".75rem",
                          fontWeight : "600",
                          lineHeight : "1.2"
                        },
                      }}
                />
            </Paper>
        </div>
        </div>
    )
}

export default Status
