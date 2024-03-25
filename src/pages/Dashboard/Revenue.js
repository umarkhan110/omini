import { Card, Col } from 'antd'
import React from 'react'
import usecustomStyles from '../../Common/customStyles';
import { Line } from '@ant-design/plots';
const customStyles = usecustomStyles();

const Revenue = () => {

  const data = [
    {
      month: 'Jan',
      value: 100,
    },
    {
      month: 'Feb',
      value: 108,
    },
    {
      month: 'Mar',
      value: 129,
    },
    {
      month: 'Apr',
      value: 155,
    },
    {
      month: 'May',
      value: 120,
    },
    {
      month: 'Jun',
      value: 99,
    },
    {
      month: 'Jul',
      value: 56,
    },
    {
      month: 'Aug',
      value: 44,
    },
    {
      month: 'Sep',
      value: 66,
    },
    {
      month: 'Oct',
      value: 7,
    },
    {
      month: 'Nov',
      value: 64,
    },
    {
      month: 'Dec',
      value: 34,
    },
  ];
  

  const config = {
    data,
    xField: 'month',
    yField: 'value',
    point: {
      shapeField: 'circle',
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 3,
    },
    yAxis: {
      label: {
        formatter: (v) => `$${v}`,
      },
    },
  };

  return (
    <React.Fragment>
      <Col xs={24} xl={24}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4  style={{fontSize:'21px', fontWeight:'600', marginBottom:'10px'}}>Boudica analytics</h4>
            <div>
            </div>
          </div>
          <div className="p-0 border-0 bg-light-subtle card-header">
          </div>
          <div style={{ marginTop: customStyles.margin }}>
            <div className="w-100">
              <div id="revenue-chart" dir="ltr">
                <Line {...config} />
              </div>
            </div>
          </div>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default Revenue