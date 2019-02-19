import React, { Component } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: '',
      grantedAwards: [],
      withMostAwards: [],
      totalUser: 0,
      totalAdmin: 0,
      load: false,
    };
  }

  componentDidMount() {
    let token = localStorage.getItem('access_token');
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.get('/bi/report', config)
    .then(res => {
      // console.log(res.data)
      this.setState({
        totalUser: res.data.totalUser,
        totalAdmin: res.data.totalAdmin,
        grantedAwards: res.data.userGrantedMostAwards,
        withMostAwards: res.data.userWithMostAwards
      })
    })
    .catch(err => console.log(err))
  }

  grantedAwardsReport = () => {
    const labels = [];
    const dataset = [];
    const bgColor = [];
    for(let i = 0; i < this.state.grantedAwards.length; i++) {
      labels.push(this.state.grantedAwards[i][0])
      dataset.push(this.state.grantedAwards[i][2])
      bgColor.push(this.getRandomColor())
    }

    const data = {
      labels: labels,
      datasets: [{
        data: dataset,
        backgroundColor: bgColor,
        hoverBackgroundColor: bgColor
      }]
    };

    return (
      <div>
        <h2>Most Awards Granted Report</h2>
        <Pie data={data} />
      </div>
    );
  };

  awardsWonReport = () => {
    const labels = [];
    const dataset = [];
    for (let i = 0; i < this.state.withMostAwards.length; i++) {
      labels.push(this.state.withMostAwards[i][0])
      dataset.push(this.state.withMostAwards[i][2])
    }

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Awards Won',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: dataset
        }
      ]
    };

    return (
      <div>
        <h2>Most Awards Won Report</h2>
        <Bar 
          data={data}
          height={100}
          options={{
            scales: {
              yAxes: [{
                display: true,
                ticks: {
                  beginAtZero: true,
                  suggestedMax: 10
                }
              }]
            }
          }}
        />
      </div>
    );
  };

  RunReport = () => {
    if (this.state.option === '1') {
      return this.grantedAwardsReport();
    } else if (this.state.option === '2') {
      return this.awardsWonReport();
    } else {
      return <div>No reports</div>;
    }
  };

  // On select input change handler
  onChange = e => {
    this.setState({ option: e.target.value });
  };

  loading = () => {
    return (
      <div>Loading...</div>
    )
  }

  // Returns a random color in hex
  getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for(let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

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
              <option value="1">Most Awards Granted</option>
              <option value="2">Most Awards Received</option>
            </Input>
          </FormGroup>
        </Form>
        <div>{this.RunReport()}</div>
      </div>
    );
  }
}

export default Reports;
