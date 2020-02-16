import React, { Component } from 'react';
import './App.css';
import Table from './Table/Table';
import common from './common';

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: []
    }

    this.fetch();
  }

  fetch() {
    const api = 'https://raw.githubusercontent.com/hexschool/w3hexschool-API/master/data.json';
    new common().fetchData(api)
      .then((res) => {
        this.setState({
          data: res
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <Table data={ this.state.data } />
      </div>
    );
  }
}

export default App;
