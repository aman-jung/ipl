import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import Background from "./Bg";

class Winner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Winner: {}
    };
  }

  getWinner = () => {
    const url = "http://localhost:8080/query2";
    let temp_labels = [];
    let temp_data = [];
    axios.get(url).then(res => {
      let result = res.data.winner;
      console.log(result);
      for (let key in result) {
        temp_labels.push(result[key]._id);
        temp_data.push(result[key].count);
      }
      this.setState({
        Winner: {
          labels: temp_labels,
          datasets: [
            {
              label: "Win",
              data: temp_data,
              backgroundColor: Background
            }
          ]
        }
      });
    });
  };
  componentWillMount() {
    this.getWinner();
  }
  render() {
    return (
      <div>
        <Bar
          data={this.state.Winner}
          options={{
            title: {
              display: true,
              text: "Winning Team",
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

export default Winner;
