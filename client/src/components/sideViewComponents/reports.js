import React, { Component } from 'react';
import { Bar, Doughnut, HorizontalBar} from 'react-chartjs-2';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: '',
      grantedAwards: [],
      grantedMostWeek: [],
      grantedMostMonth: [],
      withMostAwards: [],
      mostWeekAwards: [],
      mostMonthAwards: [],
      totalUser: 0,
      totalAdmin: 0,
      totalEmpWk: 0,
      totalEmpMt: 0,
      load: false,
    };
  }

  componentDidMount() {
    let token = localStorage.getItem('access_token');
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get('/bi/report', config)
      .then(res => {
        console.log(res.data);
        this.setState({
          totalUser: res.data.totalUser,
          totalAdmin: res.data.totalAdmin,
          totalEmpWk: res.data.totalEmpWeek,
          totalEmpMt: res.data.totalEmpMonth,
          grantedAwards: res.data.userGrantedMostAwards.total,
          grantedMostWeek: res.data.userGrantedMostAwards.week,
          grantedMostMonth: res.data.userGrantedMostAwards.month,
          withMostAwards: res.data.userWithMostAwards.total,
          mostWeekAwards: res.data.userWithMostAwards.week,
          mostMonthAwards: res.data.userWithMostAwards.month,
        });
      })
      .catch(err => console.log(err));
  }

  // Total number of awards created by users
  totalGrantedAwardsReport = () => {
    const labels = [];
    const dataset = [];
    const bgColor = [];
    for (let i = 0; i < this.state.grantedAwards.length; i++) {
      labels.push(this.state.grantedAwards[i][0]);
      dataset.push(this.state.grantedAwards[i][2]);
      bgColor.push(this.getRandomColor());
    }

    const data = {
      labels: labels,
      datasets: [
        {
          data: dataset,
          backgroundColor: bgColor,
          hoverBackgroundColor: bgColor,
        },
      ],
    };

    return (
      <div>
        <h2>Most Awards Granted Report</h2>
        <Doughnut data={data} />
      </div>
    );
  };

  // Total number of Awards won
  totalAwardsWonReport = () => {
    const labels = [];
    const dataset = [];
    for (let i = 0; i < this.state.withMostAwards.length; i++) {
      labels.push(this.state.withMostAwards[i][0]);
      dataset.push(this.state.withMostAwards[i][2]);
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
          data: dataset,
        },
      ],
    };

    return (
      <div>
        <h2>Most Awards Won Report</h2>
        <Bar
          data={data}
          height={100}
          options={{
            scales: {
              yAxes: [
                {
                  display: true,
                  ticks: {
                    beginAtZero: true,
                    suggestedMax: 10,
                  },
                },
              ],
            },
          }}
        />
      </div>
    );
  };

  // Report for Emp of the Week awards created by users
  weeklyAwardsGranted = () => {
    const labels = [];
    const granted = [];
    const bgColor = [];
    for (let i = 0; i < this.state.grantedMostWeek.length; i++) {
      labels.push(this.state.grantedMostWeek[i][0]);
      granted.push(this.state.grantedMostWeek[i][2]);
      bgColor.push(this.getRandomColor());
    }

    const data = {
      labels: labels,
      datasets: [
        {
          data: granted,
          backgroundColor: bgColor,
          hoverBackgroundColor: bgColor,
        },
      ],
    };

    return (
      <div>
        <h2>Employee of the Week (Granted)</h2>
        <Doughnut data={data} />
      </div>
    );
  };

  // Report for Emp of the Week awards won by users
  weeklyAwardsReceived = () => {
    const labels = [];
    const received = [];
    for (let i = 0; i < this.state.mostWeekAwards.length; i++) {
      labels.push(this.state.mostWeekAwards[i][0]);
      received.push(this.state.mostWeekAwards[i][2]);
    }

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Emp of the Week Awards Received',
          backgroundColor: 'rgba(83,51,237,0.2)',
          borderColor: 'rgba(83,51,237,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(83,51,237,0.4)',
          hoverBorderColor: 'rgba(83,51,237,1)',
          data: received,
        },
      ],
    };

    return (
      <div>
        <h2>Employee of the Week Awards (Received)</h2>
        <HorizontalBar
          data={data}
          options={{
            scales: {
              xAxes: [
                {
                  display: true,
                  ticks: {
                    beginAtZero: true,
                    suggestedMax: 10,
                  },
                },
              ],
            },
          }}
        />
      </div>
    );
  };

  // Report for Emp of the Month Created by Users
  monthlyAwardsGranted = () => {
    const labels = [];
    const granted = [];
    const bgColor = [];
    for (let i = 0; i < this.state.grantedMostMonth.length; i++) {
      labels.push(this.state.grantedMostMonth[i][0]);
      granted.push(this.state.grantedMostMonth[i][2]);
      bgColor.push(this.getRandomColor());
    }

    const data = {
      labels: labels,
      datasets: [
        {
          data: granted,
          backgroundColor: bgColor,
          hoverBackgroundColor: bgColor,
        },
      ],
    };

    return (
      <div>
        <h2>Employee of the Month (Granted)</h2>
        <Doughnut data={data} />
      </div>
    );
  };

  // Report for Emp of Month Awards received by users
  monthlyAwardsReceived = () => {
    const labels = [];
    const received = [];
    for (let i = 0; i < this.state.mostMonthAwards.length; i++) {
      labels.push(this.state.mostMonthAwards[i][0]);
      received.push(this.state.mostMonthAwards[i][2]);
    }

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Emp of the Month Awards Received',
          backgroundColor: 'rgba(249,105,14,0.2)',
          borderColor: 'rgba(249,105,14,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(249,105,14,0.4)',
          hoverBorderColor: 'rgba(249,105,14,1)',
          data: received,
        },
      ],
    };

    return (
      <div>
        <h2>Employee of the Month Awards (Received)</h2>
        <p>Total: {}</p>
        <Bar
          data={data}
          height={100}
          options={{
            scales: {
              yAxes: [
                {
                  display: true,
                  ticks: {
                    beginAtZero: true,
                    suggestedMax: 10,
                  },
                },
              ],
            },
          }}
        />
      </div>
    );
  };

  // Report for general statistics
  generalStats = () => {
    return (
      <div>
        Total Users: {this.state.totalUser} <br/>
        Total Admins: {this.state.totalAdmin} <br/>
        Total Award Winners: {this.state.withMostAwards.length} <br/>
        Total Employee of the Week Winners: {this.state.mostWeekAwards.length} <br/>
        Total Employee of the Month Winners: {this.state.mostMonthAwards.length}
      </div>
    )
  };

  // Displays chosen report
  RunReport = () => {
    if (this.state.option === '1') {
      return this.totalGrantedAwardsReport();
    } else if (this.state.option === '2') {
      return this.totalAwardsWonReport();
    } else if (this.state.option === '3') {
      return this.weeklyAwardsGranted();
    } else if (this.state.option === '4') {
      return this.weeklyAwardsReceived();
    } else if (this.state.option === '5') {
      return this.monthlyAwardsGranted();
    } else if (this.state.option === '6') {
      return this.monthlyAwardsReceived();
    } else if(this.state.option === '7') {
      return this.generalStats();
    } else {
      return <div>No reports</div>;
    }
  };

  // On select input change handler
  onChange = e => {
    this.setState({ option: e.target.value });
  };

  loading = () => {
    return <div>Loading...</div>;
  };

  // Returns a random color in hex
  getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
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
              <option value="1">Total Most Awards Granted</option>
              <option value="2">Total Most Awards Received</option>
              <option value="3">Employee of the Week (Granted)</option>
              <option value="4">Employee of the Week (Received)</option>
              <option value="5">Employee of the Month (Granted)</option>
              <option value="6">Employee of the Month (Received)</option>
              <option value="7">General Statistics</option>
            </Input>
          </FormGroup>
        </Form>
        <div>{this.RunReport()}</div>
      </div>
    );
  }
}

export default Reports;
