import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import { Form, FormGroup, Label, Input } from 'reactstrap';

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: '',
    };
  }

  ExampleChart = () => {
    return (
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={[
          ['Year', 'Sales', 'Expenses', 'Profit'],
          ['2014', 1000, 400, 200],
          ['2015', 1170, 460, 250],
          ['2016', 660, 1120, 300],
          ['2017', 1030, 540, 350],
        ]}
        options={{
          // Material design options
          chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
          },
        }}
        // For tests
        rootProps={{ 'data-testid': '2' }}
      />
    );
  };

  DiffChart = () => {
    return (
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['City', '2010 Population', '2000 Population'],
          ['New York City, NY', 8175000, 8008000],
          ['Los Angeles, CA', 3792000, 3694000],
          ['Chicago, IL', 2695000, 2896000],
          ['Houston, TX', 2099000, 1953000],
          ['Philadelphia, PA', 1526000, 1517000],
        ]}
        options={{
          title: 'Population of Largest U.S. Cities',
          chartArea: { width: '50%' },
          hAxis: {
            title: 'Total Population',
            minValue: 0,
          },
          vAxis: {
            title: 'City',
          },
        }}
        // For tests
        rootProps={{ 'data-testid': '1' }}
      />
    );
  };
  RunReport = () => {
    if (this.state.option === '1') {
      return this.ExampleChart();
    } else if (this.state.option === '2') {
      return this.DiffChart();
    } else {
      return <div>No reports</div>;
    }
  };

  onChange = e => {
    this.setState({ option: e.target.value });
  };
  render() {
    return (
      <div>
        <Form>
          <FormGroup>
            <Label>Select Report</Label>
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              onChange={this.onChange}
            >
              <option>-</option>
              <option value="1">Example Chart</option>
              <option value="2">A Different Chart</option>
            </Input>
          </FormGroup>
        </Form>
        {this.RunReport()}
      </div>
    );
  }
}

export default Reports;
