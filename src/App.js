import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [table, updateTable] = useState();
  const [siteName, updateSiteName] = useState();
  const [dateStamp, updateDateStamp] = useState()
  const depth = 76
  useEffect( () =>  {
    const checkDate = new Date();
    checkDate.setDate(checkDate.getDate()-1);
    const formattedDate = checkDate.getFullYear() + '-' + (checkDate.getMonth()+1) + '-' + checkDate.getDate(); 
    fetch('https://waterservices.usgs.gov/nwis/dv/?format=json&sites=410538080280801&parameterCd=72019&startDT='+formattedDate+'&endDT='+formattedDate)
      .then(
        response => response.json())
      .then (
        (data) => {
          updateTable(data.value.timeSeries[0].values[0].value[0].value);
          updateSiteName(data.value.timeSeries[0].sourceInfo.siteName);
          let thisDate = new Date(data.value.timeSeries[0].values[0].value[0].dateTime)
          updateDateStamp(thisDate.toDateString());
        }
      )
  },[])
  return (
    <div className="App">
      <h1>Well Check</h1>
      <div id="house">
        <div className='tree'>&#127795;</div>
        &#127968;
        <div className='tree'>&#127795;</div>
        </div>
        <div id="wellShaft">
          <div id="waterLevel" style={{
            height: `${((depth-table)/depth)*100}%`
          }}>Water Table: {table}'</div>
          <div id='howDeep'>Well Depth: {depth}'</div>
      </div>
      <div id="data">
       <p>Data from {siteName} as measured on {dateStamp}.</p>
      </div>
    </div>
  );
}

export default App;
