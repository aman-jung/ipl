import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import Background from "./Bg";

class Story extends Component {
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
    const url = "http://localhost:8080/story";
    let temp_labels = [];
    let temp_data = [];
    axios.get(url).then(res => {
      let result = res.data.result;
      console.log(result);
      for (let key in result) {
        temp_labels.push(result[key]._id.batsman);
        console.log(temp_labels);
        temp_data.push(result[key].count);
        console.log(temp_data);
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
        <Pie
          data={this.state.chartData}
          options={{
            title: {
              display: true,
              text: "My Story",
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

export default Story;
