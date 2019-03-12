/*
* Description: Admin reports component. Displays multiple different reports
* */

import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
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

  // 1. Generates Bar graph for total number of awards created by users
  totalGrantedAwardsReport = () => {
    const labels = [];
    const dataset = [];

    for (let i = 0; i < this.state.grantedAwards.length; i++) {
      labels.push(
        this.state.grantedAwards[i][0] + ' ' + this.state.grantedAwards[i][1]
      );
      dataset.push(this.state.grantedAwards[i][2]);
    }

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Total Awards Granted',
          backgroundColor: 'rgba(72, 59, 59, 0.2)',
          borderColor: 'rgba(72, 59, 59, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(72, 59, 59, 0.5)',
          hoverBorderColor: 'rgba(72, 59, 59, 1)',
          data: dataset,
        },
      ],
    };

    return (
      <div>
        <div>
          <h1>Granted Awards</h1>
          {dataset.length > 0 ? (
            <Bar
              data={data}
              // height={100}
              options={{
                scales: {
                  yAxes: [
                    {
                      display: true,
                      ticks: {
                        beginAtZero: true,
                        // suggestedMax: 10,
                      },
                    },
                  ],
                },
              }}
            />
          ) : (
            <p>No data in this report</p>
          )}
        </div>
      </div>
    );
  };

  // 2. Generates Bar graph for total number of Awards won
  totalAwardsWonReport = () => {
    const labels = [];
    const dataset = [];
    for (let i = 0; i < this.state.withMostAwards.length; i++) {
      labels.push(
        this.state.withMostAwards[i][0] + ' ' + this.state.withMostAwards[i][1]
      );
      dataset.push(this.state.withMostAwards[i][2]);
    }

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Total Awards Received',
          backgroundColor: 'rgba(72, 59, 59, 0.2)',
          borderColor: 'rgba(72, 59, 59, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(72, 59, 59, 0.5)',
          hoverBorderColor: 'rgba(72, 59, 59, 1)',
          data: dataset,
        },
      ],
    };

    return (
      <div>
        <h1>Received Awards</h1>
        {dataset.length > 0 ? (
          <Bar
            data={data}
            // height={100}
            options={{
              scales: {
                yAxes: [
                  {
                    display: true,
                    ticks: {
                      beginAtZero: true,
                      // suggestedMax: 10,
                    },
                  },
                ],
              },
            }}
          />
        ) : (
          <p>No data in this report</p>
        )}
      </div>
    );
  };

  // 3. Generates Bar graph for Emp of the Week awards created by users
  weeklyAwardsGranted = () => {
    const labels = [];
    const granted = [];

    for (let i = 0; i < this.state.grantedMostWeek.length; i++) {
      labels.push(
        this.state.grantedMostWeek[i][0] +
          ' ' +
          this.state.grantedMostWeek[i][1]
      );
      granted.push(this.state.grantedMostWeek[i][2]);
    }

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Emp of the Week Awards Granted',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: granted,
        },
      ],
    };

    return (
      <div>
        <h1>Employee of the Week</h1>
        {granted.length > 0 ? (
          <Bar
            data={data}
            // height={100}
            options={{
              scales: {
                yAxes: [
                  {
                    display: true,
                    ticks: {
                      beginAtZero: true,
                      // suggestedMax: 10,
                    },
                  },
                ],
              },
            }}
          />
        ) : (
          <p>No data in this report</p>
        )}
      </div>
    );
  };

  // 4. Generates Bar graph for Emp of the Week awards won by users
  weeklyAwardsReceived = () => {
    const labels = [];
    const received = [];
    for (let i = 0; i < this.state.mostWeekAwards.length; i++) {
      labels.push(
        this.state.mostWeekAwards[i][0] + ' ' + this.state.mostWeekAwards[i][1]
      );
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
        <h1>Employee of the Week</h1>
        {received.length > 0 ? (
          <Bar
            data={data}
            // height={100}
            options={{
              scales: {
                yAxes: [
                  {
                    display: true,
                    ticks: {
                      beginAtZero: true,
                      // suggestedMax: 10,
                    },
                  },
                ],
              },
            }}
          />
        ) : (
          <p>No data in this report</p>
        )}
      </div>
    );
  };

  // 5. Generates Bar graph for Emp of the Month Created by Users
  monthlyAwardsGranted = () => {
    const labels = [];
    const granted = [];
 
    for (let i = 0; i < this.state.grantedMostMonth.length; i++) {
      labels.push(
        this.state.grantedMostMonth[i][0] +
          ' ' +
          this.state.grantedMostMonth[i][1]
      );
      granted.push(this.state.grantedMostMonth[i][2]);
    }

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Emp of the Month Awards Granted',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: granted,
        },
      ],
    };

    return (
      <div>
        <h1>Employee of the Month</h1>
        {granted.length > 0 ? (
          <Bar
            data={data}
            // height={100}
            options={{
              scales: {
                yAxes: [
                  {
                    display: true,
                    ticks: {
                      beginAtZero: true,
                      // suggestedMax: 10,
                    },
                  },
                ],
              },
            }}
          />
        ) : (
          <p>No data in this report</p>
        )}
      </div>
    );
  };

  // 6. Generates Bar graph for Emp of Month Awards received by users
  monthlyAwardsReceived = () => {
    const labels = [];
    const received = [];
    for (let i = 0; i < this.state.mostMonthAwards.length; i++) {
      labels.push(
        this.state.mostMonthAwards[i][0] +
          ' ' +
          this.state.mostMonthAwards[i][1]
      );
      received.push(this.state.mostMonthAwards[i][2]);
    }

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Emp of the Month Awards Received',
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
        <h1>Employee of the Month</h1>
        {received.length > 0 ? (
          <Bar
            data={data}
            // height={100}
            options={{
              scales: {
                yAxes: [
                  {
                    display: true,
                    ticks: {
                      beginAtZero: true,
                      // suggestedMax: 10,
                    },
                  },
                ],
              },
            }}
          />
        ) : (
          <p>No data in this report</p>
        )}
      </div>
    );
  };

  // 7. lists general statistics
  generalStats = () => {
    return (
      <div>
        <h1>General Stats</h1>
        Total Users: {this.state.totalUser} <br />
        Total Admins: {this.state.totalAdmin} <br />
        {/* Total # of Award Winners: {this.state.withMostAwards.length} */}
      </div>
    );
  };

  // report 1: totals
  totalsReport = () => {
    return (
      <div>
        <div className="report">{this.generalStats()}</div>
        <div className="report">{this.totalAwardsWonReport()}</div>
        <div className="report">{this.totalGrantedAwardsReport()}</div>
      </div>
    );
  };

  // report 2: awards received
  awardsReceivedReport = () => {
    return (
      <div className="report-container">
        <div className="report">{this.monthlyAwardsReceived()}</div>
        <div className="report">{this.weeklyAwardsReceived()}</div>
      </div>
    );
  };

  // report 3: awards granted
  awardsGrantedReport = () => {
    return (
      <div>
        <div className="report">{this.monthlyAwardsGranted()}</div>
        <div className="report">{this.weeklyAwardsGranted()}</div>
      </div>
    );
  };

  // Displays chosen report
  RunReport = () => {
    if (this.state.option === '1') {
      return this.totalsReport();
    } else if (this.state.option === '2') {
      return this.awardsReceivedReport();
    } else if (this.state.option === '3') {
      return this.awardsGrantedReport();
    } else {
      return <div>No report selected</div>;
    }
  };

  // On select input change handler
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
              className="input--form"
              type="select"
              name="select"
              id="exampleSelect"
              onChange={this.onChange}
            >
              <option>-</option>
              <option value="1">Totals</option>
              <option value="2">Received Awards</option>
              <option value="3">Granted Awards</option>
            </Input>
          </FormGroup>
        </Form>
        <div>{this.RunReport()}</div>
      </div>
    );
  }
}

export default Reports;
