import React, { Component } from 'react';
import { addnew } from '../../Fetches/Fetches';

class AddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Avail: '',
      Price: '',
      wanted: '',
      perBox: '',
      MRP: ''
    };
  }
  submit = () => {
    this.state.Name !== '' &&
      this.state.Avail !== '' &&
      this.state.Price !== '' &&
      addnew(this.state, this.props.history.push);
  };
  change = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className='center-align' style={{ marginTop: 30 }}>
        <div className='row'>
          <div className='col s12 m6 l6'>
            Name :
            <div className='input-field inline'>
              <input
                type='text'
                name='Name'
                autoFocus
                value={this.state.Name}
                onChange={this.change}
              />
              <label>Name</label>
            </div>
          </div>
          <div className='col s12 m6 l6'>
            Avail :
            <div className='input-field inline'>
              <input
                type='number'
                name='Avail'
                value={this.state.Avail}
                onChange={this.change}
              />
              <label>Stock</label>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col s12 m6 l6'>
            Price :
            <div className='input-field inline'>
              <input
                type='number'
                name='Price'
                value={this.state.Price}
                onChange={this.change}
              />
              <label>Price per one</label>
            </div>
          </div>
          <div className='col s12 m6 l6'>
            Wanted Limit :
            <div className='input-field inline'>
              <input
                type='number'
                name='wanted'
                value={this.state.wanted}
                onChange={this.change}
              />
              <label>Wanted</label>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col s12 m6 l6'>
            per Box :
            <div className='input-field inline'>
              <input
                type='number'
                name='perBox'
                value={this.state.perBox}
                onChange={this.change}
              />
              <label>pieces per Box</label>
            </div>
          </div>
          <div className='col s12 m6 l6'>
            MRP :
            <div className='input-field inline'>
              <input
                type='number'
                name='MRP'
                value={this.state.MRP}
                onChange={this.change}
              />
              <label>MRP</label>
            </div>
          </div>
        </div>
        <button
          className='btn waves-effect waves-light red lighten-2'
          type='submit'
          name='action'
          onClick={() => this.props.history.push('/')}
        >
          Back
          <i className='material-icons left'>arrow_back</i>
        </button>
        &nbsp;&nbsp;&nbsp;
        <button
          className='btn waves-effect waves-light red lighten-2'
          type='submit'
          name='action'
          onClick={this.submit}
        >
          Submit
          <i className='material-icons right'>send</i>
        </button>
      </div>
    );
  }
}

export default AddPage;
