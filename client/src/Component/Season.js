import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import Background from "./Bg";

class Season extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {}
    };
  }

  componentWillMount() {
    this.getChart();
  }
  getChart = () => {
    const url = "http://localhost:8080/query1";
    let temp_labels = [];
    let temp_data = [];
    axios.get(url).then(res => {
      let result = res.data.result;
      console.log(result);
      for (let key in result) {
        temp_labels.push(result[key]._id);
        temp_data.push(result[key].count);
      }
      this.setState({
        chartData: {
          labels: temp_labels,
          datasets: [
            {
              label: "Game played",
              data: temp_data,
              backgroundColor: Background
            }
          ]
        }
      });
    });
  };
  render() {
    return (
      <div>
        <Bar
          data={this.state.chartData}
          options={{
            title: {
              display: true,
              text: "Season",
              fontSize: 30
            },
            legend: {
              display: true,
              position: "right"
            }
          }}
        />
      </div>
    );
  }
}

export default Season;
