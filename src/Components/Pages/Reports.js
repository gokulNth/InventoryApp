import React, { Component } from 'react';
import { Bills } from '../../Fetches/Queries';

class Reports extends Component {
  constructor() {
    super();
    this.state = {
      bill: '',
      keys: '',
      selected: ''
    };
    this.fetchBill = this.fetchBill.bind(this);
    this.select = this.select.bind(this);
  }
  select(e) {
    let { id } = e.target;
    this.setState({ selected: this.state.bill.map(i => i[id]) });
  }
  fetchBill = async () => {
    let a = await Bills();
    let uniquekeys = await Array.from(new Set(a.map(i => Object.keys(i)[0])));
    await this.setState({ bill: a, keys: uniquekeys });
  };
  componentDidMount() {
    this.fetchBill();
  }
  render() {
    return (
      <div>
        {this.state.keys && (
          <ul>
            {this.state.keys.map(i => (
              <li key={i} id={i} onClick={this.select}>
                {i}
              </li>
            ))}
          </ul>
        )}
        {this.state.selected &&
          this.state.selected.map(
            (i, index) =>
              i && (
                <div key={index}>
                  {Object.keys(i).map((j, index) => (
                    <div key={index}>
                      {j}: {i[j]}
                    </div>
                  ))}
                </div>
              )
          )}
      </div>
    );
  }
}

export default Reports;
