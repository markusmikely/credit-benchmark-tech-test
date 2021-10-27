import React, { useState, useEffect } from "react";
import "./App.scss";
import Layout from './components/layout/Layout'
import SwitchButton from './components/button/SwitchButton'
import Chart from './components/line/Chart'
import * as moment from 'moment'
import jsonData from './data.json'

function App() {

  const [type, setType] = useState({type:'PD', label: 'Rating'})
  const [data, setData] = useState()

  useEffect(() => {
    if(jsonData) {
      setData(getChartData(type.type, jsonData[0].response.data))
    }
  }, [type])

  const handleChangeType = type => {
    const newType = (type === 'PD') ? {type:'PD', label: 'Rating'} : {type:'LGD', label: 'LGD'}
    setType(newType)
  }

  const getChartData = (type, data) => {
    const chartData = []

    data.forEach(function(d) {
      const newData = {
        date: new Date(getDateString(d.date)),
        value: cleanValue((type === 'PD') ? d.PD : d.LGD)
      }
      chartData.push(newData)
    });

    return chartData
  }

  const getDateString = number => {
    const numberString = number.toString()
    const date = numberString.substr(0,4) + '-' + numberString.substr(4,2) + '-' + numberString.substr(6,2)
    return moment(date)
  }
  const cleanValue = value => {
    return (!value) ? 0 : value
  }
  return (
    <div className="App">
      <Layout>
        <h1>Markus' Test</h1>
        <Chart
          type={type}
          data={data}
        />
        <SwitchButton
          type={type}
          change={handleChangeType} />
      </Layout>
    </div>
  );
}

export default App;
