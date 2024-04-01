import { Card, Col } from 'antd'
import React, { useState, useEffect } from 'react'
import usecustomStyles from '../../Common/customStyles'; 
import { Column } from '@ant-design/plots';

const customStyles = usecustomStyles();

const Revenue3 = () => {
  const [chartData, setChartData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const managerUsername = localStorage.getItem("username");
        const managerPassword = localStorage.getItem("password");
        const apiKey = localStorage.getItem("api_key");
       
        if (!managerUsername || !managerPassword ) {
          console.error("Manager credentials not found in localStorage");
          return;
        }
        if (!apiKey)
        console.error("API Key Invalid")

          const searchDDL = 'SELECT%20COUNT(ai_3)%20AS%20count_ai,%20ai_3%20FROM%20.seednode_syslog%20GROUP%20BY%20ai_3%20ORDER%20BY%20count_ai%20DESC';
          const endpoint = `https://dashboard.postgresbc.info/cgi-bin/pgbc_api/search_block_data?username=${managerUsername}&password=${managerPassword}&ddl=${searchDDL}`;
  
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            Authorization: "Basic " + apiKey,
            "Content-Type": "application/json",
          },
        });
        console.log(response.json);
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
  
        let rawData, data;
      try {
        rawData = await response.text(); 
        data = JSON.parse(rawData); 
      } catch (error) {
        setErrorMessage(`Cannot render graph, JSON error: ${rawData}`);
        return;
      }

      if (!data.results || !data.results.length) {
        setErrorMessage(`Cannot render graph, JSON error: ${rawData}`);
        return;
      }
  
        let filteredResults = [];
        for (let i = 0; i < data.results.length; i++) {
          if (data.results[i].ai_3 !== "") {
            filteredResults.push(data.results[i]);
          }
        } 

        const dataForChart = filteredResults.map(item => ({
          type: item.ai_3,
          values: parseInt(item.count_ai, 10), 
        }));
    
        setChartData(dataForChart);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage(error.message);
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);  

  return (
    <React.Fragment>
      <Col xs={24} xl={24}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4  style={{fontSize:'21px', fontWeight:'600', marginBottom:'10px'}}>Boudica analytics AI_3</h4>
            <div>
            </div>
          </div>
          <div className="p-0 border-0 bg-light-subtle card-header">
          </div>
          <div style={{ marginTop: customStyles.margin || '20px' }}> 
          <div className="w-100">
              <div id="revenue3-chart" dir="ltr" style={{ height: '293px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f0f0f0', borderRadius: '2px' }}>
                {errorMessage ? (
                  <div style={{ textAlign: 'center', whiteSpace: 'pre-wrap' }}>
                    <strong>Cannot render graph, JSON error:</strong>
                    <br />
                    {errorMessage.replace('Cannot render graph, JSON error: ', '')}
                  </div>
                ) : (
                  <Column {...{ data: chartData, xField: 'type', yField: 'values', height: 293 }} />
                )}
              </div>
            </div>
          </div>
        </Card>
      </Col>
    </React.Fragment>
  )
}


export {Revenue3}