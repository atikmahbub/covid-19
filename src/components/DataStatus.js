import React from 'react'
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import '../css/statusData.css'
import MaterialTable from 'material-table';
import BounceLoader from "react-spinners/BounceLoader";
import NumberFormat from 'react-number-format';
import { Pie } from "react-chartjs-2";
import Loader from 'react-spinners/BounceLoader';
import '../css/statusDataDark.css'


const initialStatus = {
    confirm_cases : 0,
    recover : 0,
    death : 0,
    totalCountry : 0,
    tableData : [],
    bdCases : 0,
    bdRecovered: 0,
    bdDeath: 0,
    bdTodayCases : 0,
    bdTodayDeaths : 0,
    bdActive : 0,
    loading : true,
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
                error: false,
                loading : false
            }
        case "FETCH_DATA_ERROR":
            return{
                ...state,
                error : true,
            }
        case "COUNTRY_STAT_SUCCESS":
            return{
                ...state,
                tableData : action.payload,
                totalCountry : action.length,
                loading : false,

            }
        case "BD_FETCH_SUCCESS":
            return{
                ...state,
                bdCases : action.payload.cases,
                bdDeath : action.payload.deaths,
                bdRecovered : action.payload.recovered,
                bdTodayCases : action.payload.todayCases,
                bdTodayDeaths : action.payload.todayDeaths,
                bdActive : action.payload.cases - (action.payload.deaths + action.payload.recovered),
                loading : false
            }
        default:
            return state
    }
    
}

