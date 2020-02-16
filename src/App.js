import React, { Component } from 'react';
import './App.css';
import Table from './Table/Table';
import common from './common';

const fetch = () => {

}

class App extends Component {
  state = {
    data: []
  }

  fetch() {
    const api = 'https://raw.githubusercontent.com/hexschool/w3hexschool-API/master/data.json';
    new common().fetchData(api)
      .then((d) => {
        this.setState({
          data: d
        });
        console.log(d);
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
