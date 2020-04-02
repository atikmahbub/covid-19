import React from 'react'
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import '../css/status.css'
import MaterialTable from 'material-table';
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import BounceLoader from "react-spinners/BounceLoader";
import NumberFormat from 'react-number-format';



const initialStatus = {
    confirm_cases : 0,
    recover : 0,
    death : 0,
    totalCountry : 0,
    tableData : [],
    bdCases : 0,
    bdRecovered: 0,
    bdDeath: 0,
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
                loading : false
            }
        default:
            return state
    }
    
}

function Status() {
    const [state, dispatch] = React.useReducer(statusReducer, initialStatus)
    const numbers = ['+8801944333222','+8801937000011','+8801937110011','+8801927711784',"+8801927711785",'+8801550064901-05']
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
    getBdData()
    let interval = setInterval(() =>{
        getStatusData() ; 
        getCountryData();
        getBdData()
    },1000 * 10)
    return () => clearInterval(interval);
    },[])

    const getBdData =() =>{
        axios.get('https://corona.lmao.ninja/countries/Bangladesh')
        .then(response =>{
            dispatch({type : "BD_FETCH_SUCCESS" , payload : response.data})
        })
        .catch(err=>{
            dispatch({type : "FETCH_DATA_ERROR" })
        })
    }

    const getStatusData = () =>{
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
        <div className="status-page">
           
        <div className="stat-div">

        { ! state.loading ? 
        <span>
        <div className = "status-main">
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
        <Paper className="bd-stat" elevation={3}>
            <div className="bd-text"><span>Bangladesh</span> <hr className = "hr-1"/> </div>
            
            <div className = "bd-stat-numbers">
                <div>Confirmed : {""}
                    <NumberFormat value={state.bdCases} displayType={'text'} thousandSeparator={true} />
                </div>
                <div>Death : {""}
                    <NumberFormat value={state.bdDeath} displayType={'text'} thousandSeparator={true} />
                </div>
                <div>Recovered : {""}
                    <NumberFormat value={state.bdRecovered} displayType={'text'} thousandSeparator={true} />
                </div>
            </div>
        </Paper>
        </span>
        : (
        <div className="worldLoader">
            <BounceLoader
                size={50}
                color="teal"
                className="loader"
            />
            Loading Data, Please wait...
        </div>
        
        ) }
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
        <div className="info-status">
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
                <p className="title-info">IEDCR Hotline(Bangladesh)</p>
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
        </div>
    )
}

export default Status