function DataStatus({handleLoading , theme}) {
    const [state, dispatch] = React.useReducer(statusReducer, initialStatus)
    const [date, setDate] = React.useState(new Date().toLocaleString())

    let columns = [
          { title: 'Country', field: 'country' },
          { title: 'Cases', field: 'cases' },
          { title: 'Today Cases', field: 'todayCases' },
          { title: 'Deaths', field: 'death' },
          { title: 'Critical', field: 'critical' },
          { title: 'Today Deaths', field: 'todayDeaths',cellStyle: {
            color : theme === "dark" ? "#db8888" : "red",
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
            getBdData()
            let interval = setInterval(() =>{
                const date = new Date().toLocaleString()
                setDate(date)
                getStatusData() ; 
                getCountryData();
                getBdData()
            },1000 * 10)
            return () => clearInterval(interval);
    },[])

    const getBdData =() =>{
        axios.get('https://corona.lmao.ninja/v2/countries/Bangladesh')
        .then(response =>{
            handleLoading(false)
            dispatch({type : "BD_FETCH_SUCCESS" , payload : response.data})
        })
        .catch(err=>{
            dispatch({type : "FETCH_DATA_ERROR" })
        })
    }

    const getStatusData = () =>{
        axios.get('https://corona.lmao.ninja/v2/all')
        .then(response =>{
            dispatch({type : "FETCH_DATA_SUCCESS" ,  payload : response.data})
        })
        .catch(err =>{
            dispatch({type : "FETCH_DATA_ERROR" })
        })
    }

    const getCountryData = () =>{
        axios.get('https://corona.lmao.ninja/v2/countries')
        .then(res=>{
            dispatch({type : "COUNTRY_STAT_SUCCESS" , payload :  res.data , length : res.data.length})
        })
    }

    const globalData = {
        labels: ["Active", "Deaths" , "Recovered"],
        datasets: [
          {
            data: [state.confirm_cases - (state.death + state.recover), state.death , state.recover],
            backgroundColor: ["#78a7de", "#e38181" ,"#baedb4"],
            hoverBackgroundColor: ["#17a2b8", "#ad4b4b","#28a745"]
          }
        ]
      };

    return (
        <>
        {!state.loading ? 
        <div className="data-status">
            <div className={theme === "dark" ? "time time-dark" : "time"}>Last Updated on : {date} </div> 
            <div className="section-1">
                <div className="section-1-left">
                    <div className = {theme === "dark" ? "status-main status-main-dark" : "status-main"}>
                    <Paper elevation={3} className="paper-1">
                        <div className="paper-text1">Confirmed</div>
                        <div className="paper-number">
                        <NumberFormat value={state.confirm_cases} displayType={'text'} thousandSeparator={true} />
                        </div>
                    </Paper>
                    <Paper elevation={3} className="paper-2">
                        <div className="paper-text2">Death</div>
                        <div className="paper-number">
                            <NumberFormat value={state.death} displayType={'text'} thousandSeparator={true} />
                        </div>
                    </Paper>
                    <Paper elevation={3} className="paper-3">
                        <div className="paper-text3">Recovered</div>
                        <div className="paper-number">
                            <NumberFormat value={state.recover} displayType={'text'} thousandSeparator={true} />
                        </div>
                    </Paper>
                    <Paper elevation={3} className="paper-4">
                        <div className="paper-text4">Total Country</div>
                        <div className="paper-number">{state.totalCountry}</div>
                    </Paper>
                    </div>
                    <div className= {theme === "dark" ? "bd-text bd-text-dark" : "bd-text"}><span>Bangladesh</span></div>
                    <div className= {theme === "dark" ? "bd-stat bd-stat-dark" : "bd-stat"} elevation={3}>
                        <Paper elevation={2} className="bd-confirm">
                            <div className="bd-number"><NumberFormat value={state.bdCases} displayType={'text'} thousandSeparator={true} /></div>
                            <div>Confirmed</div>
                        </Paper>

                        <Paper elevation={2} className="bd-death">
                            <div className="bd-number"><NumberFormat value={state.bdDeath} displayType={'text'} thousandSeparator={true} /></div>
                            <div>Death's</div>              
                        </Paper>

                        <Paper elevation={2} className="bd-recovered">
                            <div className="bd-number"><NumberFormat value={state.bdRecovered} displayType={'text'} thousandSeparator={true} /></div>
                            <div>Recovered</div> 
                        </Paper>

                        <Paper elevation={2} className="bd-active">
                            <div className="bd-number"><NumberFormat value={state.bdActive} displayType={'text'} thousandSeparator={true} /></div>
                            <div>Active</div> 
                        </Paper>

                        <Paper elevation={2} className="bd-todayCases">
                            <div className="bd-number"><NumberFormat value={state.bdTodayCases} displayType={'text'} thousandSeparator={true} /></div>
                            <div>Case's Today</div> 
                        </Paper>

                        <Paper elevation={2} className="bd-todayDeath">
                            <div className="bd-number"><NumberFormat value={state.bdTodayDeaths} displayType={'text'} thousandSeparator={true} /></div>
                            <div>Death's Today</div> 
                        </Paper>


                    </div>
                </div>


                <div className="section-1-right">
                <Paper elevation={3} className={theme === "dark" ? "info2 info2-dark" : "info2"}>
                    <p className={theme=== "dark" ? "title-info title-info-dark" : "title-info"}><span>Symptoms</span></p>
                    <hr className = {theme === "dark" ? "hr-1-dark" : "hr-1"}/>
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
                </div>
            </div>

            <div className="section-2">
                <Paper elevation={3} className= {theme === "dark" ? "status-table status-table-dark" : "status-table"}>
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
                            lineHeight : "1.2",
                            },
                            
                        }
                    }
                    />
                </Paper>
                <Paper elevation={3} className= {theme === "dark" ? "chart-global chart-global-dark" : "chart-global"} >
                    <h5 className={theme === "dark" ? "chart-title chart-title-dark" : "chart-title"}>
                    <span>Global Data</span>
                    </h5>
                    <hr className="hr-1"/>
                    <Pie
                        data={globalData}
                        className="pie-chart"
                        options={
                        { 
                            responsive: true,
                            maintainAspectRatio : true,
                            legend: {
                                labels: {
                                    fontColor: theme === "dark" ? "white" : "black"
                                }
                            },
                        }
                        }
                        width="170"
                    /> 
                </Paper>
            </div>
        </div>
        :(
            <div className={theme === "dark" ? "worldLoader worldLoader-dark" : "worldLoader"}>
            <BounceLoader
                size={50}
                color="teal"
                className="loader"
            />
            Loading Data, Please wait...
            </div>
        )
}
        </>
    )
}

export default DataStatus