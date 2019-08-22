import React from 'react';
import { update } from '../../Fetches/Fetches';
import logo from '../../Gif/logo.png';

class Billpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amt: 0,
      show: false,
      selected_items: null,
      items: null,
      totPrice: null
    };
    this.loadLocal = this.loadLocal.bind(this);
    this.saveLocation = this.saveLocation.bind(this);
  }
  saveLocation() {
    this.setState({
      selected_items: this.props.location.state.item,
      items: this.props.location.state.all,
      totPrice: this.props.location.state.bill
    });
  }
  loadLocal() {
    this.setState({
      selected_items: JSON.parse(localStorage.getItem('localStore'))
        .selected_items,
      items: JSON.parse(localStorage.getItem('localStore')).all,
      totPrice: JSON.parse(localStorage.getItem('localStore')).bill
    });
  }
  show = () => {
    this.setState({ show: !this.state.show });
  };
  change = e => {
    this.setState({ amt: +e.target.value });
  };
  purchase = async () => {
    this.props.location.state && this.saveLocation();
    await update(this.state, this.props.history.push);
  };
  Cancelpurchase = () => {
    this.props.history.push({
      pathname: '/',
      state: {
        selected_items: this.state.selected_items,
        items: this.state.items,
        totPrice: this.state.totPrice
      }
    });
  };
  componentDidMount() {
    this.props.location.state ? this.saveLocation() : this.loadLocal();
  }
  render() {
    return this.state.selected_items !== null ? (
      <div className='row'>
        <div
          className={this.state.show ? 'col s12 m7 l7' : null}
          style={{ width: this.state.show ? null : '90%', margin: 'auto' }}
        >
          <div>
            <img
              src={logo}
              className='left'
              style={{ marginTop: 0 }}
              alt='SL Ice&Store'
            />
            <h5>Seethalakshmi Ice&Store</h5>
            <b className='right'>Date : {new Date().toDateString()}</b>
            <br />
            <div className='card'>
              <table className='centered striped'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Item Qty</th>
                    <th>Item Price</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.items.map((i, index) => {
                    return (
                      <tr key={index}>
                        <td>{i}</td>
                        <td>{this.state.selected_items[i].req}</td>
                        <td>Rs. {this.state.selected_items[i].totPrice}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <br />
          <h4 className='right'>Total {this.state.totPrice}</h4>
          <button
            className='waves-effect waves-light btn'
            onClick={() => this.props.history.push('/')}
          >
            <i className='material-icons left'>cancel</i>
            Cancel
          </button>
          &nbsp;&nbsp;
          <button
            className='waves-effect waves-light btn'
            onClick={this.Cancelpurchase}
          >
            <i className='material-icons left'>add_shopping_cart</i>
            Add Products
          </button>
          &nbsp;&nbsp;
          <button
            className='waves-effect waves-light btn'
            onClick={this.purchase}
          >
            <i className='material-icons right'>send</i>
            Make Purchase
          </button>
        </div>
        {this.state.show && (
          <div className='col s11 m4 l4 offset-s1 m1 l1'>
            products Price:
            <input type='number' disabled value={this.state.totPrice} />
            Given Price:
            <input
              type='text'
              autoFocus
              value={this.state.amt}
              onChange={this.change}
            />
            Remaining :
            <input
              type='number'
              disabled
              value={this.state.amt - this.state.totPrice}
            />
          </div>
        )}
        <button
          className='btn-floating btn-large waves-effect waves-light red material-icons hoverable'
          style={{ position: 'absolute', bottom: 8, right: 16 }}
          onClick={this.show}
        >
          computer
        </button>
      </div>
    ) : (
      <div>Loading....</div>
    );
  }
}
export default Billpage;
