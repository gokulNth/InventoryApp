import React, { Component } from 'react';
import { fetch } from '../../Fetches/Fetches';
import loading from '../../Gif/Loading/loading.gif';

class WantedList extends Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }
  fetch = async () => {
    let a = await fetch();
    let data = [];
    await a.forEach(async doc => {
      await data.push({ ...doc.data(), id: doc.id });
    });
    await this.setState({ products: data });
  };
  componentDidMount() {
    this.fetch();
  }
  render() {
    return (
      <div>
        {this.state.products.length === 0 ? (
          <div style={{ margin: '0 auto', width: '50%' }}>
            <img
              src={loading}
              alt='Loading...'
              style={{ margin: '0 auto', width: '99%' }}
            />
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Products</th>
                <th>Stock Left</th>
              </tr>
            </thead>
            {this.state.products.map(i => (
              <tbody key={i.id}>
                {i.Avail <= i.Wnt_ltd && (
                  <tr>
                    <td>{i.Name}</td>
                    <td>{i.Avail}</td>
                  </tr>
                )}
              </tbody>
            ))}
          </table>
        )}
      </div>
    );
  }
}

export default WantedList;
