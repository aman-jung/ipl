import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import Season from "./Season";
import Winner from "./Winner";
import Extra from "./Extra";
import Economy from "./Economy";
import Story from "./Story";

class App extends Component {
  render() {
    return (
      <div>
        <Season />
        <Winner />
        <Extra />
        <Economy />
        <Story />
      </div>
    );
  }
}

export default App;
